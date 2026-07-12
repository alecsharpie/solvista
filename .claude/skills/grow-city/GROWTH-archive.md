# Solvista growth ledger — archive

Older `grow-city` iterations, rotated out of `GROWTH.md` by `rotate-ledger.mjs`.
Append-only, oldest first. Nothing in the loop reads this by default; it exists so
the full exploration record (including dead ends) survives. Read it only when
digging into why an old vector was tried or reverted.

## Iteration 0 — baseline (2026-07-06)

Established the loop: `window.__census()` hook in `solvista.html`, `census.mjs`
harness, `shoot.config.json`, this ledger. Baseline census (`census-baseline.json`):
pop 78323 · developed 3719 · roads 3518 · towers 135 · parks 499 · tileKinds 159
· civicKinds 57 · transportModes 36. 0 page errors.

**Key finding (shapes every future iteration):** Solvista is a *chaotic coupled
CA* — `rng()` draws are terrain-gated, so any change that calls `rng()` or alters
terrain reshuffles the whole downstream stream and every metric wobbles ~few %.
An exact per-metric diff therefore can't isolate a change. The gate hard-fails
only on page errors or a >5% collapse of a core aggregate (pop/developed/roads);
real growth is read from the tile histogram + screenshots. New CA passes must draw
per-cell chance from `hashCell(x,y,seedNum^SALT)`, not `rng()`.

## Iteration 1 — riparian greenway (2026-07-06)

**Vector:** More CA rules / more nature.
**Change:** New `tick()` pass (`solvista.html`, after the woods-regrowth pass):
wild riverbank cells (EMPTY/MEADOW, no corridor, adjacent to river water, *no*
road/dev neighbor) succeed to FOREST, tracing the river with a gallery-forest
ribbon. Uses `hashCell(x,y,seedNum^0x9E37)` so it doesn't perturb the shared rng.
**Census:** VERDICT PASS, 0 page errors. Core aggregates flat (pop −53/−0.07%,
developed **+20**, roads −16/−0.5%). Tile histogram: **FOREST +104**, EMPTY −104,
MEADOW +3 — the intended nature growth, sourced from wild banks. Other tiles
wobbled within chaotic-reshuffle noise (COM −90 / RES +79 / MID +30, net developed
still up).
**Visual:** shots at seed 42@2035 and seed 7@2019 — green now hugs the river banks;
grid intact, monorail ring clean, no z-tears. Coherent.
**Verdict:** SHIP. Redeploy to the artifact URL still PENDING (source-only so far).

## Iteration 2 — streetcars / trams (2026-07-07)

**Vector:** New transport.
**Change:** Added a `trams` entity array (`solvista.html`): brick-red streetcars
that ride the avenues from 1985 (count scales with `roads.length`, cap 6). Reuses
`stepVehicle` for movement and `drawVehicle` for rendering (new `tram` branch: a
longer body + cream livery belt + a slim trolley pole to the overhead). Wired into
`syncFleet` / `frame()` step / render bucket, and added to `__census().transport`.
Roads already follow the three hex axes, so the hex-axis invariant holds for free.
**Key move:** spawn picks use `Math.random()` (like vehicle steering), NOT the
seeded `rng()` — so the fleet never perturbs the CA stream. Count stays
deterministic (`wantTrams` from `roads.length`); only placement varies.
**Census:** VERDICT PASS, 0 page errors. **transportModes +9** (new mode present
in all 9 matrix cells) and *every other metric exactly 0*, empty tile histogram —
a surgical diff, confirming zero stream perturbation (contrast iteration 1).
**Visual:** seed 42@2005; a road-flooding debug crop confirmed the streetcar sprite
(belt + pole, correct occlusion, rides road axes) — no z-tears. Debug reverted.
**Verdict:** SHIP. Redeploy to the artifact URL still PENDING.

## Iteration 3 — the university (2026-07-07)

**Vector:** New business/service.
**Change:** New civic kind `university` (`solvista.html`): opens 2008+, one more per
~14k residents. Sited by a deterministic single-loop `hashCell(x,y,seedNum^0x5CA1)`
scan over the grid (first eligible high-value, road-near, ≥hex-5 from another
campus) — **no rng() draw**, so siting perturbs nothing. Draw: a new CIVIC switch
case — a cream campanile / clock tower with a sage pointed cap + gold clock dot on
the shared white+gold civic base.
**Census:** VERDICT PASS, 0 page errors. **civicKinds +3** (campus in 3 matrix
cells, the high-pop 2035 seeds). Surgical knock-on: CIVIC +3 / RES −3 (3 RES cells
became campuses) and pop +108 (=3×(40−4) POPW) — nothing else moved.
**Visual:** seed 42@2035 (threshold temporarily lowered to force campuses, then
reverted). Tight crop confirmed the campanile renders on the hex prism with correct
occlusion beside a green quad — no z-tears.
**Verdict:** SHIP. Redeploy to the artifact URL still PENDING.

## Iteration 4 — vineyards (2026-07-07)

**Vector:** More variety (new tile type).
**Change:** New tile `T.VINEYARD` (=23). A `tick()` pass (1990+) terraces dry
*inland* farms (≥hex-2 from water, no adjacent development) into vineyards, gated by
`hashCell(x,y,seedNum^0x711E)<0.22` (no rng() draw). Wired into `valueSrc` (0.56,
like farmland). Draw case: pale golden-green terrace + dark green vine-trellis rows
+ lavender grape clusters + a stone winery on high-value cells. Census auto-counts
the new tile (it enumerates `T`), so no census-hook edit was needed.
**Census:** VERDICT PASS, 0 page errors. **VINEYARD +70 / tileKinds +6**, FARM −65
(retired into vineyards); pop +664, developed −23 — core metrics flat, rest is
chaotic wobble. NOTE: bigger wobble than iters 2–3 because converting FARM (a type
downstream rng-gated passes test) ripples the stream even though placement itself
used hashCell — first tuned threshold 0.4→0.22 to keep vineyards a tasteful accent
(140→70 tiles) and shrink the wobble.
**Visual:** seed 42@2035, vineyards flooded then reverted. First pass had green-on-
green rows that were illegible → switched ground to pale `meadow` + darker `canopy`
rows so the trellis reads. Confirmed distinct from soil/orange farms, on-grid, no
z-tears.
**Verdict:** SHIP. Redeploy to the artifact URL still PENDING.

## Iteration 5 — river crossings (2026-07-07)

**Vector:** More connections.
**Change:** A `tick()` pass (2000+) spans the river with extra bridges at pinch
points — river-water cells with **≥3** road neighbors (streets nearly surrounding a
thin water gap), gated by `hashCell(x,y,seedNum^0xB21D)<0.55` (no rng() draw).
Reuses the existing `c.bridge` timber-deck rendering — zero new draw code.
**Census:** VERDICT PASS, 0 page errors. **bridges +36 (148→184, ~4 new per city) /
roads +36**, WATER −36. Core flat (pop −1.7%, developed −3). Tuned down from a first
try (≥2 neighbors, thr 0.6 → +77 bridges, nearly doubling them and paving too much
river; pop −2.5%) to ≥3 neighbors / thr 0.55 for tasteful, well-sited crossings.
**Visual:** seed 42@2035 river zoom — new tan timber decks span the river at pinch
points, both banks connected, river still reads as water (not paved). No z-tears.
**Verdict:** SHIP. Redeploy to the artifact URL still PENDING.

## Iteration 6 — surfers in the break (2026-07-07)

**Vector:** More life.
**Change:** New `surfers` entity array — 7 surfers bob in the break just off the
beach (`x = shoreAt(y)+off`, `pxc` water projection, wave bob + slow along-shore
drift). Spawned in `genWorld` with **`Math.random()` not `rng()`** (the shared PRNG
feeds every later tick, so an rng() draw even at the end of genWorld would perturb
the whole warp). Wired: declaration/reset, `genWorld` spawn, `drawSurfer`
(foam-wake ellipse + board + rider), render bucket, `frame()` drift step, and
`__census().life.surfers` (kept the hook in sync per invariant).
**Census:** VERDICT PASS, 0 page errors. Diff fully **flat** (surfers touch no
terrain and no seeded rng) — a surgical no-op on every tracked metric; growth is in
`life.surfers 0→7`, confirmed via the census hook.
**Visual:** seed 42@2035 coastline zoom — surfers ride foam-wake boards in the break
seaward of the sand, distinct from the sailboats offshore. On-grid, no z-tears.
**Verdict:** SHIP. Redeploy to the artifact URL still PENDING.

## Iteration 7 — rooftop-solar diffusion CA (2026-07-07)

**Vector:** More CA rules.
**Change:** Turned the old *static* rooftop-solar visual (a fixed `hashCell<0.4` on
RES from 2002) into a real **diffusion / contagion CA**: a new `c.solar` flag that
spreads by neighbor imitation from 2010 — `p = min(0.05, 0.0004 + 0.009 * solarNeighbors)`
— extended to RES/MID/COM. Randomness is `hashCell(x,y, seedNum ^ ((year*23)|0) ^ salt)`:
**time-salted so it's fresh each tick yet never touches rng()** — the clean way to do
a stochastic-over-time pass. Rendering now keys off `c.solar` (RES/MID/COM panels;
removed the two old static-solar snippets). New `solarRoofs` counter in the census
hook + `census.mjs` GROWTH list.
**Census:** VERDICT PASS, 0 page errors. **Fully surgical** — every terrain metric
0, empty histogram (time-salted hashCell = zero rng perturbation). **solarRoofs
0→837** (~49% of eligible roofs by 2035). First tune (base .0012/+.02) saturated to
~99% (monotonous) → dialed to base .0004/+.009 for a believable half-city curve.
**Visual:** seed 42@2035 district zoom — solar panels on ~half the roofs with visible
CLUSTERING (neighbors co-adopt = the contagion showing through); rest carry plain/
garden/café roofs. On-grid, no z-tears. Note: diffusion starts 2010, so the 2005 era
shows no solar (vs the old static 2002 start) — a truer adoption curve, not a regress.
**Verdict:** SHIP. Redeploy to the artifact URL still PENDING.

## Iteration 8 — taller downtown skyline (2026-07-07)

**Vector:** Bigger (density/height — chose "up" over raising G, which would be a
sweeping multi-tunable change: bigger G alone stops the city reaching the edges).
**Change:** Raised tower target heights — creation `th (46+c.v*64)*(0.55+0.45*back)
→ (54+c.v*82)*(0.6+0.5*back)`; and the modern-era extension now starts 2022 (was
2040), caps at 160 (was 108), +9..21/step. The `back`/`seaside` factors are
untouched, so the coast stays low-rise and only the inland downtown soars. Added
`towerHt` (Σ tower height) + `tallTowers` (>80) metrics to the census hook +
`census.mjs` (baseline captured BEFORE the change so the delta is real).
**Census:** VERDICT PASS, 0 page errors. **towerHt 7166→10078 (+41%) / tallTowers
9→51**. towers +1, pop +140, developed +6 — count/pop essentially flat (heights, not
counts, grew); minor tile wobble from the rng-gated upgrade tweak.
**Visual:** seed 42@2035 wide — downtown towers soar well above the mass, coast still
low-rise, tallest towers fit within the frame (no top clipping despite ~160 height vs
150px headroom), no z-tears. Reads as a real metropolis.
**Verdict:** SHIP. Redeploy to the artifact URL still PENDING.

---
### Menu status: all 8 vectors now shipped (nature · transport · business/service ·
### variety · connections · life · CA rules · bigger). Next runs = second lap:
### deepen a category (new tile, second transit line, more CA rules) — keep rotating.

## Iteration 9 — harbor ferry (2026-07-07) [2nd lap]

**Vector:** New transport (2nd — user emphasized "transport types" plural; trams was
the only prior one).
**Change:** New `ferries` entity — a coastal passenger ferry (2 boats) working the
shoreline back and forth, seaward of the sailboats (`x = shoreAt(y)+~3.4`, `pxc`
projection). `drawFerry`: wide hull + white cabin + livery stripe + wheelhouse +
flag + foam wake — distinct from the triangular-sail `drawBoat`. Spawned in
`genWorld` with `Math.random()` (no rng perturbation); wired to render bucket,
`frame()` step, and `__census().transport.ferries`.
**Census:** VERDICT PASS, 0 page errors. Surgical: **transportModes +9** (ferry
present in all 9 cells), everything else flat.
**Visual:** seed 42@2035 coastal slice — both ferries on the water, chunky hulls with
white deckhouses, distinct from sailboats; on-grid, no z-tears.
**Verdict:** SHIP. Redeploy to the artifact URL still PENDING. Transport modes now:
cars, bikes, trams, boats, ferries, shuttles, monorail.

## Iteration 10 — salt marsh (2026-07-07) [2nd lap]

**Vector:** More variety (2nd new tile) — capstone to the river work (banks forested
in iter1, bridged in iter5).
**Change:** New tile `T.MARSH` (=24). A `tick()` pass settles low green cells
(MEADOW/SHOREPARK/BEACH) fringing river-water into reedy tidal wetland,
`hashCell(x,y,seedNum^0x3A27)<0.7` (no rng). `valueSrc` 0.74 (coastal). Draw case:
muddy `meadow` base + two shallow `water` pools + 7 hashCell-placed sage reed tufts.
Census auto-counts (enumerates `T`).
**Census:** VERDICT PASS, 0 page errors. **MARSH +57 / tileKinds +5**; drew mostly
from SHOREPARK. Interesting coupling: iter1's riparian FOREST already claimed most
wild banks, so at the first threshold (0.4) marsh was sparse (12) — raised to 0.7 for
a real estuary fringe (57) WITHOUT letting marsh eat forest (kept land hosts only, a
flood-debug that briefly added FOREST/EMPTY hosts was reverted).
**Visual:** flood-debug confirmed the reed+pool sprite; natural density shows marsh
fringing the river mouth/banks, distinct from meadow/forest. On-grid, no z-tears.
**Verdict:** SHIP. Redeploy to the artifact URL still PENDING.

## Iteration 11 — waterfront aquarium (2026-07-07) [2nd lap]

**Vector:** New business/service (2nd) — sited seaside for contrast with iter3's
inland university. (Considered a 2nd monorail line for "connections" but the monorail
is a single global monoPath/monoSet/trains — generalizing it is a sweeping refactor,
so pivoted.)
**Change:** New civic kind `aquarium` (2016+, one per city). Deterministic hashCell
scan for a developable cell adjacent to BEACH/SHOREPARK/WATER,
`hashCell(x,y,seedNum^0x0AC1)<0.85`, break-on-first (no rng). Draw case: teal tank
band + teal glass dome + lit-glass center + a coral spark — distinct from the
gold-domed/pediment/cross civics.
**Census:** VERDICT PASS, 0 page errors. **civicKinds +2** (aquarium in 2 of 3 seeds;
the 3rd seed's waterfront had no eligible developable cell — procedural variance,
fine). CIVIC +1 net; pop flat.
**Visual:** seed 42@2035, aquariums flood-debugged along the coast then restored to
one-per-city — low white halls with teal domes on the sand/greenbelt edge, distinct,
on-grid, no z-tears. (Restore needed `/bin/cp` — the `cp -i` alias gotcha.)
**Verdict:** SHIP. Redeploy to the artifact URL still PENDING. Civic kinds now include:
hall, school, library, police, firehouse, museum, hospital, observatory, parliament,
university, aquarium.

## Iteration 12 — dolphin pods (2026-07-07) [2nd lap]

**Vector:** More life (2nd) — marine wildlife, distinct from iter6's shore surfers.
**Change:** New `dolphins` entity — 3 pods rolling through the open sea (`x =
shoreAt(y)+4..6`, deep water; `pxc` projection). `drawDolphin`: arched `waterDk`
back + dorsal fin + foam splash, gated on a `sin(waveT)` surface/dive cycle (`arc<
0.05` → underwater, skip). Spawned in `genWorld` with `Math.random()` (no rng
perturbation); wired to render bucket, `frame()` step, `__census().life.dolphins`.
Caught+fixed a spawn bug pre-flight: `off:6+rand*4` pushed dolphins off the east
edge (sea is only ~6 cols wide) → `4+rand*2.2`.
**Census:** VERDICT PASS, 0 page errors. Surgical (Math.random, no terrain) — every
tracked metric flat; growth in `life.dolphins 0→3`.
**Visual:** seed 42@2035 coastal slice (t=0.55) — a dolphin surfacing mid-water,
arched back + fin, distinct from sailboats/buoys; others mid-dive. No z-tears.
**Verdict:** SHIP. Redeploy to the artifact URL still PENDING.

## Iteration 13 — tree-lined boulevards (2026-07-07) [2nd lap]

**Vector:** More CA rules / more nature — chose an INLAND/urban change for contrast
after 4 straight coastal iterations; "pocket parks" was rejected as a duplicate of
the existing park-zoning CA.
**Change:** New `c.treed` road flag + a canopy-contagion CA (2000+): a busy avenue
adopts a tree canopy the more of its busy-road neighbors already have —
`p=min(0.16,0.002+0.05*treedNeighbors)`, time-salted `hashCell(...^(year*29))` (no
rng). Draw: treed roads get a double-row allée (`tree()` both sides), and the old
sparse static street tree is suppressed on treed cells to avoid doubling. New
`boulevardTrees` metric in census hook + harness.
**Census:** VERDICT PASS, 0 page errors. **Fully surgical** — pop/everything exactly
flat (road-only flag + time-salt = zero perturbation). **boulevardTrees 0→196**
(busy avenues, eras ≥2000).
**Visual:** seed 42@2035 downtown; flood-debug (all roads) then reverted confirmed
the allée renders both sides with no building overlap/z-tears. Natural density is a
soft greening of the main avenues.
**Verdict:** SHIP. Redeploy to the artifact URL still PENDING.

## Iteration 14 — denser downtown core (2026-07-07) [2nd lap]

**Vector:** Bigger (2nd — a different dimension than iter8's taller skyline: more
buildings, not just taller).
**Change:** Raised two upgrade rates in the `tick()` upgrades pass — RES→MID
`0.09→0.12`, COM→TOWER `(0.10+0.16*back)→(0.14+0.20*back)`. Left the `inland`/`back`/
`seaside` factors untouched so towers still cluster inland and the coast stays
low-rise. (rng-gated, so it reshuffles — that's fine per the gate.)
**Census:** VERDICT PASS, 0 page errors. **pop +4054 (+5.3%, UP — collapse only
triggers on a >5% DROP), towers +7 (128→135), tallTowers +8, towerHt +792**;
developed flat. A real densification.
**Visual:** seed 42@2035 wide — richer high-rise core with mixed heights + green
interspersed (not a wall of towers); coast stays low-rise; no z-tears.
**Verdict:** SHIP. Redeploy to the artifact URL still PENDING.

## Iteration 15 — arterial avenue network (2026-07-07) [2nd lap]

**Vector:** More connections (2nd monorail line rejected AGAIN — 12 woven
touch-points = a refactor, not "small and shippable").
**Change:** Broadened the avenue (`c.busy`) criterion at L711 from `≥4` to `≥3`
developed neighbors, so the gold arterial network extends through moderately-dense
areas into a connected grid (also feeds iter13's boulevard canopy). New `avenues`
metric in census hook + harness. (First tried a "link two avenues" connectivity
clause — nearly a no-op, +2 — so switched to the threshold.)
**Census:** VERDICT PASS, 0 page errors. Surgical (a flag, no rng/terrain): pop
exactly flat. **avenues 341→1107 (3.2×), boulevardTrees 191→712** (canopy follows
avenues).
**Visual:** seed 42@2035 downtown — more roads carry the continuous gold arterial
marking + tree allées, threading a connected through-grid; narrower connectors keep
dashed white so the hierarchy holds (not every road gold). No z-tears.
**Verdict:** SHIP. Redeploy to the artifact URL still PENDING.

---
### 2nd lap complete (iters 9-15): transport(ferry) · variety(marsh) ·
### business(aquarium) · life(dolphins) · CA+nature(boulevards) · bigger(denser core)
### · connections(avenues). 15 iterations total, all source-only (redeploy pending).

## Iteration 16 — lighthouse (2026-07-07) [3rd lap]

**Vector:** More variety (new tile) + a coastal landmark + night life.
**Change:** New tile `T.LIGHTHOUSE` (=25), one per city, placed once by a
deterministic scan for the seawardmost water-adjacent BEACH cell (`score = x*10 +
hashCell*6`, no rng). Draw case: slender white tower with coral bands, gallery,
glass lantern, cap — plus a `time`-swept warm beam + lantern glow at night
(`LITAMT>0.12`). `valueSrc` 0.74.
**Census:** VERDICT PASS, 0 page errors. Surgical (hashCell placement): pop flat.
**LIGHTHOUSE +9 / tileKinds +9** (one per city, all 9 matrix cells), BEACH −9.
**Visual:** seed 42@2035 day — striped tower on a NE seaward headland, distinct on
the sand; night (t=0.92) — lantern glows with a beam sweeping the moonlit water. No
z-tears.
**Verdict:** SHIP. Redeploy to the artifact URL still PENDING. Tile types now = 26.

## Iteration 17 — herons in the marsh (2026-07-07) [3rd lap]

**Vector:** More life — wildlife that rewards the iter10 estuary (river now has
forested banks + bridges + marsh + herons).
**Change:** New `herons` entity — white/grey wading birds (legs + ellipse body +
S-neck + gold beak, `px` projection). Spawned in `syncFleet` on MARSH cells with
`Math.random()` (no rng perturbation), count `min(6, marshCells)` so it follows how
much marsh formed. Wired to render bucket + `__census().life.herons`. No frame step
(they stand and bob).
**Census:** VERDICT PASS, 0 page errors. Surgical — every tracked metric flat.
Growth in `life.herons` (seed42@2035: marsh 12 → 6 herons; seed7 has no marsh → 0
herons, correctly).
**Visual:** seed 42@2035 estuary zoom — white herons standing on the marsh edge by
the river, distinct from land peds. On-grid, no z-tears.
**Verdict:** SHIP. Redeploy to the artifact URL still PENDING.

## Iteration 18 — open-air amphitheater (2026-07-07) [3rd lap]

**Vector:** New business/service (last done iter11) — a cultural venue.
**Change:** New civic kind `amphitheater` (2004+, one per city), sited by a
deterministic hashCell scan near PARK/PLAZA (no rng). Low `th=6` stage house; draw
case adds a fan of 4 concentric `ellipse(...,0,PI)` seating tiers + a teal stage
apron in front — distinct from the domed/pediment/cross civics.
**Census:** VERDICT PASS, 0 page errors. **civicKinds +6 / CIVIC +6** (amphitheater
in ~6 of 9 matrix cells, eras ≥2004); pop flat.
**Visual:** seed 42@2035 park zoom (flood-debugged then restored to one-per-city) —
low white stage house with a curved tiered seating fan by the parks; distinct,
on-grid, no z-tears.
**Verdict:** SHIP. Redeploy to the artifact URL still PENDING. Civic kinds now 12.

## Iteration 19 — hot-air balloon festival (2026-07-07) [3rd lap]

**Vector:** More life — expanded the 2 lone balloons (1998+) into a fleet of 7.
**Change:** Kept the existing 2 rng-spawned balloons untouched (no perturbation);
ADDED 5 festival balloons via `Math.random()` with varied color pairs + a new `sc`
size field. `drawBalloon` now scales all radii by `b.sc||1` (existing balloons
default to 1).
**Census:** VERDICT PASS, 0 page errors. Surgical (Math.random, additive): every
tracked metric flat; `life.balloons 2→7`.
**Visual:** balloons spawn off-screen-left and drift across over MINUTES of real
time, and `__warp` doesn't run the frame loop — so warp screenshots never catch them
(true of the original 2 as well). Confirmed via a debug spawn (`x=4+i*5.5`, reverted):
a fleet of varied-color/size balloons with baskets floats over the city. No z-tears.
**Note:** logged as a screenshot-gate limitation — entities that drift in over
real-time can't be caught in a ~1s warp shot; reposition via a temporary debug spawn.
**Verdict:** SHIP. Redeploy to the artifact URL still PENDING.

## Iteration 20 — kelp beds (2026-07-07) [3rd lap]

**Vector:** More nature (new marine tile) — depth to the coastal ecosystem.
**Change:** New tile `T.KELP` (=26). A `tick()` pass turns shallow marine WATER
(adjacent to BEACH, not river) into kelp beds, `hashCell(x,y,seedNum^0x4E1F)<0.5`
(no rng). Draw: darker `waterDk` shallows + 4 `quadraticCurveTo` kelp strands that
sway with `waveT`, tipped with `canopyLt` fronds. `valueSrc` 0.74. Boats/surfers
path by `shoreAt` (not cell type) so they're unaffected.
**Census:** VERDICT PASS, 0 page errors. Surgical (hashCell): pop flat. **KELP +204
/ tileKinds +9**, WATER −204.
**Visual:** seed 42@2035 coastal slice — a band of shaded shallows with swaying green
fronds hugging the beach, distinct from open water; nice depth gradation. No z-tears.
**Verdict:** SHIP. Redeploy pending. Tile types now 27.

## Iteration 21 — cargo trucks (2026-07-07) [3rd lap]

**Vector:** New transport — delivery trucks on the streets (mirrors the iter2 tram
pattern).
**Change:** New `trucks` entity, spawned in `syncFleet` with `Math.random()` (count
`min(7, roads/70)`, no rng perturbation), reusing `stepVehicle`. New `drawVehicle`
`truck` branch: longer body + a tall white cargo container (`prismS` 4.4→9) with a
colored livery stripe — reads distinctly taller/boxier than cars. Wired to render
bucket, `frame()` step, `__census().transport.trucks`.
**Census:** VERDICT PASS, 0 page errors. Surgical: **transportModes +9** (trucks in
all 9 cells), everything else flat.
**Visual:** seed 42@2035 downtown, trucks flood-debugged then reverted — white box
trucks on the roads, taller than cars, correct occlusion, no z-tears.
**Verdict:** SHIP. Redeploy pending. Transport modes now 8: cars, bikes, trams,
trucks, boats, ferries, shuttles, monorail.

## Iteration 22 — waterfront esplanade (2026-07-07) [3rd lap]

**Vector:** More connections — a coastal pedestrian spine (no monorail refactor).
**Change:** Draw-time boardwalk in the `BEACH` case for cells whose seaward (east)
neighbor is WATER/KELP: a raised `deck` strip along the seaward edge + a `whiteDk`
railing + periodic lamp posts (with an evening glow at `LITAMT>0.2`). Purely derived
from terrain (no flag/CA pass, no rng). New `promenade` census metric (count of
waterfront beach cells) + harness.
**Census:** VERDICT PASS, 0 page errors. Draw-only → pop & everything flat.
**promenade 0→368** (~41 waterfront cells/city — a continuous esplanade).
**Visual:** seed 42@2035 coastal slice — a boardwalk with railings traces the whole
coast between sand and kelp; the waterfront now layers beach→boardwalk→kelp→sea.
On-grid, no z-tears.
**Verdict:** SHIP. Redeploy pending.

## Iteration 23 — green-roof diffusion (2026-07-07) [3rd lap]

**Vector:** More CA rules — the sage-roof counterpart to iter7's solar contagion.
**Change:** New `c.groof` flag + a diffusion pass (2015+): MID/COM adopt a green roof
by neighbor imitation, `p=min(0.05,0.0004+0.01*groofNeighbors)`, time-salted
`hashCell(...^(year*31))` (no rng). Gated `!c.solar` so a roof goes green OR solar,
not both. Draw: a raised `sage` roof-garden deck on MID/COM when `c.groof`. New
`greenRoofs` census metric + harness.
**Census:** VERDICT PASS, 0 page errors. Surgical — pop & solarRoofs unchanged (the
`!solar` gate + separate time-salt = no theft, no perturbation). **greenRoofs 0→241**
(~80/city by 2035).
**Visual:** seed 42@2035 downtown — sage green roofs intermixed with navy solar,
clustered per the diffusion; varied solarpunk rooftops. No z-tears.
**Verdict:** SHIP. Redeploy pending.

## Iteration 24 — bigger map: G 44→48 (2026-07-07) [3rd lap]

**Vector:** Bigger — the one unexplored dimension (iters 8/14 did taller/denser).
The `const G` map size, deferred twice as "sweeping". Took it on as a dedicated,
backed-up iteration (`solvista.preG` saved for revert).
**Change:** `G=44→48` (+19% area). The render auto-fits (`resize()` derives wW/wH
from G), so tiles just render ~8% smaller and the map still fills the screen.
Scaled the development `budget` `26+(y)*13 → 31+(y)*15` (~1.2×) so the city fills the
bigger map. Everything else is G-relative (SHOREX, shoreAt, monorail survey, back/
inland clamps) and needed no change.
**Census:** VERDICT PASS, 0 page errors. **pop 80434→103568 (+29%), roads +645,
developed +776** — a genuinely bigger city (core metrics UP, so no collapse).
**Visual:** seeds 42 & 7 @2035 wide — both render coherently: coastline, winding
river, monorail ring, tower clusters, farms, kelp/esplanade coast all intact; map
auto-fits, no clipping/z-tears; coast stays low-rise. The G change is robust.
**Verdict:** SHIP. Redeploy pending. (Project memory's "G=44" is now stale in source.)

---
### 3rd lap complete (iters 16-24): variety(lighthouse) · life(herons) ·
### business(amphitheater) · life(balloons) · nature(kelp) · transport(trucks) ·
### connections(esplanade) · CA(green roofs) · bigger(G 44→48). 24 iterations total.

## Iteration 25 — kayakers on the river (2026-07-07) [4th lap]

**Vector:** More life — the river corridor had no life ON the water (banks forested,
bridged, marsh+herons, but the channel itself empty).
**Change:** New `kayaks` entity — paddlers on river-water cells (`WATER&&riv`).
Spawned in `syncFleet` with `Math.random()` (count `min(5, riverCells/6)`, no rng
perturbation), mirroring the heron pattern. `drawKayak`: colored ellipse hull + ink
paddler + a paddle stroke, `pxc` projection with wave bob. Wired to bucket +
`__census().life.kayaks`.
**Census:** VERDICT PASS, 0 page errors. Surgical — every tracked metric flat;
`life.kayaks` (seed42: 5 on its river; seeds with no river → 0).
**Visual:** seed 42@2035 river zoom — a kayak with paddler on the channel, distinct
from sailed boats; the river corridor is now complete (banks→bridges→marsh→herons→
kayakers). On-grid, no z-tears.
**Verdict:** SHIP. Redeploy pending.

## Iteration 26 — orchards (2026-07-07) [4th lap]

**Vector:** More variety (new tile) — fruit groves, distinct from vineyards (vines)
and farms (row crops).
**Change:** New tile `T.ORCHARD` (=27). A `tick()` pass (1985+) turns well-watered
farms near greenery (FOREST/MEADOW/PARK/river, no adjacent development) into orchards,
`hashCell(x,y,seedNum^0x03C4)<0.28` (no rng; caught+fixed an invalid `0x0RC4` salt
pre-flight). `valueSrc` 0.56. Draw: grassy floor + a 3×3 grid of round `canopy`/
`canopyLt` fruit trees with coral/gold fruit specks. Census auto-counts.
**Census:** VERDICT PASS, 0 page errors. **ORCHARD +37 / tileKinds +7**, FARM −40;
pop +1.3% (minor reshuffle from the FARM terrain change).
**Visual:** seed 42@2035 (flood-debug then reverted) — orchard hexes with grids of
round fruit trees + fruit specks, distinct from crop-row farms and vine vineyards.
On-grid, no z-tears.
**Verdict:** SHIP. Redeploy pending. Tile types now 28.

## Iteration 27 — pelican flock (V-formation) (2026-07-07) [4th lap]

**Vector:** More life — a fresh *behavior* (coordinated formation flight), unlike
the scattered wandering birds.
**Change:** New `flock` group object (module `let flock`): 7 pelicans in a rigid V
that translates over the map at height. Spawned in `genWorld` with `Math.random()`
(off-screen, no rng perturbation); draw derives 7 wing-stroke positions from a leader
+ rank/side offsets (reuses the bird `quadraticCurve` wing at bigger size). `frame()`
moves the group and wraps it. Added `__census().life.flock`.
**Census:** VERDICT PASS, 0 page errors. Surgical — flat; `life.flock` 0→7.
**Visual:** flock drifts in off-screen + flies high (drift-in + altitude → invisible
in warp shots, per the iter19 note). Pinned low+central via debug (reverted): a clean
V of pelican wing-strokes above the cityscape, distinct from loose birds. No z-tears.
**Verdict:** SHIP. Redeploy pending.

## Iteration 28 — monorail stations (2026-07-07) [4th lap]

**Vector:** More connections — enrich the signature monorail (vs the risky second-
line refactor).
**Change:** In `drawMonoAt`, at every 6th path cell adjacent to ≥3 developed cells,
draw a station: a `deck` platform + a thin post + a `teal` canopy under the beam.
Derived from the path/terrain (no rng). New `stations` census metric (same condition
over `monoPath`) + harness.
**Census:** VERDICT PASS, 0 page errors. Draw-only → pop & everything flat.
**stations 0→66** (~8/city, eras where the monorail is built).
**Visual:** seed 42@2035 monorail zoom; stations flood-debugged (every 3rd cell) then
reverted — deck platforms + teal canopies under the beam at busy stops. Subtle but
present, on-grid, no z-tears.
**Verdict:** SHIP. Redeploy pending.

## Iteration 29 — redwood groves (2026-07-07) [4th lap]

**Vector:** More nature (new tile) — old-growth, distinct from the round-canopy FOREST.
**Change:** New tile `T.REDWOOD` (=28). A `tick()` pass matures deep undisturbed woods
(FOREST with ≥9 forest/redwood neighbors in r2 and no road/dev in r2) into redwoods,
`hashCell(x,y,seedNum^0x2ED0)<0.5` (no rng). `valueSrc` 0.6 (like forest). Draw: tall
stacked-cone conifers with reddish `brickDk` trunks — spires vs FOREST's round blobs.
**Census:** VERDICT PASS, 0 page errors. **REDWOOD +156 / tileKinds +11**, FOREST
−189; pop +5.1% (UP — chaotic reshuffle from removing 189 deep-forest cells that other
forest passes test; not a collapse).
**Visual:** seed 42@2035 west-forest zoom (flood-debug then reverted) — dense grove of
tall pointed conifers with reddish trunks, unmistakably distinct from round forest.
On-grid, no z-tears.
**Verdict:** SHIP. Redeploy pending. Tile types now 29.

## Iteration 30 — park cafés (2026-07-07) [4th lap]

**Vector:** New business/service — street-level commerce (café/kiosk terraces).
**Change:** Draw-time café (2 umbrella+table clusters) on PARK cells adjacent to
COM/MARKET/CIVIC — "a park café spills out near the shops." Derived from terrain (no
rng). New `cafes` census metric.
**Bumps (both caught & fixed):** (1) my first PLAZA edit dropped a `}` → page error
"Unexpected token 'case'"; fixed the brace. (2) plazas barely exist in the matured
city (PLAZA=0 — the plaza CA rarely fires), so café-on-plaza gave `cafes 0`; pivoted
the host to PARK (plentiful, ~99/city) fronting commerce.
**Census:** VERDICT PASS, 0 page errors. Draw-only → pop flat. **cafes 0→316**
(~35/city).
**Visual:** seed 42@2035 downtown-park zoom — small coral/teal umbrella tables in
parks near shops, distinct from the parks' ponds/fountains. Subtle, on-grid, no
z-tears.
**Verdict:** SHIP. Redeploy pending.
### Lesson: verify a new feature's HOST tile actually exists at scale (query the
### census tile histogram) before wiring a draw to it — plazas were ~0.

## Iteration 31 — cable car / aerial gondola (2026-07-07) [4th lap]

**Vector:** New transport — the last genuinely-fresh TYPE (aerial), deferred ~5×.
Finally tractable after iter28's stations taught the monorail's per-cell aerial draw.
**Change:** A scenic aerial tram, built with the monorail pattern: `gondPath` (a
straight SE-diagonal of ~13 cells over the coast) + `gondSet` + `gond.cabins`.
`planGondola` routes it in `genWorld` over the LOW-RISE COAST (the seaside invariant
guarantees no towers there → the cable at `GONDH=26` clears everything, no clipping).
`drawGondAt` draws pylons (every 3rd cell) + a thin cable per cell (correct z-order,
like `drawMonoAt`); cabins glide ping-pong via `gondPos` and hang from the cable
(`bucketAdd` at height). Wired render + `frame` step + `__census().transport.gondola`.
**Census:** VERDICT PASS, 0 page errors. **transportModes +9** (gondola in all 9
cells), everything else flat.
**Visual:** seed 42@2035 coastal zoom — dark cable on white pylons descending from the
coastal neighborhood to the beach, coral cabin hanging; over low-rise coast, correct
z-order, no clipping/z-tears.
**Verdict:** SHIP. Redeploy pending. Transit modes now 9: cars, bikes, trams, trucks,
boats, ferries, shuttles, monorail, gondola (the only aerial one).

## Iteration 32 — rooftop helipads (2026-07-07) [4th lap]

**Vector:** More CA rules → pivoted to a draw-only detail (see below).
**Abandoned attempt — solar-farm expansion (reverted):** a time-salted contagion
spreading SOLARF across dry inland land. It PASSED (SOLARF +20/+30) but: (a) the dense
G=48 city has little "dry inland far from town" land, so arrays were sparse/hard to
see, and (b) it cost **pop −4%** — and crucially, dialing the rates DOWN didn't reduce
the wobble, because *any* terrain-altering pass at 2014 cascades chaotically over 20
years of development regardless of cell count. A 4% pop drop for a barely-visible
feature is a poor trade vs the loop's "grow without breaking" spirit → **reverted**.
**Shipped instead — helipads:** draw-only in the TOWER case — the tallest towers
(`h>90`) get a white helipad circle + ink "H" + red night corner-lights. No terrain,
no rng → **zero perturbation**, and visible in normal warp shots (no drift-in). New
`helipads` census metric.
**Census:** VERDICT PASS, 0 page errors. Surgical — pop flat (+3). **helipads 0→63**
(~7/city on the tallest towers).
**Visual:** seed 7@2035 downtown-tower zoom — crisp "H" helipads on the tallest
towers, distinct from garden/solar/mast roofs. On-grid, no z-tears.
**Verdict:** SHIP. Redeploy pending.
### Lesson: prefer DRAW-ONLY / Math.random features when you want zero pop wobble; a
### terrain-altering CA pass at an early year cascades chaotically no matter how small.

## Iteration 33 — whales in the bay (2026-07-07) [4th lap]

**Vector:** More life — marine megafauna, a special sighting distinct from the
everyday dolphins.
**Change:** New `whales` entity (2) cruising the deep bay. Mirrors dolphins (`pxc`,
`Math.random` spawn → zero perturbation) but bigger and slower: `drawWhale` = a large
`ink` back ellipse + a `waterDk` tail fluke + a foam wake, on a slow `sin(waveT*0.7)`
surface/dive cycle, with a white **spout** (blow) at the peak (`arc>0.72`). Wired to
render bucket, `frame()` drift, `__census().life.whales`.
**Census:** VERDICT PASS, 0 page errors. Surgical — flat; `life.whales 0→2`.
**Visual:** seed 42@2035 deep-water — whale backs surfacing (distinct from small
dolphin arcs); force-surfaced debug (reverted) confirmed the big dark back + white
spout + wake reads unmistakably as a whale. On-grid, no z-tears.
**Verdict:** SHIP. Redeploy pending.

## User request — generative monorail route (2026-07-07)

**Vector:** (user-directed, outside the loop) The 1988 ring route was deterministic
given the city — fixed ±2 sawtooth sides flipping at the band edge, joints on a
mechanical ~4-8 row rhythm; user asked for road-like generative legs with joints
further apart.
**Change:** `planMonorail` rewritten: private LCG seeded `seedNum^0xC17A` (shared
`rng()` stream untouched — zero city perturbation), sides now run long random legs
(9-16 rows between family flips, band widened to ±3), top edge takes one optional
street-style jog (2-4 rows, 60%, kept ≥x0+4 / ≤x1-4 so it can't touch the side
bands). Ring stays a closed hex-adjacent loop; trains/stations/pylons untouched.
**Census:** VERDICT PASS, 0 page errors. roads/developed exactly flat; `stations
72→75` (real + stable: new routes pass 3 more busy stops); pop ±few = frame noise.
**Visual:** seeds 7/42/1234 @2000 — each ring now a distinct irregular loop with
long straight diagonal sweeps; jog visible on 7/42. No gaps, no self-crossing.
**Verdict:** SHIP. Redeploy pending.

## User feedback polish (2026-07-08) — NOT a growth iteration

Direct feedback from the user (following the HTML live). Three fixes:
1. **Smooth ocean motion.** Water craft (boats/ferries/dolphins/whales/surfers) looked
   jumpy vs cars: their x came from `shoreAt(y)` whose `Math.round` (and a `|0` on
   boats) snapped x column-to-column as they drifted. Added `shoreAtF(y)` (unrounded)
   and switched all water-entity draws/buckets/steps to it. Terrain coastline still
   uses the rounded `shoreAt`. Kayaks unaffected (fixed river cell + bob).
2. **Hover tooltip.** New `#tip` card (CSS matches the placard) + a `mousemove` picker
   on the canvas (reuses the click hex-pick) → `describeTile(c)` shows the tile's name,
   a one-line description, and data (floors/value/district/solar/green-roof/helipad).
   ⚠️ INVARIANT: keep `TILELABEL` / `CIVICLABEL` / `TILEDESC` in sync when adding new
   tiles/civic kinds (same as the census-hook rule).
3. **Cleaner coast.** Kelp (iter20) lined the WHOLE coast as a dark band — user wanted
   clean sandy stretches. Re-gated it with a coarse band gate (`hashCell(5,y>>2)<0.34`)
   × a per-cell gate (`<0.62`) so kelp forms only occasional beds with clean light
   sand+water between. KELP 228→78 across the matrix.
Census PASS, 0 page errors, pop/roads flat. (Answer to "what's along the coast?":
kelp = seaweed in the shallows; marsh = reeds at the river mouth.)

## User request — determinism audit: everything generative (2026-07-08)

**Vector:** (user-directed, outside the loop) Follow-up to the generative monorail:
audit for any structure whose SHAPE is identical every seed. Found three: the gondola
(always a straight 13-cell SE diagonal at SHOREX-4 / pier.y-7), the coast highway
(fixed ±band bounce = bends on a ~6-8 row metronome), and monorail stations (i%6
index rhythm). CA layers + world gen were already generative (hashCell salts / rng).
**Change:** (1) `planGondola` — private LCG (`seedNum^0x60D0`): length 10-15, random
heading, jittered anchor, 50% one angle-station bend, banded to the coastal strip
[SHOREX-6, SHOREX+4]. (2) coast highway walk — private LCG (`seedNum^0xC0A5`) adds
random bend cadence (5-11 rows) on top of the band clamp; the two existing rng()
draws kept so the shared stream stays aligned (terrain still shifts ±1 col on some
rows → expected chaotic reshuffle). (3) `buildMonoSet` now derives `monoStops`, a
hash-spaced (4-8, `seedNum^0x57A7`) candidate-stop set replacing i%6 in both
`drawMonoAt` and the census counter — same avg spacing, no metronome.
**Census:** VERDICT PASS, 0 page errors. Full-matrix reshuffle from (2) as predicted
(pop/roads/developed flat-to-up); `stations 75→61` — spacing avg unchanged, drop is
the reshuffle moving busy cells; keep an eye on it.
**Visual:** coastal close-ups seeds 7/42/99/1234 @2000 — four distinct gondolas (42
shows the bend), irregular highway bends, rings all different. No detached cables,
no z-tears.
**Verdict:** SHIP. Redeploy pending.

## Iteration 34 — shoreline joggers (2026-07-08) [5th lap]

**Vector:** People & activity × Deepen — the only never-targeted domain; the iter22
esplanade was pure infrastructure with nobody moving along it. (First plan — beach
towels/parasols/bonfires — turned out to ALREADY exist in the BEACH draw case; read
the target code before building. Plain boardwalk strollers would also duplicate:
peds already wander BEACH cells. Pivoted to directed runners.)
**Change:** New `joggers` entity — runners who run the shoreline lengthwise (unlike
the aimless wandering peds): `x = shoreAtF(y)+off` (off ≈ −0.6, on the sand by the
boardwalk; smooth-coast invariant respected), y advances and bounces at the map
edges like ferries. Spawned in `syncFleet` with `Math.random()` (count
`min(7, 2+pop/9000)` — first cut 1–2/city was invisible along a 48-row coast, tuned
up). `drawJogger`: bright torso + head + two scissoring ink legs animated by
`sin(waveT*7+ph)` with a stride bob; thins out late at night like peds. Wired to
render bucket, `frame()` step, `__census().life.joggers` (hook kept in sync; no new
bespoke census metric — life counts suffice).
**Census:** VERDICT PASS, 0 page errors. Fully surgical (Math.random, no terrain):
every tracked metric flat (pop −3 = frame noise). `life.joggers` 2–5 per city,
scaling with pop.
**Visual:** seed 42@2035 coastal clip, flood-debug (30 joggers) then reverted —
runners strung along the sand at the water's edge, scissoring legs read as running
at close zoom, distinct from standing peds, correct occlusion at the lighthouse.
**Holistic check (due at iter 34):** un-zoomed whole-frame shots at seeds 42 & 7 —
coast stays clean sand with occasional kelp beds (the user's kelp fix is holding),
irregular monorail rings, no cumulative clutter/darkness anywhere. Balanced.
**Verdict:** SHIP. Redeploy pending.

## Harness upgrade (2026-07-08) — NOT a growth iteration

User-requested (Fable review of the skill): (1) read-the-target-seam-first rule
(the ledger ≠ the artifact's inventory); (2) `?flood=name:n` + `?step=secs` URL
debug hooks in `solvista.html` (FLOOD/`fl()` spawn overrides for Math.random
entities; `advanceEntities()` factored out of `frame()` so `__step` advances
drift-ins/animation without real time — retires the iter-19 warp-shot
limitation); (3) perf gate (`polish-tile/perf.mjs`) joins the every-5-iterations
holistic check (ran: PASS, day 24.6ms ~flat / night +9%, within TOL);
(4) census.mjs prints life/transport entity diffs; (5) this State-of-the-city
header + end-of-session redeploy-ask rule; (6) `coast`/`downtown` clip framings
in `shoot.config.json` (`--shots coast`); (7) `census-history.jsonl` — one
append-only summary line per census run. Census PASS after all changes; hooks
verified visually (flooded joggers + step-drifted balloon on screen).

## Iteration 35 — rainbows after rain (2026-07-08) [5th lap]

**Vector:** Sky & atmosphere × Deepen — the header flagged weather as untouched;
rather than a new sky object, made two existing systems *relate*: rain clouds ×
daylight ⇒ rainbows.
**Change:** In the cloud render pass, a raining cloud in full daylight
(`LITAMT<0.15`) occasionally trails a rainbow: 5 translucent spectral arcs
(alpha ≤0.38) centered behind the shower, fading in/out on a slow per-cloud
oscillation `sin(time*0.12 + cl.y*1.7) > 0.5` (~30% of daytime, minutes-long
spells). Draw-only — no terrain, no rng(), no new tile — drawn between the
cloud's ground-shade and its puff so the bow sits behind the cloud. Tuned after
the first shot: feet lowered (`by=py2+118`, `r≈100·s` capped 108) so the skyline
occludes the arc ends instead of them cutting off mid-sky.
**Census:** VERDICT PASS ×2, 0 page errors, every metric flat (draw-only; no new
census metric per the sprawl rule). NOTE: mid-iteration the `promenade` metric
read 399→153 — investigated per the determinism gate before logging: NOT this
change and NOT nondeterminism; a **concurrent polish-tile session** shipped a
smooth banded esplanade (espRow/espAt/drawEspAt) into the same file between my
baseline runs and rewrote the promenade counter to count deck rows. My baseline
(saved after their change landed) is clean; one of my Edits raced their write
and was retried. Logged as a hazard in the header.
**Visual:** seed 42@2035 day — a soft 5-band rainbow arcs over the skyline, foot
descending behind the raining cloud, ends occluded by towers; verified OFF in
the oscillation gap (step=21/34 shots) and OFF at night (t=0.8: same cloud
rains, no bow, lighthouse/night lights normal). The `?step=` hook (added this
session) made the fade windows reproducible — first use in anger, after a false
sighting where a butterfly's gold arc was mistaken for the rainbow in a wide
shot; the probe-then-clip workflow (evaluate cloud positions → computed screen
coords → exact clip) is the reliable way to verify sky features.
**Verdict:** SHIP. Redeploy pending (with iter 34 + hooks + the other session's
esplanade).

## Iteration 36 — civic forecourt plazas (2026-07-08) [5th lap]

**Vector:** Civic & culture × New CA rule serving Deepen — the header flagged
"civics never interconnected"; also fixes a known dead letter: PLAZA had been 0
in every census since iter 0 (noted iter 30), so polish-tile's redesigned plaza
art never appeared in a real city.
**Change:** New `tick()` pass (2020+): a major institution (hall / museum /
parliament / university / library) without a square in r2 converts one adjacent
road-fronting RES/EMPTY cell into PLAZA, `hashCell(nx,ny,seedNum^0xF04C)<0.9`
(no rng()). The old random-sample plaza rule (~never fires) is kept untouched so
its rng() draws keep the stream aligned. First tries FAILED the gate and were
tuned, not abandoned: at 1996 the pass suppressed the RES→MID→COM→TOWER chain —
pop −5.3% COLLAPSE, towers −13% for +9 plazas; at 2020/thr 0.55 only +3 plazas.
Final: 2020 + thr 0.9 → pop −0.7%, towers −4, **PLAZA 0→5** (~1-2 per mature
city — town-square scale; candidacy, not the gate, is the constraint by 2020).
**Census:** VERDICT PASS, 0 page errors. Tile histogram: **PLAZA 0→+5** (the
intended move); rest is chaotic reshuffle from a terrain pass (expected).
Amphitheater-concert idea was abandoned pre-code: the seam-read showed
polish-tile's redesign already ships audience + night stage wash (2nd time the
read-the-seam rule caught a duplicate).
**Visual:** __find('PLAZA') → exact clips at seeds 42 & 7 @2035 — paved cream
squares with the golden statue + fountain rings, small trees, peds strolling
(plazas are already in the ped `openCells`/`strollable` sets, so the forecourts
get crowds for free), each at the door of its civic. On-grid, no z-tears.
**Verdict:** SHIP. Redeploy pending.

## Iteration 37 — deer at the forest edge (2026-07-08) [5th lap]

**Vector:** Nature × Deepen — Nature's Deepen cell was empty; fauna rewards the
woods the way herons rewarded the marsh (iter 17).
**Change:** New `deer` entity, mirroring the heron pattern: spawned in
`syncFleet` on quiet edge cells (MEADOW/EMPTY with a FOREST/REDWOOD neighbor and
no road/dev neighbor), `Math.random()` placement, count `min(6, edge/10)` so the
herd follows how much wild fringe survives urbanization. `drawDeer`: tan body,
4 legs, neck + head that dips to graze on a slow `waveT` cycle, white tail
flash; 30% fawns (smaller), 50% antlered bucks. Wired: declaration/reset,
render bucket, `__census().life.deer`, `fl()`-flood support.
**Census:** VERDICT PASS, 0 page errors. Fully surgical — everything flat;
**life.deer 0→45** (~5/city).
**Visual:** `?flood=deer:30` (URL hook — nothing to revert) + a probe for screen
coords → west-forest clip at seed 42@2035: deer pairs at the meadow/forest
boundary, one mid-graze (head down), bucks' antlers legible, fawns smaller.
Wildlife scale matches herons. On-grid, no z-tears.
**Verdict:** SHIP. Redeploy pending.

## Iteration 38 — construction cranes (2026-07-08) [5th lap]

**Vector:** Urban fabric × Deepen — that cell was empty, and the move makes the
simulation's core premise ("watch it grow") *visible*: buildings already animate
height growth at draw time (`drawBuilding` L~1934), but a rising frame looked
identical to a finished one.
**Change:** At the tail of `drawBuilding`, any building still well below its
target (`c.th-c.h>5`) hosts a gold tower crane: mast to h+9, jib + counter-jib
(direction from `hashCell(...^0xC4A9)`), hoist line with a hanging ink load, and
a coral operator cab. Draw-only, no rng(), applies to every building type incl.
civics mid-build.
**Census:** VERDICT PASS, 0 page errors, fully surgical (no metric moves —
construction is a transient draw state, invisible to `__warp`-completed censuses
by design; no bespoke metric added per the sprawl rule).
**Visual:** `?warp` completes all heights (h=th), so a natural shot shows no
cranes — verified instead via an in-page Playwright probe that reset six
downtown mid-rises to `h=th-22` and screenshotted the same page (no source
edit): six cranes over rising frames, jibs/cabs legible, correct occlusion.
Cranes appear naturally whenever the live sim upgrades a parcel (boom eras
especially). Un-zoomed 1982 boom-town shot read coherent (bonus: iter-35
rainbow over the young city).
**Verdict:** SHIP. Redeploy pending.

## Iteration 39 — waiting riders at monorail stations (2026-07-08) [5th lap]

**Vector:** Transport × Deepen — stations (iter 28) were bare platforms; now the
transit system visibly serves people.
**Change:** In `drawMonoAt`'s station block: 1-3 tiny riders (hashCell-placed
and -counted, deterministic per cell; one fewer late at night) stand on the
platform under the canopy, in ped palette colors. Draw-only, no rng().
**Census:** VERDICT PASS, 0 page errors, fully surgical (draw-only).
**Visual:** probe → station screen coords → clip at seed 42@2035: riders stand
on the platform pad at the pylon base, correct height/occlusion, subtle at
diorama scale (matches iter 28's station scale). No z-tears.
**Holistic check (due at 39):** wides at seeds 42 & 1234 — both balanced and
readable; the concurrent session's esplanade curves cleanly along both coasts;
rainbows appear near rain clouds; no clutter/darkness compounding. **BUT the
frame-time gate FAILED**: day mean 24→29.3ms then 33.1ms on the confirming
re-run (+22%/+38%), night ~+13%. Real, not noise. Per the skill rule the next
iteration is a perf-fix.
**Verdict:** SHIP (feature) + FLAG (perf). Redeploy pending.

## Iteration 40 — perf fix (2026-07-08) [5th lap]

**Vector:** Polish (perf-fix, mandated by iter 39's failed frame-time gate —
first time the perf guardrail has fired since joining the holistic check).
**Diagnosis:** CDP CPU profile of the day scene: **61% of JS time in
`ctx.fill()`** — thousands of small path fills; biggest populations are the
per-floor window bands (2 fills each × ~5-8 floors × ~1400 buildings) and,
subtler, `setLight()` doing `CCACHE={}` **every frame** from `render()`, so the
color cache was discarded and rebuilt each frame even with unchanged light.
**Change (both zero-visual-change):** (1) `bandS` now emits both face quads as
subpaths of ONE path with a single `fill()` — halves every band fill in the
city. (2) `setLight` early-returns when lit/tint are unchanged, so `CCACHE`
persists across frames outside dawn/dusk transitions.
**Result:** day mean 33ms → **23ms floor** (−4% vs the 2026-07-07 baseline,
reproduced in two independent runs); night ~30ms (+13%, within the 15% TOL —
night genuinely grew with the glow features; watch it). Numbers on this shared
box swing ±30% with load (load avg 4+, one run hit 35ms on identical code) —
the gate protocol is now min-of-3, noted in SKILL.md.
**Census:** VERDICT PASS, 0 page errors, every metric exactly flat.
**Visual:** downtown clip at seed 42@2035 — window bands / awnings / sign bands
identical to before; no artifacts from the merged path.
**Verdict:** FIXED. Redeploy pending.

## Iteration 41 — evening crowds on the strip (2026-07-08) [6th lap]

**Vector:** People & activity × New element — the domain had only iter 34; its
night side was all lights and no people (drawPed thins crowds after dark, so
streets empty exactly when the neon comes on).
**Change:** In the COM draw case: high-value shopfronts (`v>0.6`) host 2-4 tiny
figures out front after dusk — hashCell-placed/counted (deterministic, no
rng()), PEDC-palette bodies + ink heads at sidewalk level, alpha-ramped in via
`min(1,(LITAMT-0.35)*3)` so they fade in with the evening rather than popping.
Draw-only.
**Census:** VERDICT PASS, 0 page errors, every metric exactly flat.
**Visual:** probe → densest high-value COM cluster → tight night clip (t=0.8,
seed 42): pairs and small groups stand at the lit storefronts under awnings and
neon, muted correctly by the night tint. Day framing shows none (same LITAMT
gate as the neon). No z-tears.
**Verdict:** SHIP. Redeploy pending (iters 34-41 + hooks + polish-tile work).

## Iteration 42 — entity tooltips (2026-07-08) [6th lap]

**Vector:** Interaction/UX — the one kind never loop-driven. The tile tooltip
(U2) names land, but the diorama's most pointed-at things are its inhabitants:
hovering the whale said "Ocean", hovering a deer said "Meadow".
**Change:** Each entity draw now `stamp()`s its screen position + a frame
counter (new tiny helper; stale stamps = currently hidden, so diving dolphins /
night-hidden balloons don't ghost). The `mousemove` picker checks entities
first via `pickEntity` (16 kinds: whale, dolphin, ferry, sailboat, surfer,
kayaker, heron, deer, jogger, balloon, streetcar, truck, cyclist, resident,
dog, + service vehicles by kind — fire engine / ambulance / police), each with
a name + one-line blurb in `ENTINFO`; falls through to the tile tooltip.
New invariant documented in SKILL.md + in-code: new entity ⇒ stamp + ENTINFO row.
**Census:** VERDICT PASS, 0 page errors, all flat (UI-only; stamps are inert
fields).
**Visual/interactive:** Playwright hover tests — ferry → "Harbor ferry", deer →
"Mule deer", tram (sim paused; a moving tram outruns probe latency, not a
hit-test bug) → "Streetcar", forest → "Woods" (tile fallback intact). Tooltip
card renders beside the ferry in the screenshot.
**Verdict:** SHIP. Redeploy pending (iters 34-42 + hooks + polish-tile work).

## Iteration 43 — sea-fog spells (2026-07-08) [6th lap]

**Vector:** Sky & atmosphere × New element — Sky was due in rotation and
weather was its flagged frontier; kind varied (Sky's last two were Deepens).
**Change:** A new fog pass after the dawn marine layer: on foggy spells, 7 soft
white banks roll in off the ocean and thin as they cross the shoreline
(`inland` fade off `SHOREX`), swallowing the beach and the first coastal
blocks. Spell gate is a slow seeded oscillation
`sin(time*0.028+(seedNum%97)*0.7)>0.25` — per-city phase, time-driven, no
rng(), fully procedural like the dawn layer (no entity array, so no
census/ENTINFO wiring is owed). Alpha ≤0.5, dimmed at night.
**Census:** VERDICT PASS, 0 page errors, all flat (draw-only).
**Visual:** first shot at the computed spell peak (`?step=128` for seed 42)
showed NOTHING — probe proved the gate was open (spell 0.75) but the flicker
factor (0.55±0.45) had zeroed the on-screen banks while strong banks sat
off-map south. Tuned: flicker 0.75±0.25, y-wrap tightened to the map, 7 banks.
Reshoot: banks over the open sea, one straddling the lighthouse beach, one
thinning over the first inland blocks — reads as a marine layer rolling in.
Control shot at step=0 (spell negative): clean coast, no fog.
**Lesson:** for oscillating features, verify BOTH the on-window (via __step)
and the off-window; and when "gate open but invisible", suspect the amplitude
envelope before the gate.
**Verdict:** SHIP. Redeploy pending (iters 34-43 + hooks + polish-tile work).

## Iteration 44 — river flow (2026-07-08) [6th lap]

**Vector:** Water & coast × Polish — the domain's most-overdue slot (last loop
touch iter 33) and the only Polish there was user-directed (U2). The river
corridor has banks, bridges, marsh, herons and kayaks, but the water itself sat
static — indistinguishable from a lake.
**Change:** In the WATER draw case, river cells (`c.riv`) now show the current:
each cell picks its downstream water neighbor (east/seaward wins; the open sea
wins ties at the mouth) and slides two faint glint streaks along that axis,
phase from `(time*0.22+hashCell)%1` with a sine alpha envelope (fade in/out at
the ends). Draw-only, no rng(); ~33 river cells/city so cost is negligible.
**Census:** VERDICT PASS, 0 page errors, all flat.
**Visual:** river-centroid clip at seed 42@2035 — glints along the runs,
clearly denser than (and directionally distinct from) the generic horizontal
sea sparkle. Motion verified at the estuary with paired `?step=0`/`?step=1.5`
clips: glints advanced along the channel toward the mouth, diagonal with the
channel where it bends. (First motion-check clip missed the river entirely —
aim clips with a probe, not by eyeballing screen coords off a scaled render.)
**Verdict:** SHIP. Redeploy pending (iters 34-44 + hooks + polish-tile work).

## Iteration 45 — festival streets (2026-07-08) [6th lap + holistic check]

**Holistic step-back (every ~5 iters):** whole-city wide shots at seeds 42/7 —
balanced, bright coast, no compounded clutter; nothing owed a fix. Perf gate
PASS ×3: day floor 23.39ms (−2.5% vs baseline), night floor 24.17ms (−9%).

**Vector:** Civic & culture × Connect — the domain most overdue (last: 36) and
the header's flagged empty cell.
**Change:** New end-of-tick pass: BFS ≤3 road-steps out from every civic; road
cells reached by TWO distinct civics (`c.fete`) are the short street stretch
between a nearby civic pair, and they string up festival bunting — pole pairs
on the sidewalk side, a sagging 5-pennant strand along the block (PB palette),
warm bulb dots after dusk. Pure derivation from civic positions — no rng(), no
hashCell — recomputed each tick as institutions arrive. `__find('fete')` added
for verification (same hook discipline as tiles/civics).
**Census:** VERDICT PASS ×2, 0 page errors; second run EXACTLY flat on all
metrics (first run's pop +3 was harness frame-timing jitter — re-ran to
confirm). Surgical, as a pure-derivation pass should be.
**Visual:** first design strung the bunting ACROSS the street — in this
projection that span is near-vertical on screen, so pennants stacked into an
unreadable totem. Redesigned to string ALONG the street (lamppost-to-lamppost
look): 4x clips at seed 42 (4 fete cells) and seed 7 (6) show sagging pennant
strands tracking the street axis, lit dots at night; whole-frame shot
unchanged elsewhere. **Lesson:** anything spanning a street reads better along
it than across it in this projection — "across" collapses to ~10px vertical.
**Verdict:** SHIP. Redeploy pending (iters 34-45 + hooks + polish-tile work).

## Iteration 46 — field hedgerows (2026-07-08) [6th lap]

**Vector:** Nature × Connect (most-overdue domain + flagged empty cell) —
**pivoted mid-iteration to Nature × Deepen** when the Connect framing proved
geometrically impossible (below).
**Dead end (logged so it isn't re-explored):** the plan was wood-to-wood green
links — scrub lines across short open gaps between woodland patches along a hex
axis. Implemented, saw 0 hedge cells at both test seeds; offline recomputation
from `__find` dumps confirmed the CONDITION never occurs, not a bug: woodland
patches are never within ≤5 axis-steps across open/road ground (0 cells at
seed 42 even fully relaxed; 2 at seed 7). Solvista's woods are compact blobs
separated by development — there is nothing for wood-to-wood links to attach
to. Offline probing via `__find` coordinate dumps beats shipping and squinting.
**Change (the pivot):** field hedgerows — the classic real-world pattern. End-
of-tick pass marks open cells (EMPTY/MEADOW, non-corridor) with a bitmask of
farm-facing edges (FARM/ORCHARD/VINEYARD neighbors, `nbrDirs` order); a new
`hedge()` helper draws 3 canopy-scrub bumps along each marked shared edge.
Continuous field-boundary hedges ringing the farm districts; naturally
"grubbed out" as development presses against the fields late-era (39 cells at
seed 42@1985 → 11 @2005 → 1 @2035; 45 at seed 7@2005). Pure derivation — no
rng(), no terrain change. `__find('hedge')` added.
**Census:** VERDICT PASS ×2, 0 page errors, exactly flat on re-run (single ±1
wobbles on first runs were harness frame-timing jitter, same as iter 45).
**Visual:** 3x clips at seed 7@2005 and seed 42@1985 — continuous scrub lines
hug the farm-block boundaries, English-countryside reading, meadow flowers
coexist; whole-city frames at 1985 (feature-rich) and 2035 (feature-absent,
frame unchanged) both coherent.
**Verdict:** SHIP (as Deepen; Connect cell struck through in the grid).
Redeploy pending (iters 34-46 + hooks + polish-tile work).

## Iteration 47 — skybridges (2026-07-08) [6th lap]

**Vector:** Urban fabric × Connect — most-overdue domain (last: 38), empty kind.
**Change:** In the TOWER draw branch: a tower whose WEST neighbor is also a
tower links to it with an enclosed glass skywalk at mid-height —
`hashCell(x,y,seedNum^0x5B1D)<0.5` gate, height varied by a second salt, both
towers must be built past h 26. E-W pairs only (drawn left→right so the east
tower paints the bridge over both faces; diagonal prisms visually overlap so a
bridge there would be stubby/hidden). Draw-only, no rng(). Scale-checked
first: 7-24 E-W tower pairs at 2035 across seeds → ~3-13 bridges; 13 at
seed 7.
**Census:** VERDICT PASS ×2, 0 page errors, flat (±3 pop = known harness
frame-timing jitter).
**Visual:** first design (dark deck + thin glass line) read as a black dash
stuck to one tower and vanished at night. Redesigned as an enclosed tube:
ink shadow frame + white body + glass window band + 4 warm window dots after
dusk. Tight 3x day/night clips at seed 7 (aimed by replicating the hashCell
gate offline from `__find('TOWER')` dumps — the URL seed IS seedNum, so gates
are replicable outside the page): tube spans the terracotta→teal pair
cleanly, glows at night; downtown + whole-city frames coherent.
**Verdict:** SHIP. Redeploy pending (iters 34-47 + hooks + polish-tile work).

## Iteration 48 — city helicopter (2026-07-08) [6th lap]

**Vector:** Transport × New element — most-overdue domain (last: 39); recent
kinds were Connect/Deepen/Connect so New element varies the kind. Also a
Deepen: rooftop helipads have existed since the tall-tower feature (~73 across
the matrix) but sat inert — now they're destinations.
**Change:** `copters` entity (2012+, needs ≥2 helipad towers, 1-2 per city):
hops pad-to-pad with a smoothstep flight arc (+26px cruise altitude over the
rooftops), dwells ~1/3 of a hop on the pad, then picks a new pad. Math.random
picks only — zero seeded-stream perturbation. Draw in the sky layer: coral
body/tail/fin, white belly, ink skids, time-spun rotor blur, blinking red
beacon after dusk. Full entity wiring: arrays + reset, syncFleet spawn with
`fl('copters',…)` flood support, advanceEntities step (so `&step=` works),
stamp + ENTINFO row, census transport tally. Also added `window.__ents(name)`
— stamped screen coords of live entities, so clips can be AIMED at movers
(the downtown-clip hunt failed before this; the aimed clips hit first try).
**Census:** VERDICT PASS, 0 page errors, core exactly flat. **copters 0→6
NEW** (2 × three 2035 cells), transportModes +3 — surgical, the intended
growth signal.
**Visual/interactive:** aimed 3x clips: day — copter over the "H" pad tower,
rotor bar reading clearly; night — red beacon lit above the glowing towers.
Motion proven by differing stamps at `step=40` vs `47`. Tooltip hover (paused
sim) → "City helicopter / Hopping between the rooftop helipads." Whole-city
frame coherent, copters visible in the sky band.
**Verdict:** SHIP. Redeploy pending (iters 34-48 + hooks + polish-tile work).

## Iteration 49 — block parties (2026-07-08) [6th lap]

**Vector:** People & activity × New CA rule — most-overdue domain (last: 41)
and the header's last flagged empty cell.
**Change:** A new excitable-media pass at the end of `tick()` (the bloom
wave's people-domain sibling, but hashCell-only where bloom uses rng): a RES
home ignites a street party (`c.party=5` ticks), spreads to adjacent resting
RES homes (year-keyed hash <0.5), then the block goes refractory (−16). The
ignition hash is keyed on `(year|0)` so parties roam the city rather than
pinning to fixed cells. Draw: trestle table, 3 swaying neighbors
(PEDC-palette), bobbing paper-lantern dots — front-yard band kept above
`cy+5` so the next row's ground tile can't overpaint it. `party:0` added to
the cell literal; `__find('party')` hook added.
**Tuning:** first cut (ignite 0.002, party 3, rest 10) gave 0-1 partying
homes per city — do the duty-cycle math BEFORE probing: ~230 RES × p ×
duration is the snapshot expectation. Retuned to ignite 0.012 / party 5 /
rest 16 → 6-10 homes in clusters at three matrix cells; zeros at seed 42 are
honest Poisson lulls (parties are events, not fixtures).
**Census:** VERDICT PASS ×2 (pre- and post-tune), 0 page errors, exactly flat.
**Visual:** day + night 3x clips at seed 7@2035, aimed at the densest cluster
via `__find` — six adjacent homes with tables, small crowds and lanterns,
reading as one block's party; correctly muted by the night tint. Whole-city
frame coherent, parties subtle at wide zoom.
**Verdict:** SHIP. Redeploy pending (iters 34-49 + hooks + polish-tile work).

## Iteration 50 — wind (2026-07-08) [7th lap + holistic check]

**Holistic step-back (every ~5 iters):** whole-city frames at seed 1234@2035
(fresh seed) and seed 7@2005 **sunset** (first holistic read of a non-noon
scene) — both balanced, no compounded clutter; the five features since iter 45
left no visual debt. Perf gate PASS ×3 (day floor 23.0ms, night 24.2ms).

**Vector:** Sky & atmosphere × Deepen — most-overdue domain (last: 43); wind
was the header's flagged weather frontier, and it's an interconnect: one
signal that existing elements respond to, not a new element.
**Change:** Global `WINDA` breeze signal (0..1), updated with the entity
clocks in `advanceEntities` so `&step=` reaches any phase: a slow seeded gust
cycle (`sin(time*0.13+(seedNum%89)*0.5)` clamped at 0 for genuine lulls,
amplitude-modulated for gustiness). Three consumers: tree canopies sway (±1.1px,
trunks stay rooted), palm crowns lean with leeward fronds fluttering more, and
clouds drift 0.55-1.45× with the gusts — the whole scene gusts together.
**Census:** VERDICT PASS, 0 page errors, exactly flat (draw/motion only).
**Perf:** re-ran the gate ×3 post-change (thousands of new per-frame sin()
calls warranted it): day 23.11ms / night 24.4ms — no measurable cost.
**Visual:** paired `?step=` clips at computed gust (44/45, opposite sway
phases) vs lull (20) on a palm/tree stretch — crowns and canopies visibly
displaced between gust phases, neutral in the calm; whole-city gust frame
coherent, no distortion.
**Verdict:** SHIP. Redeploy pending (iters 34-50 + hooks + polish-tile work).

## Iteration 51 — the tide (2026-07-08) [7th lap]

**Vector:** Water & coast × Deepen — most-overdue domain (last: 44); additive
moves there long flagged as spent, and the tide is an interconnect in the
iter-50 spirit: one slow ambient signal the existing shoreline responds to.
**Change:** Global `TIDE` (0..1, ~2min seeded cycle on `waveT`, updated with
the clocks so `&step=` reaches any phase). Two consumers: the existing surf
line on WATER cells recedes seaward `(1-TIDE)*3.2` at ebb, and BEACH cells
paint a wet-sand band along **every sea-facing hex edge** (inset stroke along
the shared edge, same edge-walk as iter 46's hedgerows) whose width and
darkness peak just after the ebb. River water excluded.
**Census:** VERDICT PASS ×2, 0 page errors, flat (draw-only; ±3 = known
jitter).
**Visual:** first cut only banded cells whose water neighbor was due EAST —
the meandering coast mostly touches water diagonally, so the band was patchy
and unconvincing. Rebuilt on all six sea-facing edges: paired coast clips at
computed ebb (`step=7`) vs flood (`step=77`) — at ebb a continuous wet swash
zone traces the entire zigzag coastline; at flood the sand runs clean to the
water. Whole-city frame coherent, band subtle at wide zoom. **Lesson (rhymes
with iter 45/47):** anything meant to follow the coastline must handle all
six edge directions, not just the cardinal one — the coast is a zigzag, not a
column.
**Verdict:** SHIP. Redeploy pending (iters 34-51 + hooks + polish-tile work).

## Iteration 52 — Est./Built years in the tooltip (2026-07-08) [7th lap]

**Vector:** Civic & culture × Interaction — most-overdue domain (last: 45);
Interaction has been loop-driven only once (42), and saturation guidance says
lean Deepen/Polish/Interaction.
**Near-miss logged:** the planned move was Civic × Polish "floodlight the
institutions at night" — the seam read killed it: per-kind night lighting
already exists (museum pediment wash L~2413, firehouse glowing bays,
observatory instrument leak, amphitheater stage wash + footlights). Civic
night lighting is DONE in this artifact; don't re-pitch it.
**Change (the pivot):** the CA already remembers every parcel's history —
`c.age` ticks up once per tick (0.075yr/tick, identical in the live loop and
`__warp`) and is zeroed by civic siting and building upgrades. `describeTile`
now surfaces it: civics + stadium say "Est. YYYY", developed parcels say
"Built ~YYYY" (dating the CURRENT structure — a redeveloped tower shows its
redevelopment year). One `est` line + two pushes; no canvas change.
**Census:** VERDICT PASS, 0 page errors, flat (±3 jitter).
**Verified truth, not just rendering:** hover probes — Museum "Est. 1997"
matches its [1997,'museum'] milestone; Stadium "Est. 1998" matches its 1998+
gate; University "Est. 2035" (latest 14k-pop expansion); RES "Built ~1980" in
an early neighborhood. Tooltip card screenshot clean; whole-city frame
untouched (DOM-only change).
**Verdict:** SHIP. Redeploy pending (iters 34-52 + hooks + polish-tile work).

## Iteration 53 — pasture patchwork (2026-07-08) [7th lap]

**Vector:** Nature × Polish — most-overdue domain (last: 46); the empty Polish
cell varies the recent CA/Deepen/Deepen/Interaction run. Target chosen from
this session's own holistic reads: the big open-grass sheets at 1985/2005 eras
were the flattest thing in the frame.
**Change:** ground-tone modulation on open land, mirroring what MEADOW already
did: EMPTY grass gets low-frequency waves + a per-cell hashCell fleck
(`0.93+0.05·sin(x·0.85+y·0.6)+0.04·hash`), FOREST floor gets gentle waves
(`0.95+0.05·sin`). Zero extra draw calls — the same hexTile, a varied
brightness. Time-free modulation, so `col()`'s color cache keys stay stable
across frames (the CCACHE lesson from iter 40 respected).
**Census:** VERDICT PASS, 0 page errors, flat (±3 jitter).
**Perf:** single sanity run — day 23.33ms / night 24.49ms, flat vs the
iter-50 floor.
**Visual:** wide frames at seed 42@1985 (grass-dominant) and seed 7@2005 —
open land now reads as rolling quilted pasture instead of paint; forests have
floor depth; the built core is untouched. Subtle at wide zoom, exactly the
target.
**Verdict:** SHIP. Redeploy pending (iters 34-53 + hooks + polish-tile work).

## Iteration 54 — laundry lines (2026-07-08) [7th lap]

**Vector:** Urban fabric × Deepen — most-overdue domain (last: 47).
**Near-miss logged:** first idea was "make the four DISTCOL districts visible
in the streetscape" — the seam read killed it: COM sign bands and MARKET
stalls already wear their district color (awnings are deliberately varied).
District identity IS drawn; don't re-pitch.
**Change (the pivot):** washing lines between E-W RES neighbor pairs
(skybridge geometry at clothesline height): the east house of a pair strings
a sagging line to its neighbor (`hashCell<0.22` gate → 6-14 lines/city), with
4 pastel garments whose hems skew with `WINDA` — the laundry flaps in the
gusts. Out on dry days only: gated off at night (`LITAMT<0.45`) and during
either house's block party (iter 49 interplay). Draw-only, no rng().
**Census:** VERDICT PASS, 0 page errors, exactly flat.
**Visual:** offline gate replication aimed clips at both seeds (6 lines at
seed 42, 14 at seed 7); 5x gust-vs-calm pair at one line shows garments
skewed at `step=44` and hanging straight at `step=20`. Whole-city frame
coherent; the feature is invisible at wide zoom, as a detail should be.
**Verdict:** SHIP. Redeploy pending (iters 34-54 + hooks + polish-tile work).

## Iteration 55 — ferry gulls (2026-07-08) [7th lap + holistic check]

**Holistic step-back:** whole-city frames at seed 42 NIGHT and seed 1234@1995
rural — first night-scene holistic read: balanced, warm, no compounded
darkness; the rural frame shows the pasture patchwork composing well with
farms/river. Perf gate PASS ×3 (day floor 23.33ms / night 24.49ms — ten
features since iter 45 cost ~0.3ms total).

**Vector:** Transport × Deepen — most-overdue domain (last: 48).
**Two near-misses logged:** (1) vehicle headlights already exist (forward
lamp dot at `LITAMT>0.35` in drawVehicle); (2) buses already exist (14% of
the car fleet spawns as `kind='bus'`). Transport's obvious additive moves are
DONE — this domain is saturated; future laps should reach for
Deepen/Polish/Interaction here.
**Change:** gulls trail the ferries — 3 white wingbeat "m" strokes wheel
behind each ferry's stern (per-gull circling phase off `f.ph`, wingbeat off
`time`, bob-coupled), gated to daylight (`LITAMT<0.55`, gulls roost at dark).
Pure draw-time garnish inside drawFerry — no entity array (butterfly
precedent), no rng(), ~9 strokes/frame.
**Census:** VERDICT PASS, 0 page errors, exactly flat.
**Visual:** aimed 4x clips via `__ents('Harbor ferry')` at `step=30/31` —
gulls visible wheeling off the stern, positions and wingbeats differing
between steps (motion verified). Whole-city frame coherent.
**Verdict:** SHIP. Redeploy pending (iters 34-55 + hooks + polish-tile work).

## Iteration 56 — kids in tow (2026-07-08) [8th lap]

**Vector:** People & activity × New element — most-overdue domain (last: 49);
New element varies the recent Deepen/Deepen run. Seam check: kids/strollers
appear in the domain blurb and the HOW-IT-GROWS copy but had never been
built. (Also noted while checking: seasons PARTIALLY exist — `applySeason`
does golden-hills grass drying only; logged in the header as the remaining
Sky frontier.)
**Change:** ~18% of residents now walk a child: `kid` field set by
Math.random AT THE END of the ped spawn literal (after all rng() draws, so
the seeded stream and ped count are untouched — peds 551 exactly flat).
Draw: a half-height figure beside the adult in a bright coral/gold/teal
shirt, skipping (bounce off `time*5.5+p.kid`); gated `LITAMT<0.5` — kids are
home by dark, before the adult crowds thin at 0.75. Garnish on the ped entity
(gull/butterfly precedent, no new array).
**Census:** VERDICT PASS, 0 page errors, life.peds exactly 551, all flat.
**Visual:** 5x clips at three resident clusters — parent+child pairs read
clearly (adult with small bright figure at their side). Whole-city frame
coherent (kids are sub-wide-zoom detail, as intended).
**Verdict:** SHIP. Redeploy pending (iters 34-56 + hooks + polish-tile work).

## Iteration 57 — full seasons (2026-07-08) [8th lap — the "bigger swing"]

**Vector:** Sky & atmosphere × Deepen — most-overdue domain (last: 50) and
the header's flagged frontier (seasons were grass-drying only). Taken as the
counterweight's occasional bigger swing; backed up first.
**Change:** `applySeason` now runs the whole calendar on `s=year%1`: winter
(s≈0, ±0.12) cools canopies and mutes open ground (California coast — cool
deep greens, never snow); spring (s≈0.28) freshens canopies; the original
golden-hills drying keeps late summer (s≈0.62); autumn (s≈0.87) ambers
deciduous canopies 75%. **Evergreens sit it out**: new `conifer`/`coniferLt`
palette entries (copies of canopy base) and the REDWOOD case switched to
them — amber redwoods would read as a mistake. Also fixed a latent staleness
bug: applySeason mutated BASE but never invalidated `CCACHE`; it now clears
on quantized season steps (48/yr), so the palette actually drifts smoothly
without per-frame cache thrash (iter 40 discipline).
**Census:** VERDICT PASS ×2, 0 page errors, core exactly flat (pop ±3-6 =
the session's known animation-timing jitter band).
**Visual + the lesson:** first verification FAILED silently — four wide shots
at fractional warps all looked identical because **the year races ~+0.15
during page load/settle** (year+=dt/6 live), blowing past the ±0.11 autumn
window before the shot; even click-PAUSE was too slow. An in-page palette
probe proved the feature was live (canopy RGB responding), so the fix was a
test hook, not code: `window.__setYear(n)` pins the calendar after PAUSE.
Pinned clips: autumn = amber street trees against still-green conifer grove;
spring visibly fresher; winter cooled; summer = the familiar golden hills.
**For narrow-window time features: pin the clock, don't race it.**
**Verdict:** SHIP. Redeploy pending (iters 34-57 + hooks + polish-tile work).

## Iteration 58 — moonglade (2026-07-08) [8th lap]

**Vector:** Water & coast × Polish — most-overdue domain (last: 51); target
picked from iter 55's night holistic read (moon over a plain dark sea).
**Change:** the sea twinkles in a pool of moonlight: the screen-space moon
(iw·0.80, ih·0.15) is projected into world space, and open-water cells within
a 210px radial falloff draw 1-2 extra twinkle dashes (waveT-phased, hashCell-
placed, alpha = LITAMT·fall²·twinkle). Drawn in the post-map overlay pass
(before the fog layers). Night-gated `LITAMT>0.5`.
**Design lesson:** the first cut was a physically-strict glitter COLUMN below
the moon with an open-water guard — invisible at seed 42 because the fixed
moon anchor sits over the HEADLAND there, and the guard skipped nearly every
dash (the pale marks I first credited were the pre-existing city-light
smears). The coastline under the moon varies per seed, so the glade must be
RADIAL — pool on whatever water is near the moon — not columnar. Rhymes with
iters 45/47/51: screen-fixed anchors and per-seed geometry don't mix; light
the water you have.
**Census:** VERDICT PASS, 0 page errors, exactly flat (draw-only).
**Visual:** 3x clips under the moon at two waveT phases (seed 42) — twinkle
field densest near the moon, fading with distance, patterns animating; seed 7
clip confirms cross-seed grace (less water in radius → less glade, no
artifacts). Night whole-city frame coherent.
**Verdict:** SHIP. Redeploy pending (iters 34-58 + hooks + polish-tile work).

## Iteration 59 — the school run (2026-07-08) [8th lap]

**Vector:** Civic & culture × Deepen — most-overdue domain (last: 52).
**Near-miss logged:** the planned move was "stadium match nights" — the seam
read killed it: the stadium already has a match-day concourse crowd, lit
floodlight masts, AND a floodlit pitch with light cones. Stadium events are
DONE; don't re-pitch.
**Change (the pivot):** the school run — on weekday mornings
(`dayT 0.15-0.30`), every schoolhouse gate draws a drop-off cluster: up to 5
mingled figures (short bright kids alternating with taller muted adults,
hashCell presence per slot, gentle time-sway), placed on the yard side the
school already flips per seed. Connects three systems: schools × the kids
idea (iter 56) × the daily rhythm (the first feature keyed to a MORNING
window — evenings had crowds since iter 41 but mornings were empty).
Draw-only, no rng().
**Census:** VERDICT PASS, 0 page errors, flat (±3 jitter).
**Visual:** aimed 4x clips via `__find('school')` — morning (t=0.22): a
mingled crowd at the gate beside the play-court; midday control (t=0.5): the
same gate EMPTY; second seed confirms. (First seed-42 clip landed under the
HTML title card — pick `__find` results by screen position, not index.)
Whole-city morning frame coherent.
**Verdict:** SHIP. Redeploy pending (iters 34-59 + hooks + polish-tile work).

## Iteration 60 — fairy rings (2026-07-08) [8th lap + holistic check]

**Holistic step-back:** whole-city frames at **seed 99 (never tested — a
procedural-robustness probe)** and seed 42@2005 golden hour. Seed 99 fully
coherent (river/farms/monorail/pier all correct on a fresh seed); golden hour
beautiful. One WATCH ITEM logged (header): iter 43's sea-fog banks read
blobby at seed 99's coastline. Perf gate PASS ×3 (day 23.44 / night 24.78 —
+0.1-0.3ms creep from iters 56-59, within tolerance, trend noted).

**Vector:** Nature × New CA rule — most-overdue domain (last: 53); the
engine's native currency, unused by Nature since iter 13.
**Change:** fairy rings — a third decoration-state CA (bloom/party family):
in the autumn window (`s 0.76-0.98`, tying into iter 57's seasons), woodland
cells (FOREST/REDWOOD) surface a mushroom ring via year-keyed hash (6%/yr),
hold 3 ticks (~a fifth of a year — first cut was 6 ticks, which would have
persisted into SPRING; do the duration math against the calendar), then rest
20 ticks. Draw: a ring of six tiny white-stemmed mushrooms, coral/cream caps
hashCell-varied, alpha-ramped. `shroom:0` in the cell literal;
`__find('shroom')` hook.
**Census:** VERDICT PASS ×2, 0 page errors, exactly flat.
**Visual:** autumn probe (warp 61.8): 8 rings at seed 42, 5 at seed 7 — 4x
clips show clear rings between autumn-tinted trees (the seasonal composition
works); summer control (warp 61.4): 0 rings. Whole-city autumn frame
coherent.
**Verdict:** SHIP. Redeploy pending (iters 34-60 + hooks + polish-tile work).

## Iteration 61 — sea-fog fix (2026-07-08) [8th lap]

**Vector:** Sky & atmosphere × Polish (FIX) — **deliberate rotation override**
(rotation pointed at Urban): iter 60's holistic flagged the sea-fog banks as
the only known visual flaw, and fixing what the step-back turns up outranks
adding more. The iter-60 "watch" bar was overridden one lap early because the
fix was cheap and no Urban polish of equal value was identified.
**Diagnosis:** two defects in iter 43's banks: (1) each bank was ONE hard
40×95 ellipse — reads as a portrait glare puck, not fog; (2) the inland fade
`(fx-(SHOREX-13))/6` kept FULL-strength fog over the last ~7 columns of
city — the "bank hovering over the built edge" at seed 99.
**Change:** each bank is now three feathered lenses stacked along the coast
(30×72 core + two 24×42-ish offsets, per-lens alpha ×0.55 so the overlap
matches the old peak but the edges feather), and the fade dies at the first
blocks (`(fx-(SHOREX-4))/5`) — fog swallows beach and waterfront, never the
core.
**Census:** VERDICT PASS, 0 page errors, exactly flat.
**Visual:** seed 99 reshoot — banks read as soft marine haze over sea/beach,
the built-edge bank GONE; seed 42 mid-spell (`step=100`, window computed from
the seed phase) — layered haze over the pier and sea, no pucks. Both frames
coherent.
**Verdict:** FIXED. Redeploy pending (iters 34-61 + hooks + polish-tile
work).

## Iteration 62 — rooftop water tanks (2026-07-08)

**Vector:** Urban fabric × New element — rotation pointed at Urban after 61's
fix lap; the domain had only one New-element entry (32) and the mid-rise roofs
were the blandest surface downtown (solar/green-roof/fringe only).
**Change:** timber water tanks on the older walk-ups. In `drawBuilding`'s MID
branch, as `else if` after the v>0.5 roof-garden fringe: gates
`!c.solar && !c.groof && hashCell(x,y,seedNum^0x7A7E)<0.3`, so tanks land only
on low-value stock with a bare roof. Draw-only: ink legs, timber barrel
(`deck`), dark hoop band, terracotta conical cap, offset `tx=cx+3.1` so it
shares the roof with nothing. No terrain, no rng(), no entities.
**Census:** VERDICT PASS, 0 page errors, pop/developed/roads exactly +0
(draw-only, as designed).
**Visual:** offline hash aim was insufficient — 54 hash-gated MIDs at seed 42
but only 15 truly fire (v>0.5 fringe + solar/groof suppress ~72%); rewrote the
probe to evaluate the exact branch condition in-page and clip roof-centered at
4×. Seed 42: clear tanks (legs/barrel/hoop/cap) on two walk-ups + one on the
center turret block; seed 7: two more on adjacent roofs. Sit on the roof slab
cleanly, no z-order tears. Whole-city frame coherent, tanks subtle at full
zoom as intended.
**Lesson:** when a draw gate depends on runtime cell state (v, solar, groof),
aim clips from an in-page probe of the exact condition, not an offline
hashCell replica — the replica overcounts and the clips point at suppressed
candidates.
**Verdict:** SHIP. Redeploy pending (iters 34–62 + hooks + polish-tile work).

## Iteration 63 — bus stops (2026-07-08)

**Vector:** Transport × Deepen — rotation pointed at Transport (last touched
55); its additive moves are flagged saturated, so deepen what exists: buses
have been in the road fleet since iter 0 (gold, `kind='bus'`, 14% of spawns)
but drove past everything. Now the street network has stops and the buses
use them.
**Change:** three seams. (1) End-of-tick derivation pass (fete/hedge
precedent): `c.stop=1` on ROAD cells (not bridge, not the coast highway) with
≥2 developed neighbors, gated `hashCell(x,y,seedNum^0xB5B5)<0.05` → ~28
stops/city. (2) ROAD draw case: sidewalk shelter (ink posts, flat cream
canopy, gold route sign) with 1–2 waiting figures by day, subtle idle bob.
Skips fete cells so bunting streets don't clutter. (3) `stepVehicle`: buses
arriving on a stop cell pull in for 1.2–2.1s (`v.wait`), with a 16s
refractory (`v.dwell`) so they don't re-stop instantly; path picks already
used `Math.random`, so no seeded-stream risk. Tooltip gets a "Bus stop" line;
`__find('stop')` added for aiming.
**Census:** VERDICT PASS, 0 page errors, exactly flat (towerHt +1 = known
animation jitter).
**Visual:** seed 42 clips show shelters with canopy/sign/waiting figures at
two park-corner stops, correct sidewalk side, no z-order tears (shelter
extent stays within the cy+5 next-row budget). Numeric dwell probe: 5 of 9
buses at seed 42 carried positive `dwell` refractory — they genuinely pull
in. Whole-city frame coherent; 28 shelters vanish into street texture at
full zoom, as street furniture should.
**Verdict:** DEEPENED. Redeploy pending (iters 34–63 + hooks + polish-tile
work).

## Iteration 64 — dog walkers (2026-07-08)

**Vector:** People & activity × Deepen — rotation pointed at People; its
Deepen column had only iter 34, and the domain's two entity systems (peds,
dogs) never related: every dog in the city roamed ownerless. Now ~45% of
dogs walk their human.
**Change:** `walker` flag on the dog literal (`Math.random()<0.45`, value
doubles as animation phase — placed AFTER the rng() draws, kid-flag
precedent from iter 56). In `drawDog`: the walker stands at the cell
center (colored body from a new `WKC` palette, ink head, subtle sway) with
an ink leash curving to the dog, which keeps its normal ±0.85 sniff radius
around them — the stand-and-sniff composition falls out of the existing
stepDog motion for free. Leash widened 0.5→0.7 after the first clips read
too faint. Draw-only; no new entity array, no terrain, stream untouched.
**Census:** VERDICT PASS ×2, 0 page errors, pop −3 on re-run (documented
harness animation jitter), dogs steady at 81.
**Visual:** A/B/C pixel proof under `playing=false` — same frame hashed
with walkers on vs off vs dogs removed: walker effect true, dog visible
true. Clip shows the standing figure with the dog at their feet on a park;
whole-city frames at seeds 42 + 7 coherent. Two verification traps hit and
resolved: (1) walker flags reshuffle every load (Math.random), so a probe
list from one load can't aim a clip in another; (2) an A/B target behind
the bottom-left stats panel diffs identical — occlusion, not a render bug;
filter aim targets to sy 160–640.
**Verdict:** DEEPENED. Redeploy pending (iters 34–64 + hooks + polish-tile
work).

## Iteration 65 — holistic step-back + tidepools (2026-07-08) [9th lap]

**Holistic (every-5 check):** whole-city frames at seed 42 (golden hour) and
seed 123 (never-tested) — both fully coherent: balanced color, readable
coast, sea-fog lenses soft, no compounding clutter or darkness. Perf gate
×3 by minimum: day 24.11ms / night 25.44ms vs baselines 24/26.61 — PASS.
Watch: day floor crept 23.44→24.11 over iters 61–64; next perf lap decides
if a fix iteration is due. **Harness incident:** the first two holistic
frames came back BLANK (1974 / 0 residents / specimen "—") and looked like
a catastrophic load regression — they were contention artifacts from
chaining census + two shoot.mjs runs in one parallel command; solo
re-shoots rendered perfectly. Logged in the header: re-shoot solo before
believing a blank frame.
**Vector:** Water & coast × Deepen — tidepools, compounding the iter-51
tide system (the TIDE signal previously only widened the wet band).
**Change:** in the BEACH tide-band edge loop: hash-gated pool candidates
per sea-facing edge (`hashCell(x*7+dx*3,y*5+dy*3,seedNum^0x71DE)<0.34`),
drawn after the band pass as small water ellipses with a sandDk rim and a
coral starfish on ~40% of them, alpha keyed `(0.45-TIDE)/0.45` — pools
surface only on the ebb and drown at high water. Draw-only; no terrain, no
rng(), no new state.
**Census:** VERDICT PASS, 0 page errors, pop −3 (known jitter).
**Visual:** pinned-clock A/B at seed 42 (`playing=false; TIDE=0.05/0.95`,
same coast clip): low tide shows pools with rims + starfish dotted along
the wet flats; high tide shows none. Whole-city seed-7 frame coherent —
mid-cycle tide keeps pools subtle at full zoom.
**Verdict:** DEEPENED (holistic clean). Redeploy pending (iters 34–65 +
hooks + polish-tile work).

## Iteration 66 — civic flags catch the wind (2026-07-08)

**Worktree migration:** the skill grew a git-worktree workflow this session — the
loop now runs in `../solvista-grow` on branch `grow-city`, and `main` advances
only by a verified `--ff-only` merge. Adopted it here specifically because a
concurrent session (the transport/monorail rework) was continuously editing
`main`'s `solvista.html`; iters 66-a/66-b were yielded to avoid clobbering that
uncommitted work. The worktree isolates this loop cleanly. (See the ff-merge
note below re: publishing to main.)
**Vector:** Civic & culture × Deepen — rotation pointed at Civic (least-touched,
last 59; empty Polish/Scale columns). Its 13 building types are already richly
detailed with night lighting, so the move is interconnection, not addition: the
`WINDA` gust cycle (iter 50) blows through trees, palms, clouds and laundry, but
the civic flags hung dead — the school flag was a static gold triangle and the
town hall had only a bare finial.
**Change:** a shared `windFlag(bx,by,dir,L,H,color,ph)` helper (draw-only): a
rectangular flag whose ripple is a sine wave travelling down its length, scaled
by `0.28+0.72*WINDA` so it hangs limp in the calm and snaps straight in a gust,
with the free end swinging more than the hoist. Wired to two civics: (1) a new
coral national flag on a pole rising from the town-hall dome finial (gold pole
ball), and (2) the school flag's static triangle replaced with a gold `windFlag`.
No terrain, no rng(), no new state — pop stays flat.
**Census:** VERDICT PASS, 0 page errors, pop +21 (draw-only wobble).
**Visual:** camera-zoomed frames (in-page `scale`/`offX` override) show the
town-hall coral flag streaming above the gold dome and the school's gold flag
flying over the play-court — both read cleanly. Pinned-frame A/B
(`playing=false; WINDA=0.95 vs 0.03`) on tight clips: wind≠calm hash differs for
BOTH flags → they genuinely respond to the gust signal. Whole-city seed-42 frame
coherent; flags stay subtle street-furniture at city zoom.
**Verdict:** DEEPENED (Civic × Sky interconnect). Redeploy pending (iters 34–66
+ hooks + the concurrent session's transport/camera/shoreline commits).

## Iteration 67 — orchards keep the seasons (2026-07-08)

**Vector:** Nature × Deepen — rotation pointed at Nature (most-neglected, last
real touch 60); its additive columns (3 elements, 3 CA rules) are spent, so
interconnect. The orchards drew coral/gold fruit **year-round** — laden even in
winter and spring. Their canopy color already shifted with the seasons
(`applySeason` recolors `canopy`/`canopyLt`, iter 57), but the fruit ignored the
calendar; the grove never actually turned with the year.
**Change:** in the ORCHARD draw case, gate the crop on `s2=year%1`: a pale
blossom flush (`col('coral',1.42)` at α0.6, two soft puffs per crown) in spring
(0.16–0.42), coral/gold fruit at harvest (0.70–0.99), and bare green through
summer + cool-bare in winter. Draw-only — no rng, no terrain, no new state; the
canopy's existing seasonal palette does the rest.
**Census:** VERDICT PASS, 0 page errors, pop/roads/developed exactly +0.
**Visual:** one grove (seed 42, 17,16) shot across four `__setYear`-pinned
seasons at 4.2× camera zoom: spring = pink-white blossom over fresh green;
summer = plain green, no crop; autumn = ambered crowns laden with fruit;
winter = cool bare. Distinct and legible each season. Whole-city seed-7 frame
coherent (orchards read naturally in the farm belt; the concurrent session's
new Dijkstra monorail traces clean).
**Verdict:** DEEPENED (Nature × Sky/seasons interconnect). Redeploy pending
(iters 34–67 + hooks + the concurrent transport/camera/shoreline commits).

## Iteration 68 — planted rooftop gardens (2026-07-09)

**Vector:** Urban fabric × Deepen (empty Polish column, last touched 62).
**Orient/saturation finding:** rotation first pointed at Sky (last 61), but Sky
is now confirmed SATURATED — probing turned up clouds + **cloud shadows** (drift
ellipse under each cloud), rain, rainbows, sea-fog, wind, seasons, moon,
moonglade, stars AND **shooting stars** all already present. Three would-be Sky
features already exist; per the saturation rule I did not force one and rotated
to Urban.
**Change:** the MID (walk-up) green roofs were a bare sage box — the `groof`
flag set the deck but nothing was planted on it (COM roofs already had café
umbrellas + v>0.85 gate; MID had nothing). Turned the deck into an actual
garden: two-tone sage shrub clusters + a canopyLt tuft on top of the sage
prism, plus a warm terrace lantern after dark on ~55% (`hashCell^0x60F0`).
Draw-only; interconnects the existing green-roof system with visible rooftop
life. No rng, no terrain, no new state.
**Census:** VERDICT PASS, pop/roads/developed exactly +0, greenRoofs steady 256.
**Visual:** camera-zoomed MID green roof (seed 42, 29,7; 84 groof MIDs) — day
shows planted shrub clusters vs the old bare box; night shows the warm terrace
lantern glowing on the decks. Whole-city seed-7 frame coherent — roofs read as
richer green tops, no clutter/darkness, no z-order tears.
**Verdict:** DEEPENED. Redeploy pending (iters 34–68 + hooks + the concurrent
session's transport/camera/shoreline/CSS commits).

## Iteration 69 — holistic step-back (2026-07-09) [10th lap]

**Vector:** review lap, no feature shipped. Rotation pointed at People (last 64)
but a seam-read found it near-saturated (picnics, benches, park cafés,
fireflies, block parties, evening crowds all exist) — and a LOT of concurrent
change had landed on main since the last holistic (iter 65): the Dijkstra
monorail rework, the shoreline re-band, the camera zoom. That made a holistic
the highest-value use of the lap.
**Holistic:** two un-zoomed whole-city frames — seed 42 golden hour (2035, 21k
pop) and a never-tested seed 314 at night (2035, 24.8k pop, 55 towers). Both
fully coherent: warm balanced golden-hour scene; dense-but-readable night city
with lit windows, moon + moonglade, monorail loop tracing clean, no clutter /
darkness / z-order tears. The concurrent monorail/shoreline/camera work
integrated cleanly.
**Perf:** PASS ×3 by minimum — day 25.17ms / night 26.39ms (baselines
24 / 26.61). Day floor keeps creeping (23.44@60 → 24.11@65 → 25.17@69); now
~0.3ms under the ~25.5 fix-lap threshold. Flagged in the header: the next
reading that crosses it makes the following lap a perf-fix lap.
**Maturity finding:** Sky is confirmed saturated (see saturation notes); People
and the park/roof systems are near-saturated. The city is broadly mature —
most domains answer "does X exist?" with YES. Recorded so future laps lean on
genuinely-absent interconnects / Polish, and treat "stop" as live.
**Verdict:** HOLISTIC — clean, no fix needed. Redeploy pending (iters 34–69 +
hooks + the concurrent transport/camera/shoreline/CSS commits).

## Iteration 70 — vehicles light up after dark (2026-07-09)

**Vector:** Transport × **Polish** — rotation pointed at Transport (least-recently
touched non-saturated domain, last 63), and the *kind* had to change: 65–68 were
four straight Deepens. Polish adds nothing, which suited a mature city.
**Orient/seam finding:** `grep -i headlight` returned **nothing**, which looked
like a clean gap — but reading the seam (`drawVehicle`, ~L3165) showed a light
already there: one anonymous flat `2×2` warm rect at the nose, no taillight, no
light cast on the road. Exactly the iter-34 beach-towel trap; the grep lied
because the feature had no name. So the move was to *improve* it, not add it.
**Change:** in `drawVehicle`, a heading basis in the squashed iso plane
(`FX,FY` forward · `PX,PY` across-lane, both carrying the existing `*0.55`
vertical compression) drives: (1) **paired** warm headlamps at ±1.5 across the
nose; (2) a **beam pooled on the road** — one low-alpha (`0.14*LITAMT`) trapezoid
fanning 11px forward from the nose to a 8.6px-wide far edge, started *at* the
nose so it never overlaps the body and z-order stays clean; (3) **red taillights**
at the rear. Bikes get a single warm bar lamp. All alphas scale with `LITAMT`, so
lights fade up through dusk. Whole block gated `LITAMT>0.35`. No gradients (the
file has zero `createRadialGradient` — flat alpha shapes only). Draw-only: no
rng, no hashCell, no terrain, no new state, no new entity.
**Census:** VERDICT PASS, 0 page errors. pop +3, towerHt +1, **tile histogram
empty** — no tile changed, as a draw-only change must. (Small non-zero pop wobble
on a draw-only change is census timing jitter, cf. iter 66's +21; the sim's last
partial tick is wall-clock-dependent.)
**Perf:** ran the gate even though 70 isn't a step-back lap, *because the change
adds per-vehicle night draw work* and the header flags a creeping day floor.
PASS ×3 by minimum: day 25.22ms (vs 25.17 @69 — untouched, the gate holds),
night 26.66ms (vs 26.39, +0.27ms for the lights). Baselines 24 / 26.61.
**Visual:** 4 subagent verdicts. seed 42 deep night PASS (beams align to the hex
road axes, lie flat, attach to bodies); whole-city night PASS ("tasteful sparkle,
not glare"; coast + dark parks still read clean); **daylight control PASS — zero
light effects visible, confirming the night gate**. seed 7 dusk returned
`VISUAL: FAIL`, and it was a **false negative**: I clipped a streetcar at 4×
myself and saw lamp + beam + taillights rendering correctly. Root causes logged
in the header — the feature is a few px at `downtown` scale, and my two
hypotheses for the "hard white wedge" (beam spilling off asphalt onto grass) were
both wrong: it was the **monorail support line**. Re-tested seed 7 at full night
with a magnified clip → PASS.
**Verdict:** POLISHED. Two harness lessons recorded (the `__ents` car blind spot;
magnify before believing a visual FAIL). Redeploy pending (iters 34–70 + hooks +
the concurrent transport/camera/shoreline commits).

## Iteration 71 — the hovered thing wears a ring (2026-07-09)

**Vector:** People & activity × **Interaction/UX** — rotation pointed at People
(least-recently-touched non-saturated domain, last 64) and the *kind* had to
change again: 65–68 were four Deepens and 70 was a Polish. Interaction/UX had
gone unused since iter 52, and the header's own advice ("lean hard on
Deepen/Polish/Interaction") pointed straight at it. People being *near*-saturated
argued for adding no new person at all — only a better way to read the ones
already there.
**Orient/seam finding:** entity tooltips (iter 42) name the thing under the
cursor, but in a dense block a `Resident` is a 1.8×5px figure among a hundred
others — the tooltip tells you *what* without telling you *which*. That missing
half is the feature. Also corrected a header claim in passing: cars *are* named
on hover (via `VKIND`, not `ENTINFO`) — `__ents` can't *return* them, which is a
different thing.
**Change:** `pickEntity` now also returns the entity and its pick radius;
`mousemove` parks them in `hoverEnt`/`hoverR` (cleared on tile-hover, pan, and
mouseleave). `stamp()` — already called at the top of every entity's draw —
draws a focus ring when it stamps the hovered entity: a squashed ellipse
(`ry=rx*0.5`) at the entity's feet, ink stroke `1.1` under a pulsing cream
stroke `0.7`. Scales with the pick radius, so a ped gets a small ring and a
ferry a large one. Draw-only: no rng, no hashCell, no terrain, no new state, no
new entity, no new ENTINFO row.
**The bug that made this iteration worth it:** I first drew the ring *last of
all* in `render()`, reasoning that an overlay above everything can never tear.
A subagent passed it but flagged that it couldn't resolve a figure inside the
ring; I assumed an iso misread and went to look myself — the ring was sitting on
a **rooftop with no pedestrian in it**. Rows draw top→bottom, so the ped was
legitimately hidden behind a mid-rise in the next row, and the last-drawn ring
floated up onto the roof of the very building occluding it — highlighting the
wrong object. Moving the draw into `stamp()` puts the ring at the entity's own
z: it is occluded exactly when its entity is. Second bug, found by magnifying:
`ctx.lineWidth` is in **world** units under the camera transform, so the
original `2.2` stroke was *thicker than the 1.8px pedestrian* and read as a
black tire. Retuned to 1.1/0.7.
**Harness:** `hovershot.mjs` — `shoot.mjs` can't hover, so this drives Playwright
directly (`__ents` to aim the cursor, `ZOOM=n` to wheel the artifact's real
camera in, `PICK=front` to avoid picking an occluded back-row entity, plus a
no-hover control frame). Both lessons + the tool are in the header.
**Census:** VERDICT PASS, 0 page errors, **every metric exactly flat** and tile
histogram empty — the cleanest possible signature for a draw-only change (cf.
iter 70's ±3 pop timing jitter).
**Perf:** ran the gate despite 71 not being a step-back lap, because the ring
draws from `stamp()`, a hot path hit for every entity every frame. PASS ×3 by
minimum: day **25.11ms** (25.17 @69/70 — flat, still under the ~25.5 fix-lap
threshold), night **26.33ms**. The `e===hoverEnt` compare costs nothing.
**Visual:** 6 subagent verdicts across two rounds. Round 1 (last-drawn ring)
returned 3× PASS and I shipped nothing on it — the PASSes were *correct about
what they saw* and blind to the floating-ring bug, which only a caveat plus my
own look surfaced. Round 2 (tuned, stamped): seed 42 ped PASS (figure stands in
the ring, ring flat on the ground plane, body draws over the rear arc, stroke
proportionally thinner than the figure); seed 7 ferry PASS (ring scales to the
hull, hull occludes the rear arc); whole-city control at seeds 42 and 7 PASS
(no stray ring anywhere, no tears, city still balanced).
**Verdict:** SHIPPED. The visual gate's real lesson this lap is the inverse of
iter 70's: there, a FAIL was a false negative; here, three PASSes were true
statements that missed a real bug. **A subagent's caveat is a finding.** Redeploy
pending (iters 34–71 + hooks + the concurrent transport/camera/shoreline commits).

## Iteration 72 — the harbor gets its ships (2026-07-09)

**Vector:** Water & coast × **Deepen / interconnect** — rotation pointed at Water &
coast (least-recently-touched domain, last 65). Its *additive* moves are long spent
(6 new elements), so the kind had to be Deepen; the mechanism happens to be a new
entity array, but the vector was to connect an existing system to the sea, not to
add another sea creature.
**Orient/seam findings (two dead ends closed before writing a line):**
- **The lighthouse already sweeps a beam** at night (`case T.LIGHTHOUSE`, `LITAMT>0.12`
  — a rotating wedge + lantern glow). It looked like a glaring gap from the ledger;
  it isn't. Don't re-explore. Third time the beach-towel trap has been dodged by
  grepping the draw case first.
- **The "harbor works" warehouses are NOT on a quay.** They're placed at
  `SHOREX-1-(rng()*3)`, and `SHOREX=G-12` while `shoreAt()≈G-7±sAmp` — so the cluster
  sits ~6–9 columns *inland* of the water. Gantry cranes reaching over a berth would
  have been geometrically wrong. A container yard would have been Urban, not Water.
- What was genuinely missing: the founding comment literally says *"the warehouse
  cluster grows while shipping pays"* — and the city had **no ship**. Sailboats,
  ferry, kayaks, whales, dolphins, turbines, moored craft: all present. Cargo: none.
  The economy's whole premise was undepicted.
**Change:** a `freighters` array. Founding now remembers the warehouse row as
`harborY` (a read, no new `rng()` draw), and **the first ship rides at anchor in the
roadstead off that exact row** — that's the interconnect, the harbor's latitude
picked the ship's. The second steams the deep lane at `off≈4.6–5.2`, seaward of the
ferries (3.4–4.4) and inside the dolphins (4–6.2). `drawFreighter` renders bow-to-
starboard in local coords under `ctx.save()/translate/scale(dir,1)` — mirroring to
the heading instead of sign-juggling every `fillRect`: navy `solar` hull with a raked
bow, `terraDk` boot-top at the waterline, six container stacks (a `st` bitmask picks
which go two-high), white stern house, `terra` funnel, foremast; a long slow wake
only if under way. Night (`LITAMT>0.35`): masthead + funnel lamps, a low-alpha pooled
deck glow, green bow / red stern nav lights, lit house windows via `colLit`.
Spawned with **`Math.random`, never `rng()`** — shipping must not perturb the seeded
simulation. Wired into the bucket sort, the step loop (anchored ships skip it),
`ENTINFO` ('Container ship', r=14), and the census `transport` tally, per invariant.
**Census:** VERDICT PASS, 0 page errors. **Every core metric exactly flat** (pop,
roads, developed, towerHt all +0) and the tile histogram empty — the clean signature
of a `Math.random`, draw-only, no-terrain feature. `transportModes +9`;
**`freighters 0->18 NEW`** (2 ships × 9 matrix cells). The lone ±1 on
solar/greenRoofs is the usual last-partial-tick jitter.
**Perf:** ran the gate despite 72 not being a step-back lap, because the header flags
a creeping day floor. PASS ×3 by minimum: day **24.78ms**, night **26.39ms**
(baselines 24 / 26.61). The day floor actually *fell* from 25.11 @71 — two entities
are free next to hundreds of peds. Threshold pressure relieved for now.
**Visual:** 3 subagent verdicts, all PASS, all specific (each located both hulls by
pixel coordinate). seed 42 day: hulls flush on the waterline, not clipped at the
seaward edge, "tastefully scaled — noticeably larger than ferries but not
dominating." seed 7 day: same, ships "anchor the deep water without dominating."
Night: "small warm/colored points, not glare; no white blob, no halo," hull still
reads as a ship. The night agent honestly flagged the nav lights as *near the
resolution limit* rather than calling them broken — exactly the iter-70 discipline
asked of it, and not a defect.
**Verdict:** SHIPPED. Redeploy pending (iters 34–72 + hooks + the concurrent
transport/camera/shoreline commits).

## Iteration 73 — civic buildings turn to face the street (2026-07-09)

**Vector:** Civic & culture × **Polish** — rotation pointed at Civic (least-recently
touched, last 66) and the cell was empty; the kind had to change after 72's Deepen.
Polish adds nothing, which suits a mature city. Deep single-tile redesigns belong to
`polish-tile`, so the move had to be *cross-civic* and systemic, not one building.
**Orient/seam finding:** every civic is already richly drawn (flags, beacons, night
glows, an amphitheatre audience) — no additive gap. What the seam read *did* turn up:
the hospital, school and university each pick which side their **public face** goes on
from `hashCell(...)<0.5?1:-1` — a per-city coin flip. So the ambulance bay, the
schoolyard and the lawn quad point in a random direction, as often at a neighbour's
back wall as at the street the building was sited on (`roadNear`).
**Change:** one helper, `frontSide(x,y,fallback)` (~L560), sums each ROAD neighbour's
**screen-x displacement** and returns +1/-1 for the side the lot fronts; an even split
(a corner lot) falls back to the caller's existing hash, so nothing is forced. Wired
into the three `fx`/`fxS`/`fxU` mirror flags. Read-only: no `rng()`, no `hashCell`
draw of its own, no terrain touched.
**⚠ The bug the visual gate caught — `dx` sign is NOT the screen side.** v1 counted
neighbours by the sign of `dx` and skipped `dx===0`. On offset rows that is simply
wrong: an even row's `dx=0` diagonals sit **half a cell EAST** (`sdx=+16`) and its
`dx=-1` diagonals WEST — odd rows invert it. So v1 was "west on even rows, east on odd
rows" whenever only diagonals had roads, and it turned seed 42's hospital *away* from
its street. A subagent returned `VISUAL: FAIL` on exactly that frame; a numeric probe
confirmed the hospital's two road neighbours are `(0,-1) sdx=+16` and `(-1,-1) sdx=-16`
— a true tie the buggy code read as west. **Never infer a screen direction from `dx` on
an offset-row hex grid; take `ctr()[0]` differences.** Summing displacement also weights
a due-E/W neighbour 2x a diagonal, which is what you want.
**Census:** VERDICT PASS, 0 page errors. Every core metric exactly flat (pop, roads,
developed, towerHt all +0), tile histogram empty — the correct signature of a draw-only
change that touches no terrain and no seeded stream. (Lone ±1 on greenRoofs = the usual
last-partial-tick jitter.)
**Measured effect (15 seed x era scenes, `frontSide` vs the old coin flip):**
university **7 turned / 2 already / 2 tie** — the strong case; school **17 / 9 / 13**;
hospital **0 / 3 / 12** — a hospital *never* turned, they sit on symmetric frontage.
**Occlusion is orthogonal and a coin flip** (tallest building <=3 rows south on the
chosen side): 11 turned instances end up more occluded, 10 less, 3 the same. Facing the
street does **not** mean being *seen* — a distant tall tower to the south covers a face
regardless of which side it is on. Expected visibility is therefore unchanged; the gain
is semantic (the yard/quad now *means* something) and it is subtle by design.
**Visual:** university PASS on 2 seeds — "quad opens onto an adjacent grey street, wings
close the back," verified by pixel coordinate on both. Whole-city PASS on seeds 42/1234:
no tears, no floaters, no blown colour, no civic wedged against a back wall. I looked at
the seed-42 school pair **myself** (n=1 agent verdict contradicted a numeric probe): the
building does mirror correctly onto its street side — 3 west road neighbours vs 1 east —
but a tall tower to the *south-west* then hides the chalked oval. That is one of the 11
unlucky instances above, not a regression: the old hash was 50/50 for occlusion too.
**Verdict:** SHIPPED. The rule is right and the census is clean, but log the honest
size of the win: it is a coherence fix, not a visible one, and half of what it turns
stays hidden behind towers.
**Follow-up worth taking:** 27 of the 74 audited civics are **ties** (corner lots) that
currently fall back to a hash. Choosing the *less-occluded* street side there — the one
the camera can actually see — would convert this from semantics into a visible win, and
is the natural next Civic × Polish lap.

## Iteration 74 — holistic step-back (2026-07-09) [11th lap]

**Vector:** review lap, no feature shipped. 69 + 5 = 74 landed exactly on the
step-back cadence, and the header flagged a day frame-time floor ~0.3ms under the
fix-lap threshold — so the two things this lap owed the city were a cumulative
visual read and a perf reading, not another feature.
**Census:** VERDICT PASS, 0 page errors, and **every single metric exactly flat**
(baseline and gate run back-to-back on unedited code) — pop 108630, roads 4290,
developed 4468, towerHt 18057, tile histogram empty.
**Perf — the creep was largely an artifact.** PASS ×3 by minimum: day **24.50ms**,
night **25.89ms** (baselines 24 / 26.61; night is *under* its baseline). The day
floor has now FALLEN three readings running — 25.17 @69 → 25.22 @70 → 25.11 @71 →
24.78 @72 → **24.50 @74** — even though the code only *gained* draw work over that
span (freighters, the focus ring, `frontSide`). Draw cost cannot go down while draw
work goes up, so the "+1.8ms creep over ~10 laps" the header has been tracking was
substantially **machine-load contamination of the earlier minima**, not compounding
render cost. Threshold pressure is off. Keep taking the reading, but stop treating
the creep as an established trend — and note the corollary: min-of-3 is *still* not
enough isolation on this box to make a 0.5ms difference mean anything.
**Visual:** 4 un-zoomed whole-city frames — a **never-tested seed 903** and seed
1234, each at day and night, 2035, `step=300`. Two subagents (one per seed), both
`VISUAL: PASS`, both specific: coherent land→sea gradient, downtown dense but with
streets still separating blocks, rooftop props "varied, not clutter-spam," water
well-spaced, night lights "tasteful sparkle... no glare discs or bloom halos," no
z-order tears, no floating tiles, no blown color.
**The caveat I chased (per iter 71's lesson that a subagent's caveat is a finding).**
Seed 1234's agent flagged two watch items seed 903's did not: prominent soft
translucent ovals over the water, and a bright promenade glow at night. I looked at
the frame myself and then found the source: the ovals are the **sea-fog banks**
(`solvista.html:3618`), whose spell phase is `sin(time*0.028+(seedNum%97)*0.7)`.
`1234%97 = 70` puts that city *inside* a foggy window; `903%97 = 30` does not. The
divergence between the two agents was the seed, not drift — and iter 61's
three-feathered-lens rework is visibly doing its job (soft haze, not the old "glare
puck"). **No fix needed.** Recording the arithmetic so a future lap doesn't
re-investigate its own fog.
**Determinism note (corrects a loose claim, doesn't overturn it).** Iters 70/72/73
each attributed a ±1..21 wobble on a draw-only change to "last-partial-tick jitter."
That is *right*, and now it has a mechanism: `__warp` is a fixed, fully deterministic
tick loop, but `census.mjs:55` reads `__census()` after a **500ms wall-clock wait**,
during which the page's own RAF loop keeps advancing `year += dt*s/110`. So the
partial tick is real and **load-correlated** — which is why today's quiet machine
landed both runs in the identical bucket and printed a perfectly flat table. An
exactly-flat census is therefore evidence the box was quiet, *not* proof a change
was pure; don't read it as a stronger guarantee than it is.
**Verdict:** HOLISTIC — city is clean, no fix lap needed. The two standing worries
(day-floor creep, fog reading as glare) both dissolved on inspection. Redeploy
pending (iters 34–74 + hooks + the concurrent transport/camera/shoreline commits).

## Iteration 75 — after dark, not everyone is home (2026-07-09)

**Vector:** Urban fabric × **Polish** — rotation pointed at Urban fabric (untouched
since 68, the stalest live domain; Sky is saturated-closed) and its × Polish cell was
the last empty non-dubious cell in the grid. Polish adds nothing, which is the right
kind for a mature city, and 74 shipped no feature, so a feature lap was owed.
**Orient/seam finding — the primitive already existed, unused.** `slotS()` (~L1550) has
been in the file all along: it draws a single window-shaped quad on a prism's left or
right front face, taking `u ∈ (-1,1)` where the *sign* picks the face and `|u|` the
position along it. **Only the CIVIC draw cases ever called it.** Every home, walk-up and
tower drew its glass with `bandR()` — a *continuous ribbon* spanning both front faces.
So at night the entire city's glass lit up as solid unbroken stripes: towers varied
brightness per floor (`hashCell(x,z,…)`), but within a floor it was one flat bar. No
building anywhere read as having individual windows.
**Change:** one helper, `darkWinR(gx,gy,ax,ay,z0,z1,x,y,salt)` beside `bandR` (~L1548).
After the ribbon is drawn it punches **unlit panes** into it via `slotS`, one per front
face, each face rolling independently off `hashCell(x*13+(s+1)*3, y*7+(z0|0), seedNum^salt)`;
a face below the 0.36 threshold keeps all its lights on. Wired into all six glass-ribbon
band sites: RES's window strip, MID's floor loop, and each of the four TOWER styles.
Two deliberate choices: (1) **subtractive, not additive** — the ribbon stays warm and a
few panes go dark, rather than dimming the glass and punching *lit* panes in. The
additive version is more physical but would have darkened downtown, which is exactly the
compounding failure mode kelp taught (a good-in-isolation change that dims the whole
frame). (2) **Night-gated**: `if(LITAMT<0.35)return` as the first line, so the day frame
pays a branch and nothing else.
Draw-only: no `rng()`, no terrain, no new tile/entity → no census hook, `TILELABEL` or
`ENTINFO` sync needed.
**Census:** VERDICT PASS, 0 page errors. pop +3, towerHt +1, every other metric exactly
+0, **tile histogram empty** — the correct signature of a draw-only change, and the ±few
is the known last-partial-tick jitter documented at 74. Per the skill's own rule I did
**not** add a bespoke metric for this: it moves nothing the hook reports, and the growth
signal here is the screenshots.
**Visual:** 3 subagents, all PASS. Both night seeds (42, 7) independently confirmed the
panes "sit ON the slanted facade, following the isometric skew of both wall planes,"
read as fenestration rather than "noise or dirt," and that **downtown is not darker** —
the specific risk I designed against. Crucially I also ran a **daylight control** (seed
42, magnified tower + wide): bands "smooth and continuous, no dark notches," proving the
night gate actually holds. A control frame is cheap and it is the only thing that can
falsify a gating claim.
**Tooling:** a 2px pane is below the resolving power of the `downtown` clip — precisely
iter 70's false-negative trap, where a subagent failed a feature it simply could not see.
So I wrote **`tileshot.mjs`**, the tile-side twin of `hovershot.mjs`: `__find(TYPE)` →
`deviceScaleFactor:4` clip on one instance. It is the reason all three verdicts were
specific about pane geometry instead of hedging. Kept and generalized (any tile type /
civic kind), not left as a throwaway.
**Perf — the header's night-gating heuristic, finally measured.** PASS ×3 (unusually
quiet box: all runs agreed to ±0.05ms). Day **24.55ms** vs 24.50 @74 = **+0.05ms, i.e.
free**, as the early-return predicts. Night **27.44ms** vs 25.89 @74 = **+1.55ms**, the
true cost of ~1.2k extra fills/frame. Still PASS (+3.1% on a +15% gate), and worth it
for a citywide legibility win — but logged precisely, because it is the largest single
night-frame charge any iteration has made. **Night is now the scarcer budget** (~2.9ms of
headroom); "gate it on night, it's free" is true of the *day* floor only, and the next
laps should know night is no longer cheap.
**Verdict:** SHIPPED. The city's buildings now read as buildings after dark instead of
glowing bars — the single most visible night change since vehicle lights (70), and it
cost no terrain, no seeded stream, and no daylight performance.
**Follow-up worth taking:** iter 73's corner-lot lead is still open (27 of 74 civics tie
in `frontSide` and fall back to a hash; choosing the *less-occluded* side would convert
that semantic win into a visible one). Also: `slotS` sat unused by non-civics for the
whole project — worth grepping for other primitives the building cases never adopted.

## U4 — the plate becomes a hexagon; rivers, monorails and cable cars go plural (2026-07-09)

**Not a loop iteration, and not written by the loop.** This landed in an interactive
session and sat *uncommitted* in `main`'s working tree — no ledger entry, no commit —
until a later session found it, verified it, and committed it as `41b0acd`.
Reconstructed here from the diff; the intent below is inferred, not reported.

**Vector:** Urban fabric × **Scale** (with Nature × Scale and Transport × Scale along
for the ride). The diorama plate was a 48×48 square whose dead corners the eye never
saw. It is now a hexagon: `HEXR`=33 rings inscribed in a `G`=67 bounding array, masked
by `HEXOK`/`HEXI`, with a `T.VOID` tile for everything outside. Generation, growth,
picking, drawing and the seeded random cell picks all go through the mask;
`ROWMIN`/`ROWMAX` give each row's live span for the coastline and the craft that clamp
to it. The plate carries ~46% more land, so per-tick development attempts scale by
`KS`=1.46 — without it the city would fill 46% slower over the same span of years.
Alongside it the singular networks went plural: `monorail`/`monoPath` → a `monos` list
of independently grown lines each closing its own loop, `gond` → `gonds`, and the
generator lays one to three rivers rather than always one.

**Census:** PASS when re-run against it (that is *why* it was kept — see the skill's
dirty-worktree rule, which this change rewrote). At seed 42/2035 the plate roughly
doubles the city vs the old square: 73 towers vs 36, pop 36,054 vs 21,014.

**Both baselines went stale and nobody noticed.** `census-baseline.json` predated the
plate, so every run reported `VOID 0 → 10098 NEW` and inflated growth everywhere — it
still PASSed, because census only fails on regressions, which is exactly how a stale
baseline hides one. `perf-baseline.json` (day 24ms) predated it too, so the extra land
read as a permanent frame-time regression and **the perf gate failed on every run**
until re-pinned. Both are now re-pinned against the hexagon city (perf: day 31.33ms,
night 37.22ms, pinned from the fastest of five runs because the gate *judges* by the
minimum of three). **A scale move invalidates both gates — re-pin both, in the same
pass, or the next ten iterations inherit a gate they learn to ignore.**

## U5 — census stats that can fall (2026-07-09)

**User-directed**, interactive session, committed as `f1638e8`. Kind: Interaction/UX.

**Vector:** the census bar *counted* things — towers, parks, solar roofs — but
*measured* nothing: every stat could only climb as the city sprawled. Five new stats,
three of which can go down. `tallest, floors` (skyline high-water mark, via a shared
`floorsOf()` the hex tooltip now uses too); `per built hex` (residents ÷ developed hex
— intensifying vs merely sprawling); `solar share`, `transit reach`, `walkable` (all
shares, not counts). Transit = residents within 2 hexes of a monorail station or bus
shelter. Walkable = residents who can reach a green space, a shop *and* a public
service on foot. Both weight by residents, not by hex, so a tower speaks for the
hundreds of people inside it.

**The seam:** `reachFill()`, a multi-source hex BFS over walkable land (a park across
the bay is close only if a bridge carries you there). Four run per `recount()`, i.e.
per *tick*, not per frame: +0.3ms/frame measured.

**The design failure worth remembering.** Walkable first used one 3-hex radius for all
three errands and was quietly broken: green space already reaches **95%** of residents
unaided and shops **97%**, so the stat was "near a civic building" wearing a disguise,
reading 12–26% in a mature city. Services now get the 6-hex catchment a school or
clinic earns → a 33–56% band. **Check what each term of a composite metric actually
discriminates before shipping it**; two of the three were pure noise and the number
looked meaningful anyway.

**Census:** PASS. Verified sim-identical against the tree minus these edits (same pop,
towers, roads, water at seed 42/2035 — no `rng()` divergence), which is the check that
matters for a stat touching `recount()`: `stats.pop` feeds a `rng()`-gated growth rule
at the school test, so a stat that perturbs pop would silently reroll the whole city.

**Layout:** ten stats overflowed the strip into the controls card at ≤1280px. The bar
now sheds stats as the window narrows (civic pair at 1300px, derived shares at 1120px)
rather than wrapping — the unbroken row is the design.

## Iteration 76 — the woods grow a closed core and a feathered edge (2026-07-10)

**Vector:** Nature × **Deepen** — rotation pointed at Nature (stalest live domain,
untouched since 67; Sky is saturated-closed) and the kind had to change after 75's
Polish. Deepen is the skill's stated highest-yield move once a domain has its basics.

**Orient — the ledger undersells Nature, and the first idea died on a probe.**
Nature is far richer than the header implies: forest, redwood, meadow, bloom,
orchard, vineyard, farm, fire, logging, succession, mushrooms *and* deer all exist.
The first vector I designed was **"forests grow up"**: `c.age` is incremented every
tick (L996) and reset by fire, logging, redwood conversion and succession, yet
**nothing in the sim ever reads a forest's age** and the draw ignored it — a free,
already-maintained field. Scaling tree size by age would have made burn scars and
logging cuts visibly regrow.

**I measured it before writing a line, and it was a dead end.** Two findings:
1. **`c.age` is in TICKS, not years — ~13.3 ticks/year** (max 681 at year 2025).
   Any age threshold written in "years" is off by 13×.
2. **Forest turnover is ~zero after the early years.** Forest hexes younger than 15
   years at 2035: **0 / 1 / 0** across seeds 7 / 42 / 1234 (n=67/67/102). Counts are
   near-static (62→67, 65→67, 98→102) because logging and succession cancel, and by
   ~1995 there are no EMPTY cells left beside the woods to succeed into. The feature
   would have been invisible in ~99% of cells — textbook marginal filler. **Dropped
   at design time, zero edits.** Don't re-explore forest age; the field is dead
   because the woods are frozen, not because the draw was lazy.

Same probe turned up: **`MEADOW` is down to 1 cell at 2035**, so the wildflower-bloom
CA (excitable media) and the deer's meadow habitat have almost nothing left to run
on in a mature city. Worth knowing before anyone deepens blooms or deer.

**The vector that survived a probe.** Every `T.FOREST` hex drew **the same three
trees at the same offsets and sizes** — a hex in the deep interior was pixel-identical
to a lone stand in the open. So closure, not age, is the axis with spread. Measured
first: bucketing forest hexes by wooded-neighbour count 0..6 fills **every bucket**
(seed 42 @2035: `[6,15,12,11,9,7,7]`) — ~40% edge (0–2), ~35% interior (3+), and
seed 1234 has 24 hexes with *zero* wooded neighbours. Confirming the physics:
**`REDWOOD` sits almost entirely at 4–6 neighbours** — this world already puts its
old growth in the core, unprompted.

**Change:** one draw case (~L2112). `k=countAround(x,y,1,forest||redwood)`, `m=k/6`.
Interior hexes get taller trees (`s=0.78+0.34m`), a 4th tree at `k>=4`, a deeper
canopy and a shaded floor (`×(1.08-0.18m)`); edge hexes get smaller trees, only 2 of
them, low understory scrub, and a *brighter* sunlit floor. **Tree budget deliberately
held flat** — edge loses one, interior gains one: 203 trees vs the old 201, so the
change is perf-neutral by construction rather than by hope.
Draw-only: no `rng()`, no `hashCell`, no terrain, no new tile/entity → no census hook,
`TILELABEL` or `ENTINFO` sync needed. Derived per-frame from neighbours (~720 `cellAt`
calls/frame, negligible) rather than stored in a new cell field, keeping the blast
radius to a single `case`.

**Census:** VERDICT PASS, 0 page errors. pop, roads, developed, towerHt, towers,
tallTowers, boulevardTrees **all exactly +0**; tile histogram **empty**. `greenRoofs +1`
is the last-partial-tick jitter documented at 74. The correct signature of a draw-only
change.

**Visual:** 3 subagents, all PASS, on **before/after pairs** (the old file shot from a
backup at identical clip coords, 800,477 and 800,406 — a subtle draw change earns a
control frame). Seeds 42 and 1234 *independently* described BEFORE as a "uniform
stipple" / "flat stamp… wallpaper repetition" and AFTER as "a dense core fading to a
softer edge." Both explicitly cleared the over-darkening risk: only true interior hexes
deepen, and **edge hexes read a touch brighter**, so the woods gained depth, not
muddiness — the kelp failure mode did not recur. Seed 7 whole-city: PASS, no tears, no
floaters, nothing compounded.

**Perf:** PASS ×3, judged by minimum on a quiet box. Day **30.28ms** (baseline 31.33,
−3.4%), night **34.44ms** (baseline 37.22, −7.1%) — both *under* baseline. The flat
tree budget did its job; a Nature draw-deepening cost nothing.

**Verdict:** SHIPPED. The woods stop being wallpaper: they now have a treeline. The
lasting result of this lap is as much the two probes as the feature — forest age is a
dead field, meadows are nearly extinct, and **closure is the axis of variation this
CA was already encoding in its redwoods.**

**Follow-up worth taking:** iter 73's corner-lot lead is still open (27 of 74 civics
tie in `frontSide`). Also: `REDWOOD` (18 hexes) still draws three fixed trees and
never varies — the same closure treatment, or an age-driven one, is a natural
follow-on now that redwoods are confirmed to be interior-only.

## Iteration 77 — the streets discover which of them is a highway (2026-07-10)

**Vector:** Transport × **New CA rule** — rotation pointed at Transport (stalest live
domain, untouched since 70), and its × New CA rule cell was **empty across all 77 laps**.
The kind also had to change after 76's Deepen and 75's Polish; "New CA rule" hadn't been
used since iter 60. A rare coordinate where domain, kind and emptiness all agreed.

**Orient — the flaw was already in the file, wearing the right name.** Roads carry
`busy`, set at L997 as `countAround(...,DEV)>=3`: a purely **local** density test. It
calls ~a third of the city an avenue, and the tooltip already described a busy street as
"a busy, tree-lined arterial" — a word the sim had not earned. A quiet corridor carrying
every trip to a bridge was not busy; a dead-end lane inside downtown was. Real arterials
emerge from **connectivity**, not local density.

**Measured before writing a line (iter 76's discipline).** A throwaway probe computed the
proposed field over 6 seed×era cells and answered three questions that would have killed
it: (1) *does it vary?* — median flow 11–15, p90 85–136, **max 359–635**: the heavy tail
of flow accumulation, so "arterial" is a rare, legible class, not a wash. (2) *is it new
information, or a restatement of `busy`?* — **~200 high-flow roads are not `busy`, and
94–249 `busy` roads are not high-flow.** (3) *does anything get stranded?* — `orphan: 0`
in every cell; the road network is always fully connected to the value core.

**Change:** one new `tick()` pass, `trafficFlow()` (~L667). Every developed hex generates
trips; trips drain downhill along streets toward the **value core** (sinks = top 4% of
road `val`, by rank, not a magic threshold), accumulating exactly as rain accumulates into
rivers. Implementation note worth keeping: **BFS visits in nondecreasing depth, so the
queue reversed is already the leaves-first topological order accumulation needs — no
sort.** Ties break toward higher `val`, which stops trunks wandering. Draw: `flow>=64`
(`ARTFLOW`) → darker asphalt + a solid continuous gold centre line, edge-to-edge, so
adjacent trunk hexes join into one unbroken line; ordinary streets keep their dashes.
Tooltip gains a real hierarchy (Street / Avenue / **Arterial** / Bridge) and a `Traffic`
row; `__find('arterial')` and one census scalar `arterials` added.
**No `rng()`, no `hashCell`, no terrain touched** — reads topology + `val`, writes only
`c.flow`. The physics fell out of the geometry: **bridges become the trunks unprompted**
(seed 42's global maximum, 635, is a bridge deck), because a river crossing is a
bottleneck every trip must share. The spine is genuinely connected — **153 of 155**
arterial hexes touch another.

**Census:** VERDICT PASS, 0 page errors. `arterials 0 → 876` (~97/city, 15.2% of roads);
pop, roads, developed, towerHt, boulevardTrees, avenues **all +0**; tile histogram
**empty**. The −1 on pop/greenRoofs is the last-partial-tick jitter documented at 74.
The exact signature of a draw-only change.

**Visual — the gate failed first, and it was RIGHT.** The first draw shipped a "doubled"
centre line as two `lineWidth=0.42` strokes 0.62 apart. `lineWidth` is in **world** units
and `scale` at rest is **0.73**, so those rendered **0.31 device px each, 0.45px apart**
— unresolvable, and *fainter than the 1.0-wide dash they replaced*. Two of three
subagents called FAIL. Rather than trust any verdict I measured the camera: a hex is
**23.4 screen px**. Redrew as one crisp 1.4-world line that **splits into two lanes only
when `scale>1.7`** (LOD; the camera zooms to 14×), and deepened `roadArt`. Re-shot with a
**BEFORE control at identical clip coords**: 3/3 PASS, all citing *what differs* —
continuous unbroken lines in AFTER, absent in BEFORE, on hex axes, forming a connected
spine, no tears, no clutter, city still coherent.

**Two gate lessons, both now in the header.** The **false PASS** is the one that matters:
seed 7's first agent, primed to "look for gold lines," reported seeing them *while the
feature was rendering sub-pixel* — because the city already had gold `busy` dashes that
look like the feature. A primed reviewer pattern-matches; only a BEFORE control can
convict. (Iter 70 recorded the opposite failure, a false FAIL; both are now paired in the
header.) Separately, one FAIL was pure framing: **`tileshot.mjs` lifts its clip 110px
above the tile centre** for tall towers, which pushes a *flat* road tile to the bottom
edge. Two of three initial verdicts were artifacts — of the tooling, not the feature.

**Perf:** PASS ×3, judged by minimum on a quiet box (three runs agreed to ±0.11ms).
Day **30.17ms** (baseline 31.33, −3.7%), night **34.11ms** (baseline 37.22, −8.4%) —
both *under* baseline, matching 76. A per-tick pass over ~800 road cells is free next to
the frame, and trunk hexes skip the dashes they replace, so the draw is neutral by
construction rather than by hope.

**Verdict:** SHIPPED. The city now knows its own highways: the trunks emerge from the
CA, not from a rule that says "downtown is busy." The lasting results are the field —
`c.flow`, reusable by anything that should follow the main roads — and the discovery that
**an "additively saturated" domain can still be missing its CA rule**: Transport's empty
cell sat there for 76 laps and paid out a city-scale structure at zero terrain risk.

**Follow-ups worth taking:** `treed` boulevards still spread on `busy`, so the allées line
the wrong streets — retarget them to `c.flow` and the trees line the trunks (Transport ×
Deepen, a one-line change to an existing hashCell pass). Vehicles ignore `c.flow` and
could prefer arterials. Iter 73's corner-lot lead and 76's REDWOOD closure lead are both
still open.

## Iteration 78 — the parks grow sidewalks (2026-07-10)

**Vector:** People & activity × **Connect** — rotation pointed at People & activity
(stalest live domain, untouched since 64; Sky is saturated-closed), and its × Connect
cell was **empty across all 78 laps**. The kind also had to change after 77's New CA
rule, 76's Deepen and 75's Polish; Connect hadn't been used since iter 47.

**Orient — the flaw was structural, and one line long.** `strollable()` (L1641) admits
PARK, PLAZA, BEACH, SHOREPARK, MARKET, GARDEN, FIELD, STADIUM and the pier — and
**never ROAD**. So in a city with ~800 road hexes per seed and a brand-new arterial
spine, the residents were sealed inside parkland. There were no sidewalks.

**Measured before writing a line (76/77's discipline), and the first two numbers
reframed the vector.**
1. **Open ground is ~100 disconnected islands** at 2035 (99 / 101 / 95 over seeds
   7 / 42 / 1234) for ~130 peds — about *one person per island*, and none of them
   could ever leave it. That is the real defect; "peds can't walk on roads" was only
   its symptom.
2. **Free diffusion would have been a disaster.** Adding roads to the walk graph
   roughly *doubles* the wander area (open 437 → union 1034 on seed 1234), so 130 peds
   would thin to half density and smear across the suburbs. The parks would have
   visibly emptied. A leash was mandatory, and the probe is what said so.

**Change:** peds get an anchor `p.hx,p.hy` (their spawn cell) and may step onto a
**road** hex within `PEDLEASH`=2 of it, **re-anchoring whenever they reach open
ground** — so a ped chains park → street → next park, but can never wander off down a
suburban lane. Bridges excluded (`!c.bridge`): the deck is raised and a ground-drawn
ped sinks through it. `kerbDir()` puts a street ped at the **kerb**, offset toward the
destination it fronts (`PEDDEST`), never on the centre line where the cars are —
direction taken from `ctr()` deltas, per the header's warning that the sign of `dx`
flips with row parity. **`strollable()` itself is untouched, so dogs stay park-bound**
and the blast radius is peds only. No `rng()`, no `hashCell`, no terrain, no new
tile/entity → no census-hook, `TILELABEL` or `ENTINFO` sync needed.

**The tuning is the interesting part — my own model was wrong.** I wanted streets to be
*transit* and parks *destination*, so road peds re-decide sooner **and** step on more
often. An offline sim said `PEDSTEP_RD`=0.45 → ~15–21% street occupancy. The live city
said **9–12%**: the sim assumed equal decision *intervals*, but road peds also carry a
shorter `tm` (1.4–3.8s vs 2–6s), and the two effects **compound**, emptying the streets
~1.5× faster than modelled. Snapshot sampling then lied in the other direction (24.6%
vs 10.0% for the *same* setting on two seeds — a 130-ped binomial). Only a
**time-averaged in-page sweep replicating the real `tm` semantics** gave a monotone,
low-variance curve: 0.45→14%, **0.30→19%**, 0.22→24%, 0.15→28%. Shipped 0.30.
**Lesson: an offline model of an entity rule must replicate its timing, not just its
probabilities — and a single snapshot of 130 agents is noise, not a measurement.**

**Census:** VERDICT PASS, 0 page errors. **Every one of the 22 metrics exactly +0**
(pop 142497, roads 5754, developed 6210, arterials 876…), tile histogram **empty**,
`peds 633` and every other entity count unchanged. Not even the usual last-partial-tick
jitter — the exact signature of a behaviour-only change on a quiet box.

**Live behaviour probe (3 seeds, `step=400`):** 0 peds on bridges, 0 leash violations,
**0 peds standing mid-street**, no page errors. The invariants hold by construction.

**Visual:** BEFORE control at identical clip coords (`git show HEAD:solvista.html`),
`downtown` clip + un-zoomed whole-city, seeds 42 and 7, `step=900`. Two subagents,
both **PASS**, both explicitly primed *against* the confusable pre-existing element
(peds already exist in parks). Both isolated real new figures **on road hexes, at the
kerb, clear of the centre line, not on vehicles, not floating** — seed 42's agent even
rejected two candidate diffs as pre-existing (one a tram, one on a park tile). Whole-city
frames: balanced, coherent, no tears, no darkening; parks still hold the large majority.

**Both agents' caveat was a finding — and their explanation was wrong.** Each saw cars,
trams and a helicopter shift between BEFORE and AFTER, and seed 42's concluded the change
"perturbed the scene RNG order." It did not. `stepVehicle` calls `Math.random()` twice and
`rng()` **zero** times: entity motion rides the *shared unseeded* stream, so altering how
many draws happen per frame re-rolls every moving thing while leaving the seeded CA
untouched — which is precisely why the census came back perfectly flat. **Corollary now in
the header: an entity-behaviour change can never have a pixel-identical BEFORE control.**
Only terrain/draw changes (76, 77) can. Ask the reviewer for *stationary* evidence.

**Perf:** PASS ×3, judged by minimum on a quiet box. Day **30.17ms** (baseline 31.33,
−3.7%), night **34.28ms** (baseline 37.22, −7.9%) — both *under* baseline and matching
76/77 to 0.2ms. The added ~130 `cellAt`/frame is free next to the draw. Run here rather
than deferred to 79's step-back because this lap touched the per-frame entity loop, and
an unattributed regression is worse than an early reading.

**Verdict:** SHIPPED. The city's residents are no longer prisoners of the park they were
born in: the walkable islands roughly **halve** (99→46, 101→37, 95→53) and the largest
connected walkable region grows **207 → 657 cells**. The lasting results are the anchor/
leash pattern — a way to open a big graph to wanderers *without* diluting them — and the
`Math.random` draw-order fact, which would otherwise read as a determinism bug forever.

**Follow-ups worth taking:** **dogs are still park-bound** (`strollable` unchanged) — the
obvious next Connect/Deepen, and a dog on a sidewalk is charming. `PEDDEST` could weight
the kerb toward *open* shopfronts at day and lit windows at night. Iter 77's `treed`-on-
`c.flow` boulevard retarget, 73's corner-lot lead and 76's REDWOOD closure lead all remain
open. **Iteration 79 owes the holistic step-back** (74 + 5).

## Iteration 79 — the surf learns it is not a light source (2026-07-10) [12th lap]

**Vector:** the holistic step-back (74 + 5, and iter 78 explicitly booked it) —
which found a real defect, so the lap became **Water & coast × Polish** and fixed
it. Verdict is therefore HOLISTIC **+ FIXED**, not a review with a TODO attached.

**The step-back's own numbers, on unedited code.** Census VERDICT PASS, 0 page
errors, **all 22 metrics exactly flat** (pop 142497, roads 5754, developed 6210,
arterials 876), tile histogram empty — a quiet box, per 74's caveat that a flat
table proves the machine was idle, not that anything is pure. Perf PASS ×3 by
minimum: day **30.05ms** (baseline 31.33, −4.1%), night **34.22ms** (baseline
37.22, −8.1%), three runs agreeing to ±0.11ms. Both scenes *under* baseline, and
matching 77's readings — the day-floor "creep" 74 retired stays retired.

**The finding, and how the gate nearly ate it.** Two subagents read whole-city
day+night frames (seed 42 and a never-tested seed 314) and **both returned
`VISUAL: PASS`** — while the surf was rendering as a hard white neon rim around
the entire coastline at night. What convicted it was not their verdicts but their
*caveats*: both volunteered that the night sand goes "muddy brown… acceptable,"
and both explained away the same white lines with **contradictory** stories
("stadium pitch markings" vs "the UI selection/route overlay"). Two agents
inventing two different explanations for one artifact is the signature of
something being rationalized. Looked at the frame myself. The white lines were
innocent — `drawGondAt`'s `col('whiteDk')` pylons and cables (L3424), the plural
cable-car lines from U4. Beside them, the surf was not.

**Root cause — a whole class, not a typo.** `col()` applies `TINT` but returns
`rgb(...)`, with nowhere to put an alpha. So *every translucent highlight in the
file* had been written as a hardcoded `rgba(...)` literal, bypassing the lighting
entirely. The surf at L2081 was `rgba(255,251,240, a2≤0.76)` — pure white, at up
to 76% alpha, along **every beach-facing edge of the whole coast**, while each
neighbouring surface was tinted to `[.42,.42,.58]`. Meanwhile the wakes and
splashes ten lines away (`drawBoat`, `drawWhale`) correctly call `col('foam',1)`.
This is the kelp failure inverted: an element ringing the entire coastline,
structurally invisible to zoomed daytime checks, surviving **79 iterations**.

**Change (draw-only).** Added `colA(name,f,a)` beside `col()` — the tinted-rgba
twin, deliberately **uncached** because `a` is continuous per cell and per frame.
Retargeted the three *reflective* water highlights: surf foam (L2081), river
current glints (L2047, new `BASE.glint`), open-water sparkle (L2029). Left the
*emissive* literals alone — the moon, aquarium bioluminescence, window lights,
and the `LITAMT`-gated shore glow emit light and correctly ignore the tint. The
discriminator is **reflect vs emit**, and it is now written in the header so a
future lap doesn't "fix" the moon.

**Census:** VERDICT PASS, 0 page errors. Every metric +0 except `pop -1` — the
documented last-partial-tick jitter. Tile histogram empty, all 25 entity counts
unchanged. The exact signature of a draw-only change.

**Visual — with a BEFORE control, per 77's rule.** `git show HEAD:solvista.html`,
identical clip coords, both seeds, and the agents were **named the confusable
elements and forbidden to report them** (moon, moon-reflection, window lights,
cable-car lines, boat wakes). 3/3 PASS, all citing *what differs*. Seed 314's agent
sampled the rim: **(230,230,224) BEFORE → (99,100,133) AFTER**, against night water
(39,72,103) — within noise of the (107,105,139) the tint predicts, so the pixels
confirm the arithmetic rather than merely agreeing with it. Foam still reads as
moonlit surf: brighter and cooler than the water, clean against the sand, not
vanished. The **day control is unchanged** (midday tint ≈1.0), which is the half of
the test that proves the fix is a tint and not a dimmer.

**Perf:** a rare clean A/B — same quiet box, minutes apart, same session. Day
30.05 → **30.11ms**, night 34.22 → **34.17ms**, against ±0.06ms run-to-run spread.
`colA`'s per-cell arithmetic is free next to the stroke it feeds; the uncached
call was the one thing worth measuring, and it cost nothing.

**Verdict:** HOLISTIC + FIXED. The city is otherwise clean — balanced, readable at
night, no clutter, no tears, and the coastline is now *pleasant* instead of rimmed.
The lasting result is `colA` plus the reflect-vs-emit rule: the tinting bug was
never one line, it was a missing primitive, and the missing primitive is why the
literals were there in the first place.

**Follow-ups worth taking:** two untinted literals of the same class remain, both
sitting next to correct `col('foam',1)` calls — the whale spout (L3774) and a boat
wake (L3659). Iter 77's `treed`-on-`c.flow` boulevard retarget (allées still line
`busy`, not the arterials), 78's dogs-on-sidewalks (`strollable()` still park-bound),
73's corner-lot lead and 76's REDWOOD closure lead all remain open. **Iteration 84
owes the next holistic step-back** (79 + 5).

## Iteration 80 — the forecourt learns which way is front (2026-07-10)

**Provenance — not my work.** Found complete and uncommitted in the worktree at
startup, killed between its verdict and its `git commit` (the third time: 70, 72,
now 80). No `## Iteration 80` entry, so it died *before* step 5 and left no
statement of intent. Per the skill, the ledger entry is evidence but **the census
is the verdict** — so this entry is written from the diff and from gates I re-ran
myself, and describes what the code *does*, not what its author meant. The prose
below is mine; the change is not.

**Vector:** **Civic & culture × Deepen** — no new tile, no new CA pass, no new
entity. It rewrites the *lot choice* inside iter 36's existing forecourt rule
(L919-944) by wiring in two systems that did not exist when 36 shipped:
`frontSide()` from **iter 73** and `c.flow` from **iter 77**. Exactly the
interconnect the 77 header note invited ("reuse `c.flow` for anything that should
follow the main roads").

**Change.** Iter 36 took the *first* neighbour in `nbrDirs` order that was `RES`
or `EMPTY` and touched any road. That is two arbitrary choices — the lot could sit
behind the building, and it could front a service lane. Now:
- a new `FORECOURT_LOT` = `{EMPTY, RES, COM, MID}`: a city demolishes a shop or a
  mid-rise for the square before its parliament. It still will not take down a
  `TOWER` and will not pave a `PARK`.
- every candidate is scored `(on the front side ? 1e6 : 0) + maxAdjacentRoadFlow`.
  So **front dominates, flow only breaks the tie**, and `nbrDirs` order breaks
  that. A lot fronting no street at all (`flow<0`) is skipped outright.

**Census:** VERDICT PASS, 0 page errors. Core flat — `pop 142497→144403 (+1.3%)`,
`roads -2`, `developed -12`. Target tile moved: **`PLAZA 6 → 14 (+8)`**. The
paying tiles are `MID -17` / `COM -7`, which *is* the change: the widened lot set
clearing shops and mid-rises. `TOWER +10` / `towerHt +637` is the documented
chaotic-CA downstream of touching terrain a later pass tests, not a second effect.

**Visual:** 2/2 `VISUAL: PASS`, before/after on an identical clip (`before.html` =
`git show HEAD`), seeds 42 and 7. Seed 7's agent convicted the new lot set without
being told it existed: *"a coral-roofed shop/mid-rise that occupied that hex in
the before shot is gone, replaced by the open paved plaza square."* Old code could
not have cleared that hex. Both agents read the plaza as sitting in **front** of
the hall, flush on the hex grid; both whole-city frames clean — no tears, no
floating tiles, no compounded clutter.

**The A/B that makes this more than an assertion.** A throwaway probe re-derived
`frontSide` and road flow independently, then audited every placed plaza. HEAD vs
working tree, seeds 7/42/1234 at `warp=61`:

| | forecourt placed | on the front side |
| --- | --- | --- |
| HEAD | 6 / 15 eligible civics | 3 / 6 — a coin flip |
| after | **14 / 15** | **11 / 14** |

Coverage more than doubled, and the reason is the lot set: a *downtown* hall ringed
by shops previously got nothing, because 36 only ever cleared a house or a vacant
lot. The civics that most deserve a square were precisely the ones that never got
one. The 3 off-front placements are the designed precedence, not a bug — no
eligible lot existed on the front side, so flow chose among the back ones. The 1
civic still without a forecourt has no street-fronting neighbour at all.
(Don't read the before-column's "best flow 5/6" as HEAD already working: with only
`RES`/`EMPTY` eligible, the candidate set is often a single lot, so the max is hit
by default. `onFront` is the honest column, and it is chance.)

`plazaTotal == withPlaza` in both builds: **every plaza in the city is a
forecourt.** Iter 36's random-sample rule at L909 has never once fired, exactly as
its own comment claims — it survives only to keep the `rng()` stream aligned.

**Verdict:** SHIPPED (recovered). Kept, not because it was found in the tree, but
because it passes all three gates on re-run and the diff is one coherent thought.

**A loop fix, learned the hard way.** The dead iteration left three untracked
scratch files (`before.html` + two probe scripts). Deleting them was refused —
correctly: they were *someone else's* uncommitted work, unique on disk. But
`run-loop.sh`'s dirty check is `git status --porcelain`, which counts untracked
files, so leaving them would have made the runner **refuse to start on every
later iteration** — a killed iteration's litter silently halting the whole night.
Resolved by *ignoring* rather than deleting: `.gitignore` now covers
`before.html`, `probe-*.mjs`, `shot-*.mjs`. Nothing is destroyed, and the scratch
convention the skill itself recommends (`/bin/cp` a backup before a big swing) no
longer poisons the next run. The probe shape — re-derive the predicate
independently, audit every instance, A/B against `before.html` — is worth reusing
for any placement rule; both scripts survive on disk, untracked.

## Iteration 81 — the fog stops being a smudge on the lens (2026-07-10)

**Vector:** **Sky & atmosphere × Polish (FIXED).** Sky was the most neglected
domain on the grid (last touched at 61, and never by a CA rule or a Connect), so
the rotation pointed here. I went looking to *add* a marine layer and grepped
first — per step 3's rule, and per iter 34, which nearly shipped beach towels onto
a beach that already had them. **Solvista has had a marine layer all along.**
Twice, in fact: a dawn bank (old L3982) and a seeded multi-day "spell" (old L3992).
So the iteration became a fix instead of an addition, which is the whole point of
grepping the seam before designing against it.

**The defect, seen before it was theorised.** Both fog systems were a handful of
big screen-space ellipses drawn **after the entire row loop**. That is precisely
iter 71's "⚠ Overlays drawn last FLOAT," applied to the largest overlay in the
file. I shot seed 2 (`sin((seed%97)*0.7) > 0.25` is the spell's gate; 7/42/1234 all
fail it, which is why 80 laps of census screenshots never once rendered this
feature) and looked myself. Three faults, in descending order of harm:
1. **The banks hang off the plate into the empty sky** — clearly visible past the
   top-right and right rim of the sea. Fog in the void, beyond the edge of the world.
2. They read as **soft-focus lens smudges / glare pucks**, not weather. Iter 60's
   holistic already caught this smell and treated it by splitting one oval into
   three feathered lenses; that treated the symptom, not the projection.
3. Strongest over the **open sea** and weakest at the shore — inverted. A marine
   layer piles against the coast. The `inland` term intended this and did the
   opposite: `inland` saturates at 1 for most of the roll, so the bank is a puck
   at sea and only fades in its last few columns.

Plus a fourth, of the class iter 79 named: both used hardcoded near-white
`rgba(238,242,240)` / `rgba(236,241,239)` literals. Fog **scatters** light, so by
79's reflect-vs-emit test it must go through `colA` and take the tint. The spell
had a hand-rolled `(1-LITAMT*0.45)` night dimmer, which is a dimmer, not a tint —
it made night fog grey, never blue.

**Change (draw-only).** The marine layer is now a **per-hex density field emitted
inside the row loop**, after each row's cells. It therefore has depth: rows in
front draw straight over it, so the layer is clipped to the plate for free and the
city stands out of it instead of under it.
- Spatial gate reuses **`reachFill`** (the U5 header note asked for exactly this):
  a fifth map, `rSea`, with *every wet cell* as a source — so the fog finds the
  rivers and the marsh, not only the coast. Thickest in the surf, spent within
  `FOGR`=7 hexes inland, thinning to a haze offshore via `shoreAtF(y)`.
- Two weather clocks preserved and merged into one `FOGAMT`: the dawn layer that
  burns off by mid-morning, and the seeded spell that makes some cities foggy for
  a stretch of days. Both still time-driven, no `rng()`, so `__step` still reaches
  a foggy window.
- Color through **`colA('fog',…)`** + a new `BASE.fog`. Rose at dawn, blue under
  the moon, and the moon itself still emits — 79's discriminator, honored.

**The two tuning failures worth recording, because both are counter-intuitive:**
- **Alpha must be sized for the overlaps that SURVIVE, not the ones you draw.** I
  sized the per-hex lens for ~9 overlapping neighbours and got a nearly invisible
  sheen. The next row paints its own opaque ground over the bottom of this row's
  lenses, so the field accumulates *across a row* (~2.4 lenses) and hardly at all
  *down the screen*. That is the depth model working, not a bug — but it means the
  right alpha is 0.22, not 0.095. A first pass at 0.30 with high-frequency noise
  **quilted the sea into fish scales**: few strong lenses tile visibly, many weak
  ones dissolve.
- **Hash-jittering the lens centers made it worse, and was reverted.** Both visual
  agents volunteered the same caveat — a faint hex lattice in the fogged water —
  and per 79's "a caveat both seeds volunteer is a finding," I fixed it. Offsetting
  each lens by `hashCell` to decorrelate the overlaps from the grid turned a subtle
  ripple into **hard-edged soap bubbles**, because broken tiling lets a single lens
  poke out against clear water. Reverted; the comment in the source now says so, so
  a future lap doesn't re-try it. On a hex diorama the ripple reads as hex-grain,
  like the water's own facets.

**Census:** VERDICT PASS, 0 page errors. **All 22 metrics exactly +0**, tile
histogram empty, all 25 entity counts unchanged. The exact signature of a
draw-only change (cf. 79).

**Visual:** 2/2 `VISUAL: PASS`, before/after on identical clips (`before.html` =
`git show HEAD`), foggy seeds **2 and 11**, agents told to prefer stationary
evidence and forbidden to report the moon / window lights / cable-car lines /
wakes. Both convicted the BEFORE defect *unprompted by its location*: "multiple
ellipses clearly hang OFF the plate into empty sky." Both confirm the AFTER is
strictly on-plate, piles toward the coast, no tears, and does not swallow the
towers. Night frame: muted blue-grey mist, not a glowing white haze.

**Perf — the standard gate is BLIND to this feature, so I measured around it.**
`perf.mjs` runs seed 42 at `t=0.35`/`t=0.8`: neither weather clock is up, so
`FOGAMT`=0 and the fog costs literally nothing there. A PASS from it would have
been meaningless. Official gate PASS anyway (day 30.72ms −1.9%, night 34.11ms
−8.4%). A throwaway probe measured the frame that actually pays, HEAD vs after:
foggy dawn **30.28 → 33.39ms (+10%)**, foggy day 30.11 → 33.22ms, and **clear day
30.11 → 30.05ms (free)** — the `FOGAMT>0.02` early-out means an unfogged city pays
zero. +10% on the ~1/3 of seed×time combinations that are foggy, inside the 15%
tolerance. Also added the marine layer to the intro `<li>` list.

**Verdict:** FIXED. The fog was a sticker on the lens for 80 iterations; it is now
weather standing in the scene.

**Lesson for the loop, sharper than "grep first."** The feature I set out to add
already existed, had existed since before the ledger, and was *broken in a way no
gate could see*: invisible to the census (draw-only), invisible to the perf gate
(wrong seed), and invisible to every screenshot ever taken (the spell's seed gate
excludes 7/42/1234, and the dawn layer needs `t≈0.10` while shots are at `t≈0.3`).
**Our three gates share a blind spot: they all run the same seeds at the same
times.** Kelp survived 13 laps by being un-zoomed-at; this survived 80 by being
un-*sampled*. Worth occasionally shooting a deliberately odd `seed×t` — that is
the only thing that would have caught it.

**Follow-ups:** iter 79's two untinted literals (whale spout L3774, boat wake
L3659) are still open — the same `colA` treatment. 77's `treed`-on-`c.flow`
boulevard retarget, 78's dogs-on-sidewalks, 73's corner-lot lead and 76's REDWOOD
closure lead all remain open. **Iteration 84 still owes the holistic step-back**
(79 + 5).

## Iteration 82 — retail will not follow the traffic (2026-07-10)

**Vector** — Urban fabric × New CA rule. (Rotation: 76–81 hit Nature/Transport/
People/Water/Civic/Sky; Urban fabric was last touched at 75. Kind: New CA rule was
last used in this domain at iter 23.)

**Change (attempted, REVERTED)** — a new `tick()` pass, second reuse of `c.flow`
(iter 77) after 80's forecourts. Premise: the parcels pass sites shops by a *local*
test (`roads>=2` = "corner lot"), so shops scatter over every corner; `c.flow` knows
which street the city actually drives down. So: a `T.RES` lot fronting an arterial
(`flow>=ARTFLOW`, non-bridge) converts to `T.COM`, gated by a per-lot `hashCell`
propensity vs a year-rising `push` — no `rng()` draw. Expected: a legible commercial
street wall along the trunks.

**Census** — attempt 1 PASSED and was still wrong: `COM 1246→1361 (+115)`,
`RES −139` — the vector moved the intended tile — but `TOWER 270→355 (+31%)`,
`towerHt +35%`, `tallTowers +41`, `pop +12.8%`. **`COM` is the tower precursor**
(the `com>=2` quorum in the upgrades pass), so "retail follows traffic" silently
became "+31% towers". Attempt 2 added `c.strip=1` to mark a shopfront a *terminal*
use — strip lots neither upgrade nor count toward a neighbour's tower quorum.
That fixed the cascade (`TOWER 253`, `pop −3.2%`, `COM +182`) at the cost of −6%
towers and −3.2% pop.

**Visual** — 3 subagents on matched BEFORE/AFTER pairs. Attempt 1: two `VISUAL: PASS`
(both wide frames) and one `VISUAL: FAIL` from the **downtown zoom** — "no continuous
shop street wall; conversions read as scattered extra towers and flatten the mid-rise
height variety." The FAIL was correct and the two PASSes were wrong; confirmed by eye.
Attempt 2 fixed the towers but the wall still did not read: **`COM` draws almost
identically to `RES`/`MID` at city zoom**, so +182 shop tiles are numerically real and
visually invisible.

**The measurement that decided it** — a throwaway `probe-strip.mjs` (hex
connected-components over `c.strip`) showed the shopfronts are **not a street at all**:

```
seed 7:    51 lots, 43 components, 85% singletons, longest run 3
seed 42:   45 lots, 42 components, 87% singletons, longest run 2
seed 1234: 37 lots, 31 components, 76% singletons, longest run 5
```

**Verdict: EXPLORED → REVERTED.** Reverted to HEAD; census re-run gives `pop/roads/
developed` exactly **+0** (clean revert, determinism holds).

**Why it failed the bar, and what NOT to re-try** — the premise is false in this city.
*By the time a street carries arterial flow, its frontage is no longer houses* — it is
already `COM`/`MID`/`TOWER`, so the leftover `RES` lots that the rule can convert are
scattered singletons. No siting tweak fixes that; a high street cannot be grown by
converting the few houses left on a built-out trunk. **Do not re-try RES→COM on
arterial frontage.** If a future lap wants a high street it must (a) reserve the
frontage *early* (pre-1990, before the trunk builds out) so the run is contiguous, and
(b) **give `COM` a distinct shopfront draw first** — awnings/signage/continuous kerb
frontage. Urban × Polish on `drawBuilding`'s `COM` case is the prerequisite, and is
worth doing on its own merits regardless of siting.

**Two transferable findings**
- **A moved tile histogram can still be a lie.** `COM +182` looked like 182 new shops;
  only ~45/city were actually strip lots. The rest was the seeded stream reshuffling
  downstream of a terrain change (and `COM` no longer being consumed into `TOWER`).
  The histogram is evidence the vector *touched* its tile, not that it *built* the
  thing you designed. When a feature has a shape (a run, a ring, a spine), **measure
  the shape** — a 40-line connected-components probe settled in 90s what three
  screenshots and three subagents could not.
- **Zoom level determines who is right.** The two wide-frame agents ratified a change
  that the one downtown-zoom agent correctly failed. Iter 79 warned a holistic PASS is
  weak evidence; the sharper rule is that **a reviewer can only see the change at the
  scale the change lives at.** A street wall is a *block-scale* feature, so the
  block-scale reviewer's FAIL outranks two city-scale PASSes. Send the zoom that
  matches the feature's scale, and when verdicts split, believe the tighter one.

## Iteration 83 — the shops get a face (2026-07-10)

**Vector** — Urban fabric × Polish. Iter 82 reverted its retail CA rule and named
this iteration twice, in its own entry and in the header: *"give `COM` a distinct
shopfront draw first — awnings/signage/continuous kerb frontage. Urban × Polish on
`drawBuilding`'s `COM` case is the prerequisite, and is worth doing on its own
merits regardless of siting."* Rotation agrees: Urban has shipped nothing since 75
(82 reverted), and Polish varies the kind from 82's New CA rule.

**82's premise was half wrong, and grepping the seam first caught it.** `COM` did
*not* lack a shopfront draw — it already had an awning band and a district-colored
sign band (old L2926-2928). The actual defect was subtler and worth stating
precisely: **the awning was a *ring*, and the glass ran full height.** `bandR`
wraps both visible faces, so the awning was a flat stripe with no projection, and
`bandR(...,8,h-5,glass)` gave every shop a tall glass band — which is exactly what
`MID` draws (repeated glass bands). A shop was a mid-rise wearing a colored belt.
Retail is a **ground-floor, one-sided** thing, and the draw code encoded neither.

**Change (draw-only; no `rng()`, no terrain, no new tile).**
- Two new face-local primitives beside `slotS`/`darkWinR`: `faceOutS()` returns a
  prism face's outward screen normal, and `awnS()` / `kerbS()` draw a projecting
  striped canopy and a kerb apron on **one** face. `awnS` is 3 fills (canopy, all
  accent stripes batched into one path, valance).
- The `COM` case now picks a **front**: `fs = frontSide(x,y, hashed fallback)` —
  the third reuse of iter 73's `frontSide` after 80's forecourts. Glass drops to
  street level (z 1.3→6.4) over a dark stallriser; a `slotS` doorway, the kerb
  apron and the projecting awning all land on `fs`. Taller shops (`h>=17`) get one
  upper office band with `darkWinR`. Sign band + neon glow unchanged.
- The awning projects **3px along the face normal**, and the prism is `ax=0.36`
  against a `0.5` hex, so the canopy stays inside its own tile — it cannot tear
  against the row drawn after it. That margin is why this is safe at all.
- `frontSide` is 6 neighbour probes and there are ~1250 shops **per frame**, so it
  is cached on the cell (`c.fs`/`c.fsY`) and refreshed when `year` advances — a
  street built later still turns the shop around.

**Census** — `+0` on **all 22 metrics**, 0 page errors, empty tile histogram.
Correct and expected: a draw-only change that adds no `Math.random()` draw has a
pixel-identical control, so this is the clean-determinism case iter 78 described.

**Visual** — 4 subagents. Per 82 ("a reviewer only sees the change at the scale the
change lives at"), the primary verdicts are the two **downtown-zoom** BEFORE/AFTER
pairs; both `VISUAL: PASS`, both independently reporting that shops are now
distinguishable at a glance from houses/mid-rises where in BEFORE they were not,
that awnings stay inside their hex with no z-order tears, and that no awning fronts
a roadless face. A night-downtown agent scanned all 2.9M pixels: **zero pixels above
235** — the awning takes `TINT` through `col()` and reads reflective, not emissive
(iter 79's test). A wide 2-seed holistic agent also passed.

**Perf** — 3 sequential passes, judged by the minimum of each scene:
`day 31.33 → 32.33ms (+3.2%)`, `night 37.22 → 36.61ms (−1.6%)`. PASS. The +3.2% is
the added fills on the city's most numerous building; the `c.fs` cache is what kept
it there.

**Verdict: SHIPPED.** The prerequisite 82 asked for now exists.

**Findings**
- **`bandR` is a ring, and rings cannot express frontage.** Every band in
  `drawBuilding` wraps both visible faces, which is right for a tower's window
  courses and wrong for anything a building does *toward a street*. The new
  `awnS`/`kerbS`/`faceOutS` + the existing `slotS` are the one-sided vocabulary;
  reach for them for porches, loading docks, stoops, café spill-out.
- **The `0.5 − ax` margin is a real drawing surface.** A prism at `ax=0.36` leaves
  ~4.5px of its own hex unused on every side. Things drawn there project over the
  pavement and read as depth *without* crossing into the next row — the constraint
  that makes overhangs safe in a painter's-order renderer.
- **Two cumulative cues the holistic agent volunteered** (neither caused by this
  lap; both worth a future iteration):
  1. **The rainbow floats.** `L4166` (`cl.rain && LITAMT<0.15`) draws it in screen
     space trailing a shower; at seed 7 it arcs over open ocean with one leg ending
     mid-air. This is precisely iter 81's fog defect — an overlay on the lens
     instead of a field on the plate — and 81's fix is the template. **Sky × Polish.**
  2. **The asphalt floods the interior.** At seed 42/2035 the road ground tone has
     compounded until the built interior reads as a dark brown smear that robs the
     parks of contrast. The kelp-coast failure mode, inland. **Urban × Polish.**

## Iteration 84 — the residents learn to walk (2026-07-10)

**Vector** — People & activity × **Polish**. Rotation: People was the least-recently
touched domain (78), and **Polish was the one entirely empty cell in its row** — in 83
laps nothing had ever been done purely to make the people *read* better. Kind varies
from 83's Urban × Polish by domain, and from 78's Connect by kind.

**The defect.** `drawPed` was a 1.8×3 torso `fillRect` plus a head `arc` — **no legs**.
It slid across the ground like a chess piece, and its bottom edge sat 0.6px *above* the
ground plane, so at magnification a resident visibly floated. Right below it in the same
file, `drawJogger` has scissoring legs and a bob: the artifact already knew how to draw a
walking person and the residents simply hadn't been given it. Iter 78 made this worse
without meaning to — peds now walk the *streets*, crossing hexes far more often, which is
exactly when sliding is most obvious.

**Change (draw-only; no terrain, no `rng()`, no new `Math.random()` draw).**
- **The velocity was already in the data.** `stepPed` lerps `p.ox→p.tx`, so the residual
  `tx-ox` is this frame's speed: a ped mid-stride is still far from its target offset, one
  that has arrived is standing at a kerb. `sp = hypot((tx-ox)*CW, (ty-oy)*ROWY)` — no new
  per-ped state, no extra random draw, therefore no perturbation of any other mover.
- Legs: one `beginPath` with two `moveTo/lineTo` (1 stroke per ped), amplitude
  `clamp(sp*0.42, 0, 1.15)`, phase `sin(time*6.2 + p.ph)`. At `sp≈0` the two legs land on
  the same point and the ped **stands** with its legs together.
- `bob = |st|*0.3` lifts the hips and head over the planted foot; **the feet do not bob**
  — they are at a fixed `gy-0.1`, which is what makes the figure read as walking rather
  than hovering.
- Legs are carved out of the *bottom* of the old torso (h 3→2), so the head and torso
  anchors are untouched. Net silhouette is ~0.5px taller only because the feet now reach
  the ground the old torso floated above.
- `ph:peds.length*1.7` at spawn — **index-derived, not random, on purpose.** A
  `Math.random()` there would have changed the draw count and re-rolled every other moving
  thing in the city (iter 78's lesson), destroying the clean control.

**Census** — `+0` on **all 22 metrics**, 0 page errors, empty tile histogram, peds 633.
The pixel-identical control that iter 78 says only draw-only changes can have; it is the
evidence that the gait costs the seeded stream nothing.

**Probe** — a tile histogram cannot see a gait, and per iter 82 *"when a feature has a
shape, measure the shape."* A gait's shape is its amplitude distribution. Sampled 1560
ped-frames across seeds 42 and 7: stride `p50=0.67px`, `p90=1.15px` (the clamp ceiling),
**idle ~11%, full-stride ~49%**, `ph` present on 130/130 peds, zero page errors. So both
states genuinely occur — the feature is neither frozen nor permanently twitching. Probe
deleted; finding kept.

**Visual** — 6 agents over two rounds, plus a direct look.
- **Magnified (the scale the change lives at, so the primary verdict):** `VISUAL: PASS`.
  Legs visible, widest at frames 0/1/3 and closed at 2/4 — a real cycle. Legs attach to the
  torso, reach the ground, correctly occlude the tree trunk behind. The agent independently
  confirmed the BEFORE torso "does read as floating".
- **Downtown at true 1:1:** `VISUAL: PASS`, and honestly reported the two frames as
  *indistinguishable* — sub-pixel legs added no clutter, no smudging, no z-order fault.
  That is the desired answer at this scale, and I asked for it explicitly so the agent
  wouldn't invent a difference to seem useful.
- **Whole-city, 2 seeds:** `VISUAL: PASS` both; peds correctly reported as unresolvable at
  that zoom. Their real value was the cumulative read (see cues below).

**Perf** — 3 sequential passes, minimum of each scene: `day 31.33 → 31.55ms (+0.7%)`,
`night 37.22 → 35.55ms (−4.5%)`. PASS. One extra stroke across ≤130 peds is free.

**Verdict: SHIPPED.** The city's residents no longer skate.

**Findings**
- **A lerp *is* a velocity field.** Anything stepped by `lerp(cur, target, k*dt)` carries
  its own speed in the residual, free and needing no state. `stepDog` and `stepShuttle`
  both lerp; **dogs are still legless**, and are the obvious next customer.
- **Verification cost 4 shot attempts, and I nearly shipped on a lie.** The first round's
  primary agent returned `VISUAL: FAIL` — correctly, because the capture had framed a
  *building*. The crowd agent, given the same broken set, reported "scissoring legs" in the
  **BEFORE** frame, which is impossible. Two agents, same artifact, incompatible stories =
  iter 79's tell. Looking at one PNG myself settled it in seconds. **Look at the first frame
  yourself before you spawn anybody**; a subagent handed a bad screenshot will confidently
  grade whatever is in it.
- **The three ways an entity screenshot lies** (all hit this lap; now in the header):
  no identity in `__ents` → positional tracking fails at high zoom; painter's-order
  occlusion by the rows *below* → a perfectly centred ped is invisible; and at `ZMAX=14`
  a small clip is narrower than one hex.
- **Two banked cues were re-confirmed by agents who were told not to look for them** — the
  offshore rainbow (seed 7, *and* it has no rain cloud attached) and the asphalt tone, which
  **both** seeds volunteered as the city's biggest compounding risk. Promoted in the header.
  A third emerged: the white cable-car lines have now been misread as UI chrome by four
  separate agents.

## Iteration 85 — the cable car stops looking like a UI overlay (2026-07-10)

**Vector** — Transport × **Polish**. Rotation: Transport was the least-recently-touched
domain after Nature (last real lap 77; last Polish 70). Kind repeats 83/84's Polish, and
I took it anyway: all three banked cues were Polish cues, and the ledger says a cue two
seeds volunteer is a finding. Shipping a shallow Nature element to satisfy the
kind-rotation rule would have been exactly the "one more shallow feature" the skill warns
against.

**The defect, measured.** Cue (c) said four agents across iters 79/84 read the cable car
as UI chrome. A probe said why, in numbers: the pylon is `prismS(...,0.028,0.028,0,H,...)`
→ `ax*2*HW` = **1.8 world px wide and ~30 px tall**, a 17:1 uniform stick in `whiteDk` at
**full alpha — the brightest structural tone in the palette** — with no head, no footing,
just terminating on the asphalt. The cable was a dead-straight chord at constant `H`.
Straight + uniform + unsupported + maximally bright *is* the visual grammar of a vector
overlay. The agents were right; the artifact was drawing a ruler.

**Change (draw-only: no terrain, no `rng()`, no new `Math.random()` draw).**
- **The rope sags.** `gondSag(g,f)` = `GONDSAG*(b-a)*4u(1-u)` over the span between the
  towers bracketing fractional path index `f`; `GONDSAG=0.95` px/cell → **2.81px over a
  3-cell (~66px) span, a ~4% sag ratio**, which is what a real haul rope does. It is
  **exactly 0 at every tower**, so the cable always lands on the sheave head.
- **The towers are `buildGondSet`'s job now.** It computes `g.pyl` (the span list, which
  `gondSag` needs) and `g.pylSet` (the draw test). The set is identical to the old
  `i%3===0||i===L-1`, so **the pylon count did not change** — only what one looks like.
- **The pylon has three parts**: a `creamDk` concrete footing (`ax .075`), a `whiteDk`
  mast at `.045/.040` with real lit/shadowed faces (**and dimmed 1/0.6/0.85 → 0.95/0.5/0.75**
  — the old one was brighter than the buildings it stood among), and a sheave head
  (`.105/.055`) whose **top face sits exactly at `H`** so the cable emerges from it.
- **`GONDSEG=3` sub-samples per cell.** The first cut sampled the parabola only at cell
  centres, and the probe printed `0 2.533 2.533 0` — a 3-cell span has two interior points,
  and a symmetric parabola puts them at the *same* height. It was a trapezoid with a flat
  bottom, not a curve. Sub-sampling gives `0 1.13 1.97 2.53 2.81 2.81 2.53 1.97 1.13 0`.
- Cabins ride the curve: `gondPos` returns the sag as a 5th element, cabin body/hanger/band
  all offset by it.

**Census** — `+0` on **all 22 metrics**, empty tile histogram, 0 page errors,
`gondLines 15 · gondola 16` unchanged. The pixel-identical control that iter 78 says only
draw-only changes can have.

**⚠ …except `pop` turned out NOT to be bit-reproducible.** A later gate run on the *same*
source printed `pop +2`. I re-ran it twice more **without touching a byte**: `+2`, then `+0`.
So `pop` wobbles by ±2 (≈0.0014%) run-to-run on identical code — a tick lands, or doesn't,
before the snapshot. **A tiny non-zero delta on a draw-only change is therefore NOT evidence
that the seeded stream was perturbed.** The way to tell is to re-run the gate on unchanged
source (90s); do not go hunting for a CA bug over a `+2`.

**Probe** — a histogram cannot see a catenary; per iter 82, *measure the shape.* Across 5
lines × 3 seeds: sag **0 at all 20 towers**, max **2.81px**, cabin-off-cable error ≤ **0.034px**,
0 page errors. Probe deleted.

**Visual** — 6 agents + a 7th attribution agent, and I looked at the tower crop myself first.
- **Tower zoom, ~10× real camera magnification, seeds 42 & 7 (the scale the change lives at
  → the primary verdict):** `VISUAL: PASS` ×2. "Reads as a physical steel tower, not a UI
  line." Footing plants on both asphalt and a green terrace; cable emerges from the head.
- **Downtown at 1:1:** `VISUAL: PASS`, and honestly reported the sag as "present but
  genuinely subtle, 1–2px… I would not swear to it in a blind test." That is the correct
  answer at that scale and I asked for it explicitly.
- **Night (t=0.8):** `VISUAL: PASS`. Towers take the tint; nothing non-emissive outshines
  the windows or the moon.
- **Whole-city, 2 unprimed seeds: `VISUAL: FAIL` ×2** — both flagged "white angular
  polygons / a closed loop floating above the rooftops with no shadow" as a debug overlay.

**The FAILs were not this change — and they correct the ledger.** My cable is `col('ink')`;
theirs was *white*, and *closed*. A closed loop is a **monorail** line. A BEFORE/AFTER
attribution pass confirmed the white loops are **pixel-identical in BEFORE** and that the
only deltas anywhere in the frame are the cable's sag and the masts' new base/cap. So
cue (c)'s attribution to `drawGondAt` was **wrong**: the thing four agents have been calling
UI chrome is `drawMonoAt`'s beam — a **2px pure-`white` (1.02) stroke over a 3.4px `whiteDk`
one, at `RAILH=40`**, straight, unshaded, floating over every roof. Two more agents just
made it six, on a fresh seed, unprompted.

**Perf** — 3 sequential passes, minimum of each scene: `day 31.33 → 31.67ms (+1.1%)`,
`night 37.22 → 35.72ms (−4.0%)`. PASS. Two extra prisms per tower (~21 towers) is free.

**Verdict: SHIPPED.** The cable car is infrastructure now, not chrome.

**Findings**
- **`drawMonoAt`'s beam is the real chrome, and it is now the strongest open cue** (6 agents,
  4 seeds, 3 iterations). The fix vocabulary is already written and proven in this lap:
  dim the stroke off maximum, give the deck an underside, and plant the pylons. Do NOT
  delete it — it is legitimate geometry, same as the gondola was. *Transport × Polish.*
- **A straight line at constant height is the grammar of an overlay.** Sag, taper, a footing
  and a cap are what separate "geometry" from "chrome" — and sag is the cheapest of the four.
  Anything the artifact draws as a long uniform stroke (mono beams, bridge cables, string
  lights) inherits this defect by construction.
- **A parabola sampled at 2 interior points is a trapezoid.** Any curve drawn per-cell in a
  hex renderer needs sub-sampling, because a 3-cell span *only has* two interior cells and
  symmetry forces them equal. The probe caught this; no screenshot at 1:1 would have.
- **Scale-matched verdicts outranked the wide ones again (iter 82's rule), and this time the
  wide agents were right about something else.** Don't discard a FAIL you can't reproduce —
  *attribute* it. A BEFORE/AFTER attribution agent settled in 2 minutes what would otherwise
  have been either a wrongly-reverted iteration or a silently-ignored gate.
- **`TALL` does not exist in `solvista.html`** — the header's iter-84 note implies it does.
  It was a set defined locally inside 84's probe. Rebuild it as `new Set([T.TOWER,T.MID,T.CIVIC,T.COM])`.

## Iteration 86 — the asphalt stops being a smear (2026-07-10)

**Vector** — Urban fabric × **Polish**. Rotation: cue (b) was the ledger's strongest
open cue, volunteered *unprompted* by both holistic agents at iter 84. The other strong
cue (c, the monorail beam) is Transport × Polish and iter 85 was Transport × Polish —
taking it would have repeated **both** axes back-to-back. Urban was two laps back.
The skill's own rule decides it: *if something compounded badly, fix it before adding more.*

**The defect, measured** (`probe-asphalt.mjs` — **gitignored scratch** via `probe-*.mjs`,
like `probe-forecourt.mjs`; recreate it, don't hunt for it in git — reads real canvas pixels at each
tile's screen centre via `__find`, so it measures the *drawn* result after TINT/season/
light, not the `BASE` entry). At 2035 the bare asphalt floor (`p10`) was **99.9** on
*both* seeds against parks at ~170 — and there are **836 road hexes** (seed 42) vs 157
parks, so a fifth of the plate sat at the palette's darkest large-area tone, contiguous.
Worse: the asphalt's *internal* variation was **zero**. Its whole measured `spread` (100.7)
came from trees and lane dashes drawn *on top*. A flat dark field of 836 tiles is exactly
the kelp-coast failure mode, inland.

**Change (draw-only: no terrain, no `rng()`, no new `Math.random()` draw).**
- `road` `[106,101,93]`→`[136,133,126]`, `roadArt` `[86,82,75]`→`[116,113,107]`. Lighter
  and de-browned (r−b 13→10), **preserving the 20-luminance arterial-is-darker gap** that
  is the trunk's visual language.
- `RDF=[0.93,0.965,1.0,1.035,1.07]`, indexed by `hashCell(x,y,seedNum^0xA5FA)` — asphalt
  resurfacing patches. **Quantized to 5 steps on purpose:** `col()` caches on `name|f`, so
  a *continuous* jitter would blow the cache to one entry per road hex. 5 steps × 2 names
  = 10 entries. Drawn at the existing `1.02` bleed, so a patch laps its neighbour and the
  seams read as joins, not as a grid.
- lane-dash `globalAlpha` `0.55`→`0.62`: the cream dash loses contrast on lighter asphalt
  (Δ70→Δ53 against the surface; 0.62 restores it to Δ60).

**Census** — `+0` on **21 of 22** metrics, `pop +2` (iter 85's documented non-reproducible
wobble), empty tile histogram, 0 page errors. VERDICT: PASS. Exactly the signature a
draw-only change should have.

**Probe (after)** — bare-asphalt floor `99.9 → 122.2`, *identical on both seeds*. PARK−ROAD
mean gap `44.0 → 26.6` (seed 42) and `37.7 → 21.3` (seed 7). `PARK`, `RES` and `MEADOW`
readings came back **byte-identical**, which is the proof the change touched only asphalt.
The floor landing at **122.2 rather than 133** is the mottle confirming itself: that is the
`0.93` step, not the `1.0` one. A histogram cannot see a tone — per iter 82, *measure the shape*.

**Visual** — 2 agents, 6 frames, incl. a **night** frame and a **2005/sparse-road** frame
(the two ways this change could have failed: glowing at night, or vanishing into terrain
when roads don't yet form a mass). Both PASS. Seed 42's agent independently described the
BEFORE as "a dark, warm brown mass that dominates the negative space" — a **third**
unprompted confirmation of the cue. Both called the mottle "resurfacing patches", not a
checkerboard. I read the night frame myself (the one risk case): streets stay muted
violet-grey, clearly darker than the lit windows.

**Verdict: FIXED.** The interior reads as sun-bleached asphalt; the parks have their
contrast back. Cue (b) is closed.

**Findings**
- **`__find` returns BOTH grid and screen coords** — `{x,y,sx,sy}`. `h.x ?? h.sx` silently
  samples grid cell `(22,0)`, not the screen, and every probe reads black. Use `sx`/`sy`.
  (Cost me one debug round; `getImageData` on `#stage`'s own 2d context works fine.)
- **A per-cell tone jitter must be quantized, because `col()` memoizes on `name|f`.** Any
  future "vary this surface per hex" move (roofs, sand, grass) inherits this constraint.
- **The palette entry is not the drawn tone.** `road` L=101.6 in `BASE`; measured floor
  99.9 after TINT. Close here, but probe the *canvas*, not the array.
- **`p10` is the honest read of a ground tone**, not `mean` — the mean is polluted by
  whatever is drawn on top of the tile (trees, dashes, lamps).
- Agents read the **`SPECIMEN nn`** caption in the UI and will report *that* as the seed
  ("seed-16" for `seed=42`). Not confabulation — don't discount a verdict over it.

## Iteration 87 — the monorail stops looking like a UI overlay (2026-07-10)

**Vector** — Transport × **Polish**. Cue (c) was the best-evidenced open cue in the
ledger: **six agents, four seeds, three iterations** (79/84/85), unprimed, calling
`drawMonoAt`'s beam "stadium markings" / "a selection overlay" / "a debug overlay
floating above the rooftops with no shadow." Iter 85 proved the attribution with a
BEFORE/AFTER pass and deferred the fix only because it had just spent its lap on the
gondola; iter 86 deferred it again to avoid repeating both axes. Urban intervened, so
Transport is no longer back-to-back.

**On the kind repeating a fifth time.** 83/84/85/86 were all Polish and so is this. I
took it deliberately: **both** remaining strong cues (the monorail beam, the floating
rainbow) are Polish cues, so there is no cue-driven lap that isn't. The skill's own
tiebreak decides it — *if something compounded badly, fix it before adding more* — and
shipping a shallow Nature element purely to rotate the kind is exactly the "one more
shallow feature" it warns against. The kind axis should rotate at **88**; the city has
now closed both of the defects that were disfiguring it at city scale.

**The defect, already measured by iter 85.** The beam was a **2px pure-`white`(1.02)
stroke over a 3.4px `whiteDk`(0.85) one** at constant `RAILH=40` — dead straight,
unshaded, uniform, floating over every roof, and **brighter than any building in the
city**. Its closed loops are what agents kept calling "outlined polygons". The pylons
were `prismS(...,0.045,0.045,0,RAILH,...)`: uniform full-bright sticks terminating on
the asphalt with no footing and no head. Straight + uniform + unsupported + maximally
bright *is* the grammar of a vector overlay. The artifact was drawing a ruler.

**Change (draw-only: no terrain, no `rng()`, no `hashCell`, no new `Math.random()` draw).**
Applied iter 85's proven gondola recipe — *dim off maximum, give the deck an underside,
plant the pylons* — with one deliberate departure.
- **`RAILH` is now defined as the beam's SOFFIT**, not a vague reference height, and
  `BEAMD=3.4` is the girder depth. Stating the datum is what makes the pylon head and
  the beam underside meet by construction rather than by tuning.
- **The beam is a solid, not an outline.** One wide `whiteDk(0.5)` body stroke spanning
  soffit→deck (the shadowed side *and* the underside read as one dark mass), capped by a
  1.6-world `whiteDk(0.95)` deck. Peak tone drops **255 → 217**, so it is no longer the
  brightest thing in the frame; the buildings win again.
- **`monoPylon()`**: `creamDk` footing (`ax .072`) → `whiteDk` mast at `.046/.040` with
  real lit/shadowed faces → a wider `.10/.052` pier head **whose top face sits exactly at
  `RAILH`**, so the girder rests on it. The station post was dimmed to the same mast tones.
- **No sag** — and that is the departure. A haul rope sags; a **rigid box girder does
  not**. Iter 85's header note ("sag is the cheapest of the four") is true of *cables*;
  transplanting it here would have drawn a wrong bridge. For a rigid span the other three
  cues — thickness with an underside, shading, a footing and a cap — must carry the whole
  load, and they do.
- Resolution check first, per iter 77: deck `1.6 world × 0.73 = 1.17 device px`. Above the
  ceiling. The 3.4-world body is 2.5 device px.

**Census** — `+0` on **all 22 metrics** (pop 144403, roads 5752, arterials 856…), empty
tile histogram, 0 page errors, `monoLines 11 · monorail 19` unchanged. VERDICT: PASS. The
pixel-identical control that iter 78 says only a draw-only change can have — and it came
back exactly flat, without even iter 85's ±2 `pop` wobble.

**Visual** — BEFORE control from `git show HEAD:solvista.html` at identical clip coords
(iter 77's rule for any line-weight/colour change), 3 agents, both seeds, and I read the
downtown crop myself before spawning any of them. All named the confusable elements
(gondola cables, gold arterial centre lines, the rainbow) and were forbidden to report them.
- **Downtown zoom, the scale the pylons live at → the primary verdict** (iter 82's rule):
  `VISUAL: PASS`. Footing/mast/head all read; "the beam underside sits on the pier heads
  with no visible floating gap and no head poking up through the deck."
- **Whole-city, seeds 42 and 7:** `VISUAL: PASS` ×2, and this is the line that closes the
  cue — both said, in their own words, that the AFTER beam reads as **elevated
  infrastructure rather than UI chrome**. Seed 7's agent volunteered the diagnosis
  unasked: *"the worst blowout (the white line) was the thing fixed."*

**Perf** — 3 sequential passes, minimum of each scene: day `31.33 → 31.78ms (+1.4%)`,
night `37.22 → 35.89ms (−3.6%)`. PASS, and within 0.2ms of iter 85's reading for the
structurally identical change (two extra prisms on ~40 pylons is free). Run this lap
rather than deferred to 89's step-back because the lap touched the per-frame draw loop.

**Verdict: SHIPPED.** Cue (c) is **CLOSED**. Both of the city-scale defects the holistic
passes kept surfacing — the dark asphalt (86) and the chrome beam (87) — are now fixed,
and the aerial systems finally share one visual language: the gondola sags because it is a
rope, the monorail does not because it is a girder, and both are planted.

**Findings**
- **The "overlay grammar" checklist generalizes, but its items are not interchangeable.**
  Sag / shading / footing / cap separate geometry from chrome — however **sag is a property
  of the member, not of the fix.** Ask what the thing *is* before borrowing the previous
  lap's recipe wholesale. The remaining long uniform strokes (bridge cables, string lights)
  each need this question asked separately.
- **Name the datum in a constant.** Renaming `RAILH` from "the height the beam is near" to
  "the height of the beam's soffit" turned a two-magic-number junction (`-RAILH-1.2`,
  `-RAILH-2`) into one that closes by construction. The old code's pylon top at `RAILH` sat
  *inside* the beam it was supposed to support, which is precisely why nothing looked planted.
- **Two brightest-object bugs in three laps** (86's asphalt floor, 87's beam ceiling) were
  both found by asking *what is the extreme tone in this frame, and has it earned that*.
  That question is cheap and neither the census nor a primed screenshot agent asks it.
- **A cue's attribution can be wrong while the cue is right.** Cue (c) blamed the gondola
  for three iterations; 85 corrected it to the monorail and 87 fixed it. Six agents were
  right about *what they saw* and wrong about *what it was* — which is the argument for
  BEFORE/AFTER attribution passes over verdicts.

**Follow-ups:** cue (a), **the floating rainbow** (`L4166`, drawn in screen space; a leg
ends mid-air over open ocean at seed 7), is now the **only** strong open cue and the
obvious Sky × Polish lap. Standing leads, all still open: 77's `treed`-on-`c.flow`
boulevard retarget (allées still line `busy`, not the arterials — Transport × Deepen),
78's dogs-on-sidewalks (`strollable()` still park-bound), 73's corner-lot side choice,
76's REDWOOD closure. **Iteration 89 owes the holistic step-back** (84 + 5).

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

## Iteration 103 — the houses stop copying each other, city to city (2026-07-10)

**Vector** — Urban fabric × **Polish** (a FIX). This closes open cue **(f)**, banked by iter 99
when it fixed the identical pair of defects in `MID` and measured — but did not fix — them in `RES`.
Rotation pointed at Sky/People, and I went looking there first; the survey below is why I turned back.

**Change.** Three lines in `drawBuilding`'s `RES` branch (L3392–3400 → L3392–3409):
- `bodyN=v<0.5?'terra':'cream'` → `mv=hashCell(x,y,seedNum^0x5C31)`, `tone=mv*0.72+v*0.28`,
  `bodyN=tone>0.56?'cream':(tone>0.27?'terra':'sandDk')` — the same shape as iter 99's `MID` fix,
  thresholds solved to hold a ~40/40/19 split rather than gutting cream.
- roof `hashCell(x,y,7)` → `hashCell(x,y,seedNum^0x7A9F)`.
- chimney `hashCell(x,y,5)` → `hashCell(x,y,seedNum^0x5C05)`.
- The prism's front face read `col(bodyN==='terra'?'terra':'cream',1)` — a no-op ternary while
  `bodyN` had two values, and a **latent bug the moment a third arrives** (every `sandDk` house
  would have worn a cream face). Now `col(bodyN,1)`.

Draw-only: `drawBuilding` calls no `rng()`, and `bodyN`/`roofN` feed no `rng()`-gated predicate.

**Census — PASS**, and provably stream-neutral. **Every tick-derived metric is exactly +0** and the
**tile histogram is empty**: `parks`, `towers`, `roads`, `developed`, `tileKinds`, `bridges`,
`greenRoofs`, `tallTowers`, `helipads`, `boulevardTrees`, `avenues`, `arterials`, `promenade`,
`stations`, `cafes`, `schools`, `stadiums`. The only movers are the three **frame-count-dependent**
metrics, and they wander in both directions across runs of *identical* code (see finding 2):
run 1 `pop −3 · towerHt −1 · solarRoofs +2`; run 2 `pop +6 · towerHt +1 · solarRoofs +0`.

**Probe.** `probe-restone.mjs` (now `git add -f`'d — the header's rule). Two questions, both answered
from the live page's own `hashCell`/`cells`/`seedNum` (bare-named — iter 96's law), and it scores the
**old and new schemes in the same run**, so one pass on either revision reports before *and* after:
- `corr(body is cream, height field v)` over every `RES` cell, era 2035:
  **0.889 / 0.868 / 0.871 → 0.240 / 0.219 / 0.253** (seeds 7 / 42 / 1234). Iter 99's post-fix `MID`
  band is 0.19–0.31, so `RES` now sits inside it.
- **cross-seed agreement** on cells that are `RES` in *both* seeds — 100% means every city paints the
  identical pattern. **Chimney: 100.0% / 100.0% / 100.0% → 59.5% / 67.9% / 57.9%.** Roof:
  61.9 / 80.4 / 93.0% → 14.3 / 26.8 / 21.1%.
- Body share: `terra 50/cream 50` → `terra ~41 · cream ~40 · sandDk ~19`.

**Visual — PASS, 2/2.** Seeds 42 and 7, un-zoomed whole-city **before/after pairs**, one agent each,
told not to enhance. Both found the third shade visible and warm, "blends into the existing earthy
palette rather than muddying it"; no z-order tears, no floating tiles, no blown-out colour; houses
still locked to the hex grid. Both independently confirmed **nothing but house body colour changed** —
seed 7's agent read the whole stat bar identical (`2035 · 35,200 · 71 · 64 · 179 · 33 · 18 · 49% ·
56% · 37%`), seed 42's read towers 76 / tallest 54 / parks 201 unchanged. That is the visual
corroboration of the census's stream-neutrality claim.

**Verdict: SHIPPED.** Cue (f) is **CLOSED**.

### Findings

- **⚠ THE CUE'S CLAIM WAS *NEARLY* RIGHT, AND THE NEAR-MISS IS THE INTERESTING PART.** Cue (f) said
  "every seed paints the identical RES roof pattern." Measured, the roof agreed only **61.9–93.0%**
  across seed pairs — because `roofN`'s first branch keys off `bodyN`, which keys off `v`, which
  **is** seeded. The literal-salt draw `rv` was identical in every city; the *rendered* roof leaked
  a little seed through its dependence on the body. **The clean demonstrator was the chimney**
  (`hashCell(x,y,5)`, no `v` term at all): **100.0% agreement on all three seed pairs.** Lesson:
  when auditing a seed-independence breach, **measure the term with no seeded dependency** — a
  downstream consumer can launder a constant into something that looks seed-varying.
- **⚠ A SINGLE STASH-CONTROL RUN CAN FRAME YOUR OWN CHANGE (corrects iter 97's recipe).** Iter 97
  established: suspect a small non-core delta → `git stash` the edit, re-census pristine HEAD, see if
  the delta persists. I did that; pristine read **exactly +0** on `pop`/`towerHt`/`solarRoofs` while my
  edit read `−3/−1/+2`. By that recipe my change was guilty. It was not: **re-running the census on
  the unchanged edited file gave `+6/+1/+0`** — the same metrics moving the *other* way. `pop` and
  `towerHt` read `c.h`, which **grows at draw time** (iter 98), and `solarRoofs` quantizes a salt off
  the float `year` (iter 97) — all three are functions of *how many frames rendered* in the census's
  500ms settle, i.e. of machine load. The pristine run's `+0` was luck: it happened to match the load
  under which the baseline was captured. **The control for a noisy metric is running the SAME code
  twice, not one run of each.** Compare the perf gate's rule (three passes, take the minimum) — the
  census needs the same discipline on its three draw-time metrics, and only on those.
- **The stream-neutrality proof is a PARTITION, not a zero.** A draw-only change does not produce
  "all +0"; it produces **+0 on every metric derived from `tick()`** and noise on exactly the three
  derived from frame count. Reading the census as one number hides this. The partition is the proof:
  an empty tile histogram plus 17 exact zeros says the seeded stream never moved, whatever `pop` does.
- **⚠ SKY & ATMOSPHERE IS ADDITIVELY SATURATED, AND ITS EMPTY `New CA rule` CELL IS A TRAP.** The
  rotation bullet sent me to Sky. Before designing anything I grepped the seams, and found Sky is the
  most densely built domain in the artifact — most of it **unrecorded by this ledger** (step 1's law:
  the ledger is the loop's memory, *not the artifact's inventory*). Already there: a full **marine
  layer** (`fogDepth`/`fogAt`/`FOGR`/`rSea`, with a `reachFill` distance field off every wet cell, a
  dawn clock *and* a seeded multi-day fog spell), showers, clouds, stars, a moon, a **shooting star**,
  a seeded **`WINDA` gust field** that the washing lines flap to — and a **sweeping lighthouse beam**.
  I nearly shipped, in order: sea fog (exists), a unified wind (exists), and a lighthouse beam
  (exists — the tooltip has promised "sweeps the bay at night" all along, and it delivers). **Sky's
  `New CA rule` cell is empty because sky is not cellular** — its state lives in screen space and in
  time, not on the hex grid; the one grid-shaped sky idea (fog pooling on terrain) was already taken
  by `rSea`. Do not treat that empty cell as an invitation. Sky's remaining kinds are **Deepen /
  Polish / Interaction**, same as Water and Nature.
- **Rotation is a tiebreaker, not a mandate.** Three of seven domains (Nature, Water, Sky) are now
  measured-saturated on additive kinds, so "stalest domain" increasingly points at places with nothing
  cheap left to add, while a *specified, measured, invariant-breaking bug* sat open in the hottest
  domain. The bug won. When the rotation bullet and an open cue disagree, **prefer the cue that comes
  with a number attached** — and log the survey that made you turn back, because that survey is the
  expensive part and it is exactly what the next fresh process cannot re-derive cheaply.

## Iteration 104 — the crowds find the shopfronts (2026-07-10)

**Vector** — People & activity × **Deepen**. Rotation pointed here on both axes at once: People was
the stalest domain (last vector 93) and Deepen the coldest kind (last at 95), with 103 warning off
Polish. No cue was open on People, so this is a seam-led vector, not a cue-led one.

**The seam.** `PEDDEST` — a Set literally named "pedestrian destinations" (shops, markets, plazas,
institutions, greens) — existed for one purpose: `kerbDir` used it to decide which way a ped standing
on a kerb turned to **face**. No resident had ever *walked* toward one. Peds random-walked over open
ground, re-anchoring wherever they landed. The city had a notion of what its people wanted and never
let them go and get it.

**Change.** Two edits, ~35 lines.
- **`c.buzz`, a new derived field** (`tick()`, beside the bus-stop pass): `ATTRACT.has(c.t)?2:0` plus
  a count of `ATTRACT` neighbours, where `ATTRACT = {COM, MARKET, CIVIC, STADIUM, PLAZA}`. Pure
  terrain derivation — no `rng()`, no terrain change — recomputed each tick as shopfronts open.
  Generalizes the `cafes` stat (a park hex facing a shop) from one tile type to the whole plate.
- **`stepPed` climbs it.** Among the neighbours a ped may *legally* enter, it now picks one with
  weight `1+BUZZW*buzz` (biased, not routed — nobody pathfinds). Two terms then hold it there: on a
  lively hex it re-decides more slowly (`BUZZDWELL`) and steps on less often (`BUZZSTILL`). That is
  what turns a market or a parade of shopfronts into a *standing crowd* rather than a place peds
  merely pass through. `BUZZMAX=3, BUZZW=1.6, BUZZSTILL=0.55, BUZZDWELL=1.3`.
- **The `legal/6` factor is load-bearing.** See the finding below — without it the tuned street
  occupancy blows out.
- **Dogs came along for free.** A leashed dog rides its owner's hex (iter 93), so residents now walk
  their dogs to the shops with no code at all.

**Census — PASS**, and provably stream-neutral by iter 103's **partition**: **every tick-derived
metric is exactly +0** and the **tile histogram is empty** (`parks`, `towers`, `roads`, `developed`,
`bridges`, `tileKinds`, `civicKinds`, `transportModes`, `solarRoofs`, `greenRoofs`, `towerHt`,
`tallTowers`, `helipads`, `boulevardTrees`, `avenues`, `arterials`, `promenade`, `stations`, `cafes`,
`schools`, `stadiums`). Only `pop` moved: **+3 of 150,206** (0.002%), the frame-count metric. 0 page
errors. The buzz pass reads terrain and writes only `c.buzz`; `stepPed` draws only `Math.random()`.

**Probe.** `probe-buzz.mjs` (`git add -f`'d). Re-implements HEAD's `stepPed` as `stepOld` and runs
**both policies on one page load from the same ped snapshot**, stepped a **fixed number of steps**
(not a fixed wall time), so machine load cannot skew it. Both policies run **twice** and are averaged
— the control is stochastic (see findings). Time-averaged over 3 seeds, era 2035:

| | before | after | |
| --- | --- | --- | --- |
| street occupancy, kerbs **fronting a shop** | 8.5% | **14.0%** | **+64%** |
| street occupancy, **dull lanes** | 10.3% | **8.1%** | **−22%** (down on all 3 seeds) |
| peds with an attraction in their ring | 16.7% | **26.2%** | **+57%** |
| mean `c.buzz` of the hex a ped stands on | 0.22 | **0.39** | **+74%** |
| street occupancy, **total** | 18.8% | 22.0% | *noise — see findings* |

**Visual — PASS, 2/2.** Seeds 42 and 7, **before/after pairs** at `warp=61&t=0.3&step=300` (`__step`
runs `advanceEntities`, so the crowd gets 300 sim-seconds to settle — a static shot of a
*distribution* change is meaningless without it). Zoomed `--shots downtown` per iter 93's law that
entity-vs-entity vectors are invisible wide, plus un-zoomed wide frames. One agent per seed, told not
to enhance. Both independently reported denser knots on the market rows, the plaza/civic dome, and
shop-fronted kerbs, with **emptier park interiors and residential lanes** — i.e. they described
`st:dull −22%` without being told it existed. Both found no z-order tears, no floating tiles, no
figures on rooftops or water, no blown-out colour. Both confirmed the wide frames were otherwise
**pixel-identical**, reading the whole HUD stat bar unchanged (seed 7: `2035 · 35,200 · 71 · 64 · 179
· 33 · 18 · 49% · 56% · 37%`) — the visual corroboration of the census's stream-neutrality claim.

**Perf — PASS, and the gate is lying by +5.5%.** 3 sequential passes: day 33.16/33.11/33.17ms,
night ~37.3ms — a **stable** offset (no rising trend), which by iter 99's rule means code, not load.
So I ran iter 99's stash-control on **pristine HEAD** under the same load: day **33.00/33.06/34.17ms**.
Taking the minimum of each, **this vector costs +0.11ms (+0.3%)**; the other +5.3% is a **stale
baseline** pinned 2026-07-09, before iters 100–103 landed. Logged in the header rather than silently
re-pinned — `polish-tile` owns that file.

**Verdict: SHIPPED.**

### Findings

- **⚠ THE PLAUSIBLE NAME WAS THE WRONG LIST — and it made the feature actively worse.** The first
  build counted `PEDDEST` neighbours. The probe read street occupancy **18.3%→15.4%**: it *drained*
  the streets. `PEDDEST` is mostly the open ground the ped is standing on, and **parks are large and
  adjacent to themselves**, so a park *interior* outscored a kerb outside a row of shops — the field's
  argmax was the middle of a lawn, and the walk dutifully climbed to it. The two questions look
  identical and are not: `kerbDir` asks *"what do I turn to face"* (a park, correctly); an attraction
  field asks *"what do I cross a block to reach"*. `ATTRACT` is the second list, and it works
  precisely **because most of it cannot be stood on** — a building can only ever raise the buzz of the
  ground around it, which is the café edge and the shopfront kerb where a crowd belongs. **Check what
  a Set's existing call sites ask of it before reusing it; the name is not the specification.** The
  probe caught this in one run, before any screenshot.
- **⚠ WHEN A METRIC IS TOO NOISY TO GRADE A VECTOR, PARTITION IT — DON'T AVERAGE IT HARDER.** Street
  occupancy is stochastic (130 peds × `Math.random`): `stepOld` read **21.4%** and **17.4%** on
  identical bytes and the same seed, a **3.0–5.3 point** control spread — wider than this change's
  whole aggregate effect (+3.2). The total could neither convict nor acquit. Splitting it along the
  *mechanism I was claiming* dissolved the problem: shopfront kerbs **+64%**, dull lanes **−22%**,
  both sign-consistent across all three seeds. The scary aggregate ("streets 19%→22%, you flooded
  them") and the true result ("peds left the lanes for the shops") are the same number. This extends
  iter 103's law — *run the same code twice* — from **machine-load** noise to **sampling** noise, and
  `probe-buzz.mjs` now runs each policy twice by default and prints the control spread with the
  warning that a smaller delta is not a result.
- **A random walk can be biased without changing how often it moves.** `stepPed` used reject
  sampling: draw 1 of 6 directions blind, stay put if it's a wall. So `P(move) = step·(legal/6)`,
  quietly. The obvious way to add a bias — pick from the *legal* set — makes every ped move 2–3×
  more and would have blown the occupancy the PEDLEASH comment says was tuned by measurement
  (0.45→14%, 0.15→28%). Multiplying the step roll by `legal/6` restores the original marginal
  **exactly**, so the field changes only **where** peds go, never **how often**. Compare iter 98's
  law (express a vector as a *property* of a thing, not a *decision* about which things exist): here
  the same discipline applied to a *rate* is what let a behaviour change stay provably neutral.
- **A stale perf baseline spends the next iteration's budget.** The gate read +5.7% day for a change
  that costs +0.11ms, because pristine HEAD already reads +5.3% against a baseline pinned four
  iterations ago. A gate that has drifted a third of the way to its own threshold will eventually
  fail on innocent code, and then nobody will trust it (the hexagon-plate lesson, arrived at from the
  other direction — that one left the baseline stale by *scaling the plate*; this one left it stale by
  simple accumulation). **Control against pristine HEAD, not against the baseline file** — a stable
  offset means code, but it may be *earlier iterations'* code.
- **The interconnect was free where the ledger promised it would be.** Iter 93 established that a
  leashed dog rides its owner's hex and inherits `pedWalk`'s legality. Nothing in this vector mentions
  dogs, and residents now walk them to the shops. That is the payoff of the Deepen kind, and the
  reason the header calls it the highest-yield move: the third and fourth systems come for free once
  two are wired together.

## Iteration 105 — the lines name themselves (2026-07-10) [holistic step-back]

**Vector** — Transport × **Interaction/UX**. Rotation pointed at both axes at once: Transport was the
stalest domain (last vector 94) and its `Interaction/UX` cell was **empty**, while 104 warned off
Deepen and 103 off Polish. The cell was empty for a reason worth recording — see the seam.

**The seam.** `ENTINFO` — the hover surface — carried streetcars, trucks, cyclists, ferries, whales,
dogs. It did **not** carry the **monorail trains** or the **cable-car cabins**. Nor did `TILELABEL`
carry the guideway or the cable. So the city's two flagship transit systems, the ones U4 went to the
trouble of making *plural*, were the only moving things in Solvista that **could not be named by
pointing at them.** And nothing anywhere could answer the question those systems actually raise: a
183-span loop leaves the frame — *where does it go?* Extent is the one property of a transit line you
cannot read off any single hex.

**Change.** Draw-only, ~45 lines, three edits.
- **Two `ENTINFO` rows**, with flattening getters (`monos.flatMap(m=>m.closed?m.trains:[])`,
  gondolas likewise gated on `path.length>1`, so a line that hasn't broken ground yields no cabins).
- **`sub` may now be a function.** `consider()` resolves `typeof sub==='function'?sub(e):sub`, so a car
  describes **the line it belongs to** rather than its species: *"Line 3 of 3 — a 183-span loop with 30
  stations."* / *"An aerial line — 9 spans over the low-rise strip."* Counts are read live off
  `m.path`/`m.stops`, never stored. A `plur()` helper handles the stubby lines that really occur.
- **The route trace.** Hovering a train or cabin strokes its whole line, drawn last (beside the
  copters, the existing "over the scene" precedent): monorail along the beam deck and closed onto its
  tail; cable **sub-sampled 4× per span through `gondSag`** so the trace lies on the rope's catenary
  rather than its chord. Station pips at `m.stops`; terminal pips at the cable's two ends. `stamp()` on
  the **middle** car — so the pick point is the train's center, not its nose — buys the focus ring free.

**Census — PASS, and stream-neutral by iter 103's partition.** **Every metric +0**, including `pop`
(150,206 → 150,206), and the **tile histogram is empty**. 0 page errors. The vector draws no `rng()`,
touches no terrain, adds no entity array — so `__census()` needed no new tally, per the
census-sprawl rule. Nothing to add, nothing added.

**Visual — PASS, 3/3 agents.** Full-frame **hover-vs-control pairs** at seeds 7 and 42, both systems.
Two agents (one per seed) independently confirmed: no trace in the control, trace on hover, routes
locked to the hex axes, pips on the line, no z-order tears, and — the step-back's cumulative question
— the city still reads balanced and bright, coast and downtown clean. **Both then volunteered the same
complaint unprompted:** the trace "reads as a dark line with a faint pale seam." Fixed by iter 101's
law and re-verified by a third agent (below).

**Perf — PASS, and the baseline is re-pinned.** 3 sequential passes, day 33.28/33.22/33.39ms. Against
iter 104's pristine-HEAD control (min 33.00ms) this vector costs **+0.22ms (+0.7%)** — and costs
*nothing* headless, since `hoverEnt` is null with no cursor and the trace block never runs. The gate's
+6% was the stale 2026-07-09 baseline the header flagged. **This step-back re-pinned it**
(`perf.mjs --save-baseline` → day **33.16ms**, night **37.33ms**), closing that warning.

**Verdict: SHIPPED.**

### Findings

- **⚠ A "LINEAR FEATURE" POLISH LAW JUST GOT ITS SECOND CONFIRMATION — and two agents found it before
  I did.** The trace shipped as a 2.8px ink halo (α.40) under a 1.2px cream core. Both visual agents,
  independently, reported the line read *dark*. That is exactly iter 101: **for a linear feature,
  legibility ≈ contrast × WIDTH** — the halo was 2.3× the width of the thing it was backing, so the
  halo *was* the line. Fixed by inverting the ratio's intent, not the colors: halo to 3.4px @ α**.34**
  (softer, wider) and the **core to 1.9px @ α.74–.92**. A third agent confirmed C-vs-A now reads as
  "a pale cream ribbon with a dark backing" and that nothing was smothered. **When two independent
  reviewers volunteer the same unrequested complaint, that is data, not taste** — spend the extra
  agent.
- **A MOVING ENTITY CANNOT BE HOVER-TESTED FROM STALE COORDS.** The first probe hovered a *Street* on
  both seeds and looked like a total feature failure. Two causes, both in the probe: (1) `__ents`
  returns **screen** coords (`e._sx*scale+offX`) — `e._sx` alone is **world**, and I'd used it; (2)
  trains and cabins *move*, so coords sampled before the control screenshot are ~1s stale by the time
  the cursor arrives. The fix is the general one for any hover test on a moving target: **re-sample,
  move, then VERIFY the tooltip title equals the entity name, and retry on fresh coords** (8 tries).
  Do not screenshot a hover you have not confirmed landed — a missed hover and a broken feature
  produce the identical frame.
- **`sub`-as-a-function is the reusable half of this vector.** Any future entity whose interest is its
  *membership* (a ferry's route, a truck's depot, a bus's line) can now describe itself from live
  state with no new mechanism — one `typeof` check in `consider()` bought it. Static strings still work
  unchanged; nothing else in `ENTINFO` moved.
- **The empty grid cell was empty because the tooltip is `ENTINFO`-shaped.** Transport's Interaction/UX
  cell stayed cold for 100 iterations not because transit was uninteresting but because the two systems
  worth interrogating were **not entities in any array the hover surface walked** — they are nested
  inside `monos[].trains` / `gonds[].cabins`. **A cold rotation cell can mark a structural gap, not a
  lack of ideas.** Worth checking, next time a cell resists.
- **`probe-lineshot.mjs` is `git add -f`'d** (per iter 101: `probe-*.mjs` is gitignored, so ledgers that
  say "reuse the probe" cite tools the repo doesn't carry). It shoots full-frame hover/control pairs
  with the verify-retry loop above; `--longest` picks a car on the line with the most spans, because
  a stubby 2-span loop proves nothing about a trace.
- **Stubby lines are real.** Seed 7's three loops are 89, **2**, and 183 spans; a 2-span "loop" would
  have rendered *"1 stations"*. `plur()` exists for that. A closed monorail loop is **not** guaranteed
  to reach `minLen` — `homing` closes it early — so never assume a generated line is large.

## Iteration 106 — the harbor gets its arm (2026-07-10)

**Vector** — Water & coast × **New element**. Water was the stalest safe domain (last vector 97; Sky
is staler but 103 surveyed it as additively saturated and its empty CA cell as a trap). I passed on
Water's three cold *kinds* and should say why: **Connect** in this domain means a corridor, and iter
101's law kills 1-hex corridors; **New CA rule** would have been a sediment/accretion pass, which is
the same shape as iter 90's dunes; **Scale** is a structural lever, not a lap move.

**The seam.** `genWorld` sites harbor works — three `IND` warehouses on the coast highway at
`harborY` — and then anchors a container ship off them, with the comment *"rides at anchor in the
roadstead, **waiting on a berth**"*. There was no berth, and no shelter: the city's shipping lay in
open swell. A harbor is the one coastal structure Solvista named in its own source and never built.

**Change.** Draw-only, ~40 lines. The pier and the wind turbines showed the pattern: a structure in
the sea need not be a *tile*. `moleSet` (a `Map` keyed by `idx`) is laid in `genWorld` after the
turbines — straight seaward along a hex row for 6–8 cells from the first ocean cell of the row, then
hooking 3–4 cells across the harbor mouth on a SE/SW diagonal (`dx = y&1`, never a square column) —
and `case T.WATER` draws it. Rooted on the side of `harborY` the pier is *not* on; `hashCell` for
length and side, **no `rng()`**. A dark wet-stone mound under a pale cap walk, armour blocks tumbled
at the foot, surf breaking along the front, and a white **harbor light** with a red lamp at the head.
`Breakwater` / `Harbor light` added to the hover surface (it is drawn *over* the ocean, so like the
pier it must be named before the tile under it). New palette pair `stone`/`stoneDk`.

**Census — PASS.** `pop` **+0** (150,208), `roads`/`developed`/`towers`/all others **+0**, 0 page
errors. Tile histogram: **KELP 108→105, WATER +3** — the mole's root cells are beach-adjacent, which
is exactly where kelp seeds, so the kelp pass now skips `moleSet` (nothing takes root under rubble).
That is the vector's only terrain touch and the only intended histogram move. No new census metric:
no tile type, no entity array, so `__census()` needed nothing (census-sprawl rule).

**Shape probe — 16 seeds.** `probe-mole.mjs` (**`git add -f`'d**) checks every consecutive pair of
mole cells is a true hex neighbour, that the root's west neighbour is `BEACH`, that there is exactly
one head, and that the anchored freighter's `seaXFr` lands inside the arm. **16/16 contiguous,
16/16 rooted on sand, 12/16 ship-inside** (the other 4 are short arms that never reach the ship's
row, so the test is undefined, not failed). Both defects below were caught by it or by a zoom.

**Visual — PASS, 2/2 agents**, after one **FAIL** and a fix (below). Tight clips on the mole (day +
night) plus un-zoomed whole-city frames at seeds 7 and 42. Both agents: arm touches the sand, reads
as one unbroken run, no z-order tears, harbor light present, red lamp lit at night, and the whole
frame still reads balanced and bright with a clean coastline.

**Verdict: SHIPPED.**

### Findings

- **⚠ A STRUCTURE'S TONE MUST SEPARATE FROM EVERY SURFACE IT CROSSES — not just the one you pictured
  it on.** The mole first drew in `whiteDk`, copied from `ROCK`'s granite. `ROCK` sits on **grass**;
  the mole spans **sand then sea**. `whiteDk` (lum 220) against `sand` (221) is invisible, so the arm
  dissolved into the beach and appeared to *begin* where it reached blue water — the seed-7 agent
  failed it as **"floats detached in open water, not thrown out from shore."** It was attached the
  whole time; `probe-mole.mjs` proved the root cell abutted `BEACH`. The bug was tonal, not
  geometric. Fixed with a `stone`/`stoneDk` pair (lum **122/92**) chosen to clear **both** backgrounds
  — sea 155, sand 221 — plus a pale cap walk for internal contrast. This is the third law in the
  family after iter 100 (ornament averages into tone) and 101 (contrast × width): **check a new
  element's tone against every background it will actually cross, and if it spans two, it must clear
  both.** A palette name that reads beautifully in one biome is not a palette choice.
- **⚠ AN AGENT REPORTING A GEOMETRIC DEFECT MAY BE REPORTING A TONAL ONE.** "Detached", "floating",
  "not connected" is what *invisible* looks like from the outside. Before you rewrite the geometry,
  **measure it** — the probe took 3 minutes and no tokens, and said the geometry was already right.
  Had I trusted the verdict's literal words I would have moved the root inland and broken it.
- **A PATH BUILT BY "ADVANCE, THEN TEST" SKIPS A CELL AT EVERY JOINT.** The straight run ended with
  `path.push([x,y]); x++` — leaving `x` one **past** the last cell laid — and the hook then added its
  own `dx` on top of that. Seeds 5 and 99 laid arms with a one-cell hole (`[56,27]→[58,26]`); seeds 7
  and 42 were saved only by row parity making `dx=0`, so the two seeds I was watching looked perfect.
  **Keep the cursor on the last cell you laid, and test each step before taking it.** Any future
  multi-segment path (a jetty, a causeway, a spit) has this trap, and it hides behind parity.
- **The pier/turbine pattern is the cheapest way to build in the sea.** A `Map` keyed by `idx`, laid
  in `genWorld` with `hashCell` only, drawn from `case T.WATER`, named in `describeTile` before the
  tile under it. No tile type, no entity array, no `rng()` draw — `pop` came back **exactly +0**.
  Reach for it before adding a `T.*` constant. (It is not *quite* stream-neutral here only because
  the kelp guard changes 3 cells; a structure that avoids beach-adjacent water would be exactly 0.)
- **`shoreAt(y)` is the first ocean cell of the row** (`x>=sh` → WATER, `sh-3..sh-1` → BEACH), so it
  is the right root for anything thrown out from the beach — but **guard the river mouth**: seed 3
  rooted on `riv` water until `rootOK` required `BEACH` at the root's back. The pier's own `rivRow`
  check exists for the same reason. Sand at your back is the cheap test for "am I on the coast".

## Iteration 107 — the market square was never built (2026-07-10)

**Vector** — Civic & culture × **New CA rule**. Rotation named both axes: Civic was the stalest domain
(last vector 100) and the recent kinds were New element / Polish / Deepen / Interaction / New element,
so `New CA rule` was among the three coldest. This is a *rewrite* of an existing pass, not a fresh one
— which is what the domain needed, because the pass it rewrites had never once fired.

**The seam.** `T.MARKET` is a fully-built tile: cream paving, three striped stalls, string lights after
dark, a `POPW` of 14, membership in `DEV`, `ATTRACT` and `PEDDEST`, and its own triple weight in
`openCells` so crowds gather on it. `TILELABEL` names it, `TILEDESC` describes it. **The census has
read `MARKET: 0` in every seed and era for the artifact's entire recorded life** (0–3 over the 9-cell
matrix, i.e. ~0 per city; the stragglers come from the *other*, IND→market-hall rule). Nobody has ever
seen this tile.

Its siting rule (L1106) read `COM && countAround(...,1,COM)>=3 && greenNear`. **It is not mistuned; it
is unreachable.** The upgrade pass 40 lines above takes any inland `COM` at **2** COM-or-TOWER
neighbours, and by iter 98's saturation arithmetic (~60 samples/cell) that test fires with probability
≈1. A shop is towered long before a third shop can gather beside it. The market's precondition was
strictly *harder* than the tower's, on the same host, in a race it always lost. Measured on 6 seeds at
2035 (`probe-market.mjs`): **COM 202–228/city, COM with ≥3 COM neighbours = 0. On every seed.**

**Change.** ~10 lines. A market is not a shop — it is the open ground the shops grew around. Host is
now `PARK` with `buzz>=2` (the iter-104 `ATTRACT` field: on standable ground it *is* the count of
adjacent attractions, so `buzz>=2` reads "enclosed on two sides by things worth walking to" — no
hand-rolled second field), plus `roadNear`, a spacing guard, and `hashCell` eligibility. The pass keeps
its `ks(6)` `rc()` picks and adds **no `rng()` draw of its own**.

**Census — PASS.** `MARKET` **0 → 12** across the matrix; every seed now grows **1–5** markets by 2035,
none before 1992. `PARK` 1205→**1222** and `parks` +20 — the squares did not cost the city its greens.
`pop` +3.1%, `towers` +18. **The pop number is not growth and I am not claiming it** — see below.

**Visual — PASS, 2/2 agents.** Magnified clips (day, seed 42; night, seed 7) + un-zoomed whole-city
frames. Both: the square reads as cream paving with striped stalls, sits flush on a hex face beside
park and shopfronts, string lights render as discrete warm dots and not blown-out blobs, no z-order
tears, and the whole frame still reads as a balanced coastal city. Correctly *subtle* at fit zoom.

**Verdict: SHIPPED.**

### Findings

- **⚠ A RULE CAN BE DEAD BECAUSE ANOTHER RULE'S PRECONDITION IS STRICTLY WEAKER ON THE SAME HOST.**
  The market wanted `COM` with 3 COM neighbours; the tower rule takes `COM` at 2, and saturates. Every
  cell that ever approached the market's condition had already been converted. **Before tuning a rule
  that never fires, look for an earlier pass on the same host with a weaker test** — the rule is not
  mistuned, it is unreachable, and no amount of probability tweaking will reach it. `probe-market.mjs`
  (**`git add -f`'d**) is the general instrument: it counts survivors of *each successive conjunct* of
  a rule's predicate, so the starving clause names itself. It took one run to find a dead rule that had
  survived 106 iterations.
- **⚠ THE NO-OP CONTROL — the terrain analogue of iter 97's stash control, and this iteration's most
  reusable finding.** To learn what your rule's *terrain writes* did, run the rule with the write
  removed (`c.t=T.MARKET;…` → `void 0`) and census that. Same predicate, same picks, **zero cells
  changed**. It should read `+0` everywhere. It did **not**: `pop` −0.3%, `EMPTY` +30, and **`FIELD`
  20→14** with nothing built. Cause: the old dead rule's trailing `rng()<0.3` *did* fire in the
  1992–96 window, before the tower rule (`year>=1996`) began eating clustered shops — so **deleting a
  dead rule's draw is itself a stream perturbation.** A rule that never changes terrain can still be
  load-bearing on the stream. Without this control I would have shipped `FIELD −9` as a market-caused
  regression and "fixed" it wrongly (I tried: see below).
- **⚠ CHOOSE A CA RULE'S HOST TILE BY WHICH PASSES GATE `rng()` ON IT, NOT BY SCENERY.** `T.EMPTY` is
  the host of ~8 other `rng()`-gated passes (farms, industry, forest succession, gardens, the civic lot
  search); consuming an empty lot deletes every conditional draw those passes would have rolled there.
  `T.PARK` gates none. Same rule, same ~2 markets/city, only the host differs:
  **EMPTY → `pop` +4.6% on one salt and −5.8% on another** (the second is a `COLLAPSE` hard-fail);
  **PARK → +4.2 / −0.8 / −2.4 across three salts, all passing.** Hosting on a stream-quiet tile halved
  the chaos amplitude. This is a *design* lever nobody had named.
- **⚠ A `hashCell` SALT IS A FREE PARAMETER THAT CAN SWING A CORE METRIC BY 10 POINTS. NEVER PICK IT
  AFTER SEEING THE CENSUS.** Three salts, identical rule: `pop` +4.6% / −5.8% (EMPTY host). One ships,
  one hard-fails, and *nothing about the city is different*. I shipped `0x4A17` because it is the
  constant I typed **before running anything**, and I am reporting all three deltas rather than the
  flattering one. The corollary for every future terrain vector: **the pop delta on a chaotic CA is a
  property of the salt, not of the feature.** The growth signal is the tile histogram — here, a tile
  that went from *nonexistent in the artifact's whole life* to 1–5 per city.
- **The `hashCell` probability is a stream-free tuning lever.** Coverage was raised 0.5→0.72 (every seed
  gets ≥1 market; seed 3 had 0 at 0.5) with **zero** effect on the `rng()` stream, because `hashCell`
  makes no draw. Tune eligibility freely; never tune an `rng()<p` for the same purpose (iter 98).
- **Two hypotheses, both measured, both WRONG — recorded so nobody re-tries them.** (i) *"Markets eat
  the pocket parks that ball fields need"* — fields site on `EMPTY` with `PARK within 2` and do not
  recognize `MARKET`, so this was plausible. I added a "take only a *corner* of a green" clause
  (`>=1 PARK neighbour`). It **did not move `FIELD` at all** (still 11) and starved markets to zero on
  three of eight seeds. Reverted. (ii) *"`FIELD`'s drop is salt-noise"* — it is not salt-noise either
  (−9 / −6 / −9 across three salts, sign-stable). The no-op control settled it: `FIELD` is a tiny
  metric (n=20 over nine cities) that moves with **any** stream shift, including one that changes no
  terrain. **When two opposed theories both survive the aggregate, the aggregate is not the instrument
  — build the control that holds one variable at exactly zero.**
- **`c.buzz` reused exactly as iter 104 invited.** "Somewhere worth standing" was already computed,
  already free of `rng()`, already recomputed each tick. A market square is the argmax of that field on
  open ground. No new field, no new census metric (census-sprawl rule: `MARKET` was already tallied in
  the tile histogram, and the vector adds no tile type and no entity array).

## Iteration 108 — the fields keep the calendar (2026-07-10)

**Vector** — Nature × **Deepen / interconnect**. Rotation named the domain: Sky (95) is staler but
additively saturated and its `New CA rule` cell is a documented trap, so Nature (102) was the
next-stalest safe pick. Kind was chosen against the two most recent (New element, New CA rule), and
`Deepen` is the skill's stated highest-yield move once a domain has its basics — Nature has had its
basics since iter 60. The interconnect is Nature × **Sky**: the fields now read `applySeason`'s
calendar. Draw-only by construction, so `pop` could not move.

**The seam.** `applySeason()` (L293) drives `grass`, `grassDk`, `meadow`, `canopy`, `canopyLt` through
the year — the hills go gold at `s≈0.62`, deciduous canopies amber at `s≈0.87`, evergreens sit it out.
**`T.FARM` was not in that list.** Its draw case painted a soil hex and three crop rows in one of three
*static* colors picked from `c.v` (`sage`/`gold`/`meadow`), at a fixed `lineWidth` of 2.1. So the wild
grass around a farm went gold in August while the cultivated field — the most seasonal surface in any
real landscape — did not change all year. Orchards already keep the calendar (iter 57's grove); the
farmland, which outnumbers them, never did.

**Change.** ~20 lines, all in `drawCell`'s `case T.FARM` plus one helper pair. Each field derives a
phase `ph` from the calendar `s=year%1`, offset by up to ±5 weeks from `c.v`, and runs a chain:
ploughed `soilDk` → `sprout` → the crop's own color → `straw` → cut `stubble` → ploughed under. Both
ends of the chain are `soilDk`, so it is continuous across the new year *and* winter rows read as dark
furrows on the lighter soil hex. `veg` swells `lineWidth` 0.9→2.4, so the rows are furrows in winter
and heavy growth at midsummer. Fruit dots (the `v>0.66` variety) now appear **only** in the weeks
before the cut. Four palette entries added (`sprout`/`crop`/`straw`/`stubble`); `applySeason` must not
touch them or the two would double-count — which is why the third crop variety moved off `meadow`
(season-driven) onto a dedicated `crop`. No terrain, no `rng()`, no `hashCell`, no new tile type.

**The ground carries the year, not just the rows.** First pass modulated only the rows and the two
visual agents *disagreed about which frame was greenest* — the tell that the effect was under-powered.
Three ~2px rows are a thin ornament on a wide hex, so the tile's mean tone at city zoom is the
**ground** (iter 100's law, and the reason iter 101's one-hex greenway failed). Fixed by blending 34%
of the crop color into the soil hex. That is the whole difference between "visible if you lean in" and
"the belt turns with the year".

**Census — PASS.** `pop 154915 → 154918 (+3)`, `roads/developed/parks/towers +0`, **tile histogram
completely empty** — as a draw-only vector must be. The residual ±3 is *not* mine: see the finding
below; identical pristine code recaptures at ±3 too.

**Probe — the year moves the belt, and the belt is a patchwork.** `probe-farmtone.mjs` samples real
canvas pixels at every `__find('FARM')` centre. Mean farm luminance, seed 42 / seed 7:
Jan **112.9 / 107.4** → Apr **147.7 / 148.2** → Aug **160.8 / 159.8** → Nov **137.3 / 140.7**.
A **48-point** luminance swing, against the ledger's own ΔL 7–11 reference for "obviously
distinguishable". Hue (G−R) is `−20 → −2 → −26 → −25`: April is the only green frame, August the
golden one, exactly as designed. Field-to-field spread is **±21.4 in January and ±18.7 in November,
but only ±9–11 at midsummer** — the stagger is most visible where the chain is steepest (ploughing,
cutting) and least where every field is simply mature. That is the patchwork, measured.

**Perf — PASS.** 3 sequential runs, judged by the minimum of each scene: day **33.22ms** (+0.2% vs the
iter-105 baseline 33.16ms), night **37.61ms** (+0.8% vs 37.33ms). The two uncached `rgb()` strings per
farm per frame (~150 farms) cost nothing measurable. Baseline **not** re-pinned — `polish-tile` owns it
and there is nothing to re-pin.

**Visual — PASS, 2/2 agents, on the strengthened version.** Four frames × two seeds, un-zoomed whole
city. Both: no blow-out or neon, the rows still read as distinct lines against the tinted ground, no
z-order tears or floating tiles anywhere in the frame, January reads as *ploughed farmland* rather than
mud or scarring, and all four frames still read as a balanced coastal city. (One agent inverted
brightest/darkest — see the finding; it does not affect the gate, which is about damage, not ordering.)

**Verdict: SHIPPED.**

### Findings

- **⚠ THE CENSUS IS LOAD-DEPENDENT, AND "CHAOTIC-CA NOISE" HAS BEEN COVERING FOR IT.** A draw-only
  vector — no `rng()`, no terrain, an empty tile histogram — still printed `solarRoofs −3`. The
  invariant the ledger reaches for ("terrain-gated `rng()` reshuffling") **logically cannot apply**.
  Cause: `frame()` advances `year` off real elapsed time and keeps ticking while Playwright drives the
  page; `c.solar`/`c.groof` salt their `hashCell` on `(year*23)|0` / `(year*31)|0`, so milliseconds of
  machine load flip roofs, and an extra `tick()` moves `pop`. **Two captures of identical pristine code:
  `pop` 154915 vs 154918, `solarRoofs` 1474 vs 1471.** The instrument's floor is ±3, not 0. Corollary
  that cost me twenty minutes: **running your edited code twice proves only that the edited side is
  deterministic.** To attribute a small delta you must re-capture the **baseline**. Freezing the sim
  before `__census()` would remove the floor entirely and sharpen every future gate — an open vector.
- **⚠ `git stash` IS A CONTAMINATED CONTROL HERE, AND IT CAN EAT YOUR ITERATION.** `census-baseline.json`
  is tracked and `--save-baseline` dirties it, so `git stash` silently reverts your fresh baseline to
  the last committed one. My "pristine control" printed `pop +4712` and read like a catastrophe; it was
  pristine code scored against **iter 107's** matrix. Read the absolute latest column, never the delta,
  when the stash control runs. Then `git stash pop` **refused** — `census-history.jsonl` had been
  appended to by the control run — and left the whole iteration sitting in the stash. Recovery:
  `git checkout -- .claude/skills/grow-city/census-history.jsonl && git stash pop`. The no-op control
  (iter 107) does not have this failure mode; prefer it when the question is about terrain writes.
- **⚠ AGENTS GRADE DAMAGE WELL AND ORDERINGS BADLY — MEASURE THE ORDERING.** Both seeds' agents agreed
  perfectly on every *defect* question (no tears, no blow-out, rows legible, city coherent) across two
  rounds. Asked *"which frame is brightest"*, one answered "August, deep chocolate-brown, darkest" —
  twice, confidently — while the probe puts August at **lum 160.8** and January at **112.9**. It was
  reading the wrong hexes. The first round's disagreement about *which frame was greenest* is what told
  me the effect was under-powered and sent me to strengthen the ground, so **a disagreement between
  agents is signal even when both say PASS**. But never resolve it with a third agent: `__find(TILE)` →
  `getImageData` → mean RGB + spread is one command and it is dispositive. `probe-farmtone.mjs` is
  `git add -f`'d (per iter 101, `.gitignore` eats `probe-*.mjs`), and its **spread** column is the
  reusable half — it measures *variation across instances*, which is how you prove a patchwork rather
  than a mere change.
- **AN UNREACHABLE TEST HOOK IS THE SAME DEFECT AS AN UNREACHABLE RULE (iter 107's shape, in the
  harness).** `window.__setYear` has existed since the seasons landed, commented *"pin the calendar
  (seasons) for tests"*, and was **never wired into the URL block** — while `?t=`, `?warp=`, `?step=`
  and `?flood=` all were. Consequence: `?warp=61` from `year=1974` always lands near 2035.0, so **every
  screenshot in this loop's entire history was taken in January**, and nobody could have seen a seasonal
  farm even if one had existed. One line added. Iter 107 found a rule nobody could reach; this is a hook
  nobody could reach. **Grep the URL block before assuming a hook you can see is a hook you can use.**
- **DEAD-RULE TRIAGE: divide 107's candidate list by *why* the tile reads 0.** `GARDEN` is gated
  `year>=2008` and the matrix's eras are 1985/2005/2035 — it is 0 in two of three eras **by
  construction** (~2 per 2035 city). `BURNT` reverts to `EMPTY` at `age>6` — a **transient** a snapshot
  will nearly always miss. Neither is dead; neither should be "fixed". **An era-averaged census cannot
  tell "dead" from "late", and a snapshot cannot tell "dead" from "short-lived."** Of 107's four
  candidates only `SOLARF` is still genuinely open — and an earlier solar-farm vector was reverted as a
  bad trade, so reaching it may not be worth wanting. 107's rule ("assume there are others") stands; its
  *list* was three-quarters explained by measurement artifacts.
- **A DOMAIN CAN BE FED BY DEEPENING ANOTHER DOMAIN TOWARD IT.** This is filed under Nature, but its
  content is a **Sky** interconnect — the farms consume `applySeason`'s `year`. Sky has been the stalest
  domain for 13 iterations precisely because its own additive cells are spent. The way to grow it is not
  a new sky feature but to make more of the ground *answer* to it. Remaining surfaces that still sit out
  the calendar: `VINEYARD` (should redden and be cut), `MEADOW` seed-heads, `MARSH`. Cheap, draw-only,
  and each one makes the existing season system worth more.

## Iteration 109 — the walk-ups close ranks (2026-07-10)

**Vector** — Urban fabric × **Connect**. Rotation named both axes: Urban (103) was the stalest safe
domain (Sky 95 is staler but is a documented trap), and `Connect` is one of the two coldest kinds —
its only prior entry is iter 47's skybridges. The recent kinds were New element / New CA rule /
Deepen, so Connect was also un-repeated.

**The seam.** A `MID` walk-up bodies out `ax=0.34` — 0.68 of a cell — so an E-W pair leaves a 0.32-cell
gap and the mid-rise mass reads as a checkerboard of detached boxes, never as streets. This is the one
gap that *shows*: along the two diagonal axes the row in front is drawn later and its own height covers
the seam, which is exactly why iter 47 found diagonal skybridges "stubby/hidden". The E-W gap is the
only visible one, and closing it is the whole of the vector. (`RES` villas are deliberately left
detached — they have gardens, pools, palms and a washing line strung *across* the gap to the next door
west. Villas detached, walk-ups terraced, is also the correct urbanism.)

**Change.** ~6 lines in `case T.MID`. A walk-up whose **east** neighbour is also a walk-up grows east:
centre `+0.16`, half-extent `0.34 → 0.5`. Its east face then lands exactly on that neighbour's west
face (`gx+0.66`) and the two butt with zero overlap. Chains compose — each member grows into the next,
so a run of *n* closes *n−1* joints — and the row's left-to-right draw order does the occlusion for
free. Where heights differ the taller block's flank *is* the party wall, which is what a stepped
terrace looks like; no `min()` anywhere, the geometry does it. Roof furniture (solar, green roof,
fringe, water tank) rides the shifted deck by `+jx`. Gate `hashCell(x+1,y,seedNum^0x4E27)<0.72`, keyed
on the **east** cell so a joint is decided once by the same hash from either side; ~1 in 4 stays open
as a light well. Salt and probability were **typed before anything was run**, per iter 107's law.
Draw-only: no `rng()`, no terrain, no new tile type, so nothing to add to `__census()` or the tooltip.

**Census — PASS.** `pop 154918 → 154918 (+0)`, every metric `+0`, **tile histogram completely empty**,
0 page errors. A draw-only vector must move nothing, and this one moved nothing — not even the ±3 that
iter 108 documented as the instrument's load floor.

**Perf — PASS, and it is the reason the first design was thrown away.** See the finding below. Final:
3 sequential runs judged by the minimum of each scene, day **33.44ms**, night **37.78ms**, against a
*pristine-HEAD control measured on the same machine minutes earlier* (day 33.33ms, night 37.89ms):
**+0.3% / −0.3%**. The street wall costs zero fills. Baseline not re-pinned; `polish-tile` owns it and
there is nothing to re-pin.

**Probe — `probe-terrace.mjs` (`git add -f`'d), 16 seeds.** Re-applies the join predicate from inside
the page (so it cannot disagree with the draw code), chains closed joints into terraces, and pixel-tests
the result. **3140 eligible joints, 2246 closed = 71.5%** against the declared 72% gate. Run lengths:
1195 pairs, 300 triples, 85 quads, 36 fives, 10 six-plus, longest 7 — so **55.2% of all walk-ups
(3872/7011) now stand in a terrace** rather than alone. Pixel test, restricted to joints with no
building in front to occlude them: a **closed** joint reads the west block's own facade (mean RGB
distance **13.0**, exact match 64.9%); an **open** one reads past it to the background (**55.0**, 2.1%).

**Visual — PASS, 3/3 agents**, on the shipped geometry (the first three verdicts were discarded with the
first design). Day downtown before/after at seeds 42 and 7, a night downtown pair, and un-zoomed whole-city
frames. All three: terraces continuous and square on the hex grid, **no lopsided blocks, no roof furniture
overhanging a widened roof, no clipping**; at night the window ribbon runs on through the joint and still
reads as separate panes rather than one glowing slab; no z-order tears anywhere; the whole frame still a
balanced coastal city, the mid-rise "adds texture without flattening the skyline".

**Verdict: SHIPPED.**

### Findings

- **⚠ TO CONNECT TWO THINGS, GROW ONE INTO THE OTHER — DO NOT INSERT A THIRD THING BETWEEN THEM.** The
  first design filled each gap with a *filler prism*: a third block, at `min(h,h_w)`, in the west
  neighbour's colour, carrying its own glass bands and its own cornice. It passed census and 3/3 visual
  agents — and **failed the perf gate at +28.5% day / +26.7% night**, ~2000 extra `fill()`s per frame
  (≈14 per joint × ~140 joints). Widening the west block instead — same prism, `cx+0.16`, `ax 0.34→0.5`
  — produces *identical* geometry for **zero** extra fills, and the window ribbon, cornice and balcony
  rails extend across the joint for free instead of being redrawn. It also deleted the `min()` height
  logic and a `midTone()` helper I had hoisted only so the filler could paint the neighbour's shade.
  **A connector you have to draw is a connector you got wrong.** Look for the version where the existing
  geometry reaches.
- **⚠ THE PERF GATE IS THE ONLY GATE THAT CATCHES THIS, AND CENSUS + VISUAL WILL BOTH WAVE IT THROUGH.**
  The filler prism was *invisible* to the census (draw-only ⇒ `pop +0`, empty histogram) and *beautiful*
  to three independent visual agents. Nothing but frame time knew it was wrong. The skill runs perf only
  at the ~5th-iteration step-back; **any vector that adds per-frame draw work should run it in its own
  lap**, and this one was not a step-back. Had I not, the loop would have shipped a 28% frame-time
  regression and discovered it, unattributably, five iterations later.
- **⚠ CONTROL AGAINST PRISTINE HEAD, ON THE SAME MACHINE, WITHIN MINUTES — the baseline file cannot tell
  you whether it is you or the room.** Iters 99/104 taught "stable offset ⇒ code, rising ⇒ load". The
  filler's offset was stable (+33/+29/+30%) — but so is a genuinely loaded machine's. The reading that
  actually decided it was `git show HEAD:solvista.html > solvista.html`, 3 perf runs (day min **33.33ms**,
  flat to baseline), restore. That took four minutes and converted "probably my code" into "certainly my
  code". Cheap; do it before you optimise, not after.
- **⚠ A CROSS-FRAME PIXEL DIFF IS NOT A VALID CONTROL FOR A CHANGE YOU CAN SEE *PAST*.** The filler
  version's probe compared pristine-vs-patched pixels at each joint and read closed Δ27.3 / open Δ0.2 —
  a beautiful control. The same probe on the shipped version read open **Δ7.0**, and I nearly filed it as
  noise. It was not: through an *open* gap you look at the row **behind**, whose walk-ups legitimately
  widened. The control class was contaminated by correct change. **A control must live in the same frame
  as the thing it controls** — rewritten to compare the joint against the west block's own facade, one
  frame, no pristine load (and it runs in half the time).
- **⚠ ON A HEX PRISM, "SAME SCREEN Y" IS NOT "SAME WALL HEIGHT".** The front face's top edge slopes from
  `+V` at the S-point to `+E` at the shoulder, so two points sampled at one screen `y` sit ~`V/4` apart
  in `z`. Window bands are 3 tall and repeat every 7, so one probe point kept landing in glass and the
  other on plain wall: closed Δ35.3 vs open Δ47.0, a **null result from a geometry bug, not from the
  feature**. Invert the face equation and pick `z`: `y = cy + V + (E−V)·u − z`, with `z = 10+7k` (bands
  occupy `[5+7k, 8+7k]`, rails to `8.9+7k`). Any future probe that samples a facade needs this.
- **AND THEN THE OCCLUDERS: a facade probe must first ask whether the facade is visible.** With the
  geometry fixed the test still read only 42.6% match on closed joints. The city is dense; the row drawn
  in front covers most walls, and it covers two nearby probe points *unequally*. Restricting to joints
  with **no `DEV` cell at all in the row in front** (n 2246→464) moved closed joints to Δ**13.0** / 64.9%
  match against open Δ**55.0** / 2.1% — a 31× separation. The confound was never the vector. **When a
  pixel probe of a 3-D scene reads weakly, suspect occlusion before you suspect the feature.**
- **The `hashCell` gate should be keyed on the ASYMMETRIC end of the relation.** A joint between `(x-1,y)`
  and `(x,y)` is one thing, but two cells can ask about it. Keying on the **east** cell (`hashCell(x+1,y)`
  from the west block's point of view) means both sides compute the same bit, so a probe written from the
  other direction agrees with the draw code by construction. That is why `probe-terrace.mjs` could re-apply
  the predicate and land on 71.5% against a 72% target with no fudge.

## Iteration 110 — the towers stop wearing their height (2026-07-10) [holistic step-back]

**Vector** — Urban fabric × **Polish**. Rotation would have said People (104). The **step-back
overrode it**: this is the 5th-iteration holistic pass, and it found something, so the skill's rule
("if something compounded badly, spend the next iteration FIXING it") took precedence. Two
independent whole-frame agents, on two seeds, converged on *the same* complaint — seed 42:
"hundreds of similar blue-grey/red-capped blocks… a monotonous tower carpet"; seed 7: "tower colors
repeat so consistently that massing becomes hard to parse." Seed 42 returned `VISUAL: FAIL`.

**Triage first — most of what the agents PRESCRIBED was already a closed dead end.** Worth recording,
because a future step-back will hear the same three suggestions:
- *"thin density, add parks"* → cue (e½), **closed by iter 102**; the header says do not plant a
  second lung.
- *"stray floating district lines read as tears"* (seed 42) → the monorail/cable beam, **closed by
  iter 87** with six agents. The header pre-registers this exact false positive; it fired again.
- *"give the roads hierarchy so downtown reads as blocks"* (seed 7) → a **trap on both branches**.
  Contrast-only is dead by iter 101's law (below ~2–3 hexes across a corridor is untraceable at *any*
  ΔL, and a road is a 1-hex ribbon); the width branch re-opens cue (b), "the asphalt floods the
  interior", closed by iter 86. **Do not spend a lap on road hierarchy.**
  What survived triage was not their diagnosis but their *observation*: the buildings repeat.

**The seam.** `drawBuilding`'s `case T.TOWER` opened with `const style=v<0.35?0:(v<0.62?1:(v<0.85?2:3))`
while the upgrade pass sets `c.th=(54+c.v*82)*(0.70+0.66*core)` (L1104). **Both read `c.v`.** So the
silhouette was a restatement of height — the third and most visible instance of the defect iter 99
took out of `MID` and iter 103 out of `RES`. And colour restated the silhouette: every teal slab wore
the one `teal`, every ziggurat the one `terra`. Downtown had exactly **four looks**.

**Measured before designing** (`probe-towertone.mjs`, now `git add -f`'d, reading a new permanent
`window.__twr` hook):

| | corr(style,th) | distinct looks | commonest body | tallest is ziggurat |
| --- | --- | --- | --- | --- |
| before | 0.695 / 0.757 / 0.695 — **mean 0.727** | **4** | 36.8–47.9% | **2/3 seeds** |
| after | 0.179 / 0.325 / 0.267 — **mean 0.257** | **19 of 20** | 27.3–28.8% | 0/3 seeds |

0.727 sits inside MID's *pre-fix* band (0.76–0.79); 0.257 sits inside the MID/RES *post-fix*
reference band (0.19–0.31 / 0.22–0.25). Mean height per style climbed monotonically before
(58 → 84 → 95 → 121): the four "styles" were four **height classes**.

**Change.** `towerLook(x,y,v)` — one pure function, the *only* definition of the rule — draws two
independent seed-salted hashes: `form=fv*0.72+v*0.28` picks the massing (keeping a **mild** height
link, because a tall tower genuinely should step back — ziggurats are still the tallest style on
average, 98 vs 79), and `cv` picks the body outright from 5 shades (white/cream/sand/teal/terra),
with a light `capN` on setbacks. 4 forms × 5 bodies = 20 looks. Also closed the **most visible half of
open cue (g)**: the four `hashCell(x,z|0,3|5|9|13)` per-storey window-light salts were literals, so
*every city's towers lit identically at night*; they now mix `seedNum`.

**⚠ The mixed selector is TRAPEZOIDAL, not uniform — re-solve the cuts or you silently delete the
rare form.** `0.72·A+0.28·B` on two uniforms has a trapezoid density, so keeping the old
`0.35/0.62/0.85` cuts would have cut ziggurats from 15% to **5.6%** — a two-thirds cull of the most
characterful tower, dressed up as a variety win. Solving the trapezoid CDF for the original mix gives
`0.39/0.59/0.75`; measured after, the mix is **37.6 / 24.9 / 24.5 / 13.1** against a pre-change
35 / 27 / 23 / 15. This is iter 98's hold-the-mean law applied to a *distribution* rather than a mean.

**Census** — PASS. Tile histogram **completely empty**; `towers`/`towerHt`/`tallTowers`/`helipads`/
`roads`/`developed`/`parks` all **+0**. `pop -3`, `greenRoofs -1` — precisely the load jitter iter 108
documented on *identical pristine code* (154915 vs 154918). `style` is cosmetic: it feeds no
`rng()`-gated predicate, and `pop`/`towerHt` read `c.h`/`c.th`, never the style. Draw-only ⇒
stream-neutral by construction, and the census signature proves it.

**Perf** — PASS, and run *because* iter 109 said to, not because it was the step-back: the style mix
moved and per-tower draw work varies by style. Pristine-HEAD control taken the same session, 3 passes,
min-of-three: day **33.49 → 33.61ms** (+0.12), night **37.72 → 37.72ms** (+0.00). One pass read
35.16ms day; min-of-three exists for exactly that spike. `col()` memoizes on `name|f`, so the fifth
body shade buys a cache entry, not a draw call — palette variety remains the cheapest beauty here.

**Visual** — PASS on both seeds, day + downtown + a night clip. Seed 7, unprompted: *"the added tower
variety lightens the core rather than darkening it into clutter."* Both confirmed the tallest tower
still reads as a landmark rather than a featureless box — the one real risk of decoupling form from
height. Night windows read as warm lit bands, not blow-out.

**Verdict — FIXED.** The step-back's own `VISUAL: FAIL` is cleared. Perf baseline (2026-07-10, day
33.16 / night 37.33) still valid; not re-pinned.

**Durable findings**
- **The step-back's job is to name the vector, and its agents are good witnesses but bad doctors.**
  Both correctly saw *repetition*; both prescribed fixes the ledger had already closed. **Take the
  observation, throw away the prescription, then go find the mechanism in the source.** The mechanism
  here was one `const` on one line, and no agent could have seen it.
- **`corr(colour-field, height-field)` is a defect *class*, and the class is now exhausted.** MID
  (99), RES (103), TOWER (110) — all three of the city's building types drew colour from the field
  that drives height. If a fourth type is ever added, measure it on day one: `probe-towertone.mjs`
  generalises (recover the field that picks colour, the field that picks height, report Pearson).
- **When a decorative selector also chooses GEOMETRY, decoupling it is not free — check the
  distribution, not just the correlation.** The naive iter-99 copy would have passed a `corr` check
  and quietly culled the ziggurats. The tell was the trapezoid; the guard was re-solving the cuts.
- **A probe must read the rule, not re-derive it.** `probe-towertone.mjs` first duplicated the
  selector with an "edit BOTH together" comment — a drift bomb. Extracting `towerLook()` and having
  `window.__twr` call it means the probe grades the *live* rule. Pair this with iter 101's law:
  a tracked probe that reimplements what it measures is worse than no probe.

## Iteration 111 — the buses stop for somebody (2026-07-10)

**Vector** — People & activity × **Connect**. Rotation named the domain: People (104) was two laps
overdue (110's step-back pre-empted it). The kind came from 109's own finding — *"Connect's trick was
that it added no new object, it closed a gap between two that already existed; look for that shape in
People and Transport before reaching for a new entity."* This is that shape exactly: `c.stop` road
hexes have drawn a shelter since long before the ledger, buses have pulled into them and dwelt
(`v.wait=1.2+…`, `v.dwell=16`) — **and the two had never met.**

**The seam.** Under every shelter, `drawCell`'s `case T.ROAD` painted `1+((x+y)&1)` little figures with
the comment *"somebody's always waiting on the day buses."* They were furniture: the same 1 or 2 people,
in the same spots, forever, whether or not a bus had just been and gone. The city drew the *idea* of
people waiting for a bus and never connected it to the buses.

**Measured BEFORE designing, and the measurement killed the first design.** The obvious vector was to
send *real residents* (`peds`) to the stops. `probe-stops.mjs` says they cannot get there:

| | seed 7 | seed 42 | seed 1234 |
| --- | --- | --- | --- |
| stops | 24 | 32 | 30 |
| within a leash of ANY strollable cell (structural ceiling) | 83% | 84% | 83% |
| **within a leash of a live ped's ANCHOR** (real ceiling) | **25%** | **31%** | **20%** |
| stops holding a ped at any moment, today | 6.2% | 3.1% | 3.0% |

Sweeping the tether: even at radius **5**, only 56–75% of stops have a resident anchored near them —
and `PEDLEASH` is the constant `stepPed`'s own comment says was tuned to hold street occupancy at ~19%.
Real peds would have staffed a quarter of the shelters and **emptied the other three quarters**, which
is strictly worse than the fakes. *Abandoned before writing a line of it.*

**Change.** ~30 lines. `stopQueue(c,x,y)` — one pure function, the only definition of the rule, read by
the draw, the tooltip **and the bus**. `stepVehicle` stamps `c.blast=time` when a bus pulls in (and
`c.bqs`, whoever was aboard). The queue then builds while nobody comes: empty for `BUSGONE=6s`, +1
rider every `BUSQGAP=20s`, up to a per-stop `stopCap` of **1–3** drawn from `hashCell` (never `rng()`),
so shelters differ from one another. When a bus arrives the figures step off the sidewalk toward it
(`-ox*bl`) and fade (`1-bl²`), and are gone. `probe-bus.mjs` set the constants: median headway at a
served stop is **74–126 s**, so a shelter refilling in ~46 s spends real time part-full.

**⚠ Held the mean (iter 98's law).** First cut used `stopCap` 2–4 and read **2.53 waiters** against the
painted rule's flat **1.50** — ~30 extra glyphs citywide, i.e. clutter wearing variety's clothes. Retuned
to 1–3: **1.68 / 1.83 / 1.83**. What the change buys is *variation and a story*, not more people.

**Census — PASS.** Every metric `+0` (`pop -3`, `greenRoofs`/`solarRoofs` flat), **tile histogram empty**,
entity counts unmoved, 0 page errors. Draw-only + `hashCell`: stream-neutral by construction, and the
`pop ±3` is exactly the load jitter iter 108 documented on *identical pristine code*.

**Perf — PASS, and controlled against pristine HEAD in the same session** (not against the baseline
file — iters 99/104). Min-of-3, sequential: mine day **34.00** / night **38.55 ms**; pristine HEAD the
same session day **33.78 ms**. **+0.22 ms (+0.65%)** — noise. The +2.5% the baseline file reports is
today's machine load, not this code. Baseline (day 33.16 / night 37.33) **not** re-pinned.

**Visual — PASS, 2/2 agents, on same-frame filmstrips.** Both described the sequence unprompted
(3 standing → shifted toward the street and translucent → shelter empty) and both noted the frames were
pixel-identical apart from the figures. Whole-city frames: *"balanced, beautiful coastal city… no
clutter or darkening."*

**Tooltip** (per the sync invariant): `Bus stop` now reads its live state — `3 waiting` / `boarding` /
`nobody waiting`. Verified by driving a real hover through all three phases; no page errors.

**Verdict: SHIPPED.**

### Findings

- **⚠ A FILMSTRIP OF A LIVE DIORAMA NEEDS A FROZEN CLOCK, OR THE DIFF IS ALL WEATHER.** The first
  filmstrip stepped the sim between shots. The pixel diff of "full" vs "emptied" came back **9371 px
  (14% of the clip), bbox 139×110** — cars had moved, trees had swayed, the sea had breathed. It
  proved nothing about a 3-pixel figure. Setting `playing=false` and driving only `c.blast` between
  `render()` calls makes every other pixel identical **by construction**, and the same diff came back
  **237 px in a 14×24 box.** This is iter 109's "a control must live in the same frame as the thing it
  controls," and the *frame* means the instant, not just the viewport. Both visual agents then
  volunteered that the frames were identical except the figures — a same-frame control makes the
  agents better witnesses too.
- **⚠ "NOT DRAWN" AND "DRAWN BUT HIDDEN" ARE THE SAME SCREENSHOT — AND MY OCCLUSION FILTER PICKED A
  HIDDEN ONE.** Seed 42's first gate returned `VISUAL: FAIL`; the agent saw no figures and read the
  neighbouring festival bunting as them. It was right: the stop I had chosen was **occluded**, and the
  same-frame diff there is **0 px in every phase**. I had hand-rolled an occlusion filter (no `DEV` at
  `(x±1,y+1)`) and it selected an invisible shelter anyway. Replaced by *measuring*: zoom onto each
  candidate, diff full-vs-emptied, keep the stop whose figures actually move pixels. **Do not
  hand-derive which instances are visible — render them and count.** (Header law: "when a pixel probe
  of a 3-D scene reads weakly, suspect occlusion first." It applies to choosing the *subject* too.)
- **⚠ THE AGENT'S `FAIL` WAS CORRECT AND ITS DIAGNOSIS WAS WRONG — AGAIN (iter 110's law, in the
  visual gate).** It reported "bunting/pennants, not people," and concluded the feature didn't work.
  The feature worked; the *stop was behind a building*. Take the observation ("I can't see figures"),
  throw away the explanation, go measure. Note the failure mode `probe-vis.mjs` now covers: I would
  have shipped a false `FAIL` and reverted a good iteration.
- **THE QUEUE IS A ZOOM-IN REWARD, AND NOW THERE IS A NUMBER FOR IT.** `probe-vis.mjs` sweeps the
  camera: figures move **2–4 px at fit zoom (0% of shelters)**, become readable at **zoom 4 (53–63%)**,
  and **plateau at 63–73% by zoom 8** — the plateau is the ~30% that are permanently occluded. So this
  buys nothing in the un-zoomed frame the census and the wide shots live in, and it is *not* a
  regression either: the painted figures it replaces were equally sub-pixel. Worth knowing before the
  next lap spends itself on ornament at this scale. **The artifact invites zoom ("scroll to zoom");
  the whole-city gate can neither convict nor acquit anything drawn at 3 px.**
- **A "DEEPEN" THAT MEASUREMENT TURNS INTO A DIFFERENT VECTOR IS STILL A GOOD LAP.** The intended
  change (real peds ride buses) was structurally impossible against a tuned constant, and one probe
  said so in ten minutes. The shipped change closes the *same* gap from the other side. Recording the
  dead branch matters more than the live one: **`peds` cannot serve the road network — their leash is
  anchored to open ground by design.** Any future "residents use transport" vector must either move the
  anchor (spawn pool) or accept ~25% coverage. Don't rediscover this.

## Iteration 112 — the trains stop where the platforms are (2026-07-10)

**Vector** — Transport × **Deepen**. Rotation named the domain: Transport (105) was the stalest safe
pick (Sky 95 is staler but is a documented trap). The header pointed at the kind too — *"109's trick
(close a gap between two existing objects) is still unspent in Transport"* — and this lap cashes it.
I logged it as **Deepen, not Connect**, because Connect had already paid in 109 and 111 and the bulk of
the change is a *motion-model fix*, not a join; calling it Connect a third time would have misreported
the rotation the header exists to protect.

**The seam.** Every monorail station drew riders under its canopy with the intent "waiting for the next
train" — and the train never came. `stepAnim` was one line: `tr.p += dt*s*0.014`, forever, straight
through every platform. The buses had dwelt at their stops since long before the ledger (iter 111 gave
them somebody to wait for). The trains never had.

**Two defects found by probing, not by reading.** `probe-rail.mjs` (written before any design):

| seed 7 | line 0 | line 1 | line 2 |
| --- | --- | --- | --- |
| spans `L` | 89 | 2 | 90 |
| `stops.size` — **what the tooltip reported** | 15 | 1 | 14 |
| **real, drawn stations** (`countAround(...)>=3`) | **8** | **0** | **11** |
| overstatement | 47% | 100% | 21% |

1. **`p` is a fraction of the loop, so ground speed scaled with loop length.** Every line lapped in
   exactly 71 s whatever its size: seed 7's 89-span line ran its trains at 1.25 spans/s and its 2-span
   line at 0.028 — **45× apart, identical hardware.**
2. **"Station" was written three times and meant three things.** The draw gated on neighborhood density;
   the tooltip and the hovered-route pips counted raw `stops`. Lines claimed up to twice the platforms
   they drew, and pipped bare track. A *fourth* copy lived in `monoStationCells()` (the census metric).

**Change.** ~60 lines. `railStations()` computes `m.sta` (the station set) and `m.staP` (where a train
must stand) once per tick; the draw, the pips, the tooltip, the census metric and the train all read it —
iter 111's `stopQueue` shape. `stepTrains()` gives a train a **ground** speed (`MONOSPD=1.25` spans/s,
capped at `MONOCAP` so a 2-span loop can't spin), brakes it into each station, stands it `MONODWELL=3.2 s`,
and pulls it away. `railQueue()` empties the platform as the train stands — the riders slide to the post
and fade — then refills it a rider at a time. Car spacing moved from `0.011` of a lap to `1.0` **span**,
so the three cars no longer mush together on short lines (unchanged on long ones by construction).

**⚠ The first easing curve was linear, and it was silently catastrophic.** `e = d/B` tripled the lap
(**210 s vs 71 s**) and *still* left three lines reading as three speeds. The time to cross a brake zone
under a linear ramp is `∫dx/(V·x/B)`, which **diverges** — the train spent its lap pinned at the 0.10
floor. `sqrt` (constant deceleration) integrates to `2B/V`. Census: blind. Three visual agents: blind.
Only `probe-train.mjs`, measuring spans/sec, could see it. Now, with sqrt:

| | seed 7 L=89 | seed 7 L=90 | seed 1234 L=66 |
| --- | --- | --- | --- |
| ground speed while moving | 0.882 | 0.793 | 0.977 spans/s |
| lap | 127 s | 150 s | 80 s |
| standing | 20.4% | 24.4% | 15.9% of the time |
| **middle car ↔ platform when stood** | **0.0000** | **0.0000** | **0.0000 spans** |
| closest two trains ever | 16.1 | 23.3 | 26.1 spans |

Every uncapped line now cruises at the same 1.25 spans/s; the residual spread is the deliberate lap-time
cap on stubby loops. Trains never overlap (no signalling needed — each accrues the same dwell per lap, so
phase is preserved). **Held the mean (iter 98's law):** riders/platform 1.88→1.65, 1.55→1.41, 2.00→1.67,
1.75→1.54 — a 9–17% *reduction*, so the platforms breathe rather than gaining clutter.

**Census — PASS.** `pop −3`, `greenRoofs −1`, **everything else `+0`**; tile histogram empty; entity counts
unmoved; 0 page errors. Anim/draw-only, no `rng()`, no terrain. The `±3` is the load jitter iter 108
documented on *identical pristine code*. **`stations: 40 → 40` is the real check**: the census computes that
metric from a copy of the predicate I rewrote, and it reproduced the old set exactly.

**Perf — PASS, controlled against pristine HEAD in the same session** (iters 99/104). Min-of-3, sequential:
mine day **33.67** / night **38.05 ms**; pristine HEAD the same session day **33.89** / night **38.11 ms**.
**−0.22 ms — free**, and plausibly real (a platform sometimes draws 0 riders where it always drew `cap`).
The +1.5% the baseline file reports is today's machine load. Baseline (day 33.16 / night 37.33) **not** re-pinned.

**Visual — PASS, 3/3 agents, on frozen-clock filmstrips.** `probe-station.mjs` staged approach → standing →
departed → refilled by poking only `tr.p`, `tr.dw` and `c.mlast` at one instant, so every other pixel is
identical by construction (iter 111's law). All three agents volunteered that the backgrounds were
pixel-identical, all three confirmed the middle car lands under the canopy and the platform empties and
refills, and all three read the whole-city frame as *"a balanced, beautiful coastal city… no clutter or
darkening."*

**Tooltip** (per the sync invariant): now reads `m.sta`, so a train says *"Line 1 of 3 — a 89-span loop with
**8 stations**"* (was "15 stations"), a stubby loop says *"…with no station yet"*, and a standing train adds
*"Standing at a platform."* The hovered-route pips now land only on real platforms. `__rail()` gained
`stations`/`stops`/`standing` for probing.

**Verdict: SHIPPED.**

### Findings

- **⚠ A NORMALIZED PARAMETER SILENTLY ENCODES PATH LENGTH.** `p += k·dt` over a variable-length path makes
  ground speed proportional to length. It hid for 112 iterations because *one* line looks fine — the bug is
  only visible when you compare two instances, which no screenshot of one city ever does. **The gondola has
  it too, measured: 0.14–0.36 spans/s, and seed 42 runs two cable lines at 0.36 and 0.18. Open cue (h).**
- **⚠ THE INTUITIVE EASING CURVE IS THE DIVERGENT ONE.** See above. Worth stating as a rule because the next
  "slow down as it approaches X" vector (ferries docking, cable cars at terminals — cue (h)) will reach for
  `d/B` again. Use `sqrt(d/B)`. Any floor you add to rescue a linear ramp is a confession that it diverges.
- **⚠ A DEAD RULE (107) AND A RULE READ BY THREE DISAGREEING CALLERS ARE THE SAME DEFECT CLASS.** 107 audited
  a rule that never fired. This one fired, but "what is a station?" had four independent implementations and
  two of them were wrong. `grep` for a predicate's other readers before trusting the one in front of you. The
  cheap tell: a derived quantity (`stops.size`) being used where a *filtered* one is meant.
- **AN ELEVATED FEATURE PASSES THE VISIBILITY LAW TRIVIALLY.** Iter 111 had to hunt for a bus shelter that
  wasn't behind a building (~30% were). All **19** stations here moved 1595–3590 px in the approach-vs-departed
  diff. Things drawn at `RAILH=40` are above the rooftops. Unlike 111's 3 px queue, **a stopping train is
  legible in the un-zoomed frame** — this lap bought something the whole-city gate can actually see.
- **THE PROBE THAT KILLED THE FIRST DESIGN WAS 40 LINES AND RAN IN 90 SECONDS.** `probe-train.mjs` reported
  ground speed, lap time, standing fraction, middle-car offset and train separation. Every one of those
  numbers was needed: the offset proved the snap, the separation acquitted the missing signalling, and the
  speed convicted the easing curve that both other gates had passed. **When a change is about MOTION, neither
  a still frame nor a tile histogram is a gate.** Write the probe.

## Iteration 113 — the marsh answers its own tooltip (2026-07-10)

**Vector** — Water & coast × **Deepen**. Rotation named the domain: Water (106) was the stalest *safe*
pick (Sky 95 is staler and a documented trap). The header also named the content: iter 109's banked
"Sky-feedable" list is `VINEYARD`, `MEADOW` seed-heads, **`MARSH`** — deepening another domain toward
Sky is the sanctioned way to feed Sky without a sky feature. Kind is Deepen, not Connect: Connect had
already paid three laps running (109/111/112).

**The seam.** `T.MARSH`'s tooltip calls it a *"Reedy tidal wetland"* and — since iter 97 — prints a
**live `Tide` reading on that very hex**. The draw was two fixed ellipses and seven reed strokes. The
city told you the tide on a tile that had never once moved with it. Same shape as 111 (a shelter that
never met a bus) and 112 (a platform that never met a train): *close a gap between two things that
already exist.*

**Measured before designing** (`probe-marsh.mjs`, tracked). Clock frozen (`playing=false`) so only
`TIDE` could move a pixel:

| | pristine | after |
| --- | --- | --- |
| marsh mean luminance, TIDE 0 → 1 | **151.5 → 151.7** | **135.0 → 153.0** (seed 42) |
| | | **140.4 → 155.7** (seed 1234) |
| pixels changed across the cycle | ~0 (0.7% = neighbour bleed) | **61–74%, monotone at every step** |

The 0.7% pristine "movement" was the neighbouring BEACH's damp margin leaking into the sample box —
i.e. the beach *did* answer the tide and the marsh did not.

**The design was decided by geometry, not taste.** First attempt breathed the two pools with the tide.
It moved **3.9%** of the hex at half tide, because a marsh hex is **23.4 × 15.6 screen px** and its pools
are **~4 × 2 px**. Scaling them harder changed nothing. So the **flat** answers instead: the hex body
lerps toward `soil` on the ebb (exposed wet mud), a permanent mud bed is laid under each pool for the
water to shrink inside, and a thin `colA('water')` sheet is drawn over everything above TIDE 0.60.
That is a whole-hex response, and it is what took the change from 3.9% to 72%.

**Change** (`case T.MARSH`, ~30 lines, draw-only):
1. body `= lerp(meadow, soil, ebb*0.42)`, `ebb = clamp((0.58-TIDE)/0.58)`; pools shrink to 0.34× inside a
   fixed 1.22× mud bed; flood sheen above TIDE 0.60.
2. reeds keep a calendar — `green` peaks midsummer and **wraps cleanly** (`1-|s-0.42|/0.34`), lerping
   `sage → straw`, then `→ stubble` by a winter term; `rlen` drops 38% at deep winter.
3. cue **(g)**: the three reed `hashCell` salts now mix `seedNum`. The old lean salt was
   `hashCell(x,j,7)` — **no `y` at all**, so every marsh hex in a column leaned identically.
4. new URL hook **`?tide=0..1`** (`__setTide`), which shifts the cycle's *phase* so the sea keeps
   moving from there rather than freezing.

**Census** — `pop/roads/developed` and all 22 metrics **exactly +0**, both before and after the salt fix.
Tile histogram empty, as intended: this deepens a tile's draw, it does not move a tile. Draw-only, no
`rng()`, no terrain.

**Perf** (run because this lap adds per-frame draw work — iter 109's law, not the step-back's):
min-of-3 day **33.83ms** / night **38.16ms** vs baseline 33.16/37.33 → +2.0% / +2.2%, inside the band
109/110/111 measured for *pristine* HEAD (33.33 / 33.49 / 33.78). PASS. Not re-pinned.

**Visual** — tide: **PASS** on the zoomed pair ("a genuine drained tidal mudflat… birds picking over wet
mud"; high water "broken into per-tuft reflective patches, not a solid rectangle"). Whole-city, 3 frames,
2 seeds: **PASS**, explicitly *"not a repeat of the kelp failure"* — the low-tide marsh reads as a natural
estuary, and the city is no darker at dead low than at high water. Reed calendar: **two agents returned
FAIL, and they were substantially right** — see findings.

**Verdict — SHIPPED.** The tide is the feature and it is verified three ways. The reed calendar and the
salt fix ride along at zero cost (+0 census, +0 perf) but are **below the resolution at which this loop
can see anything**; they rest on the pixel probe alone, and I have logged that rather than dressing it up.

### Findings

- **⚠ THE CONSPICUOUS THING ON YOUR TILE MAY BELONG TO SOMEONE ELSE (new; extends iter 111's law).**
  111 taught that *"not drawn"* and *"drawn but occluded"* are the same screenshot. Here: **"your ornament"
  and "a neighbouring entity" are the same screenshot.** Two agents and *I* read the pale vertical shapes on
  the marsh as reeds. They are a **heron** (`herons`: 54 in the census). The reeds are seven sub-pixel
  strokes bunched around the pool. **The instrument:** back up the file, set the ornament's `strokeStyle`
  to `'#ff00ff'`, shoot, revert (census confirms the revert). One 200×180 crop settled what four agent
  reads and three probes could not. Do this *before* believing any account of a few-pixel ornament —
  including your own.
- **⚠ CUE (g)'s AUDIT GREP HAS A BLIND SPOT, AND THE CUE'S COUNT IS WRONG.** The pattern
  `hashCell\([^)]*,[[:space:]]*(0x)?[0-9]+\)` matches only a **bare integer** salt, so every `k+90` /
  `j+40` / `r*3+cc+50` form is invisible to it. It reported "4 remain"; the superset
  `grep -oE 'hashCell\([^;]{0,60}' solvista.html | grep -v seedNum` finds **13 lines / 16 calls** that
  are genuinely a function of `(x,y[,j])` alone — kelp sway (L2799), palm fronds (L2832/2834), orchard
  fruit (L3248/3249), **park fireflies (L3423)**, L3610/3613, L5113/5117, plus the surf presence test
  (L2747). Two of the marsh's own three offenders were never counted. **Generalizes iter 107:** an audit
  is bounded by its instrument — a rule can be dead because nothing reaches it, and a breach can be
  invisible because the grep can't spell it.
- **⚠ A REED-PIXEL COUNT IS A CONTRAST MEASURE, NOT A HEIGHT MEASURE (extends iter 104).** Classifying
  "pixels far from the body color" counted **winter highest (20.3/cell)** while winter reeds are **34%
  shorter** — sage reeds on green meadow barely contrast; straw reeds on a muted winter body contrast
  hard. Switching to geometry (topmost reed pixel, dpr 8) did not rescue it either: a 0.8px antialiased
  tip is *detected only when it contrasts*, so the detector's sensitivity varies with the very quantity
  under test, and the ordering flipped between seeds. **Height is drawn but unverifiable at this scale;
  color is verified** (G−R: spring **+9/+12** → dry **−10/−9** → winter **−1/−2**, consistent on 2 seeds).
  When a proxy correlates with your independent variable, it cannot grade it.
- **⚠ MASK A TILE PROBE TO THE HEXAGON — A SQUARE BOX AROUND A 23×16 px HEX EATS ITS NEIGHBOURS.**
  The first reed probe sampled a 14×14 box and confidently reported reed colors of `R−B ≈ +60`. That is
  **sand**: the box spilled onto the BEACH, and beach sand is bright and tawny — indistinguishable from an
  autumn reed by any color test. `probe-reed.mjs` (tracked) carries the point-in-hex mask
  (`|dy| <= V-(V-E)|dx|/X`, shrunk 14% off the antialiased rim); reuse it for any per-tile pixel claim.
- **A `hashCell` SALT *RANGE* CAN COLLIDE WITH ITSELF.** Writing `seedNum^(0x9EE1+j)`, `seedNum^(0x9EE2+j)`
  and `seedNum^0x9EE3` looks like three independent salts and is not: at `j=2` the first *is* the third, so
  two reed quantities became perfectly correlated. Verified by evaluating `hashCell` in-page at a fixed
  cell across seeds. Space the bases (`0x9E01+j`, `0x9E41+j`, `0x9E81`). Note this is safe to fix after the
  fact **only because the vector is draw-only** — iter 107's "never pick a salt after seeing the census"
  binds terrain rules, whose salt perturbs the `rng()` stream. Here census is +0 for every salt.
- **`?tide=` IS NOW A URL HOOK — the sea is finally testable, and every prior shot was a lie about it.**
  Exactly iter 108's `?year=` story: a whole dimension of the diorama that no screenshot in this loop's
  history could pin. Note the free-running default is *seeded*: `?seed=42` loads at **TIDE 0.02 — dead
  low water** (`(seedNum%31)*0.4` → 4.4 rad). Implemented by phase-shift, not by clamping `TIDE`, so the
  tide keeps cycling from where you put it. Use `.02 / .35 / .59 / .98` for low / mid-ebb / neutral
  (no sheen, no mud tint — the right pin for grading anything *else* on a marsh) / high.
- **OPEN CUE (i) — the marsh reeds do not read, and that is a `polish-tile` job.** Seven strokes in a
  ~10×4-unit huddle around the pool contribute almost nothing to how the hex reads; the tile is "green hex
  with a pool". Spreading/lengthening them is a tile redesign, out of scope for a growth lap. The reed
  calendar is already wired and would pay off immediately if the reeds themselves were made legible.



---

## Retired header bullets (moved from GROWTH.md header 2026-07-10, iter 124 trim)

Superseded / closed / promoted-to-SKILL.md bullets, moved verbatim to keep the
maintained header under its 400-line budget. Nothing reads these by default.

(iter 125 trim, 2026-07-11 — closed cue (j), CLOSED BY ITER 118:)
- **~~(j) the night windows verge on stripe-noise~~ — CLOSED BY ITER 118.** The band was a continuous glowing
  ribbon with one notch punched in it; it now draws only its lit panes and lets the prism's own wall be the
  mullion. Horizontal gradient energy **+38…45%**, mean tone held **+1.8…2.6%**, night frame **+5.1%**, day frame
  byte-identical. Two night agents independently confirmed *"a grid of windows"* and *"the stripe noise is gone."*
  Grade any successor with `probe-winband.mjs` (|dI/dx| vs |dI/dy|), not `probe-litdiff.mjs`.
- **(f) `RES` says its height twice, and its roofs ignore the seed** — **CLOSED by iter 103**
  (`corr` 0.87–0.89 → 0.22–0.25; chimney cross-seed agreement 100% → ~60%; a third body shade).
  (RES body is *not* clumped — measured `sameNbr` **52.1%**, maxPatch **5.3** — so do **not** "fix"
  patchiness that isn't there.)

- **⚠ FREEZE THE CLOCK BEFORE YOU DIFF A LIVE DIORAMA, AND MEASURE WHICH INSTANCES ARE VISIBLE
  (iter 111; `probe-vis.mjs` is the worked example).** (a) Two shots of this city at different sim
  times differ by ~14% of the canvas — cars, waves, swaying trees — so a pixel diff across time can
  never isolate a small ornament. Set `playing=false` and re-`render()` with only your feature
  toggled: every other pixel is then identical *by construction* (iter 109's same-frame law, where
  "frame" means the **instant**, not just the viewport). The same diff went 9371 px → 237 px.
  (b) **"Not drawn" and "drawn but occluded" are the same screenshot.** A hand-rolled occlusion
  filter picked a hidden bus shelter and the visual agent duly returned a false `VISUAL: FAIL`. Never
  hand-derive which instances are visible — render each and count changed pixels. Sweeping the
  camera also tells you *from what zoom* a thing reads: the bus queue is 0% at fit zoom, 53–63% at
  zoom 4, plateauing at 63–73% (the plateau is the permanently-occluded remainder). **The whole-city
  gate can neither convict nor acquit anything drawn at 3 px.**
- **⚠ A NORMALIZED PARAMETER SILENTLY ENCODES PATH LENGTH (iter 112).** Anything moving by
  `e.p += k*dt` where `p` is a *fraction of its path* has a GROUND speed proportional to that path's
  length. The monorail did: every line lapped in 71s whatever its size, so seed 7's 89-span line ran
  its trains **45× faster** than its 2-span one. Fixed by making the rate `spans/sec` and capping the
  lap. **The gondola had it too, and cue (h) is CLOSED by iter 121** — measured worse than 112 banked
  (cruise spread **2.83×**, 0.24–0.68 spans/s, every line turning round in exactly 50.0s), now **1.00×**.
  **Count the legs when you port the fix:** on the closed monorail loop `p=1` is one lap (`rate=SPD/L`);
  on the open ping-pong gondola it is a **round trip** — two legs — so `rate=SPD/(2*(L-1))`. Miss the 2 and
  you ship a uniform speed that is uniformly half of what you meant, and every gate here passes it.
  Before touching any `p`-parametrised mover, ask what `p=1` *means* on that instance.
- **⚠ AN EASING RAMP TO ZERO MUST BE `sqrt`, NOT LINEAR (iter 112).** To slow a mover as it nears
  something (a platform, a dock, a terminal), `v = V·d/B` is the intuitive choice and it is **wrong**:
  the time to cross the brake zone is `∫dx/(V·x/B)`, which **diverges**, so the mover spends nearly its
  whole journey pinned at whatever floor you clamped to. It tripled the monorail lap (210s vs 71s) *while
  still reading as three different speeds*. Use `v = V·sqrt(d/B)` — constant deceleration, physically
  what a train does, and it integrates to a finite `2B/V`. **Neither the census nor three visual agents
  can see this**; only a numeric probe of speed can (`probe-train.mjs`).
- **⚠ A PREDICATE WITH THREE READERS WILL HAVE THREE ANSWERS (iter 112; extends 107's dead-rule law).**
  "Is this stop a station?" was written inline in the draw (`stops.has(i) && countAround(...)>=3`), and
  *ignored* by the tooltip and the hovered-route pips, which counted raw `stops`. So a line claimed up to
  **twice** the platforms it drew (21–100% overstatement) and pipped bare track. 107 taught *audit a rule
  for reachability*; the sibling move is **`grep` for a predicate's OTHER readers before trusting any one
  of them.** Fix is iter 111's `stopQueue` shape: one function, one set (`m.sta`), every reader shares it.
  Free regression check: the census `stations` metric was computed by a *fourth* copy, and held at 40.
- **ELEVATED FEATURES CANNOT BE OCCLUDED — the 111 visibility law still applies, but passes trivially
  (iter 112).** All 19 monorail stations moved **1595–3590 px** in the approach-vs-departed diff at zoom
  3.4; not one was hidden. Contrast iter 111's street-level bus shelters, ~30% of which were permanently
  behind a building. Anything drawn at `RAILH=40` is above the rooftops. Still *measure* — but expect a
  pass, and expect the fit-zoom frame to show a stopping train (unlike a 3 px queue).
- **⚠ RUN THE PERF GATE IN ANY LAP THAT ADDS PER-FRAME DRAW WORK — not only at the 5th-iteration
  step-back (iter 109).** 109's first design added ~2000 `fill()`s/frame and cost **+28.5% day**. The
  census was blind to it by construction (draw-only ⇒ `pop +0`, empty tile histogram) and **3/3 visual
  agents called it beautiful.** Frame time was the *only* gate that knew. Had it waited for the
  step-back, the loop would have shipped the regression and then hunted it across five iterations'
  worth of suspects. Corollary from the same lap: **when a connector is expensive, look for the version
  where the existing geometry reaches** — growing one block into its neighbour drew the identical
  terrace for **zero** extra fills. *A connector you have to draw is a connector you got wrong.*
- **⚠ TWO LAWS FOR PIXEL-PROBING A FACADE (iter 109; `probe-terrace.mjs` is the worked example).**
  (a) **A control must live in the same frame as the thing it controls.** A pristine-vs-patched diff is
  invalid whenever you can see *past* your change: through an un-joined gap you look at the row behind,
  which legitimately changed, so the "unchanged" control class moves too. Compare against a reference
  point in the *same* frame instead. (b) **On a hex prism, equal screen `y` is not equal wall height** —
  the front face slopes `+V` (S-point) → `+E` (shoulder), so two points at one screen `y` differ by
  ~`V/4` in `z`, enough for one to land in a 3-tall glass band and the other on plain wall. Invert it:
  `y = cy + V + (E−V)·u − z`, and sample `z = 10+7k` (bands occupy `[5+7k, 8+7k]`, rails to `8.9+7k`).
  And **before doubting the feature, check the facade is visible at all**: restricting to joints with no
  `DEV` cell in the row in front took the reading from a muddy 42.6% to a decisive 64.9% vs 2.1%.
  **When a pixel probe of a 3-D scene reads weakly, suspect occlusion first.**
- **⚠ THE CENSUS IS LOAD-DEPENDENT, AND THE LEDGER HAS BEEN MIS-ATTRIBUTING ITS JITTER (iter 108).**
  `frame()` does `year+=dt*s/6` and fires `tick()` off *real elapsed time*, and it keeps running while
  Playwright is talking to the page. So the wall-clock gap between page load and the harness's
  `__census()` call lands in `year` — and `c.solar` / `c.groof` salt their `hashCell` on
  **`(year*23)|0`** / `(year*31)|0`. A few stray milliseconds tick that integer over and a few roofs
  flip. Measured: **two captures of *identical pristine code* gave `pop` 154915 vs 154918,
  `solarRoofs` 1474 vs 1471, `greenRoofs` 398 vs 397.** This matters because the ledger's stock
  explanation for small wobble is "terrain-gated `rng()` reshuffling" (the chaotic-CA invariant) —
  and **that cannot explain wobble on a draw-only vector, which touches no `rng()` at all.** Iter 108
  was draw-only and still showed `solarRoofs −3`. Before blaming your feature for a ±3, **re-capture
  the BASELINE, not just the latest** — running the same edited code twice only proves the edited side
  is stable. A real fix (freeze the sim before `__census()`) is an open harness vector.
- **⚠ `git stash` IS NOT A CLEAN PRISTINE CONTROL IN THIS LOOP (iter 108).** `census-baseline.json` is
  **tracked**, and `--save-baseline` modifies it — so `git stash` reverts your fresh baseline to the
  last *committed* one, and the "pristine" census you then run is scored against an iteration-old
  matrix. Iter 108's control printed `pop +4712` and looked catastrophic; it was comparing pristine
  code to iter 107's committed baseline. Read the **absolute** latest column, not the delta, when the
  stash control runs. Worse, `git stash pop` then **fails** on the appended `census-history.jsonl`
  (`local changes would be overwritten`) and leaves your work in the stash — `git checkout --
  .claude/skills/grow-city/census-history.jsonl && git stash pop` recovers it. Do not panic and reset.
- **⚠ A VISUAL AGENT WILL CONFIDENTLY INVERT A TONE ORDERING — MEASURE IT (iter 108).** Asked which of
  four frames had the brightest farm belt, one agent answered "August, deep chocolate-brown = darkest"
  across two independent runs; the other answered "August = brightest". A 40-line pixel probe settled
  it in one command: August **lum 160.8**, January **112.9** — the first agent had been reading the
  wrong hexes. Agents are reliable for *"is it broken"* (tears, blow-out, clutter — both passed those,
  and agreed) and unreliable for *"which is more X"*. **`probe-farmtone.mjs` (`git add -f`'d) is the
  general instrument:** `__find(TILE)` → screen coords → `getImageData` at each centre → mean RGB,
  luminance, and the **field-to-field spread**, which is how you prove *variation* (patchwork) rather
  than just *change*. Adapt it for any "does this tile's tone move across condition X?" claim.
- **DEAD-RULE TRIAGE, one lap on (iter 108 revisiting 107's candidate list).** 107 queued `GARDEN`
  (~0.3/city), `PLAZA`, `SOLARF` (0), `BURNT` (0) as suspected dead rules. Two are now **explained and
  should not be "fixed"**: `GARDEN` is gated `year>=2008`, and the census matrix's eras are
  1985/2005/2035, so it reads 0 in **two of three eras by construction** — ~2 per *2035* city, sparse
  but alive. `BURNT` is a **transient** (`age>6` → `EMPTY`), so a snapshot census will almost always
  miss it. **A census average across eras cannot distinguish "dead" from "late", and a snapshot cannot
  distinguish "dead" from "short-lived".** Only `SOLARF` (`FARM` + no `DEV` within 2 + `rng()<0.02`,
  2012+) remains a genuine open question — and note iter's earlier solar-farm attempt was reverted as a
  bad trade, so reaching it is not obviously desirable. Divide 107's list by *why* a tile reads 0
  before spending a lap on it.
- **⚠ A RULE CAN BE DEAD BECAUSE ANOTHER RULE'S PRECONDITION IS STRICTLY WEAKER ON THE SAME HOST
  (iter 107).** `T.MARKET` — a fully-drawn tile with stalls, string lights, `POPW` 14, membership in
  `DEV`/`ATTRACT`/`PEDDEST` — read **0 in every seed and era for the artifact's entire life.** Its
  siting rule wanted `COM` with **3** COM neighbours; the upgrade pass 40 lines above takes any inland
  `COM` at **2** COM-or-TOWER neighbours and *saturates* (iter 98). The market's precondition was
  strictly harder than the tower's, on the same host, in a race it always lost — **unreachable, not
  mistuned.** Fixed by rehosting on `PARK` + `buzz>=2` (markets are the open ground shops grow around).
  **`probe-market.mjs` (tracked) is the general instrument: it counts survivors of each successive
  conjunct of a predicate, so the starving clause names itself.** Run it on any rule whose tile the
  census reads ~0. Candidates worth auditing: `GARDEN` (~0.3/city), `PLAZA` (~1/city), `SOLARF` (0–1),
  `BURNT` (0). A dead rule survived 106 iterations; assume there are others.
- **⚠ THE NO-OP CONTROL — the terrain analogue of iter 97's stash control (iter 107).** To learn what a
  rule's **terrain writes** did, delete the write (`c.t=T.X;…` → `void 0`), keep the predicate, and
  census. Zero cells change, so it must read `+0`. When it doesn't, the delta you were about to blame
  on your feature is a **stream** artifact. Iter 107's no-op moved `pop` −0.3%, `EMPTY` +30 and
  **`FIELD` 20→14 with nothing built** — because the old dead rule's trailing `rng()<0.3` *did* fire in
  a narrow year window, so **deleting a dead rule's draw is itself a perturbation.** A rule that never
  changes terrain can still be load-bearing on the stream. This control is what distinguishes "my
  feature broke X" from "the stream moved"; the stash control cannot, because both files differ.
- **⚠ CHOOSE A CA RULE'S HOST TILE BY WHICH PASSES GATE `rng()` ON IT, NOT BY SCENERY (iter 107).**
  `T.EMPTY` hosts ~8 `rng()`-gated passes (farms, industry, forest succession, gardens, the civic lot
  search), so consuming an empty lot deletes every conditional draw those passes would have rolled
  there. `T.PARK` hosts none. Same rule, same ~2 markets/city, host is the only difference: **EMPTY →
  `pop` +4.6% on one salt, −5.8% on another** (the latter a `COLLAPSE` hard-fail); **PARK → +4.2 /
  −0.8 / −2.4, all passing.** A stream-quiet host halves the chaos amplitude. Grep `t===T.<HOST>` for
  `rng()`-gated passes before committing to a host.
- **⚠ A `hashCell` SALT IS A FREE PARAMETER THAT CAN SWING A CORE METRIC 10 POINTS — NEVER PICK IT
  AFTER SEEING THE CENSUS (iter 107).** Identical rule, three salts, `pop` from +4.6% to −5.8%: one
  ships, one hard-fails, and *nothing about the city differs*. Ship the constant you typed **before**
  running anything, and report the spread. Corollary, and it generalizes past salts: **on a chaotic CA
  the `pop` delta of a terrain vector is a property of the perturbation, not of the feature.** Judge by
  the tile histogram. Conversely the **`hashCell` *probability*** is a free, stream-neutral tuning lever
  (107 raised coverage 0.5→0.72 with zero stream effect) — tune eligibility there, never with an
  `rng()<p` (iter 98).
- **⚠ AN ATTRACTION FIELD MUST EXCLUDE THE GROUND YOU STAND ON (iter 104).** The buzz field was first
  built by counting `PEDDEST` neighbours — the list already named "pedestrian destinations". It made
  peds *worse*: street occupancy fell **18.3%→15.4%**, draining the streets. Cause: `PEDDEST` is mostly
  **open ground** (`PARK`/`GARDEN`/`QUAD`/`SHOREPARK`), and parks are large and **adjacent to
  themselves**, so a park *interior* scored above a kerb outside a row of shops — the field's argmax
  was the middle of a lawn. `PEDDEST` answers *"what do I turn to face"* (its only prior use was
  `kerbDir`); an attraction field answers *"what do I cross a block to reach"*. Those are different
  questions and **the plausible name was the wrong list.** Fixed by `ATTRACT` — things you mostly
  *cannot stand on*, so they can only raise the buzz of the ground **around** them, which is exactly
  the café edge and the shopfront kerb. **Before reusing a Set, check what its existing call sites
  ask of it, not what it is called.**
- **⚠ A STOCHASTIC CONTROL NEEDS TWO RUNS TOO — and the aggregate can be unreadable (iter 104).**
  Iter 103 said: for load-dependent metrics, run the *same* code twice. The same law holds for any
  metric whose noise is **sampling** rather than machine load. `stepOld`'s street occupancy read
  **21.4%** and **17.4%** on identical bytes and the same seed (130 peds, Math.random): a **3.0–5.3
  point** run-to-run spread, wider than iter 104's whole effect. So the aggregate could neither
  convict nor acquit the change. What *could*: **splitting the metric by the hypothesis.** Street
  occupancy decomposed into *kerbs fronting a shop* (**8.5%→14.0%**) and *dull lanes*
  (**10.3%→8.1%**, down on all three seeds) — two large, sign-consistent effects hiding inside a
  noise-dominated sum that moved +3.2 points. **When a metric is too noisy to grade a vector, don't
  average it harder — partition it along the mechanism you claim.**
- **A random walk can be biased WITHOUT changing how often it moves (iter 104).** `stepPed` drew 1 of
  6 directions blind and stayed put on a wall, so `P(move) = step·(legal/6)`. Picking directly from
  the *legal* set — the obvious way to add a bias — silently moves every ped 2–3× more and blows a
  tuned occupancy. Multiplying the step roll by `legal/6` restores the original marginal **exactly**,
  leaving the field to change only **where** they go, never **how often**. Any future "make entity X
  prefer Y" vector on a reject-sampled walk has this trap.
- **BUILD IN THE SEA WITHOUT A TILE TYPE (iter 106; the pier/turbine pattern).** A `Map` keyed by
  `idx`, laid in `genWorld` from `hashCell` only, drawn from `case T.WATER`, and named in
  `describeTile` **before** the tile under it. No `T.*` constant, no entity array, no `rng()` draw —
  `pop` came back **exactly +0**. `moleSet` (the breakwater) joins `pier`/`turbSet`. Reach for this
  before adding a tile type. Note `shoreAt(y)` **is** the first ocean cell of the row (`x>=sh` →
  WATER, `sh-3..sh-1` → BEACH), so it is the correct root for anything thrown out from the beach —
  but require `BEACH` at the root's back, or you will root on the **river mouth** (seed 3 did).
  `probe-mole.mjs` (tracked) checks hex-neighbour contiguity, root-on-sand, single head, and whether
  the anchored freighter lands inside the arm; adapt it for any coastal structure.
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
- **⚠ A STRUCTURE'S TONE MUST CLEAR EVERY SURFACE IT CROSSES (iter 106).** Third law in the family
  after 100 (ornament averages into tone) and 101 (contrast × width). The breakwater drew in
  `whiteDk` — copied from `ROCK`, which sits on **grass** — but the mole spans **sand then sea**, and
  `whiteDk` (lum 220) against `sand` (221) is invisible. A visual agent failed it as *"floats
  detached in open water"*; `probe-mole.mjs` proved the root cell abutted `BEACH` all along. **The
  defect was tonal and the report was geometric.** Fixed with `stone`/`stoneDk` (lum **122/92**),
  clearing sea (155) and sand (221) both. Two corollaries: **(i)** pick a tone against the background
  it will *actually* sit on, and if it spans two, clear both; **(ii)** when an agent says "floating"
  or "detached", **measure the geometry before rewriting it** — "invisible" looks exactly like
  "not connected" from the outside.
- **A MULTI-SEGMENT PATH BUILT BY "ADVANCE, THEN TEST" SKIPS A CELL AT THE JOINT (iter 106).** The
  mole's straight run ended `path.push([x,y]); x++`, leaving the cursor one *past* the last cell, and
  the diagonal hook then added its own `dx` on top. Seeds 5 and 99 laid arms with a one-cell hole;
  seeds 7 and 42 were saved only by row parity making `dx=0`, **so the two seeds under test looked
  perfect.** Keep the cursor on the last cell laid; test each step before taking it. Any jetty /
  causeway / spit has this trap and **it hides behind parity** — check contiguity on ≥8 seeds.
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
- **⚠ THE COLOUR-RESTATES-HEIGHT CLASS IS NOW EXHAUSTED — MID (99), RES (103), TOWER (110).** All
  three building types drew colour from the field that drives height. TOWER was the worst and lasted
  longest: `style` *and* `c.th` both read `c.v`, so the four silhouettes were four **height classes**
  (mean th 58/84/95/121) and the tallest tower was a terracotta ziggurat in 2 of 3 cities — downtown
  had exactly **four looks**. `corr(style,th)` **0.727 → 0.257**, distinct looks **4 → 19 of 20**.
  **`probe-towertone.mjs` (`git add -f`'d, reads the permanent `window.__twr` hook) generalises**:
  recover the field that picks colour and the field that picks height, report Pearson. If a fourth
  building type is ever added, measure it on day one.
- **⚠ MIXING TWO UNIFORM HASHES GIVES A TRAPEZOID — RE-SOLVE THE CUTS OR YOU CULL THE RARE FORM
  (iter 110).** The iter-99 recipe `mv*0.72+v*0.28` is **not uniform**: its density rises on
  `[0,0.28]`, is flat to `0.72`, then falls. So reusing the old thresholds silently reshapes the
  distribution — keeping TOWER's `0.35/0.62/0.85` would have cut ziggurats from 15% to **5.6%**, a
  two-thirds cull of the most characterful tower *dressed up as a variety win*, and a `corr` check
  would have passed it. Solving the trapezoid CDF for the original mix gave `0.39/0.59/0.75`
  (measured after: 37.6/24.9/24.5/13.1 vs 35/27/23/15). This is iter 98's hold-the-mean law applied
  to a **distribution**. It bites whenever the decoupled selector also chooses *geometry*, not colour.
- **⚠ A PROBE MUST READ THE RULE, NOT RE-DERIVE IT (iter 110).** `probe-towertone.mjs` first
  copy-pasted the selector under an "edit BOTH together" comment — a drift bomb that would quietly
  grade the wrong rule after the next edit. Extracting `towerLook()` as the single definition and
  having `window.__twr` call it makes the probe grade the **live** code. Pair with iter 101's law: a
  tracked probe that reimplements what it measures is *worse* than no probe.
- **⚠ THE STEP-BACK'S AGENTS ARE GOOD WITNESSES AND BAD DOCTORS (iter 110).** Both holistic agents
  correctly saw *repetition* in the downtown; **all three of their prescriptions were closed dead
  ends** — "add parks" (cue e½, closed 102), "the floating district lines" (the monorail beam, closed
  87 — the header's pre-registered false positive fired again), and "give the roads contrast
  hierarchy" (dead by iter 101's contrast×width law, since a road is a 1-hex ribbon; and the *width*
  branch re-opens cue (b), closed 86). **Take the observation, discard the prescription, then go find
  the mechanism in the source.** Here the mechanism was one `const` on one line — no agent could see it.
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
  **⚠ AMENDED BY ITER 103 — one pristine run is NOT a control.** `pop`, `towerHt` and `solarRoofs`
  are all functions of **how many frames rendered** in the census's 500ms settle (the first two read
  `c.h`, which grows at *draw* time; the third quantizes a salt off the float `year`), so they track
  **machine load**, and a pristine run can read exactly `+0` *by luck* — framing your change. Iter
  103 saw pristine `+0` against its edit's `−3/−1/+2`, then re-ran the **unchanged edited file** and
  got `+6/+1/+0`. **Run the SAME code twice; a delta that flips sign is noise.** These three metrics
  only, and never mind them if the tile histogram is empty.
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

## Iteration 114 — the square that had nowhere to go (2026-07-10)

**Vector** — Civic & culture × **Polish**. Rotation named the domain (Civic 107 was the stalest *safe*
pick; Sky 95 is staler and a documented trap) and the header named the content: **banked cue (d)**,
"the civic quarter deserves a real square", open since iter 91. Kind is Polish, not Deepen — Deepen had
paid 3 of the last 6 laps.

**The seam.** Cue (d) prescribed the implementation: *"2–3 contiguous `PLAZA` cells fronting several
institutions… scope it to `MAJORK` cells that have ≥2 other `MAJORK` within 4 hexes."* I built exactly
that: a 2024+ pass that finds a quarter member's forecourt and annexes one adjoining `FORECOURT_LOT`
that fronts a street; a `plazaPatch()` used by rule *and* tooltip (iter 112's one-predicate law); a
`c.sq` head/annex role so the head keeps the rosette, statue and bunting while the annex draws open
paving, benches and a night lamp; and a tooltip that names the square and the institutions it fronts.

**Census said the rule never fired.** `pop −3`, tile histogram **empty**. (The `−3` is iter 108's load
jitter: after reverting, the same code re-censused at `pop +0` exactly.)

**Measured why** (`probe-square.mjs`, tracked — conjunct-survivor method from `probe-market.mjs`):

| | seed 7 | seed 42 | seed 1234 |
| --- | --- | --- | --- |
| `PLAZA` patch sizes | **[1, 1, 1]** | **[1, 1]** | **[1, 1, 1]** |
| majors · quarter members | 6 · 4 | 6 · 3 | 6 · 4 |
| quarter members **with a forecourt** | 2 | 1 | 3 |
| …of those, with an **eligible annex lot** | **0** | **1** | **0** |

Every plaza in the artifact's entire life has been a **single hex**. And the annex has no host, because
a forecourt is **a road junction**. Across the 6 quarter-member heads, their 36 neighbour slots are
**ROAD 16 (44%)** · CIVIC 7 · QUAD 4 · PARK 3 · ROCK 2 · TOWER 2 · MID 1 · COM 1. Only **2 of 36** are a
pavable `FORECOURT_LOT`, and only **one** of those fronts a street — seed 42's town hall, which then
lost the `hashCell < 0.85` roll. The rule fired **zero** times in three cities.

**Then I asked the next lap's question before closing.** A throwaway build (ROAD allowed as an annex,
gate wide open, backed up + reverted) grew real squares: `PLAZA 8 → 19`, `ROAD −9`, `COM −1`,
`pop −810` (−0.52% for 11 cells — matching iter 101's measured 0.045%/cell almost exactly). Two visual
agents on two seeds: **PASS** both. The 3-hex square reads as *"one coherent paved square… annexes look
like plaza, not blank"*, no street dead-ends into it, whole-city frames clean. At **fit zoom** it is
*"findable but modest — a distinct pale patch… though it could be missed on a fast scan."*

**Verdict — EXPLORED → REVERTED.** Cue (d)'s *goal* is sound and now demonstrated; cue (d)'s
*prescription* is dead. Shipping the lot-based rule would have shipped a pass that fires on one
institution in one of three cities. Retuning the gate to `0.95` to rescue that one host is precisely the
move iter 107 forbids (never pick a salt or probability after seeing the census), and it would have
bought noise, not a feature. The road-based version works and is beautiful — but it is a **different,
unvalidated rule with an unaudited blast radius**, and choosing it after reading a census is the same
forbidden move one level up. It belongs to a lap that starts from the hazard list below, not to this one.

`solvista.html` is byte-identical to HEAD. Pristine control census: `pop`, `roads`, `developed` **+0**,
tile histogram empty.

### Findings

- **⚠ A FORECOURT IS A ROAD JUNCTION — THERE IS NO LOT BESIDE IT (new; extends iter 100).** Iter 100
  proved *the cell between two clustered majors is the street they both front*. The sharper fact: the
  forecourt's **entire neighbourhood** is street. It is sited to front the loudest one (`c.flow`), so by
  construction it is ringed by roads — **44% of its neighbours**, against **5.6%** pavable lots. Worse,
  the two rules are **eating each other's hosts**: the grounds pass (iter 100) takes the back lot for its
  `QUAD` (4 of 36 slots), so the forecourt's only non-street neighbours are the green its own institution
  earned. **Any "extend the civic square" vector must take the ROAD, or it has no host at all.**
- **⚠ A 3-HEX PAVED BLOB *DOES* READ AT FIT ZOOM — iter 101's law, confirmed from the positive side for
  the first time.** 101 established that below ~2–3 hexes a corridor is untraceable *at any ΔL*, and it
  died proving the negative (a 1-hex greenway ribbon, ΔL 22–35, nine agents could not trace it). Here a
  3-hex **blob** of the same paving was found unprompted by both agents at fit zoom. Width, not contrast,
  was always the variable. **The corollary matters for planning: cue (d) is worth a lap, and its minimum
  viable size is 3 — a 2-hex square would sit on the edge of the law.**
- **⚠ A PER-HEAD "GROW TO N" GUARD DOES NOT PREVENT A MERGE — AND A MERGED SQUARE HAS TWO CENTREPIECES
  (new).** `if(plazaPatch(head).length>=3)continue;` is evaluated per institution, so two majors 2–3
  hexes apart each grow toward the other and their patches **join**. Measured on the throwaway: seed 1234
  produced a **5-hex patch carrying 2 heads** — two fountains, two rosettes, two sets of bunting inside
  one square. Any future patch-growing rule needs a **demote-on-merge** step (keep the lowest-idx head,
  set the rest to annex), not just a size cap.
- **⚠ THE AGENT CREDITED A NEIGHBOUR'S ORNAMENT — AGAIN, AND ON A DIRECT YES/NO QUESTION (iter 113's law
  fires unprompted).** Asked point-blank *"do you see more than one fountain/statue/rosette in this
  square?"* on the frame that **provably had two**, the agent answered *"only ONE centrepiece region — the
  orange dome"*. The dome is an **institution**, not a plaza centrepiece. A 20-line `page.evaluate` that
  flood-fills each patch and counts `!c.sq` settled it in one command (`3hex/1head · 5hex/2head`). 113
  said agents mistake a neighbour's entity for your ornament; add: **they will do it while answering the
  exact question you asked to prevent it.** Never accept an agent's *count* of anything.
- **A RULE WITH ONE HOST ACROSS THREE SEEDS IS NOISE, NOT A FEATURE.** The temptation on reading
  `annexLots: 0/1/0` is to loosen a threshold until it fires. That inverts the census's purpose: the
  histogram was reporting *the design is starved*, not *the gate is too tight*. The `hashCell<0.85` roll
  that killed seed 42's only host is a red herring — with the gate at 1.0 the rule still fires **once**,
  in **one** city, on **one** institution.
- **HAZARD LIST FOR THE ROAD PIVOT (for whoever takes cue (d)).** Cars are **safe**: `stepVehicle` picks
  from `roadNbrOpts` each hop and reverses at a dead end (`if(!opts.length){v.nx=lx;v.ny=ly}`) — there is
  no global path to break. Unaudited, and all of them read `ROAD`: **trams and the monorail/gondola lines**
  (drawn along road cells), **`c.stop`** (bus stops — the throwaway already excluded these and `c.bridge`),
  **`c.flow`** drainage and the `ARTFLOW` arterial classification, **`frontSide()`** (reads ROAD neighbours,
  so paving one can flip an institution's front on a later tick), **boulevard trees**, **`c.hstr`**.
  Budget a lap for the audit, not an afternoon. `roads` is a **core** census metric — the throwaway's
  `−9 / 5786` (−0.16%) is comfortable, but a wider rule could approach the 5% collapse gate.
- **`probe-square.mjs` and `shot-square.mjs` are `git add -f`'d** (iter 101's law: an untracked probe the
  ledger cites does not exist). The probe reports plaza patch sizes, per-major forecourt status and the
  head's neighbour composition; the shooter finds the **largest patch** by flood fill and wheels the
  artifact's own camera onto its centroid — reuse it for any *"does this multi-hex patch read?"* claim.

## Iteration 115 — the city keeps its lights on downtown (2026-07-10) [holistic step-back]

**Vector** — Sky & atmosphere × **Polish**. Rotation named the domain: Sky was the stalest (95) and had
been stalest for twenty laps, parked because it is *additively* saturated. This lap is the way past that —
it adds nothing. Kind is Polish (make what exists read better), not Deepen: Deepen had paid 3 of the
last 7 laps. The content was chosen by the step-back's own agents, not by me.

**The step-back found it.** Three un-zoomed whole-city agents (seeds 42/7 day, seed 42 night). Both day
frames PASS. **The night frame FAILED**: *"lighting has no hierarchy — uniform window-light density
everywhere makes the city read as one flat glittering mat instead of a skyline with a luminous core
fading to dark residential edges."* Independently, the seed-7 **day** agent reached the same place from
the other side: *"87 towers sprinkled almost evenly across the whole landmass with no skyline logic…
the skyline has no focal massing."* Two agents, two frames, one claim: **the city has no centre.**

**But that is a "which is more X" claim, and iter 108's law says agents invert those.** So it was measured
before a line was written (`probe-nightcore.mjs`, `git add -f`'d).

**The cause was in the source, not the pixels.** `drawBuilding`'s only window-light term is
`lit=LITAMT*(0.35+0.65*c.lit)`, and `c.lit` had **exactly one writer** — `genWorld`'s
`lit:hashCell(y,x,seed)`. Per-cell white noise. The night light field was, by construction, independent
of downtown, density, value and height:

| | seed 7 | seed 42 | seed 1234 |
| --- | --- | --- | --- |
| `corr(c.lit, dist-from-CBD)` **before** | **+0.008** | **−0.013** | **+0.056** |
| mean `c.lit`, rings 0-4 → 22-40 | 0.42 → 0.52 | 0.62 → 0.51 | 0.46 → 0.50 |
| `corr(c.lit, dist)` **after** | **−0.806** | **−0.827** | **−0.776** |
| mean `c.lit`, rings 0-4 → 22-40 | **0.81 → 0.27** | **0.90 → 0.26** | **0.83 → 0.25** |
| `corr(c.lit, th)` before → after | −0.008 → **0.088** | 0.015 → **0.068** | −0.071 → **0.052** |

**Change.** Once the founding fixes `CBDX,CBDY`, one pass over the grid moves the **mean** of `c.lit`
along a smoothstep falloff and keeps the existing seeded draw as the **variance**:
`c.lit = clamp(0.18 + 0.70·smoothstep(1−d/LITR) + (c.lit−0.5)·0.5, 0, 1)`.
Driven by **position alone** — never height or type, so a building still does not wear its height twice
(iters 103/110); the guard is `corr(lit, th)`, which stayed at 0.05–0.09, far below the 0.35 decoupling
line. New constant `LITR=34`, deliberately **not** `CORER=16`: over half of every city's buildings stand
beyond hex 22 from the CBD, so reusing the tower-siting radius would have pinned the whole outer city at
one dim value and merely moved the flatness outward. No new `hashCell`, no new salt, no `rng()` draw.

**Census** — `pop`, `roads`, `developed`, `towers`, `parks` all **+0**; tile histogram **empty**;
`greenRoofs −1` is iter 108's documented load jitter (salted on `(year*31)|0`), not this vector. Exactly
the draw-only signature. VERDICT: PASS.

**Visual** — 3 agents, all PASS. Rather than ask "is the core brighter?" (the question 108 says they
invert), each night agent was asked to **locate downtown by light alone** and the answer checked against
ground truth. Blind, both hit it within ~2% of the frame:

| | agent's centre | true CBD | error |
| --- | --- | --- | --- |
| seed 42 | (0.47, 0.50) | (0.49, 0.51) | ~33 px |
| seed 7 | (0.50, 0.62) | (0.48, 0.63) | ~33 px |

Seed 7's core is **not** at frame centre (y=0.63), so that is a discriminating hit, not "guess the middle".
Both confirmed the rim still reads as buildings (no black void) and that light still varies
building-to-building — *"dark unlit blocks sit right beside brightly lit towers even in the core"* — so it
reads as a city, not a painted vignette. The day agent confirmed **no** lighting effect at midday.

**Perf** (step-back gate, min-of-3, sequential): day **33.83ms** · night **38.55ms** vs baseline
33.16/37.33. Day is *identical* to the pristine control taken at the head of this same session (33.83ms).
The bake is one-time in `genWorld`; `drawBuilding` is untouched, so per-frame work is unchanged. Readings
rose monotonically across the three passes (33.83→34.44→34.89) — load, not code (iters 99/104). Not re-pinned.

**Verdict — SHIPPED.** The stalest domain in the city was fixed by *removing* a defect, not adding a feature.

### Findings

- **⚠ TWO PAGE LOADS ARE NOT THE SAME INSTANT — the same-frame law has a second half (new; extends 109).**
  109 said: freeze the sim, toggle only your feature, and every other pixel is identical *by construction*.
  What it did not say is **where** the two frames must live. The first cut of `probe-litdiff.mjs` diffed a
  pristine build against the patched one across two `page.goto`s and reported **5.6% of DAY pixels changed**
  — including at `t=0.44`, where `LITAMT` is *exactly 0* and the feature provably cannot draw. The probe was
  lying: `frame()` runs on rAF from the moment of load, so between `goto` and `evaluate` a variable number of
  frames tick the sim, drift the clouds (`syncSky` takes `performance.now()`) and step every vehicle. **The
  tell was self-contradiction: re-running the identical comparison gave 89408 px, then 89633 px.** A
  deterministic diff that changes between runs is measuring the harness. Fixed by doing the A/B **inside one
  page**: render, mutate the field in place, render again, restore. Day went to **0 px changed, exactly**,
  and night to 6.6% (dusk 4.9%). *If a probe of a frozen scene is not bit-exact, do not reach for a
  tolerance — find what is still moving.*
- **⚠ A SINGLE-READER, SINGLE-WRITER DRAW FIELD IS THE SAFEST THING IN THIS ARTIFACT TO CHANGE (new).**
  `grep -n '\.lit'` returned three lines total: the write, the read, and an unrelated `dl.lit`. That
  three-line grep is what licensed the whole vector — a field no CA pass reads cannot perturb the seeded
  stream, so `pop` was *guaranteed* flat before the census ran, and it was. The mirror of 107's dead-rule
  law: **107 says grep a rule's writers before trusting it; this says grep a field's readers before fearing
  it.** Combined with `LITAMT=0` at midday, the change was provably day-invariant *and* census-invariant
  before a single gate was run. Look for the other one-reader draw fields (`c.v`, `c.dist`) when a Polish
  lap needs a guaranteed-clean ship.
- **⚠ ASK AN AGENT TO *LOCATE*, NOT TO *COMPARE* — and check it against ground truth (new; the practical
  answer to 108's law).** 108 established agents are reliable for "is it broken" and unreliable for "which
  is more X", and left the loop with no way to visually grade a *magnitude*. There is one: convert the
  comparison into a **localization**, then verify it numerically. "Is the core brighter?" is unanswerable
  and invites flattery; "point at the brightest concentration, in fractional coords, or say NO CENTRE" is
  gradeable against `ctr(CBDX,CBDY)·scale+off`. Two agents landed within 33 px of a CBD they were never
  told. **Give the agent an escape hatch** ("NO CENTRE is a completely acceptable answer") or the hit means
  nothing — an agent that must name a point will always name one. This generalizes to any vector with a
  known location: a square, a lung, a depot, a line.
- **THE NIGHT WAS THE ONLY FRAME THAT KNEW.** Two day agents passed the same city the night agent failed,
  and the census, the tile histogram and the perf gate were all blind to a defect present in every city
  ever generated. The loop has taken ~114 whole-city reads and, until this one, **essentially all of them
  were by day** — the same blind spot that hid the January-only shots until iter 108 and the dead-low-water
  shots until 113. **Shoot the step-back at night too; it is a different city.**
- **Banked cue (j) — the night windows verge on stripe-noise** *(Urban fabric, or a `polish-tile` job)*. The
  same night agent, second complaint: across the dense core the yellow window rows are *"extremely dense and
  repetitive — they buzz as horizontal-stripe noise rather than individual lit windows, especially on the mid
  towers."* This lap dimmed the periphery, which relieves it at the rim but **not downtown, where the fix
  made rows brighter**. Distinct from this vector (per-window density inside `drawBuilding`'s band draw, not
  the light field), so it was left alone. Take it with `probe-litdiff.mjs`'s in-page A/B.
- **~~Banked cue (k)~~ — CLOSED BY ITER 116 (the field half). The SITING half is still open** — see 116's
  last finding: the turbines/boats are still salted into water of any depth, and `rDeep` now exists to
  found them on the `Coastal shelf`. Original cue, kept because its wording is what made it actionable:
- **Banked cue (k) — the open water is the least-resolved third of the frame** *(Water & coast)*. **Both**
  day agents, unprompted and independently, named the sea: *"a large flat teal wedge — no wave detail, reefs,
  wake trails, or depth gradient… it carries a disproportionate share of canvas for how little it resolves"*
  and *"the entire right third is flat teal… compared to the hyper-dense land it reads as dead space."* Two
  independent agents converging unprompted is the strongest cue signal this ledger has. Note both also called
  the scattered offshore turbines/boats *"randomly salted rather than sited"* — so the answer is likely
  **depth/texture in the water field**, not another floating object.
- **`probe-nightcore.mjs` and `probe-litdiff.mjs` are `git add -f`'d** (iter 101's law). `probe-nightcore`
  reports, per seed, `corr(lit,dist)`, `corr(lit,th)` and mean `c.lit` + mean sampled luminance per distance
  ring — reuse it for *any* "does this field follow the city's structure?" claim. `probe-litdiff` is the
  general **same-instant A/B**: freeze, render, mutate in place, render, diff. It is the right instrument for
  any change whose blast radius you want to bound in pixels rather than argue about.


<!-- header cue trimmed by iter 126 (CLOSED, moved from GROWTH.md header to stay under the 400-line budget) -->
## Closed cue (k) — the open water (banked iter 115, CLOSED by 116 + 123)

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
  (CLOSED: 116 gave the sea its depth field `rDeep`; 123 stood the wind farm on the coastal shelf.)

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

## Iteration 126 — the moon keeps a calendar (2026-07-11)

**Vector.** Sky & atmosphere × **Deepen**. Sky was the stalest domain (last 115) and had gone twenty laps
without a vector; the documented way past its additive saturation is a **Deepen that adds no element** (115
itself did this). The moon had been a **fixed full disc since the artifact began** — a constant circle at
screen (0.80, 0.15), the same every night of the city's 61-year run. It has a rich neighbour it never talked
to: `year`. So this interconnects moon ↔ calendar ↔ the existing moonglade, adding no tile, entity, CA pass,
or `rng()` draw.

**Change.** The moon now waxes and wanes on a synodic month as `year` advances (~12.37 lunations/yr):
- `MOONF` = lit fraction `(1−cos(2π·frac(year·12.3685)))/2`, computed once at render scope so both the moon
  draw and the moonglade read the *same* phase (one predicate, all readers — iter 112's law).
- The moon draws as a **dim full "earthshine" disc** (so the unlit part still reads as a moon) with the **lit
  lune** on top — outer limb semicircle on the lit side + a terminator half-ellipse whose x-radius shrinks to
  0 at the quarters and flips its bulge crescent↔gibbous by the sign of `cos(phase)`. Craters fade in only
  past `MOONF>0.5`; the glow scales with `MOONF` (a new moon casts almost none).
- **The moonglade dims with the phase** (`×(0.12+0.88·MOONF)`): the sea only shines when there's a moon to
  shine it. New moon → a faint 12% glade; full → the full pool.
- `window.__moon()` → `{phase, illum, waxing}`, and `?year=` (iter 108) already pins it for tests.

**Census.** PASS, exit 0, pageerrors 0. **Every metric +0, tile histogram empty, every entity count
identical** — exactly as predicted for a draw-only change that reads `year` and touches no `rng()`/terrain.

**Probe.** `probes/probe-moon.mjs` (moved into the tracked dir, per iter 101). Freezes the clock, pins night
(t=0.90, LITAMT=1), steps `year` across one full lunation, and counts **alpha-weighted** bright pixels in the
moon box (compositing over the transparent-black canvas — the faint glow is a bright colour at low alpha and
must NOT count as lit; the first draft counted it and read the whole box "lit"). Against `__moon().illum`:
`corr(illum, lit px) = 1.000` on seeds 42 & 7; **new moon → 0 lit px, full → 392** (≈ disc area π·11²); **land
control max dev 0.02–0.26 lum** (only the moon moves). A separate check: full-vs-new **moonglade signal =
+393…419** bright px on the sea across seeds 7/42/1234 — the glade brightens with the phase, as designed.

**Visual.** Both fit-zoom agents FAILED — and **contradicted each other, crossed**: the crescent frame read
as "full", the full frame read as "crescent lit on the left". At ~22px the moon defeats a downscaled PNG, so
per the loop's law (agents fail confidently ⇒ measure) I shot **3× tight clips** and read them myself: the
crescent is lit on the **right** over a dim disc, full is a bright disc with craters, new is a near-dark disc
with a thin sliver, gibbous is mostly-lit with a bite from the left — all four correct and legible at zoom.
Both agents independently confirmed the **whole frame** reads as a balanced night coastal city, no tears/
floaters/blowout. Verdict from probe + own eyes, not the agents.

**Verdict — DEEPENED.** The oldest fixture in the sky finally keeps time, and the sea shines only when it can.
Sky is no longer the stalest domain. No tile, no entity, no `rng()`, pop provably flat.

### Findings
- **`getImageData` RETURNS UN-PREMULTIPLIED RGB — a low-alpha glow reads as full brightness.** A probe that
  thresholds luminance on a canvas with transparency **must** multiply by `alpha/255` (composite over the
  known background). The first `probe-moon` draft counted the moon's 0.15-alpha glow as "lit" and reported the
  entire box lit at every phase (corr 0.000). This bites any future probe that measures a glow/halo/foam over
  transparent canvas.
- **A ~22px feature at fit zoom is below the visual gate's floor — shoot a tight clip and read it yourself.**
  Two careful agents didn't just miss the phase, they inverted it and disagreed. The moon is a *compact* object
  (they all FOUND it), so it isn't cue-(k)'s contrast×width problem — it is simply too few pixels to read
  *shape* from a 1600→downscaled PNG. For any small-but-legible ornament, the gate is a zoomed clip + a probe,
  not a whole-frame agent read.
- **A fixed constant is a Deepen waiting to happen — look for a drawn thing that ignores a field it could
  read.** The moon read *nothing*; `year` was right there. Sky's remaining such seams (the way past its
  saturation, per 108/113/120): `VINEYARD` seed-heads still ignore `year`. Anything drawn from a lone literal
  (a fixed position, a fixed brightness) that a global already varies is a candidate.

## Iteration 127 — the parks get a picnic (2026-07-11)

**Vector.** People & activity × **New element**. People was the stalest domain (last 119) and its additive
inventory was declared spent (119's finding: only Deepen/Scale live) — but that inventory was of *entities*;
its live cells and the domain's biggest **untouched surface** are two different things. Iter 120's step-back
had already sized that surface: **PARK is the city's real green mass (878 hexes)** and *"if you want the city
to look different, the lever is PARK."* The parks had ponds, fountains, cafés, sculptures, fireflies — but no
one *at rest* on the grass (SHOREPARK has a picnic blanket; PARK never did). New element was also the coldest
kind (last 106, twenty laps), and the header said vary off Deepen/Polish. Draw-only + `hashCell`, so pop is
provably flat.

**Change.** A new `v`-band in the PARK draw (`v∈[0.32,0.44)`, ~12% of parks, carved between the fountain and
tree branches): an **open sunny lawn** — one shade tree instead of three — with, **by day only** (`LITAMT<0.5`,
mirroring the kid/day logic and complementing the night fireflies), a **coral-or-lav checkered blanket**
(`hashCell` picks the colour), two white check squares, a `trunk` picnic basket, and **two seated figures**
(a short colour torso + an `ink` head dot, in the ped house style). No new tile, entity array, `rng()` draw,
or `tick()` pass — so no census hook, `TILELABEL`, or `ENTINFO` change (it is still a `PARK`).

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, every core metric **+0**, entity counts
identical (`greenRoofs +1` is the documented `(year*31)` salt jitter). Exactly as predicted for a draw-only
`hashCell` change that touches no terrain and no seeded stream.

**Probe.** `probes/probe-picnic.mjs`. Freezes the clock (109's same-frame law) and counts **LAV** blanket
pixels in each park tile's lower box, by day and by night, with **FOREST** as the null control. Lav is the
signal because it is the *only unique colour*: **coral is shared with terracotta/`coral` building roofs**
(a park next to one reads as a picnic — the first probe draft's headline "112 hits" was a neighbour's roof,
and a coral roof dims below threshold at night so it even fakes the day-only test). Result, seeds 7/42/1234:
**park lav px day 20/17/9 = 46 → night 0/0/0**, **FOREST control 0/0 every seed**. A picnic appears by day,
is gone by night, and nowhere but a park.

**Visual.** My own read of a 5×-zoomed clip (the blanket is ~5px, below the fit-zoom floor — iter 126's law):
a coral blanket with two seated figures + a white check, sitting cleanly on the open lawn beside one tree,
unmistakably a picnic. Then 2/2 whole-frame agents (seeds 42 & 7, `wide`, day `year=2035.62` off-January per
125): parks read as balanced green space (trees + ponds + fountains + **open lawns as legible clearings, not
bare holes**), no z-order tears / floating tiles / blown-out colour anywhere, whole frame a cohesive beautiful
coastal city. The muted coral/lav lawns "blend in," not glaring.

**Verdict — SHIPPED.** People's stalest streak is broken by aiming a New element at its biggest *surface*
(PARK) rather than its spent *entity* list. Draw-only, pop provably flat, day-gated, visible up close.

### Findings for later laps
- **⚠ PICK A PROBE'S SIGNAL COLOUR FROM THE PALETTE'S *UNIQUE* ENTRIES, NOT THE OBVIOUS ONE (new; the lap's
  central lesson).** `coral` was the natural blanket colour and it is **shared by building roofs** (`roofN`
  can be `coral`/`terra`), so the coral probe conflated picnics with the roofs of buildings *adjacent to
  parks* — and because a roof dims at night, it even survived the day-only cancellation. `lav` is used by
  nothing structural (no roof/body/car/road tone), so it is a clean tracer. **Before trusting a colour probe,
  grep the palette for every other draw that uses that colour name.** (Extends 120's "a car dims below
  threshold and reads as day-only" — same trap, different static object.)
- **DAYLIGHT DESATURATES A COLOUR TOWARD GREY — a probe matcher tuned to the BASE rgb will miss it (new).**
  `lav` base `[178,148,198]` renders `~[192,168,184]` at `t=0.30`: B pulled 210→184, the blue-over-green gap
  shrunk from ~+50 to ~+14. The first matcher (`bl>gr+22`) scored **0** on real blankets. Sample the
  *rendered* pixel and tune to that, never to the palette literal.
- **A DOMAIN'S "ADDITIVE INVENTORY IS SPENT" IS A CLAIM ABOUT ITS ENTITIES, NOT ITS SURFACES (new).** 119
  retired People as additively done, and for peds/dogs/joggers/crowds it was right. But the parks — 878 hexes,
  the single biggest tile class — had no people at rest, because "People" had only ever been read as *moving
  entities*. When a domain's entity list is exhausted, look at what large *static surface* it could still
  populate before declaring it saturated. People's remaining such surfaces: plazas/quads (buskers, market
  stalls beyond the café), stadium/amphitheatre seating.
- People's live cells remain **Deepen** and **Scale** for entities; **New element** is now re-opened for it
  via *surfaces* (this lap). The picnic band replaced ~12% of dense-tree park tiles with open lawn + one tree —
  parks stayed balanced (both agents), so a small tree-density trade for variety is safe on PARK's large n.

## Iteration 128 — the cable cars leave the tower (2026-07-11)

**Vector.** Transport × **Deepen** (a fix). Transport was the second-stalest domain (121) and its last entry
banked **cue (n)**, measured and pre-existing: both cabins on every line, every seed, sit within one span of
the start tower at page load, so **no cabin is ever seen riding over the city in any screenshot without
`&step=`**. A banked, measured finding outranks kind-rotation (Deepen has paid a lot lately — but 121 itself
cashed a banked Transport defect on the same logic). The cue named the mechanism and the fix: `stepGond`'s
growth rescale (`cb.p=cb.p<.5?cb.p*k:1-(1-cb.p)*k`, `k=(L-1)/L`, once per span) telescopes each cabin's `p`
toward the anchor cell it held when the line was one span long; **re-spread the cabins once the line settles**,
and do NOT touch the rescale, which keeps a *growing* line smooth (see the finding below for why).

**What the probe found before a line was written** (`probes/probe-cabload.mjs`, new, promoted). Each cabin's
physical fraction `t∈[0,1]` along its line at load, no stepping, seeds 7/42/1234: every one of **5/5 lines
parked** — `t` within **0.026–0.097** of a terminal, mean spread between the two cabins **0.017** (stacked).
Control: a hash of the path polyline, to prove any fix moves cabins and no cable.

**Change.** In `stepGond`, once the line stops extending, re-spread its cabins across the current length once
(keyed to `L` so it re-arms if the line grows on): reset `cb.p` to the artifact's own seed spread `[0.15,0.62]`
(→ `t≈0.30/0.76`, one cabin on each leg). It fires at **three** settle points, not just the cue's `L>=target`:
also at the plate edge (`ty>=G-3`), and when growth has clearly stalled (a new `g.stall` counter of
growth-attempt ticks with no push crosses 90). No `rng()`, no terrain, no draw call, no new entity/tile.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**; core `+0`; `gondLines 15`/`gondola 16`
identical; `pop −3` / `solarRoofs +2` / `greenRoofs +1` is the documented `(year*23)` salt jitter (108/121).
Predicted before running — the vector touches no seeded stream.

**Probe, after.** `5/5 → 2/5 parked`, **mean spread 0.017 → 0.259**, path hashes byte-identical (geometry
untouched). The 2 residual parked lines are **seed 1234's**, and they are parked *correctly*: at 2035 they are
genuinely still mid-growth (`stall:0 wait:0`, 6/tgt21 and 9/tgt14 spans) — an actively-lengthening line, the
one state the rescale exists to keep smooth. A survey (seeds 7/42/100/2024/9/555 + seed 1234 at warp 90/120)
confirms every line that has **reached or neared its target** now spreads; only a slow high-target line caught
mid-growth stays telescoped, which is a true transient, not a defect.

**Visual.** 2/2 PASS, seeds 42 & 7, before/after `coast` clip (the cable band) + `wide` whole-city. Asked to
**locate** the cabins (120's law), not to judge: seed-42 agent found them "bunched at the tower" before and
"spread along the cable, riding mid-span" after; seed-7 agent (whose cable runs inland, off the coast clip)
found them in the wide frame "clearly spread along the cable — one mid-span over a road, a second near the far
mast — not stacked at one tower," both hanging correctly from the rope, no tears/floaters/blowout anywhere.

**Verdict — SHIPPED (DEEPENED / FIXED). Cue (n) is CLOSED** for every settled line.

### Findings for later laps
- **⚠ THE RESCALE IS RIGHT — I CHECKED WHY, SO THE NEXT LAP DOESN'T "FIX" IT (new; validates 121's caution).**
  The tempting simpler fix is to delete the telescoping so cabins keep a constant *fraction* and ride outward
  as the line grows — which would spread *all* lines including mid-growth ones, with no settle flag. It is
  **wrong**: appending one span at the far end then moves a cabin at fraction `t` outward by `t` spans (~0.76
  span ≈ 23px) *per append*, a visible hop on every span during live growth. The rescale keeps a cabin's
  **absolute** position fixed (no hop) at the cost of drifting it to its birth cell (the anchor). Both are
  smooth only in warp (no frames between appends); live play needs the rescale. So the right shape is exactly
  what 121 prescribed: keep the rescale, re-spread at settle. A cue that says "do not touch X" is worth
  *re-deriving* before obeying — here the derivation confirmed it and named the residual it cannot fix.
- **cue (n) RESIDUAL — an actively-growing line legitimately parks its cabins (new, accepted, not a defect).**
  Seed 1234's `tgt21` line is mid-growth across a wide era range because its shore earns spans slowly, so a
  still frame there catches telescoped cabins. This is the rescale working. If a future lap wants even these
  spread, the only clean way is a *warp-only* spread (during screenshot generation there are no frames between
  appends, so constant-fraction is free) — but that is mode-dependent plumbing for a rare transient; weigh it
  against just leaving it.
- **THE MINSEP COSMETIC IS STILL OPEN (121's last sub).** The two cabins ride one drawn curve and pass through
  each other once per half-trip; `[0.15,0.62]` is 0.47 apart in `p`, not antipodal, so they cross off-centre.
  A real jig-back tram counterbalances its pair on a loop. One-line change, low value, no agent has ever
  remarked on it — belongs after anything that matters.


--- Header bullets rotated out (iter 139, superseded) ---

(cue (d), superseded by iter 131's CLOSED/MEASURED-DEAD finding — kept for memory:)
  Civic's banked **cue (d)** was attempted at
  114 and **reverted**: its goal is proven (a 3-hex square reads at fit zoom) but its prescribed
  host does not exist — see the rewritten cue below before re-opening it.

## Iteration 129 — the orchard names its season (2026-07-11)

**Vector.** Nature × **Interaction/UX**. Nature was the stalest domain (last 120) and the header steered hard
**off Deepen** (6 of the last 11) and off New element (127) — leaving the tell (117's most-reliable move) as the
right kind. The orchard has drawn a seasonal **blossom/fruit overlay from `year` since iter 57**, but
`describeTile` never named it: hovering an orchard showed only `Value`, while MEADOW right beside it gets a live
`Wildflowers` row. So the DRAW knew the calendar and the tooltip stayed mute — exactly the seam 117's law names.

**Change.** A shared `orchardPhase()` (near the wood helpers) returns `blossom`/`fruit`/`leaf` from
`applySeason`'s own windows (`s2∈(0.16,0.42)` / `(0.70,0.99)`). The orchard **draw** now derives its
`blossom`/`fruit` booleans from it (was two inline `s2>…` tests — behaviour-identical, verified), and
`describeTile` reads the **same** function for a new `Grove` row (`In blossom` / `In fruit` / `In leaf`). One
predicate, all readers (112's law) — the tooltip can never name a fruit the renderer didn't paint (117's law).
No tile, entity, `rng()`, or `tick()` pass; the city's pixels are unchanged.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**; core `+0`; `greenRoofs +1` is the documented
`(year*31)` salt jitter (127). Exactly as predicted for a describeTile-only change.

**Probe.** `probes/probe-orchard.mjs` (new, promoted), two independent truths, neither trusting
`orchardPhase()` — per 122's law that a tooltip vector needs a probe against *recomputed* truth, not a
screenshot it renders. **(1) String:** the `Grove` row vs phase recomputed from the keyframe windows in the
probe's own math — **72/72 orchard rows match across seeds 7/42/1234 × 4 keyframes, 0 wrong**; FOREST control
prints a `Grove` row **0** times. **(2) Draw:** crown-box RGB shift from the winter frame, **ORCHARD minus
FOREST** (forest eats the shared seasonal warming — 127's law that coral is un-isolable, so difference it out
instead of colour-matching it). Excess = the overlay the orchard alone paints: **spring "In blossom" +11.83
(largest)**, dry-peak "In leaf" +5.60 (smallest), autumn "In fruit" +8.71 — the pixels move most exactly
where the row says blossom, least where it says leaf.

**Visual.** Hover shots at three calendar pins (blossom/fruit/leaf), read by an agent: all three show
`Orchard → Fruit groves. → Grove: <In blossom|In fruit|In leaf> → Value 56%`, mapping exact, same two-column
style as the Value/Woods rows, no glitch. Whole-city `wide` frame (seed 42, dry peak): balanced coastal city,
no tears/floaters/blowout — as expected, the render is untouched.

**Verdict — SHIPPED.** The grove that has kept the calendar since 1974 finally says so when you point at it.
Draw-render byte-identical, pop provably flat, the tell cashed a seventh time.

### Findings for later laps
- **THE ORCHARD/VINEYARD/GARDEN TOOLTIPS WERE ALL MUTE — only the orchard COULD be un-muted honestly (new).**
  Of the three, only the orchard's *draw* reads `year`; VINEYARD shows ripe lav grapes year-round and GARDEN is
  static. So their tooltips can't get an honest season row until their **draws** read the calendar first — which
  is a **Deepen**, not a tell. `VINEYARD` is the last name on the Sky-feedable list (108/113/120): make its
  grapes bud→green→purple→bare on `year` like the orchard, *then* its tooltip earns a row. That is the banked
  Nature × Deepen, and it also finally cashes `TILEDESC[VINEYARD]`'s "Terraced grapevines — wine country."
- **DIFFERENCE OUT A GLOBAL CONFOUND WITH A CONTROL TILE, DON'T COLOUR-MATCH IT (reinforces 127).** The first
  draw-truth draft counted "pale coral" blossom pixels and the FOREST control read 30–55 of them — because
  `applySeason` warms the *whole* frame and coral is shared with autumn foliage (127's exact trap). Switching to
  *(orchard shift − forest shift) from winter* cancelled the season and left a clean +11.83 blossom signal. When
  a season/light/weather global moves every tile, pick a control tile that gets the global but not your feature
  and subtract it — same shape as probe-season's ROAD zero.


(cue (n), CLOSED iter 128 — cable-car cabins re-spread on settle; rotated out of header iter 139:)
  **Cue (n) is CLOSED (iter 128).** The cable cars were parked within one span of the anchor tower in every
  still frame; 128 re-spreads a line's cabins once it **settles** (target reached, plate edge, or stalled),
  keeping the growth rescale — which 128 re-derived and confirmed is *correct* (constant-fraction would hop a
  cabin ~1 span per span-append during live growth). Residual, accepted: a line still *actively* mid-growth
  (seed 1234's slow high-target line) legitimately stays telescoped — that is the rescale working, not a bug.

## Iteration 130 — the sixth step-back finds a clean, quiet city (2026-07-11) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/125/**130**). Not a domain × kind lap: it
reads the WHOLE city for *cumulative* drift the census and per-feature gates are blind to, runs the perf
gate, and — per 115/120/125 — does it at **night AND a season, with the day/night baselines pinned OFF
January** (`year=2035.62` dry peak; `2035.02` as the seasonal-contrast frame). No city vector was taken, so
rotation is unchanged; next lap (131) owes the stalest domain, Civic (122) / Water (123).

**What was read.** Un-zoomed whole-city `wide` frames at **2 seeds × 3 lights/calendars** — seed 42
(warp 61) and seed 7 (warp 31), each at {day 2035.62, night 2035.62/t=0.90, winter 2035.02}. One subagent
per seed read its own three frames and was asked the *cumulative* question ("has anything compounded into
clutter or darkness?") plus 108's **locate-don't-judge** night test ("where is the core by light alone?").

**Result: the city is healthy — both agents VISUAL: PASS.**
- **Night lighting (115) holds at both seeds, LOCATED off-centre.** Asked to point at the luminous core by
  light alone, seed 42 landed at ~(.45,.45), seed 7 at ~(.48,.60) — the latter a discriminating off-centre
  hit — both with a genuine core→edge falloff ("not a flat glitter mat"), rim fading to dark.
- **The sea reads** (116's bottom + 123's founded wind farm): "grouped features on a clean graded
  teal/navy," turbines parallel to the shelf, night water "dim but legibly lit, not a dead void."
- **No z-order tears, floating tiles, hard seams, or blown-out colour in any of the 6 frames.**
- **Winter reads distinct from summer** at both seeds (browner farm/scrub, cooler sky), city balanced.

**Season — measured alive, not believed.** `probes/probe-season.mjs` (per-tile rendered-pixel distance from
winter, `ROAD` as the zero control): FARM winter→dry-peak **88.4**, →autumn **93.1**; VINEYARD/ORCHARD/
FOREST/MEADOW/SHOREPARK all move; PARK/REDWOOD/GARDEN near-zero *by design* (irrigated/evergreen, per 120).
ROAD control **0.5–2.1**. The calendar is working.

**Perf — the gate cried the same false alarm as 125, and the interleaved control caught it again.** `perf.mjs`
read day **34.0ms** (+2.4% vs baseline) / night **40.0ms** (+7.2%), the night rise looking like a regression.
Interleaved HEAD-129 vs the iter-125 file (`c63e43b`, A/B/A/B, min per variant): day **34.17 vs 34.33**, night
**40.17 vs 40.39** — HEAD is **−0.5% in BOTH**, so iters 126→129 (moon calendar, park picnics, cable-car
re-spread, orchard tooltip) added **nothing measurable**. The +8% night vs baseline is **pure machine load**:
the 4-day-old iter-125 file also reads ~40ms night today. **NOT re-pinned** (baking today's load in would
blind the gate to a real future regression). Census PASS and vacuous by construction (no source edit).

**Change (the step-back's product — none to the city).** The read found no compounding defect, so per 120/125
("a clean step-back is a complete iteration — don't force a filler vector onto it") the output is the health
record itself plus the header refreshes: step-back pointer → 135, perf note gains the 130 interleaved reading,
rotation pointer notes 130 as the step-back. No `solvista.html` edit; tree verified clean after the perf
interleave restored HEAD.

**Verdict — FIXED.** No compounding city defect (the rarer, honest step-back outcome). The perf gate's
stored-baseline false-FAIL — the one drift the step-back *did* re-surface — is confirmed benign by the
interleaved control, exactly as 125 predicted; the guardrail stays honest.

### Findings

- **THE STORED-BASELINE PERF FALSE-FAIL IS NOW A RECURRING, PREDICTED EVENT — grade every step-back FAIL by
  interleaving against an old commit's file (125's law, confirmed twice).** 125 saw night +16% vs baseline and
  proved it ~+4% real; 130 saw night +7% and proved it −0.5% real. The stored baseline is pinned to one day's
  load; a step-back days later conflates code drift with today's load. `git show <old>:solvista.html > /tmp/x`
  and swap it in, A/B/A/B, min per variant — the delta is the only honest reading. Do not re-pin to an inflated
  day, and do not re-chase a night number that an interleaved control collapses.
- **A CLEAN STEP-BACK CONFIRMS THE ACCUMULATED VISUAL LAWS ARE STILL LOAD-BEARING, seven iters on.** 115's
  night lighting, 116's sea bottom, 120's by-design evergreen/irrigated seasonal freeze, and 123's founded
  wind farm all still read correctly at both seeds under all three lights — nothing has quietly eroded them.
  The value of a no-change step-back is exactly this: proof that the earlier fixes have not been undone by
  later additions.
- **`cp` is `-i` here and `grep` is `ugrep` — a perf interleave loop that shells `cp`/`grep` will hang on the
  overwrite prompt or choke on `->`/`>` in the timing line.** Use `/bin/cp -f` and `command grep -E '^  (day|
  night) '`; don't `grep -v '>'` the timing line (it contains `>60fps-budget`). A small tooling snag that ate
  two perf runs this iteration; noted so 135 doesn't re-lose them.


<!-- header breadcrumbs trimmed to budget at iter 140 (content preserved here) -->
- Cue (n) CLOSED (iter 128 — cable-car cabins re-spread on settle; full note archived iter 139).
- PERF (iter 117, pristine-HEAD control, interleaved): day 35.11ms / night 39.45ms; the patched file read day 34.33 / night 39.22. Not re-pinned.

## Iteration 131 — the civic square is measured dead, and cue (d) closes (2026-07-11)

**Vector.** Civic & culture × **Polish/Connect** (an EXPLORE). Rotation named the domain — Civic was the
single stalest (122, older than Water 123) — and the header's own law (*a banked, measured cue outranks
kind-rotation*) named the content: **cue (d)**, the loop's most-flagged open cue, banked by 91, attempted
and reverted by 114, and re-listed "STILL OPEN" ever since. Its goal: the civic quarter's knot of private
1-hex forecourts should become **one legible ≥3-hex pedestrian square** (114 proved 3 reads at fit zoom, a
1-hex ribbon does not — 101's contrast×width law). Kind was forced away from Deepen (5 of last 10) and
Interaction/UX (2 of last 10), which Polish/Connect satisfies. Per *probe before you design*, I measured
the geometry before writing a line — and the measurement **closes the cue** instead.

**What the probe found** (`probes/probe-quarter.mjs`, promoted). In-page, seeds 7/42/1234 at warp 61:
- **Every city has exactly ONE multi-major quarter** (3–4 majors); the other majors are lone and scattered.
  Forecourts are **all 1-hex** (confirms 114's `[1,1,1]` measurement, now across the annex geometry too).
- **Reading A — take the shared road → a 3-hex square: IMPOSSIBLE.** Pedestrianising a single shared-street
  ROAD yields a **2-hex patch at most, never 3** — the bridgeable road touches a forecourt PLAZA and a
  *building* (CIVIC, which does not extend a PLAZA patch), not two forecourts. And **every** such candidate
  road is the **arterial + monorail + boulevard-tree + bus-stop spine**: haz=[ARTERIAL], [ARTERIAL,treed,MONO],
  [stop,busy,treed] — precisely the network the invariants forbid severing. 114's "take the ROAD" is dead:
  it is insufficient (2 hex) *and* it is the spine.
- **Reading B — grow a forecourt to 3 by annexing pavable lots: ALSO IMPOSSIBLE at the quarter.** Of 11
  forecourts, only **2** have ≥2 pavable-lot (`FORECOURT_LOT`) neighbours to annex — and both are the
  **isolated lone-major** forecourts (seed 42 `(27,1)` [MID,MID], seed 1234 `(42,1)` [RES,RES,RES]), NOT the
  quarter's. **The quarter's own forecourts have 0–1 pavable neighbours** (boxed in by civics, the mile, and
  each other). So a 3-hex square can be grown only where there is *no quarter* to make it a **civic** square —
  a contradiction. (And annexing RES/MID costs pop for a barely-visible tile — 100's ~0.045%/cell, 92's
  never-zone-near-TOWER.)
- **Reading C — the connective goal is ALREADY SHIPPED.** cue (d)'s deeper intent (the quarter reads as one
  connected precinct, not isolated domes) is delivered by the fete **"civic mile"** (`c.fete`, L1764): a
  pure-derivation BFS strings bunting along the ROAD stretch where two civics' road-regions meet — the
  district is already tied together along the street the square wanted to be.

**Census.** PASS, exit 0. `solvista.html` **byte-identical to HEAD** (`git diff --stat` empty) — no source
edit, so the census is vacuous by construction (this is an EXPLORE that rejected its design *before*
implementation, cheaper than 101/114 which built then reverted). No visual gate is owed — nothing draws
differently. The probe **is** the gate: a measurement that could have found a 3-hex opening and instead
found none, on ≥2 seeds, with the hazard list as its own control.

**Verdict — EXPLORED → REVERTED. Cue (d) is CLOSED.** Its ≥3-hex-square goal is geometrically unreachable at
the quarter (2 hex max on the arterial/mono spine; the only 3-annexable forecourts are lone non-quarter
majors), and its connective goal is already met by the civic-mile bunting. Building anything here would be
marginal filler on a hazard — the census can pass a change that isn't worth its cost (82/88/101/114), and
this one fails the bar *before* a pixel is drawn. Reverting a passing-but-weak change is the system working;
declining to build a measured-dead one is the same working one step earlier.

### Findings
- **⚠ CUE (d) IS DEAD IN BOTH READINGS — DO NOT RE-OPEN IT (new; supersedes 91/114 and every "STILL OPEN"
  header note).** Road-take → 2 hex on the spine; lot-annex → only lone (non-civic) forecourts can reach 3.
  The two goals of cue (d) are severable: the **connective** one (precinct reads as one) is *shipped* (civic
  mile); the **square** one is *impossible* without either severing the arterial/monorail spine or building
  the square where there is no quarter. `probe-quarter.mjs` is the proof and re-runs in ~4s per seed.
- **MEASURE A CUE'S GEOMETRY BEFORE ITS DRAW (sharpens "probe before you design").** 114 built a throwaway
  square, saw it was pretty, reverted on the *host* being wrong, and banked "take the ROAD." One probe that
  floods the hypothetical patch and reads the hazard flags would have shown in 4s that the road-take yields 2
  hex on the spine — no build needed. When a cue is about *where a thing can go*, the first artefact is a
  geometry probe, not a draw.
- **A "beautiful in a throwaway" proof is necessary, not sufficient — it says nothing about whether the
  geometry admits it at the sites that matter.** 114's 3-hex mock was genuinely legible; the error was
  generalising from a hand-placed patch to a quarter whose real cells cannot form one. Prove the *siting*, not
  just the *look*.

## Iteration 132 — the kelp beds grow a canopy (2026-07-11)

**Vector.** Water & coast × **Polish**. Rotation named the domain — Water was the single stalest (123).
Kind was steered by two constraints: Water's banked cue (pier/lifeguard-on-depth) *repeats* 123's
site-on-depth mechanism, and the header said to **vary it or pick a different Water kind**; and Deepen
had paid 4 of the last 9 laps. Polish satisfies both (it varies off Deepen and off the banked cue). The
target chose itself: the kelp bed is the artifact's own documented failure surface — *"kelp lined the
entire coast dark for ~13 iterations"* — and the draw was a **flat `waterDk` hex + four sub-pixel fronds**,
so a bed read as a dark absence rather than a living forest.

**Change.** `case T.KELP` now floats an **olive frond-canopy** on the dark shallows: 4 broad soft
elliptical mats per hex, `colMix('waterDk','canopy',t,·)` (only ~a third of the way toward `canopy`, `t`
quantized so the cache stays bounded), hashCell-placed (no `rng()`), clipped to the hex, drifting on
`waveT` like the fronds above them. The base dark fill and the four upright fronds are untouched and draw
on top. The mats are **greener, not brighter** — the bed keeps its place as the darkest thing inshore
(the palette's stated intent, L266–269), it just reads as canopy instead of a hole.

**Census.** PASS, exit 0. Draw-only and stream-neutral (no terrain, no `rng()`) — tile histogram empty,
all core metrics +0, as expected for a Polish. (`greenRoofs` wobbled ±1 between runs on *pristine* HEAD
too — the roof-adoption CA ticks a load-dependent number of times during the headless warp; it is census
timing-noise, not this edit, which lives entirely inside `drawCell`.)

**Probe.** `probes/probe-kelp.mjs` (promoted). Freezes the sim (same-frame-control law — mats AND fronds
drift on `waveT`), samples a 5×5 disc at every KELP hex centre on patched vs `git show HEAD:`, seeds
7/42/1234 at neutral tide / dry-peak / midday. Result: **KELP moved, mean |ΔRGB| 4.56**; olive index
**(g−b) 18.0 → 26.5** (the mats add green, not blue); luminance **116.5 → 117.4** (+0.9, so the bed did NOT
brighten — hold-the-mean holds, it stays darkest inshore). **WATER control: mean |ΔRGB| 0.20** (≈0, just
hex-edge antialiasing where a water hex abuts a kelp hex) — the edit touched only `case T.KELP` and the
control proves the rest of the sea did not move. VERDICT: PASS.

**Visual.** Two agents, one per seed, coast-zoom + a whole-city wide (seed 7). Seed 42 **located the
olive kelp beds** hugging the beach edge on the lower-left, reading as *"dark olive/green smudges on the
darker teal — the darkest inshore element, greener rather than a flat black hole,"* inside the water hexes,
no spill onto sand or open sea. Seed 7 PASSED with the olive read *marginal at that zoom* (it saw the
darker inshore patches but could not confirm the tint) — which the probe's control-checked +8.5 olive shift
settles quantitatively. Both: no z-order tears, no floaters, no blowout anywhere; the whole-city frame
still reads as a balanced, beautiful coast, nothing compounded into darkness. Both `VISUAL: PASS`.

**Verdict — SHIPPED.** The kelp bed reads as a kelp forest from above, not a dark hole, and the change is
provably confined to kelp hexes (control 0.20) without darkening the coast (Δlum +0.9). Draw-only,
stream-neutral, ~25 lines.

### Findings
- **THE KELP TILE'S DRAW NOW READS `waterDk`/`canopy` AS A CANOPY, BUT ITS TOOLTIP IS STILL MUTE** —
  `TILEDESC[T.KELP]` says only *"Seaweed swaying in the shallows"* and `describeTile` prints nothing of the
  bed. The un-cashed KELP tell (header) is still open, and now *richer*: a bed knows its extent (a flood
  fill of KELP neighbours, exactly the woods' `Stand — N hexes`, iter 117) and its depth (`rDeep`). That is
  the next Water × Interaction/UX lap when Water comes round again — but it needs a probe that recomputes
  bed size independently (122's law: a tooltip vector needs truth checked against recomputation, not a
  screenshot that it renders).
- **A "re-tone a small surface" Polish gets the same instrument as a large one** — `probe-kelp` is
  `probe-seatone`'s shape (freeze, sample the hex-centre disc on patched vs `git show HEAD:`, join by key)
  narrowed to a sparse tile with a **same-domain control** (open WATER). The control is what makes a draw-only
  Polish gate-able at all: |ΔRGB| 4.56 on the target vs 0.20 on the control is a verdict a screenshot cannot
  give, and it caught nothing wrong here only because the edit was correctly scoped — that is the point.
- **⚠ `probe-seatone.mjs` RESOLVES `REPO` AS `dirname(import.meta.url)`, which is `probes/`, NOT the repo
  root** — so `join(REPO,'solvista.html')` and `git -C REPO` only work if you happen to run it from a cwd
  where that path resolves, and it violates the skill's own law (resolve `../../../../solvista.html` from the
  probe's location). `probe-kelp` does it right (`resolve(HERE,'../../../..')`) and runs from any cwd; the
  older probes that copied the `dirname` form should be fixed the next time one is touched.


<!-- Header bullet moved from GROWTH.md at iter 142 (closed cue, condensed to a one-line pointer there) -->
**Open cue (d) — the civic quarter's real square — CLOSED, MEASURED DEAD (iter 131; do not re-open).** cue (d)'s
two goals are severable and each is settled: the **connective** goal (the quarter reads as one precinct,
not isolated domes) is **already shipped** by the fete "civic mile" bunting (`c.fete`, L1764). The **≥3-hex
pedestrian-square** goal is **geometrically impossible at the quarter** (`probe-quarter.mjs`, seeds
7/42/1234): taking the shared road yields **2 hex max** (it bridges a forecourt and a *building*, not two
forecourts) and every candidate road is the **arterial/monorail/boulevard/bus-stop spine** the invariants
forbid; growing a forecourt by annexing lots reaches 3 only at the **lone (non-quarter) majors**, never the
quarter's own (0–1 pavable neighbours, boxed in). So a 3-hex square can exist only where there is no quarter
to make it *civic*. 114 reverted this; 131 proved it dead in 4s/seed with a geometry probe. Leave it closed.

## Iteration 133 — the hovered tile gets its ring, and cue (l) closes (2026-07-11)

**Vector.** Urban fabric × **Interaction/UX** (SHIPPED). Rotation named the domain — Urban was the single
stalest (last 124) — and the header named the content twice over: Urban's *additive* moves are surveyed
**spent** (118), its Interaction/UX cell was **empty**, and banked **cue (l)** was waiting there. Kind was
forced off Deepen (4 of last 9) and off the site-on-depth mechanism; Interaction/UX satisfies both and fills
the last empty Urban cell.

**The defect (cue l, banked iter 117).** Entities have worn a `stamp()` focus ring since iter 71, but a bare
hovered **TILE** got none: `hoverEnt` is `null` whenever the cursor is over ground, and the only ring keyed
off it. So every tile tooltip in the artifact's history — U2's, 97's coast, 117's woods, 122's institutions —
**named a hex the frame never pointed at**, and on a dense grid at fit zoom you cannot tell which one it means.

**Change (~20 lines, draw-only).** A new `hoverTile` is set by the `mousemove` handler in the same branch that
already resolves the tile for the tooltip (and cleared on entity-hover, off-plate, pan, and `mouseleave` — one
predicate, every reader). `render()` draws it last, as an affordance: a hex-outline ring at `ctr(hoverTile)`,
scale **1.06** of the footprint (`hexTile`'s own path, no fill, so terrain and anything standing on it read
through), with the **same ink-under (2.6px) / cream-pulse (1.1px) stroke as the focus ring and the transit
trace** — the whole hover language is now one voice. Added `window.__hover(x,y)` (mirrors `__find`/`__ents`;
`shoot.mjs` can't hover) for probes/screenshots.

**Census.** PASS, exit 0. Draw-only, stream-neutral (no terrain, no `rng()`) — tile histogram empty, core
metrics +0. (`greenRoofs` +1 is the roof-adoption CA's known headless-timing wobble, ±1 on pristine HEAD too.)

**Probe** `probes/probe-tilering.mjs` (promoted). One patched build compared against ITSELF in two hover
states (the ring is a new *state*, not a re-tone — no pristine build needed). Freezes the sim (the ring pulses
on `time`), then drives a **real `page.mouse.move`** onto a PARK's screen coords (tests the true handler, not
just the `__hover` hook) and diffs a hex-box against the hover-off frame, with a far-off WATER hex as control:
seeds 7 & 42, **target |ΔRGB| 8.73** (ring drawn on the hovered hex) · **control 0.000** (it is one hex, not
a wash) · **cleared residual 0.000** (move to void ⇒ ring vanishes, no sticky ring). VERDICT: PASS.

**Visual.** Both fit-zoom agents FAILED — *and the probe + my own eyes overturned them*, the loop's law
exactly (agents fail confidently ⇒ measure, then look at that one PNG). At R=130 the 1.1px cream stroke
downscales away, so both agents (correctly, on their evidence) could not *see* it — while **both independently
confirmed the WHOLE frame is clean**: no z-order tears, floaters, doubled rings, or blowout, city reads
balanced. A **tight R=55 / 2× clip** settled the legibility question I could not delegate: a crisp
black+cream hexagon outline hugging **exactly one** hex — the green PARK (seed 42) and the hospital hex (seed
7) — sitting correctly on the hex grid, tracing one hexagon cleanly. Bold and legible where the cursor is (=
where the user looks). VISUAL: PASS on the tight reads + the delegated whole-frame reads.

**Verdict — SHIPPED. Cue (l) is CLOSED.** Every tile tooltip in the artifact now points at the hex it names.
Urban's Interaction/UX cell is filled; only Sky now lacks an Interaction/UX vector.

### Findings
- **A "hover ring is invisible" agent FAIL is a ZOOM artifact, not a defect — the stroke is 1.1px and dies in
  a downscaled wide clip.** The probe (`|ΔRGB| 8.73` hex-local, control 0.000) and a tight 2×/R55 clip both
  show it crisp. When a thin *linear* affordance "can't be seen," re-shoot tighter before touching the draw
  (101's contrast×width law, read the other way: at fit zoom width is fixed, so magnify the *shot*).
- **`shoot.mjs`/`hovershot.mjs` cannot screenshot a TILE hover** — `hovershot` aims at entities via `__ents`.
  `window.__hover(x,y)` (this iter) is the tile analogue; a tiny custom shot script that calls it + clips
  tight is the pattern for any future tooltip/hover/selection vector on a *tile* (122's institutions, 117's
  woods, 97's coast could all now be re-shot with their hex marked).
- **The next tooltip lap can reuse this ring for free.** 132's banked KELP-tooltip cue and any future
  `describeTile` enrichment now land on a hex the frame *marks* — the legibility half of every tile-tooltip
  vector is done; only the *words* remain.

## Iteration 134 — the almanac that strobed (2026-07-11)

**Vector.** Sky & atmosphere × **Interaction/UX** (an EXPLORE → REVERTED). Rotation named the domain
twice over: Sky was the single stalest (last 126) *and* the one domain the grid showed lacking an
Interaction/UX vector (133's own closing line). The content chose itself by the loop's most reliable
tell — *a thing the code knows and no readout names*: the HUD stat strip prints the **year** integer
and the **time of day** (`phaseWord`), but never the **season** (hidden inside the year) nor the **moon
phase** (iter 126 gave the moon a synodic calendar and `__moon()`, surfaced NOWHERE in the UI). Kind
varied off Deepen (4 of the last 9) and off the site-on-depth mechanism.

**Change (built, then reverted).** `stPhase` → `seasonWord(year)+' · '+phaseWord(dayT)` (e.g. "summer ·
golden hour"), season anchored to `applySeason`'s own peaks so word and palette can't drift; plus a new
`.stat.moon.opt.sm` card between the year and the residents count — a moon glyph (`\u{1F311}`…`\u{1F318}`,
eight phases) + a phase word ("waxing gibbous"), read from `moonReadout()` which calls `__moon()` (one
predicate, shared with the drawn disc). `__setYear`/`__setTime` were made to refresh the readout.

**Census.** PASS, exit 0. Draw/DOM-only, stream-neutral — tile histogram empty, all core metrics +0.
(Vacuous by construction, as every readout iteration is.)

**Probe (`probe-almanac.mjs`, written, ran, then deleted with the feature).** Pinned `?year=` across a
season/phase spread on seeds 7 & 42; read `stPhase`/`stMoonLbl` from the live DOM and compared to an
independently-recomputed season & moon (122's law — check the claim against recomputed truth, not a
screenshot that it renders). **48/48 pass**, control held (changing `?t=` moved neither season nor moon).
So the mapping was *correct*. The probe proved the wrong thing.

**Visual — and where it turned.** Static tight HUD clips (day/night/frozen-crescent) read beautifully:
"AUTUMN · DAYTIME", 🌕 "FULL MOON", and the crescent glyph rendered as a distinct dark disc with a thin
lune. But **two whole-frame agents (one per seed) both FAILED**, and both were RIGHT: (a) the raw `·`
byte rendered as mojibake **"Â·"** over the http-served shot — the file has **no `<meta charset>`**, so
Chromium fell back to windows-1252 (my `file://` clips sniffed UTF-8 and hid it); (b) the night agent
caught the drawn crescent contradicting the HUD's "FULL MOON". (b) sent me to **measure the calendar's
rate in normal play** — the one thing a static frame cannot show — and that measurement **killed the
vector**: `year` advances **0.170 yr/sec at speed 1** (it is a fast *development* clock so a city grows
over minutes, NOT a wall calendar). In 3 s of play the **season word cycled through 3 values (~0.7 Hz)**
and the **moon phase through 5 (~2 Hz strobe)**. As a text readout that is flickering noise — and it
*degrades* the previously-readable time-of-day line (driven by the slow `dayT`, ~110 s/cycle) by welding
it to the sprinting year clock.

**Verdict — EXPLORED → REVERTED.** `solvista.html` restored byte-identical to HEAD. The readout was
*correct* (probe 48/48) and *pretty* (static clips) and still failed the bar the moment it moved. The
census can pass a change that isn't worth its cost, and a frozen visual gate can pass one that only reads
right when frozen (82/88/101/114/131 — now 134). Reverting it is the system working.

### Findings
- **⚠ `year` IS A FAST DEVELOPMENT CLOCK (~0.17 yr/sec = 1/6 at speed 1), NOT A WALL CALENDAR.** Anything
  that names the **season** or the **moon phase** from `year` in a live text readout STROBES (season ~0.7 Hz,
  moon ~2 Hz, measured over 3 s of play). This is why `stPhase` correctly showed only time-of-day, off the
  SLOW `dayT` (~110 s/cycle): a readout must be matched to its clock's speed. Do not re-surface season/moon
  as text until the clock they read is slowed.
- **⚠ iter 126's DRAWN MOON ALSO STROBES ~2 Hz at night** — a latent defect its frozen-frame visual gate
  could not catch (a single screenshot is blind to a 2 Hz cycle). **This is the real banked Sky vector:** a
  Polish/Fix that decouples the moon's synodic phase from the sprinting `year` (e.g. tie lunations to `dayT`
  days, or to a slowed calendar), so the disc reads as a slow, legible moon — and ONLY THEN does a
  season/moon HUD readout become viable. The almanac is banked behind this fix.
- **A STATIC SCREENSHOT GATE IS BLIND TO STROBE/FLICKER — a "does it read in MOTION?" claim needs a TEMPORAL
  probe** (sample the DOM/canvas over N seconds of real play, `playing=true`, and count distinct states).
  This is the mirror of the freeze-the-clock law (which is for two-render *diffs*): a diff needs a frozen
  clock; a *rate* needs a running one. Every gate this loop owns — census, probe (frozen), visual (frozen) —
  was blind here until I let the clock run and counted states. Reach for this for any readout/animation whose
  correctness is about *cadence*, not a single frame.
- **⚠ THE FILE HAS NO `<meta charset>` — KEEP JS STRING LITERALS PURE-ASCII.** A raw `·` (U+00B7) renders as
  mojibake **"Â·"** when `shoot.mjs` serves over http (Chromium falls back to windows-1252); a `file://` load
  sniffs UTF-8 and HIDES the bug, so my own tight clips looked clean and only the http wide shots caught it.
  In JS strings use the escape (`'·'`, and `'\u{1F311}'`… for the moon glyphs, which I DID get right); in
  HTML use `&middot;`/`&mdash;`/`&times;` — exactly as the rest of the file does (every glyph was ASCII-safe
  before this). Promoted to SKILL.md (Invariants).

## Iteration 135 — the moon slows down (2026-07-11)

**Vector.** Sky & atmosphere × **Deepen** (a FIX). Rotation did not name Sky (People 127 was stalest), but
iter 134 banked a **measured, shipped defect** as "the real banked Sky vector," and a banked measured finding
outranks kind-rotation (the loop's own law) — doubly so when it is a *fix* for a compounding problem (120's
rule). The defect: iter 126 drove the moon's synodic phase off `year`, a fast **development** clock (~0.17
yr/sec at speed 1), so `year*12.3685` sweeps ~2 lunations/sec and the disc **strobes ~2 Hz at night**. Every
gate this loop owns is frozen, so it shipped invisibly (134 caught it only by letting the clock run).

**What the temporal probe found first** (`probes/probe-moonrate.mjs`, promoted — 134's law: a *cadence* claim
needs a running clock, the mirror of freeze-the-clock). playing=true, sampled `__moon().illum` at 20 Hz over
3 s, counted 0.5-crossings (a lunation crosses twice); control = the day/dev clocks must advance. **HEAD: 12
crossings, max |Δillum| 0.74/step**, control healthy (Δyear 0.49/3 s). Confirmed 134's analytic strobe before
a line was written.

**Change (~10 lines, draw-only).** A shared `moonPhase()` (by `daylight()`) returns the lunation fraction from
**`dayT`** — the real day counter (~110 s/cycle; monotonic, wrapped only for time-of-day) — one synodic month
every `MOONSYN=8` day-cycles, offset per city by `seedNum*φ` so each loads on its own phase. The render-scope
`moonL`, the moonglade, and `__moon()` all read it (one predicate, 112's law). `dayT`-driven, it is near-fixed
across a single night (0.5 day → ≤0.1 ΔMOONF) and visibly waxes across the ~6-min run (~3.3 day-cycles → ~0.4
lunation). No tile, entity, `rng()`, `tick()`, or terrain — pop provably flat.

**Census.** PASS, exit 0. Tile histogram empty, core +0; `greenRoofs −2` is the documented roof-adoption
headless-timing wobble (127/132/133).

**Probe, after.** `probe-moonrate`: **12 → 0 crossings, max |Δillum| 0.74 → 0.0002**, control still running —
the strobe is gone and the page is not merely frozen. And the re-clocked iter-126 `probe-moon` (now stepping
`dayT` by whole day-cycles at fixed night — an integer dayT step = exactly 1/8 lunation, time-of-day held):
**corr(illum, lit px) = 1.000** both seeds, new→full 11→374 / 13→372, land control dev 0.00 — the disc still
draws every phase correctly, and seeds 42/7 now load on *different* phases (0.07 vs 0.44), the per-seed offset
working.

**Visual.** 2/2 whole-frame night agents PASS (seeds 42 & 7, off-January `year=2035.62`, t=0.90). Both located
a clean single moon — seed 42 a crescent at (0.74,0.15), seed 7 a near-full disc at (0.91,0.15), two distinct
phases both rendering cleanly — no tears/doubling/blowout anywhere, each frame a balanced night city with
core→edge falloff.

**Verdict — FIXED.** The moon 126 gave a calendar now keeps it on the *day* clock, so it reads as a slow,
legible moon instead of a 2 Hz flicker. The banked defect is closed; a moon-phase HUD card is now viable (see
findings — the season half still strobes).

### Findings for later laps
- **⚠ THE MOON STROBE IS FIXED — but a SEASON readout still strobes (the almanac is only half-unblocked).**
  134's almanac welded `seasonWord(year)` + a moon card to the HUD; 135 slowed the MOON (now on `dayT`), but
  the SEASON still reads `year`, the fast dev clock (~0.7 Hz word-flip, 134). So a **moon-only** HUD card is
  now viable; a **season** word is not, until the season also reads a slow clock (or is quantized/held). Don't
  re-ship the full almanac assuming 135 unblocked it.
- **`dayT` IS A MONOTONIC DAY COUNTER, not just time-of-day.** `daylight()` wraps it `%1` internally, so `dayT`
  itself accumulates unbounded (~110 s/cycle). It is the loop's one **slow** clock: anything that "should
  advance over minutes, not seconds" and must not flicker in a static frame should read `dayT`, never `year`
  (the moon now does). And an **integer `dayT` step advances the moon exactly 1/8 lunation while holding
  time-of-day fixed** — the clean way to sweep the moon at fixed night in a probe (probe-moon uses it).
- **A per-seed phase offset (`seedNum*φ mod 1`) buys free variety at zero stream cost.** The moon now loads on
  a different phase per city (probe: 0.07 vs 0.44) without touching `rng()`. Reuse the golden-ratio-of-seedNum
  trick for any "same every city" ornament that should vary but must not perturb the seeded stream.

## Iteration 136 — the seventh step-back finds a clean, quiet city (2026-07-11) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/125/130/**136**). Not a domain × kind lap: it
reads the WHOLE city for *cumulative* drift the census and per-feature gates are blind to, runs the perf
gate, and — per 115/120/125 — does it at **night AND a season, with the day/night baselines pinned OFF
January** (`year=2035.62` dry peak; `2035.02` as the seasonal-contrast frame). No city vector taken, so
rotation is unchanged; next lap (137) owes the stalest domain, **People (127)**.

**What was read.** Un-zoomed whole-city `wide` frames at **2 seeds × 3 lights/calendars** — seed 42
(warp 61) and seed 7 (warp 31), each at {day 2035.62/t=0.40, night 2035.62/t=0.90, winter 2035.02/t=0.40}.
One subagent per seed read its own three frames, asked the *cumulative* question ("has anything compounded
into clutter or darkness?") plus 108's **locate-don't-judge** night test ("where is the core by light alone?").

**Result: the city is healthy — both agents VISUAL: PASS.**
- **Night lighting (115) holds at both seeds, LOCATED off-centre.** By light alone the luminous core sat at
  seed 42 ~(0.45,0.48), seed 7 ~(0.47,0.62), both with a genuine core→edge falloff ("not a flat glitter mat",
  "peaks there and fades to dim green-grey at the edges, near-black at the corners"). Rim fades to dark.
- **The sea reads** (116's bottom + 123's founded wind farm): turbines parallel to the shelf, no dead void.
- **No z-order tears, floating tiles, hard seams, or blown-out colour in any of the 6 frames** — brightest
  night window-clusters stay warm amber, not clipped; the beach→sea stepped terracing reads as intentional.
- **Winter reads distinct from summer** at both seeds (cooler/browner farm/scrub, paler sky), city balanced.

**Season — measured alive, not believed.** Both agents independently called the *whole-frame* seasonal signal
"mild / reads more late-summer than winter" — a real perception, but it is the **evergreen/irrigated dilution**
(PARK/REDWOOD/GARDEN cover much of the frame and are near-zero *by design*, per 120), not a dead calendar.
`probes/probe-season.mjs` (per-tile rendered-pixel distance from winter, `ROAD` = zero control): FARM
winter→dry-peak **88.2**, →autumn 92.9; VINEYARD →autumn 58.1, ORCHARD →autumn 41.4; MEADOW/FOREST/SHOREPARK
all move; PARK/REDWOOD/GARDEN/QUAD near-zero by design. ROAD control **0.5–2.1**. Matches 130 (FARM 88.4).
The calendar is working; the whole-frame mildness is a *composition* fact, not a bug.

**Perf — the stored-baseline false-FAIL fired a THIRD time, and the interleaved control collapsed it again.**
`perf.mjs` read day **34.5ms** (+4.0% vs baseline) / night **40.17ms** (+7.6%), the night rise looking like a
regression. Interleaved HEAD-135 vs the iter-130 file (`f2aa721`, A/B/A/B, min per variant): night **39.83 vs
39.78ms** (**+0.1%**), day **34.22 vs 34.00ms** — flat both ways, so iters 131→135 (cue-d square, kelp canopy,
tile focus ring, almanac revert, moon→dayT) added **nothing measurable**. The +7.6% night vs baseline is
**pure machine load** — the 6-day-old iter-130 file, which *recorded* 37.33ms night, itself reads **39.78ms
today**. **NOT re-pinned** (baking today's load in would blind the gate to a real future regression). Census
PASS and vacuous by construction (no source edit).

**Change (the step-back's product — none to the city).** No compounding defect, so per 120/125/130 ("a clean
step-back is a complete iteration — don't force a filler vector") the output is the health record plus header
refreshes: step-back pointer → 141 (next is 141), perf note gains the 136 interleaved reading, rotation
pointer notes 136 as the step-back. No `solvista.html` edit; tree verified clean after the perf interleave
restored HEAD.

**Verdict — FIXED.** No compounding city defect (the honest step-back outcome, third clean bill in a row:
130, 136). 115/116/120/123's accumulated visual laws still all read correctly at both seeds under all three
lights, eight iters on. The perf gate's stored-baseline false-FAIL is confirmed benign by the interleaved
control for the third time (125→130→136); the guardrail stays honest.

### Findings

- **THE STORED-BASELINE PERF FALSE-FAIL IS NOW A THREE-TIME PATTERN (125→130→136) — the stored baseline
  understates today's load, never the reverse.** 125 saw night +16%→+4% real; 130 saw +7%→−0.5%; 136 saw
  +7.6%→+0.1%. Every step-back days after the pin conflates code drift with today's load, and every time the
  interleave against an old commit's own file collapses it. Do not re-chase a night number a same-session
  interleave flattens; do not re-pin to an inflated day. (`git show <old>:solvista.html > /tmp/x`, swap A/B/A/B,
  min per variant — but note **a 2-round × day+night interleave overruns the 120s Bash timeout**; run it
  `run_in_background`, or cap at ~1.5 rounds — one full round of the control plus two of HEAD is enough signal.)
- **A CLEAN WHOLE-FRAME "MILD SEASON" IS A COMPOSITION FACT, NOT A REGRESSION — settle it with the probe, not
  another agent.** Both agents this step-back read the seasons as faint; the probe shows FARM/VINEYARD/ORCHARD
  swinging 40–90 while the frame-dominant PARK/REDWOOD/GARDEN sit near-zero *by design* (120). The agents are
  reading the *area-weighted average*, which is genuinely muted; the calendar is not. This is the locate-don't-
  judge law's cousin: when an agent's *impression* contradicts a by-design invariant, the probe is the verdict.
- **THREE CLEAN STEP-BACKS DEEP, THE OPEN WATCH-ITEM IS "NIGHT CORE IS BROAD/DIFFUSE" — banked, NOT a defect.**
  Both agents located the core with real falloff (so 115 holds), but both independently noted the glow is
  spread across much of the built area rather than a single tight downtown peak. That is a *legibility* nuance,
  not a tear or a darkness compound — a future Sky/Urban Polish could tighten the CBD light gradient (steeper
  falloff from `CBDX/CBDY`), but it did not earn a fix here. Logged so a later lap can pick it up deliberately.

## Iteration 137 — the people cast a shadow (2026-07-11)

**Vector.** People & activity × **Polish** (SHIPPED). Rotation named the domain — 136's step-back said 137 owes
People (still stalest, last 127) — and steered the kind to Polish/Interaction-UX while warning to **vary off
Interaction/UX** (3 of the last 5 laps: 129/133/134). People's Polish cell was the stalest kind there (last **84**).
The target chose itself by a house-style **inconsistency**: `shadS()` is the shared ground-contact-shadow helper,
and every *vehicle* has cast one for many iterations (`drawVehicle`: bikes L4951 `shadS(...,0.08)`, cars L4967
`shadS(...,0.16)`) — but the **walking figures** (peds/dogs/joggers, the only other *movers*) had **none**, so
they read as floating a hair off the pavement. (Surveyed first: the figure and crowd draws are otherwise richly
polished — gait/bob/kids, leash+wag, scissoring joggers, stadium/amphitheatre/strip crowds — the missing shadow
was the one clear gap.)

**Change (~5 lines, draw-only).** A `shadS(feet)` contact shadow, drawn right after `stamp()` and *before* the
legs so the figure reads on top, at the FEET (`gy`, not the bobbing head — so the figure walks/skips over a fixed
shadow): `drawPed` `shadS(cx,gy,0.10,0.17)` + the skipping kid `shadS(kx,gy,0.06,0.15)`; `drawDog`
`shadS(cx,cy,0.11,0.15)` (low/long); `drawJogger` `shadS(cx,cy,0.09,0.16)`. Sizes are ~⅔ the car's (0.16), the
figures being ~⅔ a car's footprint; ungated by light, exactly as the vehicle shadow is (it's ambient contact, not
a sun cast). No tile, entity array, `rng()`, `tick()` pass or terrain — pop provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, entity counts
identical (peds 664 · dogs 90 · joggers 31). `greenRoofs −1` is the documented roof-adoption headless-timing
wobble (127/132/133/135). Exactly as predicted for a draw-only change touching no seeded stream.

**Probe.** `probes/probe-figshadow.mjs` (new, promoted), patched vs pristine HEAD, seeds 7/42. **The live figures
could not be probed** — peds/dogs are a frame-timing-dependent system whose array *composition, order AND
positions* drift a nondeterministic ~20px between two page loads of the same seed (HEAD-vs-HEAD noise floor
alone was |Δ|~9–13 at fixed coords; `ped[0]` isn't even the same resident twice). So the probe tests the DRAW
FUNCTIONS deterministically: clear all live movers (incl. vehicles, which drift over roads and poison a
fixed-coord diff), **place a fixed set of 30 peds at chosen ROAD-cell centres** — identical objects in both
builds — freeze/pin the clocks, render, and diff a **tight feet-row band** (the shadow is a flat ~2px-wide,
1px-tall iso-squashed smudge; `TW/TH=16/8`, so a wide box dilutes it to nothing). Result: **feet mean Δlum
−1.16** (a *uniform* darkening — |ΔRGB| 1.14 ≈ |Δlum|, a shadow not a hue shift), consistent (−1.06/−1.27),
**bare-road control 0.047** (≈0, >20× separation). The darkening is confined to figure feet.

**Visual.** The shadow is a ~2–3px contact patch — **invisible at fit zoom, visible at zoom** (133's ring law).
Self-read of a `hovershot` ZOOM=9 / dsf-4 no-hover crop (seed 42): a soft, flat, iso-squashed olive shadow sits
directly under the ped's feet, correctly centred and below the legs, figure drawn on top, no spill — it grounds
the figure exactly as intended. Whole-city `wide` frames (seeds 42 & 7, day `year=2035.62`), one agent each:
both **VISUAL: PASS** — balanced coherent coastal city, no z-order tears / floaters / hard seams / blown-out
colour, and — the cumulative question — **no muddy or over-darkened pavement** (the shadows correctly invisible
at that zoom, causing no darkening).

**Verdict — SHIPPED.** The walking figures now sit on the pavement with the same house-style contact shadow every
vehicle already casts. Draw-only, pop provably flat, ~5 lines, reads at zoom.

### Findings for later laps
- **⚠ THE LIVE PED/DOG SYSTEM IS NON-REPRODUCIBLE ACROSS PAGE LOADS — a build-vs-build pixel diff on live
  figures is hopeless; PLACE a controlled set instead (new; the lap's central probe lesson).** Peds spawn/despawn
  and step over a nondeterministic number of real-time frames before you can freeze, so the array's composition,
  order and positions all differ between two loads of the same seed (~20px drift, |Δ|~9 HEAD-vs-HEAD). Pinning
  `Math.random` and zeroing gait were *necessary but not sufficient* — the positions themselves had already
  drifted. The clean gate for any figure-DRAW change is: freeze, clear the live movers (incl. **vehicles**, which
  drift over roads and poison a bare-ground control), and push a fixed set of figures at chosen cell centres with
  every field set by hand — the draw code is identical whether a figure is live or placed. This is the figure
  analogue of the terrain probes' `git show HEAD:` diff.
- **A ~5px SPRITE'S ORNAMENT IS A ~2px MARK — size the probe band and the visual read to it, not the sprite
  (reinforces 133).** `TW/TH=16/8` at `scale≈0.66` makes even the car's `0.16` shadow only ~3px; a per-row
  luminance profile showed the ped shadow lands on **exactly one pixel row** (Δlum −0.81 there, 0.00 everywhere
  else). A default 8×8 sample box diluted a real −0.8 signal to −0.1 and read as noise. Sample the one row; look
  at a ≥9× crop. Anything the size of a person's foot is invisible at fit zoom by construction, and that is fine.
- **THE HOUSE-STYLE HELPER IS THE TELL FOR A POLISH — grep who ELSE calls it.** `shadS`/`shadowEl` grounded
  buildings, domes and every vehicle; the walking figures were the lone omission. A "who uses this shared helper,
  and who conspicuously doesn't?" grep is a reliable way to find the next consistency Polish (cf. the tooltip
  tell: a string that asserts what the draw ignores). People's remaining such gap: the *static* standing crowds
  (strip/stadium/amphitheatre/school-run specks) also cast no shadow — but they're a bigger, more diffuse change.

## Iteration 138 — the main roads light up at night (2026-07-11)

**Vector.** Transport × **Connect** (SHIPPED). Rotation named the domain — Transport was the single stalest
(128) — and its entities are fully saturated (cars/buses/emergency/bikes/trams/trucks; vehicles already richly
lit; cabins fixed 128, trains named 105, stations fixed 112), so 118's law forbids a New element. The one
banked Transport cue (128's MINSEP cabin-crossing cosmetic) is explicitly low-value/"after anything that
matters". So I took **Connect** — Transport's coldest live cell (last **15**) — whose signature is to add no
new object and *light a relationship between two things that already exist*: the **arterial road network**
(`c.flow>=ARTFLOW`, the documented "main roads" measure) and **night**. Varies off Polish (137) and Deepen
(both hot).

**The seam.** Street lamps existed (L3843) but keyed off `c.busy` — the LOCAL "≥3-developed-neighbours" test
that the header itself notes calls *a third of the city* an avenue — as a scattered glow disc. So at night the
city's actual through-network (`c.flow`, ~15% of roads, the real spine) never read as a network; only cars lit
the roads. This is exactly the documented "reuse `c.flow` for anything that should follow the main roads —
don't hand-roll a second notion of important street."

**Change (~18 lines, draw-only).** In the ROAD draw case, the night-lamp block now branches on `art`: an
arterial hex pools warm light along its centre-line toward each arterial neighbour (the same neighbour-walk the
gold trunk line uses just above) — a soft wide base (w9 @ 0.11·LITAMT) + a bright continuous core (w4.5 @
0.20) + a small lamp head — so `c.flow` joins hex-to-hex into one continuous lit ribbon. Ordinary streets keep
a *dimmer* ambient disc (0.30→0.22) so the spine out-shines them. No tile, entity, `rng()`, `hashCell`,
`tick()` pass or terrain; all strings pure-ASCII (134's invariant). Pop provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0** (first pass) / pop
**−3** (final) is the documented `(year*·)` salt jitter. `arterials 795` unchanged. Stream-neutral by
construction.

**Probe.** `probes/probe-artlight.mjs` (new, promoted). Build-vs-build (patched vs pristine HEAD), night frame
frozen (109's law — the sea sparkles on waveT, headlights ride v.p), seeds 7/42. Signed **Δluminance** over 60
arterial hex boxes, with two controls the census can't express. First cut proved the effect real but weak
(**+3.71**, and the seed-42 visual agent correctly failed it — the continuous ribbon at 0.15 was *fainter*
per-pixel than the 0.30 ordinary disc). After tuning: arterial NIGHT **Δlum +7.26** (7.33/7.19) · **DAY
control +0.08** (block is `LITAMT>0.25`-gated ⇒ night-only) · **far-water NIGHT control 0.00** (the spine lit,
not a whole-frame wash). Both controls held; the signal near-doubled.

**Visual.** First cut: **1/2** (seed 7 PASS located the corridors; seed 42 FAILED — "uniform scattered dots,
no brighter continuous spine"). That FAIL was a true design signal, not a vague miss, so I measured (probe) and
re-tuned rather than arguing. Retuned: **2/2 PASS**, both seeds. Asked to *locate* (108's law), both agents
traced **continuous** warm ribbons — seed 42: "CONTINUOUS lit ribbons tracing the roads hex-to-hex, not
scattered dots… distinctly brighter than the dim grey-blue side streets"; seed 7: a gold loop through the core
+ a horizontal spine + a strand to the river. Both: no z-order tears / floaters / blowout, warm light
"tasteful… not a smeared glare wash," whole frame a balanced night coastal city with the arterials reading as
"the connective tissue."

**Verdict — SHIPPED.** The city's main roads now read as a lit network at night — `c.flow`'s spine glows as a
continuous warm corridor while side streets stay dim, adding legible structure with no new object, provably
flat pop. Transport's Connect cell is filled (its third: 5, 15, 138).

### Findings for later laps
- **THE NIGHT LAMPS NOW ENCODE THE ROAD HIERARCHY — arterial (`c.flow`) = bright continuous ribbon, ordinary
  street = dim ambient disc (L3843).** Any future road-network night vector should read/extend this, not
  re-key it: the two-tier lamp is now the one night definition of "main road vs side street," and it shares
  `c.flow` with the daytime gold trunk line (one predicate, 112's law). The `c.busy` disc is now *only* for
  non-arterial streets.
- **A "READS AS SCATTERED DOTS, NO CONTINUOUS RIBBON" AGENT FAIL IS A CONTRAST-vs-CONTINUITY DEFECT, NOT A
  DESIGN-DEAD-END — measure the SIGNED delta, then push it.** The first cut's continuous stroke (0.15·LITAMT)
  was *dimmer per-pixel than the ordinary disc it was meant to out-shine* (0.30), so the eye read the bright
  discrete lamp-heads as beads and missed the ribbon. The probe's signed Δlum (+3.71 → +7.26) is exactly the
  knob the agent's complaint pointed at; a linear feature must be both continuous AND brighter than what it
  ranks above (101's contrast×width law, applied to *relative* brightness). One re-tune closed a 1/2 to 2/2.
- **A NIGHT-ONLY DRAW ADDS PER-ARTERIAL STROKE WORK ONLY AT NIGHT (~88 hexes × ~2 segments × 2 strokes).**
  Cheap, but night is the frame to watch (118). Not perf-gated this lap (draw-only, and the interleave overruns
  the 120s Bash timeout); the 141 step-back's interleaved control will grade it against the stored baseline.


<!-- Header bullet moved from GROWTH.md at iter 148 (superseded/closed, kept for memory): -->
**124 cashed Urban's banked ghost-`c.solar` cue and it is now CLOSED:** `c.solar`/`c.groof` persist after a
building is cleared for a paved square, so the census counted panels on `PLAZA`/`QUAD`/`PARK`/`GARDEN`/`STADIUM`
(probe-solghost: 27 ghost solar + 4 ghost green across 8 seeds) and the adoption CA counted them as neighbours.
The draw + tooltip already gated on `DEV.has(c.t)`; 124 routed the census (×2) and both adoption neighbour-counts
through the same predicate — `solarRoofs` −20, terrain-neutral (pop/roads/developed +0). This was the last
banked cue that moved a census number; from here the census is vacuous again for most vectors — reach for a probe.

## Iteration 139 — the vineyard keeps the calendar (2026-07-11)

**Vector.** Nature × **Deepen** (SHIPPED/DEEPENED). Rotation named the domain — Nature was the single stalest
(129) — and the header banked the content over many laps: *"129's banked Nature move is now a Deepen — make
VINEYARD's grapes read `year` (last Sky-feedable item; 108/113/120)."* A banked, measured cue outranks
kind-rotation (119's law), which is why Deepen was taken despite being hot. The vineyard was the artifact's
last frozen agriculture: its draw painted **green trellis rows + purple (`lav`) grape clusters
UNCONDITIONALLY** — a vine stuck at perpetual harvest — while its neighbours (FARM ±88 seasonal, the orchard's
blossom/fruit since iter 57) already turned with the year.

**Change (~14 lines, draw-only).** Added a shared `vinePhase()` next to `orchardPhase()` (one predicate, one
definition — 112's law — so a future tooltip reads the same source the draw paints): `dormant` (winter, s<0.16
or ≥0.99) · `bud` (spring) · `veraison` (dry-peak summer) · `ripe` (autumn harvest). `case T.VINEYARD` now
gates on it: **leafy green canes in season / bare brown thinned canes in winter**, and grape clusters
**only at veraison (sage-green berries) and ripe (purple `lav` harvest)** — none in bud/dormant. Mirrors the
orchard exactly. No tile, entity, `rng()`, `hashCell`, terrain or `tick()` pass; strings pure-ASCII (134).

**Census.** PASS, exit 0. Draw-only and stream-neutral — tile histogram empty, all core metrics +0 (the pop −3
seen on a re-run is the documented `(year*·)` salt jitter, present on pristine too).

**Probe — two, because a seasonal draw on the fast `year` clock has TWO ways to be wrong.**
- `probes/probe-vine.mjs` (new) — build-vs-build |ΔRGB| at vineyard hex centres, patched vs pristine HEAD,
  clock frozen (109), per season: **winter 10.96** (grapes removed, canes browned) · **spring 3.99** · **dry-peak
  3.74** (grapes now green not purple) · **autumn 0.00** — autumn is the *season control*: both builds draw
  purple grapes, so my change leaves the harvest byte-identical and only fixes the three wrong seasons.
  **ROAD control 0.46 flat every season** (the edit is only `case T.VINEYARD`). seeds 7/42/1234.
- `probes/probe-vinerate.mjs` (new, TEMPORAL — 134's law: a claim about motion needs a running clock) —
  `year` is the fast dev clock (~0.167 yr/s at speed 1), so the vineyard cycles in live play. Counted phase
  flips over 12 s of real play with the **ORCHARD as the accepted-reference control**: VINEYARD **0.67 Hz** =
  ORCHARD **0.67 Hz**, both seeds. The vineyard flickers no harder than the orchard shipped on this same clock
  since iter 57 — it joins the diorama's existing seasonal time-lapse, it does not introduce a novel strobe.

**Visual.** First reads FAILED and *both agents were right to* — but the fault was the harness, not the draw:
`?year=` pins the calendar ONCE at load (L6357) and the live clock then drifts it `+dt·s/6` during tileshot's
~1.4 s `playing=true` wait, so the winter pin drifted to bud (green) and the autumn pin overran past `.99` to
dormant (brown) — the exact "seasons inverted" the seed-7 agent reported. Re-shot with the **clock frozen**
(`playing=false; __setYear(y); render()`), the phases render as designed: I verified winter (brown bare canes),
dry-peak (green, subtle) and autumn (green + purple clusters) myself, then a fresh agent PASSED all four seeds-42
frames — *"winter reads bare/brown, spring/summer green, autumn green-with-purple-grapes; the four frames
clearly differ in a sensible seasonal order,"* no z-order/floater/blowout, winery sits cleanly atop. The
whole-city frame was confirmed balanced/beautiful/no-tears by the first seed-42 agent (that check is
season-independent).

**Verdict — DEEPENED.** The vineyard now turns through the year like its orchard and farm neighbours —
bare in winter, laden with purple grapes at harvest — closing the last frozen agriculture tile and the last
Sky-feedable vegetation (108/113/120). Draw-only, stream-neutral, provably scoped (autumn control 0.00, ROAD
0.46), and no worse strobe than the orchard (0.67 Hz each).

### Findings for later laps
- **⚠ A SEASONAL SCREENSHOT MUST FREEZE THE CLOCK — `?year=` PINS ONCE, THEN THE LIVE CLOCK DRIFTS IT A FULL
  SEASON DURING THE WAIT (new, promoted to SKILL.md).** `?year=` calls `__setYear` once at load (L6357); the
  frame loop then runs `year += dt·s/6` (~0.167 yr/s), so a screenshot taken after a ~1 s `playing=true` wait
  has drifted ~0.15–0.24 yr — a discrete-phase feature can be a WHOLE SEASON off. This cost two false-FAIL
  agent reads this lap (one read the seasons "inverted"). Prior seasonal shots tolerated it because
  `applySeason`'s color is continuous (a 0.2 drift is a small nudge); a discrete-threshold visual is not.
  Freeze before the shot: `playing=false; __setYear(y); render()`, exactly as the probes do. (`shoot.mjs`'s
  `?year=` alone is NOT enough for a discrete seasonal feature.)
- **A DISCRETE-PHASE VISUAL ON THE FAST `year` CLOCK IS NOT AUTOMATICALLY A 134-STYLE STROBE — the test is
  whether it flips WORSE than the accepted ORCHARD, not whether it flips.** 134 reverted a HUD *readout* (text
  words at 0.7 Hz, jarring). Scenery that participates in the whole-city seasonal time-lapse (farms recolor,
  orchard blossoms/fruits) is accepted at that same 0.67 Hz. `probe-vinerate` is the reusable instrument: run
  the live clock, count phase flips, use the orchard as the ceiling control.
- **THE VINEYARD TOOLTIP IS NOW UN-CASHABLE — the last banked Nature Interaction.** `TILEDESC[T.VINEYARD]`
  ("Terraced grapevines — wine country") is now mute about a draw that knows its `vinePhase()`, exactly the
  orchard's state before 129 gave it a `Grove` row. The next Nature × Interaction/UX lap adds a `Vines` row
  naming the season (Dormant / Bud break / Veraison / Harvest) from the shared `vinePhase()` — one predicate,
  already built. This retires the header's *"VINEYARD needs a Deepen first"* caveat (108/109/129): the Deepen
  is done.

## Iteration 140 — the squares say whose they are (2026-07-11)

**Vector.** Civic & culture × **Interaction/UX** (SHIPPED). Rotation named the domain — Civic was the single
stalest (its last SHIP was 122; 131 was an explore that shipped nothing) — and the header banked the content
over three laps: the plaza/quad tooltip **titles** still read the generic tile label ("Plaza"/"Quad") while a
data row buried the owner as "Forecourt of — Town hall". Kind was forced off Deepen (139) and Polish (both hot,
131/132/137); Civic's entities/ornaments are saturated (flags already fly on hall/library/parliament, banners on
the museum — I grepped `windFlag` and confirmed it before proposing a New element), so 118's law forbids a New
element, leaving Interaction/UX — and the tell ("a string generic where the code already knows the specific")
is the loop's most reliable move (117/122/129).

**The seam.** `describeTile` (L5981) set a paved square's title from the generic `TILELABEL` and only appended
`['Forecourt of', CIVICLABEL[k]]` as a data row. `squareOwner(x,y)` (L1190) already answers whose square it is
from `c.own` — the index the placing rule STAMPS (not adjacency, which 122 measured wrong on 2/3 seeds).

**Change (~11 lines, tooltip text only).** Added a PLAZA/QUAD branch to the title/sub chain: when `squareOwner`
resolves, the headline reads `<Institution> forecourt` / `<Institution> grounds` (e.g. "Museum forecourt",
"University grounds") and the sub is prose ("The paved public square that fronts the museum." / "Mown lawns kept
behind the university."). Removed the now-redundant "Forecourt of/Grounds of" data row. Squares whose owner was
rebuilt away keep the generic "Plaza"/"Quad". No draw, tile, entity, rng()/hashCell, tick() pass or terrain;
strings pure-ASCII (134).

**Census.** PASS, exit 0. Draw-only tooltip text — tile histogram empty, all core metrics +0, stream-neutral by
construction. Vacuous by design (the probe is the gate).

**Probe.** `probes/probe-civic.mjs` — **updated** to the new headline contract, not forked (one predicate, one
probe — 112's law applied to the gate itself; the claim moved from a data-row regex to a headline parse, so the
probe's parse moved with it). It hovers every PLAZA/QUAD, reads the HEADLINE, and checks the named institution
is an adjacent ELIGIBLE civic (MAJORK for forecourts, GROUNDS for quads) recomputed in Node from cube distance
— a third implementation sharing no code with the page — then PASS 2 checks the institution agrees from its own
side. seeds 7/42/1234: **PASS · PASS · PASS** (checked 30/25/29 tooltips, plaza 4/3/4 · quad 10/8/8, pageerrors
0). Squares fire at scale (dead-code law) and every headline named the owner the geometry confirms.

**Visual.** Hover clips at seeds 7/1234, agent read: **PASS**. Transcribed "Museum forecourt / The paved public
square that fronts the museum.", "Hospital grounds / Mown lawns kept behind the hospital.", "University forecourt
/ …the university." — all the new format, none generic; text legible, no overlap/clipping/blowout.

**Verdict — SHIPPED.** A paved civic square's tooltip now leads with the institution it belongs to instead of a
generic "Plaza" with the owner buried below — the headline (the most-read line) is now the specific fact. Closes
the plaza/quad-title tell banked by 122/129. Civic's Interaction/UX cell gains its third (52, 122, 140).

### Findings for later laps
- **THE PLAZA/QUAD-TITLE TELL IS CASHED — do not re-open it.** `TILEDESC[T.PLAZA]`/`[T.QUAD]` and the generic
  `TILELABEL` are now bypassed for OWNED squares; only ownerless/rebuilt squares fall through to them. The
  headline names the owner and there is no longer a "Forecourt of" data row.
- **A TOOLTIP HEADLINE IS A STRONGER SEAM THAN A DATA ROW — the fact the eye reads first should be the specific
  one.** The owner was already correct in a buried row since 122; promoting it to the title added no new truth,
  only legibility. When a tooltip already KNOWS the specific but leads with the generic, promoting it to the
  headline is a clean Interaction/UX lap with zero draw risk.
- **UPDATE THE PROBE, DON'T FORK IT.** probe-civic already owned the plaza/quad claim, so the change moved the
  claim's *reader* (data-row regex → headline parse) rather than adding a second reader. A new probe would have
  been two readers of one claim — the exact anti-pattern 112 warns about, applied to the harness.

## Iteration 141 — the kelp bed names its extent (2026-07-11)

**Vector.** Water & coast × **Interaction/UX** (SHIPPED). Rotation named the domain — Water was the single
stalest (last 132) — and the header named the content: the **un-cashed KELP tell**. `TILEDESC[T.KELP]` said
only *"Seaweed swaying in the shallows"* while `describeTile` printed nothing of the bed, though the woods had
named their `Stand — N hexes` by flood fill since iter 117 and iter 132 gave the kelp its own drawn canopy. A
banked, measured cue outranks kind-rotation (the loop's law), even with Interaction/UX hot (133/134/140).

**Adopted from a killed process.** I did **not** author this — the prior iteration ran the vector, passed its
own gates, and was killed (rate limit / sleep) *between* its verdict and `git commit`, leaving a clean,
coherent, uncommitted change + its probe in the worktree (the iter-72 shape). Per the skill's dirty-worktree
rule I re-ran the gates myself; they decide, not the missing ledger entry. Described below from the diff.

**Change (~15 lines, tooltip + refactor, zero draw code).** `standSize` (the woods' flood fill) generalized
to `floodSize(x,y,pred)`; `standSize`/`bedSize` now both delegate to it — **one definition, so the stand and
the bed count contiguity the same way and cannot drift (112's one-predicate law)**. `describeTile` gains a
`Bed — N hexes` row for KELP by `bedSize`; the `TILEDESC[T.KELP]` sub rewritten to *"A bed of kelp rooted in
the cold, shallow water off the beach."* Depth is deliberately **left off** (invariantly shoal here → constant
noise), extent is the one honest datum. Kelp carries no CA state, so the bed is pure geometry.

**Census.** PASS, exit 0. Tooltip/refactor-only, stream-neutral — tile histogram empty, core metrics +0.
(`solarRoofs` −2 / `greenRoofs` −1 is the roof-adoption CA's known headless-timing wobble, ±1–2 on pristine
HEAD; this change touches no terrain and no `rng()`.)

**Probe** `probes/probe-kelptip.mjs` (already present, promoted). Hovers every KELP hex via `__find('KELP')`
screen coords, scrapes `#tip`'s `Bed` row, and checks the count against ground truth recomputed **in Node** by
a flood fill over the kelp set using odd-r cube adjacency — a **third** implementation sharing no code with the
page's `floodSize`/`nbrs6` (122's law: check a tooltip claim against independent recomputation, not a shot that
renders it). Freezes the sim first. Controls: a WATER hex must print no `Bed` row; bed sizes partition the kelp
set. **seed 42:** 10 kelp / ~6 beds, checked 9, control 12 water — **PROBE: PASS**. **seed 7:** 17 kelp / ~7
beds, checked 15, control 12 — **PROBE: PASS**. Sample scrape reads clean: `Kelp bed | A bed of kelp… | Bed |
2 hexes | Tide | Ebbing`.

**Visual.** No draw code changed, so scene pixels are identical to HEAD; the tooltip's rendered text is already
verified by the probe's DOM scrape. One defensive whole-city wide read (seed 42, `year=2035.62`) delegated to
an agent: balanced coastal city, no z-order tears / floaters / blowout, coastline & kelp shallows read clean,
nothing compounded. VISUAL: PASS.

**Verdict — SHIPPED. The KELP tell is CASHED.** The un-cashed-tooltip list loses its longest-standing entry;
KELP joins the woods, orchard, vineyard and institutions in naming what its own code already knows.

### Findings
- **Depth is correctly OMITTED where it is invariant.** The header's banked cue named *"extent AND depth"*, but
  every kelp hex abuts the beach at shoal depth, so a `Depth` row would print constant noise. The adopted change
  showed only extent — the honest datum. **A tooltip row earns its place by VARYING; a constant field is noise,
  not data** (cf. iter 120's frozen-green hexes: sameness masquerading as information).
- **`floodSize(x,y,pred)` is now the shared contiguity primitive** — reuse it for any "how big is the contiguous
  patch this hex belongs to" question (marsh, a district, a water body) rather than forking a fourth flood fill.
- **A killed iteration's PROBE is its self-grade — re-run it, don't re-derive it.** The prior process left a
  complete, independent-recomputation probe; running it (both seeds) plus census settled adoption in ~3 minutes
  without re-designing anything. The probe *is* the missing ledger entry's evidence.


<!-- header trim, iter 151: full detail of closed cue (l), condensed to a stub in the header -->
> **Cue (l) CLOSED (iter 133), full detail:** a hovered TILE wears a hex-outline focus ring
> (`hoverTile`→`render()`, 1.06 of the footprint, ink-under/cream-pulse matching `stamp()`).
> `window.__hover(x,y)` sets it for probes; `probe-tilering.mjs` gates it.

## Iteration 142 — the eighth step-back finds a clean city, and the first real perf delta (2026-07-11) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/125/130/136/**142**; 141 slipped it one). Not a
domain × kind lap: it reads the WHOLE city for *cumulative* drift the census and per-feature gates are blind to,
runs the perf gate, and — per 115/120/125 — does it at **night AND a season, with the day/night baselines pinned
OFF January** (`year=2035.62` dry peak; `2035.02` as the seasonal-contrast frame). No city vector taken, so
rotation is unchanged; next lap (143) owes the stalest domain, **Urban (133)**, then Sky (135).

**What was read.** Un-zoomed whole-city `wide` frames at **2 seeds × 3 lights/calendars** — seed 42 (warp 61)
and seed 7 (warp 31), each at {day 2035.62/t=0.35, night 2035.62/t=0.90, winter 2035.02/t=0.35}. One subagent
per seed read its own three frames, asked the *cumulative* question ("has anything compounded into clutter or
darkness?") plus 108's **locate-don't-judge** night test ("where is the core by light alone?").

**Result: the city is healthy — both agents VISUAL: PASS.**
- **Night lighting (115) holds at both seeds, LOCATED off-centre.** By light alone the luminous core sat at seed
  42 ~(0.47,0.53) with a secondary glow ~(0.40,0.30), seed 7 ~(0.47,0.62) — matching 136's (.45,.48)/(.47,.62),
  both with a genuine core→edge falloff and dim/near-black rim.
- **138's arterial night-corridors read as designed** — both agents, unprompted, traced *continuous* warm lit
  ribbons along the main roads ("clear diagonal streaks in the west/central grid", "amber-lit corridors
  radiating from the core"), distinctly brighter than the dim side streets. The 138 ship still reads eight iters
  on, at the whole-frame scale.
- **The sea reads** (116's bottom + 123's founded wind farm): turbines parallel to the shelf, no dead void.
- **No z-order tears, floating tiles, hard seams, or blown-out colour in any of the 6 frames** — night
  window-clusters stay warm amber, not clipped.
- **Winter reads distinct from summer** at both seeds (farm/scrub paler/tan, cooler sky), city balanced.

**Season — measured alive, not believed.** `probes/probe-season.mjs` (per-tile rendered-pixel distance from
winter, `ROAD` = zero control): FARM winter→dry-peak **88.3**, →autumn 93.0; VINEYARD now **44.6/36.7/42.7**
(the iter-139 seasonal draw shows in the probe — new since 136); ORCHARD 25.3/17.8/41.4; MEADOW/FOREST/SHOREPARK
all move; PARK/REDWOOD/GARDEN/QUAD near-zero *by design* (120). ROAD control **0.5–2.2**. Matches 130/136 (FARM
88). The calendar is working; the whole-frame mildness agents feel is the by-design evergreen/irrigated dilution.

**Perf — the stored-baseline false-FAIL fired a FOURTH time, but the interleave found the first REAL delta.**
`perf.mjs` read day **34.34ms** (+3.6% vs baseline) / night **40.83ms** (+9.4%), the night rise looking like a
regression. Interleaved HEAD-141 vs the iter-136 file (`6b31425`, A/B/A/B, min per variant): day **34.44 vs
34.50ms** (**−0.2%**, flat) but night **41.39 vs 40.50ms** (**+2.2%**) — unlike 130/136 which were flat both
ways. That +2.2% night is 137's figure contact-shadows (day+night) + **138's ~88-hex per-arterial night lamps
landing** — small, expected (138's own finding flagged night as the one to watch), well inside budget (60fps
budget 100%, 30fps 47.7%). NOT a regression to fix and **NOT re-pinned** (the +9.4% vs stored baseline is still
mostly load — the 6-day-old iter-136 file itself read 40.50ms night today vs the 37.33ms it was pinned at).
Census PASS and vacuous by construction (no source edit).

**Change (the step-back's product — none to the city).** No compounding defect, so per 120/125/130/136 ("a
clean step-back is a complete iteration — don't force a filler vector") the output is the health record plus
header refreshes: step-back pointer → 147, perf note gains the 142 interleaved reading (four-time false-FAIL
pattern + first real delta), rotation notes 142 as the step-back. No `solvista.html` edit; tree verified clean
after the perf interleave restored HEAD.

**Verdict — FIXED.** No compounding city defect (the honest step-back outcome, third clean bill in a row: 130,
136, 142). All accumulated visual laws (115/116/120/123) and 138's arterial night-lighting still read correctly
at both seeds under all three lights. The perf gate's stored-baseline night false-FAIL is benign for the fourth
time (125→130→136→142) — but the same-session interleave this time surfaced the genuine +2.2% night cost of
137+138's night draw, which is exactly what the interleave exists to separate from load.

### Findings
- **THE INTERLEAVE'S JOB IS TO SEPARATE REAL COST FROM LOAD — and at 142 it did BOTH in one reading.** The
  stored baseline said night +9.4% (looks like a regression); the interleave against iter-136's own file said
  +2.2% (the real cost of 137+138's night draw) with day flat. Neither number alone is the truth: the stored
  baseline conflates code + 6 days of load drift, the interleave isolates code. A non-flat interleave is not a
  false-FAIL — it is the gate working. +2.2% for a deliberately-shipped night-lighting network is a good trade,
  logged not fixed.
- **⚠ WHEN SCRIPTING THE PERF INTERLEAVE, FILTER perf.mjs's OUTPUT TO THE `p95` LINES.** `perf.mjs` prints the
  frame-timing block AND a "vs baseline" block, both starting `  day`/`  night`; a naive `grep '^  (day|night)'`
  swallows the baseline numbers and silently corrupts the `min` per variant (they leak in as extra array
  elements). Grep for lines containing `mean` AND `p95` (`grep -E '^  (day|night) +mean.*p95'`). Cost me one
  wasted round this lap.
- **138's ARTERIAL NIGHT-LIGHTING HAS PAID TWICE NOW — at ship (138) and at this whole-frame step-back.** Both
  142 agents traced the continuous corridors unprompted at fit zoom, which is a stronger read than 138's own
  tight clips (a linear feature that survives downscaling has real contrast×width, 101's law). The road
  hierarchy at night (arterial ribbon vs side-street disc) is a durable, legible layer.
- **THE NIGHT-CORE-IS-BROAD watch-item (136) is RECONFIRMED at 142, still not a defect.** Both agents again
  located a real falloff but a spread glow rather than a tight CBD peak. Three step-backs deep it is the one
  standing legibility nuance; a future Sky/Urban Polish steepening the `CBDX/CBDY` light gradient could cash it
  deliberately — it has not earned a forced fix.

## Iteration 143 — the downtown gets a bright heart at night (2026-07-11)

**Vector.** Urban fabric × **Polish** (SHIPPED). Rotation named the domain — Urban was the single stalest (last
133) — and 118's law forbids a New element in a domain whose additive inventory is surveyed spent. The content
was a **banked, thrice-reconfirmed watch-item** (136/142 step-backs): the night core reads *broad/diffuse*, a
real falloff but no tight CBD peak, "a future Sky/Urban Polish steepening the `CBDX/CBDY` light gradient could
cash it deliberately." A banked, measured finding outranks kind-rotation (119's law), and Polish varies HARD
off the last four laps (all Interaction/UX, 133/134/140/141) — the header's own steer.

**Probe first (119's law).** Fixed `probes/probe-nightcore.mjs`'s path bug on the way in — it read
`./solvista.html` relative to its own dir (the exact anti-pattern SKILL.md warns about); now
`../../../../solvista.html` (the repo-root resolve). Its ring profile *named the defect precisely*: the night
light field `c.lit` is `0.18 + 0.70·smoothstep(1−d/34)`, and **smoothstep is flat-topped (zero slope at the
CBD)**, so the inner rings barely out-shone each other. seed 7 ring 0-4 (**0.810**) was actually *dimmer* than
ring 4-8 (**0.826**) — the brightest ground was a plateau, not a peak. That is the "diffuse core" three agents
felt, measured.

**Change (~6 lines, draw-only, genWorld only).** Kept the broad smoothstep glow to the rim (it earns the
rim→core gradient) but **added a tight Gaussian bump on the CBD**: a new `CORESIG=5` and
`c.lit = 0.16 + 0.50·broad + 0.28·exp(−d²/2σ²) + (c.lit−0.5)·0.5`. Position-only (never height — a building
must not wear its height twice, 103/110), stream-neutral (no `rng()`, no terrain, no tile/entity), and the
per-frame draw path is byte-identical — the Gaussian is computed once in `genWorld`, not per frame, so no perf
cost (perf gate not needed; the step-back owns it).

**Census.** PASS, exit 0. Draw-only, stream-neutral — tile histogram empty, all core metrics +0
(`greenRoofs +1` is the roof-adoption CA's known headless-timing wobble).

**Probe, after.** `probe-nightcore` ring `c.lit` means, before → after:
- seed 42: `0.899/0.828/0.747/0.658/0.473/0.264` → `0.921/0.774/0.614/0.515/0.370/0.224` — the core→(8-12) gap
  **doubled 0.152 → 0.307**; a real monotonic peak.
- seed 7: `0.810/0.826/0.762/…` (0-4 *below* 4-8, no peak) → `0.832/0.770/0.629/…` (0-4 now the brightest).
- `corr(lit,th)` **0.09–0.11** both seeds — brightness still does NOT restate height (invariant held, 103/110).
- The PIXEL luminance moved only ~1–2 units per mid-ring (the window mix `0.35+0.65·c.lit` compresses the range
  and windows are a fraction of each building) — so the effect is subtle by construction, which the visual gate
  then confirmed is *discriminable*, and which is the right proportion for a nuance (a dramatic core blows out).

**Visual.** Before/after night frames (off-January `year=2035.62`, t=0.88), one agent per seed, asked to
**DISCRIMINATE** which frame has the tighter core (108's locate-don't-judge). **2/2 chose the after-frame**,
blind, and both **located the brightest cluster at the true CBD** — seed 42 ~(0.47,0.48) [CBD (32,31)], seed 7
~(0.44,0.63) [CBD (31,41), the southern y reads low in-frame]. Both: no z-order tears, no floating tiles, no
blown-out/clipped white (peak stays warm window-light, not a halo/blob), whole frame a balanced night coastal
city with a dark rim. VISUAL: PASS both.

**Verdict — SHIPPED. The night-core-is-broad watch-item (136/142) is CASHED.** Downtown now reads as a single
luminous heart with a steep inner falloff, not a wide even smear — the flat-plateau defect (smoothstep's
zero-slope top) is gone. Draw-only, stream-neutral, position-only, zero perf cost. Urban's Polish cell gains
its tenth (…124, 143); Urban is no longer stalest.

### Findings for later laps
- **SMOOTHSTEP IS FLAT-TOPPED — a radial falloff built on `u²(3−2u)` has ZERO slope at its centre, so it makes
  a PLATEAU where you want a PEAK.** The night core read diffuse for 28 iterations because its own falloff was
  gentlest exactly at the CBD (seed 7's innermost ring measured *dimmer* than the next one out). If a field
  should read as a bright *point*, add a tight Gaussian/cone bump on top of the broad base; don't just scale the
  smoothstep. Reusable for any "concentrate X on a centre" field (a future density/value/glow peak).
- **THE PIXEL PROBE AND THE MODEL PROBE DISAGREE ON MAGNITUDE — the window mix `0.35+0.65·c.lit` compresses.**
  A large swing in the `c.lit` *field* (ring means moved 0.05–0.13) became a ~1–2-luminance-unit swing in
  rendered pixels, because the window term has a 0.35 floor and windows are a fraction of each building. So a
  field fix reads *subtly*. If a future lap wants the core to read MORE strongly, the lever is widening
  `0.35+0.65·c.lit`'s range (or a dedicated warm downtown sky-glow disc), NOT steepening `c.lit` further — it's
  already peaked, and the ceiling is the mix, not the field.
- **probe-nightcore.mjs's path was BROKEN (`./solvista.html`) and is now fixed** — it could not have run since
  it was `git mv`'d into `probes/`. Any probe that predates the "resolve relative to the probe, four dirs up"
  law may carry the same bug; check the `readFileSync`/`goto` path before trusting an old probe's silence.

## Iteration 144 — the almanac gets its moon (2026-07-11)

**Vector.** Sky & atmosphere × **Interaction/UX** (SHIPPED). Rotation named the domain — Sky was the single
stalest (last 135) — and its own banked finding named the vector: 135 slowed the moon FIELD onto the slow `dayT`
clock and wrote "a moon-only HUD card is now viable" (a banked measured finding outranks kind-rotation, 119's
law). The Interaction/UX cell held only `~~134~~` (the reverted full almanac), so this both cashes the bank and
fills the cell. Deliberately the **moon only**, not 134's almanac: the header's live warning is that the SEASON
word still reads the fast `year` and would strobe ~0.7 Hz (134), so it stays out until it has its own slow clock.

**Change (~18 lines, DOM + draw-only, stream-neutral).** A new census-strip stat, placed right after the gold
year/time-of-day stat so the two temporal/sky readings group: `<b id="stMoonPct">` over `<span id="stMoonName">`,
marked `opt sm` so it sheds with the other decorative stats as the strip narrows (and never leaks onto the
"founding four" mobile layout — it sits before the `:last-child` transit stat, which keeps its mobile role). A
new `moonWord(l)` beside `phaseWord()` bins the lunation fraction into the eight conventional names; `syncStats()`
reads `moonPhase()` once and writes `NN%` (illumination `(1-cos 2πl)/2`) + the phase word. No `rng()`, no
terrain, no tile/entity, no new per-frame draw — the readout rides the existing `syncStats` cadence (per tick),
the same one the time-of-day phase word already uses.

**Census.** PASS, exit 0. Draw/DOM-only, stream-neutral — tile histogram empty, core metrics +0 (`pop −3`,
`greenRoofs +1` are the documented chaotic-CA / roof-adoption headless wobble).

**Probe — `probes/probe-moonhud.mjs` (promoted; new).** Two claims, because a readout claim needs BOTH a running
clock (134's cadence law) and a correctness sweep:
- **Cadence (running clock):** playing=true at 8×, read the actual DOM `#stMoonName` @10 Hz for 6 s. seed 42 &
  seed 7 both **1 word-transition** (a legible slow readout, not a strobe), CONTROL clock advancing (ΔdayT ≈
  0.43, Δyear ≈ 8). A `year`-driven readout would have flipped words many times per second here.
- **Correctness + liveness:** sweep a full synodic month via `__setTime` (8 integer `dayT` steps = 1 lunation),
  65 samples. **8/8** phase names appear (live across the month), **0** word/limb disagreements (every "waxing"
  word waxes, every "waning" word wanes; "full"/"new" only at the illumination extremes). NB the first cut of
  the *check* wrongly asserted `illum>0.98 ⇒ full moon`; phase names bin by lunation FRACTION, so a 99%-lit
  waxing gibbous is correct — the readout was right, the check was fixed.

**Visual.** Wide dsf=2 frames, one agent per seed. seed 42 day (`year=2035.62`, t=0.35): moon stat reads
`0% / NEW MOON` right after `2035 / DAYTIME`, strip one clean row of 11 stats, no wrap, clear gap before the
controls card, whole frame balanced. **seed 7 night (t=0.90): card reads `97% / WAXING GIBBOUS`, and the agent
independently confirmed the DRAWN moon disc is a nearly-full bright round disc that AGREES with the card** — the
locate-don't-judge check (108) against ground truth the field already holds. Both VISUAL: PASS, no z-order
tears / floating tiles / blown-out colour.

**Verdict — SHIPPED. 135's banked "moon-only HUD card is now viable" is CASHED.** The diorama now names the
moon it draws: an almanac reading that stays put for ~110 s (one day-cycle per phase-eighth) instead of
flickering, because it rides `dayT` not `year`. Sky's Interaction/UX cell is filled (`~~134~~, 144`); Sky is no
longer stalest (People 137 now is). The season half stays banked and explicitly fenced off in the header.

### Findings for later laps
- **THE MOON HUD IS THE HALF OF 134's ALMANAC THAT WAS SAFE — the SEASON half is still fenced.** 135 slowed
  only the moon; the season word still reads `year` (fast dev clock) and would strobe ~0.7 Hz. A future Sky lap
  wanting a season readout must FIRST give it a slow clock or quantize/hold it — do not add `seasonWord(year)`
  to the HUD and assume 144 unblocked it. The moon was shippable precisely because 135 had already re-clocked
  its field; the season has no such fix yet.
- **A HUD stat that mirrors an existing multi-reader field is free and safe.** `moonPhase()` was already the one
  shared predicate (draw disc, moonglade, `__moon()`, iter 135's "one predicate" law); the card is just a fifth
  reader of it, so it cannot drift from what's drawn — the night agent seeing card and disc agree is that law
  paying out. When adding a readout, wire it to the field the pixels already read, never a parallel computation.
- **A readout probe needs TWO clocks: a RUNNING one for cadence, a STEPPED one for correctness.** The strobe
  test (134) must play; the correctness sweep must freeze and step (`__setTime` by integer `dayT` = clean
  lunation-eighths, 135's trick). One probe, both — `probe-moonhud` runs the running-clock DOM read AND the
  frozen sweep. Reuse the shape for any future almanac/readout gate (a season word, a tide readout).

## Iteration 145 — the beach follows the sun (2026-07-11)

**Vector.** People & activity × **Deepen** (SHIPPED). Rotation named the domain — People was the single stalest
(last SHIP 127; 137 was Polish) — and the header steered HARD off Polish (143) and Interaction/UX (four of the
last six: 133/134/140/141/144) toward Deepen/Connect. People's Deepen cell is its fullest (last 119), and its
live-ped probe difficulty is documented (137), so I chose a Deepen that touches a DRAW, not the ped stepping:
the beach furniture.

**The seam.** The umbrella+towel draw on low-`c.v` BEACH cells (L3245) was ungated by time of day — it sat out
at 2am while the bonfire (L3234, `LITAMT>0.5`) burned beside it, so the beach had no daily rhythm of use. (The
kites already come down at night, crowds thin via `pedHidden`, kids go home by dark — the beach furniture was
the one People-activity surface with no day/night rhythm.)

**Change (~6 lines, draw-only).** Multiply the furniture's alpha by `ua=clamp((0.6-LITAMT)/0.25,0,1)` and skip
the draw when `ua<=0.02`: full at midday (LITAMT~0), fills in through the morning, fades by dusk (LITAMT>0.6) as
the bonfires take over. `LITAMT` rides the slow ~110s day-clock, so this is a rhythm, not a strobe (134's
cadence law: a fast-`year` gate would flicker). No tile, entity, rng(), tick() pass or terrain — pop provably
flat.

**Census.** PASS, exit 0. Tile histogram empty, all core metrics +0 (`greenRoofs -1` is the documented
roof-adoption headless wobble). Vacuous by construction — the probe is the gate.

**Probe.** `probes/probe-beachsun.mjs` (new, promoted). Build-vs-build isolation (patched vs `git show HEAD`) at
the SAME time of day, which separates the furniture from the day/night TINT (a within-build day-vs-night diff
would conflate them). Clears every live mover first (137's law) and freezes. seeds 7/42: **DAY control 0.01**
(ua=1 in both builds → beach identical, midday untouched) · **NIGHT 2.94** (patched draws no furniture, HEAD
does → the whole umbrella removed) · **ROAD control 0.017** (change confined to the beach). Night is ~300× the
day control — a decisive, clean separation. Selects umbrella cells by `c.v<0.08` (the draw gates on c.v, NOT
c.sand) and skips the esplanade.

**Visual.** Coast day/night pairs + whole-city wide, seeds 42 & 7, one agent each (108's discriminate-don't-
judge: "which frame has the umbrellas?"). Both **VISUAL: PASS** — both correctly located the colorful parasols
in the DAY frame and confirmed the NIGHT beach is bare dark sand (only pier-lamp/figure glows remain), no
z-order tears, no half-drawn/ghost parasols, no blowout; both wide frames balanced coastal cities, nothing
compounded.

**Verdict — SHIPPED.** The beach furniture now follows the sun — umbrellas fill in through the morning, peak at
midday, and are packed away by the time the evening bonfires are lit, giving the beach a daily rhythm of use to
match the kites, crowds and kids that already thin at night. Draw-only, pop provably flat, slow-clock-gated
(strobe-safe). People's Deepen cell gains its sixth (34, 64, 93, 104, 119, 145).

### Findings for later laps
- **A DRAW GATED ON `LITAMT` IS THE SAFE WAY TO GIVE PEOPLE A DAILY RHYTHM — it is the slow ~110s day-clock, not
  the fast `year`.** 134/135 established that `year` strobes; `LITAMT` (from `daylight(dayT)`) crosses its
  thresholds once per ~110s cycle, so a furniture/crowd draw gated on it fades in/out over minutes. Reuse the
  `ua=clamp((0.6-LITAMT)/0.25,0,1)` shape for any "present by day, gone by night" ornament (or invert for a
  night-only one, as the bonfire already does at `LITAMT>0.5`).
- **THE UMBRELLA GATES ON `c.v`, NOT `c.sand` — and `__find` only exposes `c.sand`.** A probe of beach furniture
  must select cells by `c.v` (iterate `cells` in-page), which `__find('BEACH').sand` will NOT give you; my first
  probe cut sampled the wrong cells and read pure noise. When a draw's condition uses a field `__find` doesn't
  return, replicate the cell scan in the evaluate block.
- **BUILD-VS-BUILD AT A FIXED CLOCK ISOLATES A DAY-ONLY DRAW-GATE FROM THE GLOBAL TINT.** A day-only feature
  can't be probed by a within-build day-vs-night diff (the whole frame's tint moves). Diffing patched-vs-HEAD at
  a FIXED time of day cancels the tint (both builds see it) and leaves only the gated draw — day≈0 proves the
  daytime no-op, night = the removed furniture. Clear live movers first or their inter-load drift swamps it (137).
- **People's beach surface now has a DAILY rhythm; its SEASONAL rhythm is still open (and a strobe trap).**
  Beaches are summer places — the furniture could also swell in summer / empty in winter — but that would gate a
  discrete visual on the fast `year` clock (134's strobe). It needs a slow seasonal clock first, exactly like the
  fenced-off HUD season word (144). Do not gate the umbrellas on `year`.

## Iteration 146 — the bus reads as a bus (2026-07-11)

**Vector.** Transport × **Polish** (SHIPPED). Rotation named the domain — Transport was the single stalest (last
138 = Connect) — and 138's findings + 118's law rule out a Transport New element (entities saturated:
cars/buses/emergency/bikes/trams/trucks, all richly lit; cabins/stations/trains already deepened) while its one
banked cue (128's MINSEP cabin-crossing) is explicitly low-value. 138 was Connect, so I varied off it to
**Polish** — Transport's stalest kind (last **94**) and globally fresh (last 143), exactly the header's steer
("Polish/Connect are fresh").

**The seam — the house-style-helper tell (137), one level up.** Every transit/utility vehicle has a
*kind-specific* draw block: the tram a cream belt + trolley pole (L5040), the truck a raised container box
(L5033), emergency vehicles their beacons/bars (L5022). The **bus** alone fell through to the generic vehicle
prism — a gold body stretched to `long=0.30` with the shared 55%-width glass cabin — so it read as *a long gold
car*, not a bus. (Buses are a real transit element: gold, spawned at 14%, and they pull into bus-stop shelters
and dwell — L2342.)

**Change (~7 lines, draw-only).** A `v.kind==='bus'` block beside the tram/truck ones: (1) a **raised roof**
prism (z 6.0→7.7, above a car's 6.6 cap) so the silhouette is *taller and boxier* — the strongest "reads as a
bus" signal, as the truck's container is; (2) a full-length **glass window strip** (`bandS`, z 3.9→6.0, warms at
night via `colLit(...LITAMT)`); (3) a **cream livery band** (`bandS`, z 2.5→3.3). `bandS` lays each on the
prism's own front faces, so they wrap the body in iso. No tile, entity array, `rng()`, `hashCell`, `tick()` pass
or terrain; strings pure-ASCII (134). Pop provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, all core metrics +0 (pop/roads/developed flat),
entity counts identical (cars 360 · trams 54 · trucks 59 …). Stream-neutral by construction — vacuous, the probe
is the gate.

**Probe.** `probes/probe-buslivery.mjs` (new, promoted). Buses drift nondeterministically over the road network
between loads (137's live-mover law), so a fixed-coord build-vs-build on live buses is hopeless — the probe
CLEARS every live mover and PLACES a fixed set of buses (target) + cars (control) at spread-out ROAD-cell
centres, all heading east, identical objects in both builds, clock frozen (109). Metric = fraction of body-box
pixels visibly changed (the livery is a band of large per-pixel change diluted by background, so changed-fraction
is the honest read). Patched vs pristine HEAD, seeds 7/42: **bus body 9.2% of pixels changed (mean |ΔRGB| 4.51)
· car control 0.11% changed** — an ~80× separation, so the redesign is real and confined to the bus kind (the
car draw is byte-identical). (An early flank-bands-only cut moved just 4% and read too subtle; the raised roof —
a silhouette change — is what made it read AND doubled the probe signal.)

**Visual.** Zoomed before/after placement (`shot-buslivery.mjs`: a bus beside a reference car, camera wheeled
in) + un-zoomed whole-city `wide` at seeds 42 & 7. Three agents, one each (108 discriminate-don't-judge: "which
is the bus, and is it taller/more bus-like than before?"). All **VISUAL: PASS** — the after-bus reads clearly as
a bus (taller boxy body, blue window strip, cream livery stripe) where before it was "a flat featureless
stretched gold box"; the reference car is unchanged; no z-order tears/floaters/mis-projection/blowout; both
whole-city frames balanced, coherent, nothing compounded.

**Verdict — SHIPPED.** The bus now reads as a bus — a taller boxy body with a window strip and cream livery —
joining the tram and truck in having a kind-specific silhouette, where before it was a stretched gold car.
Draw-only, pop provably flat, ~7 lines. Transport's Polish cell gains its next (U1, U3, 70, 85, 87, 94, 146).

### Findings for later laps
- **THE HOUSE-STYLE-HELPER TELL (137) HAS A SILHOUETTE SIBLING: grep who has a KIND-SPECIFIC draw block and who
  falls through to the generic.** 137 found the shadow gap by "who calls `shadS`?"; this lap found the bus by
  "which `v.kind` branches in `drawVehicle` and which doesn't." Tram/truck/emergency each branch; the bus and the
  plain car did not — and a *car* falling through is correct (it IS the generic), a *bus* is not. Next such gap:
  nothing distinguishes vehicle *colors* as fleet liveries, but that's cosmetic and low value.
- **A ~7px SPRITE READS BY SILHOUETTE FIRST, ORNAMENT SECOND — change the outline before the flank (reinforces
  133/137).** The flank-only bands moved just 4% of body pixels and both the probe and the eye read them as
  marginal; the raised roof (taller than a car's cap) is what made the bus unmistakable and pushed the probe to
  9.2%. When polishing a tiny sprite to read as a *category*, spend the first move on its height/outline vs its
  neighbours, not on surface detail.
- **A LIVE-VEHICLE DRAW CHANGE USES 137'S PLACED-SET PROBE, WITH A SISTER-KIND AS CONTROL.** Buses drift like
  peds, so place a fixed set; the clean control is a placed CAR at other cells (draw untouched → ~0), which also
  proves the edit is scoped to `v.kind==='bus'`. Changed-pixel fraction beats mean-|ΔRGB| for a banded ornament
  diluted by the background box.

## Iteration 147 — the ninth step-back finds a clean city, perf flat (2026-07-11) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/125/130/136/142/**147**). Not a domain × kind lap:
it reads the WHOLE city for *cumulative* drift the census and per-feature gates are blind to, runs the season
probe + interleaved perf gate, at night AND a season with the day/night baselines pinned OFF January
(`year=2035.62` dry peak; `2035.02` as the seasonal-contrast frame). No city vector taken, so rotation is
unchanged — next lap (148) owes the stalest domain, **Nature (139)**, then Civic (140).

**What was read.** Un-zoomed whole-city `wide` frames at **2 seeds × 3 lights/calendars** — seed 42 (warp 61) &
seed 7 (warp 31), each at {day 2035.62/t=0.35, night 2035.62/t=0.90, winter 2035.02/t=0.35}. One subagent per
seed read its own three frames: the cumulative question ("has anything compounded into clutter or darkness?")
plus 108's **locate-don't-judge** night test ("where is the core by light alone?").

**Result: the city is healthy — both agents VISUAL: PASS.**
- **Night core (115/143) LOCATED off-centre both seeds** — seed 42 ~(0.47,0.50), seed 7 ~(0.47,0.62) — matching
  142 ((.47,.53)/(.47,.62)) and 136, each with a genuine core→edge falloff to a dark rim, not a flat wash. 143's
  Gaussian CBD peak still reads as a *peak*.
- **138's arterial night-corridors** traced as *continuous* warm ribbons distinct from dim side streets, both
  seeds, unprompted — the ship reads nine iters on at whole-frame scale.
- **The sea reads** (116's bottom + 123's founded wind farm). **No z-order tears / floaters / hard seams /
  blown-out white** in any of the 6 frames. **Winter reads distinct** from summer (farm/scrub tan, cooler light)
  at both seeds.

**Season — measured alive.** `probes/probe-season.mjs`: FARM winter→dry-peak **88.4** (matches 130/136/142),
VINEYARD 44.6/36.7/42.7 (139's seasonal draw), ORCHARD/MEADOW/SHOREPARK all move, PARK/REDWOOD/GARDEN/QUAD
near-zero by design (120), ROAD control **0.5–2.2**. Calendar working; the whole-frame mildness is the
by-design evergreen/irrigated dilution.

**Perf — 143→146 cost ZERO; the stored-baseline night false-FAIL fired a FIFTH time.** `perf.mjs` vs stored
baseline read day **34.3** (+3.5%) / night **41.6** (+11%), the night looking like a regression. Interleaved
HEAD-146 vs the iter-142 file (`ce17d61`, A/B/A/B, min per variant): day **34.28 vs 34.83** (−1.6%, HEAD
faster) and night **41.61 vs 41.83** (−0.5%, flat) — both flat/faster, so 143 (CORESIG, computed once in
`genWorld`) + 144 (moon HUD, per-tick DOM) + 145 (beach furniture, night-gated OFF) + 146 (bus bands) added
nothing measurable. The 6-day-old iter-142 file itself reads 41.8ms night today (pinned era: 40.5), so the
+11% vs stored baseline is pure load. NOT re-pinned. Census PASS, vacuous (no source edit); tree verified clean
after the interleave restored HEAD.

**Change (the step-back's product — none to the city).** No compounding defect, so per 120/130/136/142 ("a
clean step-back is a complete iteration — don't force a filler vector") the output is the health record + header
refreshes: step-back pointer 147→152, perf note gains the 147 interleaved reading + the fifth false-FAIL, and
the `/bin/cp` interleave gotcha (below). No `solvista.html` edit.

**Verdict — FIXED.** No compounding city defect — the FOURTH clean step-back in a row (130, 136, 142, 147). All
accumulated visual laws (115/116/120/123 + 138 arterials + 143 CBD peak) still read at both seeds under all
three lights; the season is alive; perf is flat against the honest interleaved control.

### Findings
- **⚠ THE `cp` ALIAS IS `-i` IN THIS SHELL — the perf interleave MUST use `/bin/cp`, exactly as SKILL.md says,
  or every swap silently no-ops and you measure ONE file four times.** My first interleave printed "overwrite
  solvista.html? …not overwritten" on every pass; the A/B numbers were HEAD-vs-HEAD (day 34.6/34.78, night
  40.9/41.3, a ~1% noise floor) and looked deceptively "flat both ways." `/bin/cp -f` (the skill's exact
  prescription) fixed it. **If an interleave reads suspiciously flat, confirm the file actually changed** before
  trusting it — the no-op failure mode masquerades as a clean pass.
- **FIFTH CONSECUTIVE STORED-BASELINE NIGHT FALSE-FAIL (125→130→136→142→147).** The stored night baseline
  (37.33ms, pinned 2026-07-10 under that day's load) now reads +11% high on a diff the interleave proves costs
  nothing; the 6-day-old iter-142 file reads the same 41.8ms today. The gate's absolute night number is a
  reliable over-read; only the same-session interleave against an old commit is trustworthy. Re-pin only if an
  interleave *itself* shows a persistent offset (it has not since 142's real +2.2%).
- **142's +2.2% night did NOT compound — 143→146 added nothing on top of it.** The one real perf delta of this
  series (142, from 137+138's night draw) held flat through four more draw-touching iterations, so the night
  budget is stable (well inside the 30fps 47.7% headroom).


<!-- header-trim (iter 157): superseded cue moved out of the maintained header to stay under the 400-line budget -->
- **(l) CLOSED (iter 133)** — a hovered TILE wears a hex-outline focus ring (`probe-tilering`; detail archived).
  **Legibility law:** a thin hover stroke is INVISIBLE in a wide downscaled shot — re-shoot tight (2×/R55) first.

## Iteration 148 — the vineyard names its own season (2026-07-11) [Nature × Interaction/UX]

**Vector.** Nature × Interaction/UX — the stalest domain (last **139**), taking the finding the header
banked there: iter 139 gave VINEYARD a seasonal DRAW (bare canes → leaf → green berries → purple harvest,
via a shared `vinePhase()`), but `describeTile` never named it, so the tooltip's *"terraced"* was mute about
the calendar the pixels already keep. This is the tell (117/122/129) cashed an **eighth** time — a string that
asserts less than the code already knows — and the last frozen agriculture tooltip. A **banked, measured**
finding on the stalest domain outranks kind-rotation.

**The seam.** `vinePhase()` (L1112) already returns `dormant`/`bud`/`veraison`/`ripe` from `year`, read only by
`case T.VINEYARD` in the draw (L3589). The orchard's `Grove` row (L6130, iter 129) is the exact template — one
`describeTile` line that reads its own shared phase fn. `[T.VINEYARD]` *"terraced"* was the header's named
un-cashed string.

**Change (3 lines, tooltip-only).** A `Vines` row in `describeTile` beside the orchard's `Grove` row, reading
the shared `vinePhase()`: `dormant→Bare canes`, `bud→In leaf`, `veraison→Green fruit`, `ripe→Ripe for harvest` —
each word matched to what the trellis draws that phase. No tile, entity, `rng()`, `hashCell`, `tick()` pass or
terrain; strings pure-ASCII (134). Pop provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, all core metrics +0, entity counts identical
(cars 360 · trams 54 …). Vacuous by construction (a `describeTile` edit runs in no census metric) — the probe is
the gate.

**Probe.** `probes/probe-vinetip.mjs` (new, promoted). Per 122's law a tooltip claim is checked against
INDEPENDENTLY recomputed truth, not a screenshot: it recomputes the phase from `vinePhase`'s own window math (not
by calling it) and confirms every on-screen vineyard's `Vines` row at 4 keyframes × 3 seeds. **104/104 rows
match, 0 wrong.** Controls: **0** FARM and **0** ORCHARD tiles print a `Vines` row, and the orchard's own `Grove`
row still prints **72/72** — the row is confined to the vineyard and clobbers nothing. (The seasonal DRAW itself
was already gated by 139's `probe-vine`; what's new this lap is the string.)

**Visual.** `probes/shot-vinetip.mjs` (new) fires a REAL `mouse.move` over an on-screen vineyard so the
artifact's own handler builds the tooltip, clipped at two seasons. One agent read both: the `Vines` row reads
exactly *"Green fruit"* (dry peak) and *"Ripe for harvest"* (autumn), text sharp/legible, em dash correct, no
clipping/mojibake, no z-order or color defect. **VISUAL: PASS.** (No canvas draw changed, so the whole-city
frame is identical — the census proved the world byte-for-byte unchanged.)

**Verdict — SHIPPED.** The vineyard now tells the season it has painted since 139 — the last mute agriculture
tooltip is named. Draw-... tooltip-only, pop provably flat, 3 lines. Nature's Interaction/UX cell gains its next
(117, 129, **148**).

### Findings for later laps
- **THE ASSERTS-LESS-THAN-THE-CODE-KNOWS TELL IS NOW SPENT FOR AGRICULTURE.** 129 un-muted the orchard, 148 the
  vineyard; the header's remaining un-cashed vegetation strings are `[T.GARDEN]` (draw does NOT read `year` — needs
  a Deepen first, like 129/139 did for orchard/vine) and `[T.IND]` *"warehouses and light industry"* (not
  vegetation, no calendar to name). So the next Nature × Interaction/UX is NOT another agriculture row — it needs
  a new seam or a Deepen-then-name pair (GARDEN).
- **A `describeTile` STRING row needs NO whole-city visual and NO draw probe — only the string-truth probe + a
  hover shot.** The census is doubly vacuous (no metric, no draw), the whole-city frame is byte-identical, and
  the seasonal draw was already gated upstream (139). The one gate that can fail is the string vs recomputed
  windows, plus a hover shot that it renders. Don't re-run the interleaved perf/whole-city machinery for a
  pure-text tooltip row.


<!-- Header trim (iter 158): condensed the resolved night-core watch-item bullet from the maintained header. Full text preserved here. -->
The night-core-is-broad watch-item (136/142) is now CASHED (iter 143, Urban × Polish): a tight Gaussian bump (`CORESIG=5`) on the CBD turned the flat smoothstep plateau into a peak (probe-nightcore: seed-42 core→8-12 gap 0.152→0.307). Subtle-but-discriminable (both agents blind-picked the after-frame); a stronger read needs the window mix `0.35+0.65·c.lit` widened, not `c.lit` steepened further. (125 was the same shape — its product was the pin-off-January recipe fix.)

## Iteration 149 — the town clock tells the time (2026-07-11) [Civic & culture × Deepen]

**Vector.** Civic & culture × **Deepen** — Civic was the single stalest domain (last SHIP 140), and its most
reliable move (the asserts-more-than-it-shows tell) was cashed at 122/140 for tooltips. This lap runs the tell
in its **draw** form: the city hall's clock face is drawn with the comment *"the clock face the town sets its
watches by"*, yet its hands were **frozen** at a fixed ~12:15 — an ornament that claims to tell time while
sitting still. Kind varied off Civic's spent Interaction/UX (52/122/140) and off the globally-hot IUX run
(133/134/140/141/144) to **Deepen** (Civic's stalest kind, last 91). Same spirit as 135's moon: drive a frozen
ornament off the slow day clock.

**The seam.** The hall clock (L4456) drew two static line segments from the dial center. `dayT` (the day
counter, 0=midnight … .5=noon, ~110 s/cycle — the same slow clock 135 re-pinned the moon onto) is a global in
scope. The clock face is a fixed-radius overlay (`ctx.arc(...,3.4)` in world units, so it scales with the camera
but is ~2px at fit) — a zoom-reward detail like the police beacon / museum banner.

**Change (~8 lines, draw-only).** Replaced the two frozen hands with ONE hour hand on a 24h dial:
`clkA=(dayT-.5)·2π`; tip at `(sin clkA, -cos clkA)·2.0` — **straight up at noon, down at midnight, left in the
morning, right in the evening, so it turns with the sun** (and the moon, 135). Added a small fixed noon tick at
the top of the dial for orientation and an ink hub dot. Factored the dial center into `hallClockCtr(gx,gy,hb)`
so the draw and the new `__clock()` probe hook share ONE definition (112's one-predicate law). No tile, entity,
`rng()`, `hashCell`, `tick()` pass or terrain; no string literals (134 mojibake N/A). Pop provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, all core metrics +0, entity counts identical
(cars 360 · trams 54 …). Vacuous by construction (a draw reading a global runs in no census metric) — the probe
is the gate.

**Probe.** `probes/probe-hallclock.mjs` (new, promoted). Measures the hand's DIRECTION from pixels vs the day,
locate-don't-judge (108). A ~2px ink hand is swamped by the bright hall wall, so it **differences** each test
frame against a same-lighting reference (static wall/dome/hub/tick cancel; only the moving hand survives) and
takes the centroid of the ink that APPEARED — the hand's direction. It stays in the daytime lighting window
(dayT .15–.55, lit≈0) so lighting is constant across the measured arc, camera-zooms the dial to ~12px radius,
and **recomputes the expected angle itself** (never trusts `__clock().ang`). seeds 7/1234/88: at dayT
.20/.30/.40/.50 the observed hand angle matched dayT within **1–3°**, **monotonic**, control (dayT .5 twice)
pixel-identical. Halls found in 4 seeds (dead-code: dial at scale); seed 42 SKIP (its dial is occluded by a
front amphitheater knoll — a draw-order fact, not a bug); seeds 3/2024 have no standalone hall (became
parliament). Straight-down/right (midnight, evening) sit in fast-changing light → left to the visual gate.

**Visual.** `probes/shot-hallclock.mjs` (new) camera-zooms the dial and clips morning/noon/midnight. One agent,
blind locate task (108): it read the hand as **lower-left / up / down** respectively and correctly assigned
morning/noon/midnight — the three directions "clearly distinct", tick fixed at top. Whole-city `wide` at seeds
42 & 7, one agent each: both **VISUAL: PASS**, balanced coherent coast, no tears/floaters/blowout, nothing
compounded.

**Verdict — DEEPENED.** The town clock now tells the time of day on its 24h dial and agrees with the sun and
moon, where for the artifact's whole life it sat frozen. Draw-only, pop provably flat, ~8 lines + a shared
helper + a locator hook. Civic's Deepen cell gains its next (36, 59, 66, 80, 91, **149**).

### Findings for later laps
- **THE ASSERTS-MORE-THAN-IT-SHOWS TELL HAS A *DRAW* FORM, NOT JUST A TOOLTIP ONE (extends 117/122/129/148).**
  Those cashed strings that asserted what the code knew; here a *drawn ornament* (a clock) asserted a behavior
  (telling time) the draw ignored. Look for other ornaments whose COMMENT or shape promises motion/state they
  don't have. Candidates seen while grepping: the museum/parliament are floodlit but otherwise static; the
  aquarium fish pennant already waves (`time`); the firehouse bell is static. A frozen sundial/gauge/vane that
  should track a clock is the richest version.
- **A ~2px OVERLAY HAND IS MEASURED BY DIFF-CENTROID IN A CONSTANT-LIGHTING WINDOW, NOT A LUMINANCE RAY.** The
  first probe (darkest-ray from center) failed: the bright wall behind a thin dark hand swamps the ray. The fix
  is 109's cancel-the-static trick applied spatially — difference two frames whose ONLY difference is the hand
  (same lighting, clock frozen), and the centroid of "ink that appeared" is the hand. Keep to the daytime
  lit≈0 band (KEYS) so lighting doesn't recolor the face between frames.
- **CAMERA-SET BEATS MOUSE-WHEEL FOR ZOOMING A PROBE ONTO A FIXED POINT.** `page.mouse.wheel` drifts (clamp +
  cursor) and my zoom walked off the dial onto a neighbour's roof. Setting `zoom/scale/offX/offY` directly
  in-page (recovering world coords as `(sx-offX)/scale`) centers the target exactly. `__clock` returns SCREEN
  coords (`world·scale+offX`), like `__find` — `px()`/`ctr()` return WORLD coords and the city draw applies the
  `dpr·scale` transform, so a hook that forgets `·scale+offX` points at raw world pixels (my first bug).
- **SOME HALLS' DIALS ARE OCCLUDED (a front amphitheater/tall neighbour), and ~2/9 seeds have no standalone
  hall at all (it became parliament).** A per-feature probe on a one-per-city landmark must tolerate SKIPs and
  grade only the measurable instances (require ≥2), not FAIL on an occluded or absent one.

## Iteration 150 — the open sea catches the sun (2026-07-11) [Water & coast × Polish]

**Vector.** Water & coast × **Polish** — Water was the stalest domain (last SHIP 141), and the kind varied off
the recent Deepen/Interaction-UX run (146/149 + the hot IUX laps) to **Polish**, its own kind (last 132). This
is a fill-the-gap Polish, not a banked cue: by DAY the open sea — a third of the canvas — carried only a faint
uniform sparkle (one foam stroke on ~2/7 cells) and the beach surf. There was **no sun on the water**: the
midday ocean read as flat teal, while the night already has its warm city-light smear (L3057). The lesson
this closes is the coast's daytime blank, not the salted-pier cue (123, still banked).

**The seam.** `case T.WATER` draw (L3029). The existing daytime sparkle (L3031) and the night city-smear (L3057)
bracket the spot; I added a day-only layer between them. `dayT` (slow ~110 s day clock) and `LITAMT` (0 by day,
up at night) were already in scope, as was `colA('glint',...)` — the cool-white specular color, distinct from
warm `foam`.

**Change (draw-only, ~14 lines, added not replacing).** A `glit=(1-LITAMT)·max(0,1-|dayT-0.47|/0.30)` factor —
1 at noon, 0 before dusk, 0 all night — gates a shimmer layer over open water (`!c.riv`): slow cool bands drift
seaward (`sin((x·0.9+y·0.5)-waveT·0.55)`) and **lift the whole hex tone** with a translucent `hexTile` wash
(α≤0.16), with brighter sparkle strokes riding each band's crest. No tile, entity, `rng()`, `hashCell`, `tick()`
pass or terrain; strings pure-ASCII (134). Night is byte-unchanged (glit=0 → the block draws nothing); pop
provably flat.

**Two-pass tuning (logged per the counterweight).** The FIRST build used only 1px cool strokes (no wash). It
passed the census but **both visual agents, blind, reported the sea as "flat uniform teal — glitter not
visible"** — the contrast×width law (fine speckle averages to nothing at fit zoom). Strengthened to the
tone-lifting **sheet** (a full-hex wash reads at any zoom); both seeds then PASS. The weak version was never
shipped — reverted in-place before the sheet.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, all core metrics +0, entity counts identical
(cars 360 · trams 54 …). Vacuous by construction (a draw reading globals runs in no census metric) — the probe
is the gate.

**Probe.** `probes/probe-glitter.mjs` (new, promoted). Self-contained, no build-vs-build: freeze the clock AND
pin `waveT` to a constant (so foam/surf/sparkle cancel), render the SAME artifact at noon (glit=1) vs morning
(glit=0), and count pixels the noon frame pushed toward cool white (min-channel +≥12) over the OPEN-SEA box vs
an inland LAND box. seeds 7/42/1234: **sea = 43520 / 43306 / 42122** (mean **42983**), **land control = 7 / 5 /
6** (mean **6**). The morning frame draws no glitter by construction (glit=0), so that ~7000:1 ratio is the
day-only sheet, confined to the sea. (An earlier build-vs-build probe read dirty controls — two page loads
differ in `waveT` and Math.random entities — which is why the self-contained same-build, pinned-`waveT` diff is
the honest form; see findings.)

**Visual.** Coast + whole-city `wide` at seeds 42 & 7, one agent each: both **VISUAL: PASS** — cool shimmer /
brighter drifting bands "clearly perceptible as sunlit water," "not milky / not blown-out / not a film," no
z-order tears or floaters, the frame still a balanced coastal city. (The first, faint build's two FAILs are
logged above.)

**Verdict — SHIPPED.** The daytime open sea now catches the sun — a cool shimmer sheet that peaks at noon and
fades to nothing by dusk, handing off cleanly to the night's warm city smear. Draw-only, day-only, pop provably
flat. Water's Polish cell gains its next (U2, 44, 58, 79, 116, 132, **150**).

### Findings for later laps
- **A FINE-SPECKLE OCEAN EFFECT IS INVISIBLE AT FIT ZOOM — LIFT THE TILE TONE INSTEAD (contrast×width, again).**
  1px cool strokes on ~2/5 of sea cells read as "flat teal" to two blind agents; a translucent full-hex `hexTile`
  wash (a tone lift) reads at any zoom because it has area, not sub-pixel width. For a broad water/sky field,
  reach for a tone wash first and let sparkle strokes ride ON it, not instead of it.
- **A BUILD-vs-BUILD SEA PROBE IS CONFOUNDED; USE SAME-BUILD, PINNED-`waveT`, TWO-CLOCK DIFF.** Diffing patched
  vs pristine across two page loads gave controls of 300–560 (not ~0) because the two loads froze at different
  `waveT` (foam/surf animate with it) and spawned different Math.random entities (boats/surfers). Fix: measure
  ONE build, set `waveT` to a constant in-page, and diff two clock states whose only real difference is the
  feature's own gate (here glit at noon vs morning) — controls dropped to ~6. `waveT` is an assignable global,
  so a probe can pin it exactly like `playing=false` pins the clock.
- **A DAY-ONLY LIGHTING LAYER GATED BY `(1-LITAMT)·<midday bump>` COSTS THE NIGHT NOTHING AND HOLDS THE MEAN
  over a full day** (iter 98's law): it only ever *adds* brightness, and only by day, so the night frame is
  byte-identical (glit=0) and the sea's tone returns to base by dusk. This is the clean template for "the sun
  does X to the sea/sky" without a permanent tone drift.

## Iteration 151 — the block grows its own corner shop (2026-07-11) [Urban fabric × New CA rule]

**Vector.** Urban fabric × **New CA rule** — Urban was the single stalest domain (last SHIP 143), 118's law
forbids a New element there (additive inventory surveyed spent), and the header steered the kind: vary off
Polish (150) and Deepen (149), *"Connect/New-CA fresh."* The content came from the banked reach-field seam
(*"nothing sites itself against `rShop`/`rGreen`/`rServ` — a derived field earns its keep when a RULE reads
it"*): a rule keyed to shop-distance. The city has no **neighbourhood retail** — a house too deep in the
fabric to reach a shop had nowhere to buy milk; the walkable stat measured the gap (rShop) but nothing filled it.

**The seam, and the recount trap.** `recount()` populates `rShop` (r3 to COM/MARKET, L2086) but is **NOT called
inside the per-tick sim loop** (L6342) — only at init/warp/manual — so `rShop` is *stale during `tick()`* and a
tick-rule can't read it without a per-tick `recount()` (the reason the seam sat banked). The fresh equivalent
is **local**: `countAround(x,y,r, COM||MARKET)`. Shops saturate >90% (the U5 note), so a full r3 desert is rare
(2–5/city); I used **r2** ("no shop within a short walk") for coverage (8–9 mid-century).

**Change (~14-line tick pass + ~13-line draw + 3-line tooltip).** A house on a built-up block (`≥3 DEV`
neighbours) with **no COM/MARKET within 2** opens a store on its ground floor: `c.corner=true`. It **stays
`T.RES`** — mixed-use, exactly like the `c.loft`/`c.solar`/`c.groof` flag idiom — so *no tile type changes*.
The decision is `hashCell`-gated (no `rng()`), and `c.corner` is read only by the draw + tooltip, never by an
rng()-gated pass, so both **setting AND clearing** it are stream-neutral. The pass **re-validates**: a store is
absorbed (`c.corner=false`) once the growing city plants a real shop within 2, so *"in a retail gap"* holds at
every tick, not just at placement. One store per gap falls out of the fixed-order live-mutating pass (first
qualifier vetoes any other within 2). The RES draw grafts a storefront on the road face with the COM draw's own
helpers (`bandR` glass, `slotS` door, `awnS` awning) sized to the RES body, a **green grocer's awning** ('sage')
to mark it apart, and a night-lit fascia. `describeTile` titles it *"Corner shop"*.

**A `RES→COM` conversion was tried FIRST and REVERTED.** The obvious form — flip the house to `T.COM` — passed
the census but the tile histogram swung hard (TOWER **−32**, MID **+33**, FOREST/MEADOW −13, …): changing `c.t`
flips which branch of the **fire** pass (`RES||COM && age>26 && rng()<…`) and the **upgrade** pass runs, changing
their `rng()` **call counts** and reshuffling the whole downstream stream — even though the *decision* used
`hashCell`. The flag-on-RES form moves the histogram by **nothing** (all core +0, empty histogram). See findings.

**Census.** PASS, exit 0, pageerrors 0. Fully vacuous — every core metric **+0**, tile histogram **empty**,
entity counts identical. Stream-neutral AND pop-neutral by construction (no `c.t` change).

**Probe** `probes/probe-cornershop.mjs` (new, promoted). Per 122's law it checks placement against truth
**recomputed independently in Node** (its own odd-r cube hex-distance, not the page's `countAround`): every
corner shop's nearest real COM/MARKET is **> 2** hexes (control: `nearShop` must be 0), no two corners within 2
(spacing), all title *"Corner shop"* with **0** false hits over 200 plain-RES, none before the rule's 1990 start,
and identical count+positions on reload (determinism). **3/3 seeds PASS:** 2035 counts 5/5/4, all in a gap, min
pair 3–7, naming 5/5·5/5·4/4, plain false-hits 0. Caught two real bugs on the way: the first `RES→COM` build
(histogram swing) and encroachment — an early r3 non-revalidating form let the growing city plant a COM beside an
old corner (seed 42: 2 of 4 within 3), fixed by the re-validating clear.

**Visual.** `probes/shot-cornershop.mjs` (new) camera-zooms onto a corner shop (found via `__find('RES')` filtered
by `c.corner`) day + night, clipped against the plain terraces; plus whole-city `wide` at seeds 42 & 7. One agent
per seed, locate-don't-judge (108): **both VISUAL: PASS** — the green-awning glass storefront reads clearly as a
small shop grafted onto a house, distinct from the plain pitched-roof terraces, awning projecting to the street
(grounded on its hex, not stabbing a neighbour), night storefront lit; no z-order tears/floaters/blowout; both
whole-city frames balanced and coherent. Both noted the night fascia is lit-but-not-strongly-emissive — a minor
legibility nuance, not a fault (over-brightening one hex risks a blown dot).

**Verdict — SHIPPED.** The city grows its own neighbourhood retail: a house in a shop desert opens a corner
store on its ground floor, and it's absorbed when the shops reach it — a living urban process, guaranteed clean
(stream + pop neutral). Urban's `New CA rule` cell gains its next (7, 23, ~~82~~, **151**); Urban is no longer
stalest. `rShop` per se stays banked (I read a local r2 twin, not `rShop`), but the *shape* — a rule keyed to
shop-distance — is now cashed.

### Findings for later laps
- **A TYPE CHANGE (`c.t=…`) IS NEVER STREAM-NEUTRAL, EVEN WITH A `hashCell` DECISION — a FLAG on the existing
  tile is.** The reshuffle isn't from *your* pass calling `rng()`; it's that flipping `c.t` changes which
  rng()-gated BRANCH a *later* pass takes (the fire pass keys on `RES||COM`, the upgrade pass branches by type),
  so their `rng()` **call counts** shift and the downstream stream reshuffles. The file's own idiom
  (`c.loft`/`c.solar`/`c.groof`) is the escape: set a boolean on a tile whose type never changes, read it only in
  the draw/tooltip, and the census is vacuous. Reach for a flag before a conversion whenever the feature can be
  mixed-use rather than a demolition.
- **A REACH FIELD (`rShop`/`rGreen`/`rServ`) IS STALE INSIDE `tick()` — `recount()` runs only at init/warp/manual,
  never in the sim loop.** A tick-rule that wants "distance to nearest X" must recompute it LOCALLY
  (`countAround`), or pay a per-tick `recount()` (~1ms × hundreds of warp ticks). This is *why* the "nothing sites
  itself against the reach fields" seam sat banked — the fields aren't available where a rule would read them. The
  local `countAround` twin is the practical substitute; note it's your chosen radius, not necessarily rShop's 3.
- **A RE-VALIDATING FLAG PASS KEEPS ITS OWN INVARIANT TRUE FOREVER, which lets the probe's control stay strict.**
  Because setting *and clearing* `c.corner` are both stream-neutral, the pass can clear the flag when the world
  grows past the condition (a shop reaches within 2 → the store is absorbed). So "every corner sits in a gap"
  holds at 2035, not just at placement — the encroachment bug (a persistent flag the city outgrows) simply cannot
  occur, and the probe can assert the clean control on final state. Do this for any flag whose siting condition
  the evolving city can later violate.

## Iteration 152 — the tenth step-back finds a clean city, perf flat (2026-07-11) [holistic step-back]

**Vector.** Holistic **step-back** (the mandated 152 in the 105/110/115/120/125/130/136/142/147/**152** cadence)
— not a domain lap. Read the WHOLE city at 2 seeds × 3 lights/calendars for cumulative drift the census can't
see (clutter, darkness, z-order tears, floaters, blowout, a dead calendar), plus the interleaved perf gate.

**Frames.** seeds 42 & 7, each at day (`t=0.35`) / night (`t=0.9`) / winter (`t=0.35,year=2035.02`), day &
night PINNED off January at `year=2035.62` (the dry peak) so the baseline frames sit at a different calendar
point than the winter-contrast frame (the 125 trap). `wide` whole-city, un-zoomed.

**Census / seasons.** Regression census PASS (exit 0, 0 pageerrors, every metric flat — no edit this iter).
`probe-season`: seasons alive — FARM winter→dry-peak **88.4**, VINEYARD moving (44.6/36.7/42.7 — 139 holds),
ORCHARD 25/18/41, FOREST/PARK/SHOREPARK all shifting, ROAD control ~0.5–2.2. The calendar is not frozen.

**Perf (interleaved, run alone).** HEAD (146+151) vs iter-142 control `ce17d61`, A/B/A/B ×3, min per variant:
day **35.0 vs 34.33 (+2.0%)**, night **41.22 vs 41.44 (−0.5%)** — both flat/within noise. **143→151 cost ~zero.**
(As the five prior step-backs found, `perf.mjs` vs the STORED baseline over-reads night as load; the
interleave-against-an-old-commit is the honest grade, and the baseline stays UN-re-pinned so the gate can't be
blinded by today's load.)

**Visual (one agent per seed, locate-don't-judge).** BOTH **VISUAL: PASS**. Both seeds read as balanced,
legible coastal cities in all three frames — dense-but-legible core, clean beach/water transition, river,
parks/farms giving the eye rest; no z-order tears, floaters, seams, or blown-out/oversaturated color in any
frame; night dim-not-murky. Agents LOCATED the night core by light alone: seed 42 **(0.47, 0.55)**, seed 7
**(0.44, 0.62)** — matching 147's (.47,.50)/(.47,.62) and 143's CBD Gaussian peak; the lighting model holds.
Both saw a real day↔winter vegetation tone shift (muted olive/tan tilled fields & canopy in winter vs saturated
dry-season greens) — the calendar reads visually, not just in the probe.

**Verdict — no city change (clean bill).** The **fifth consecutive clean holistic step-back** (130/136/142/147/152
all found NO compounding city defect). No watch-item survives: the night-core-broad item was cashed at 143
(`CORESIG`), seasons measured alive, perf flat, sea/arterial-corridor reads hold (116/123/138). Per the skill,
a step-back that finds no defect ships nothing — logging the clean bill IS the outcome. **153 owes the stalest
domain (Sky, last 144 — Deepen/Fix only, the SEASON word still needs a slow clock first), then People (145),
then Nature (148).**

## Iteration 153 — the stars fade under a full moon (2026-07-11) [Sky & atmosphere × Deepen]

**Vector.** Sky & atmosphere × **Deepen** (SHIPPED). Rotation named the domain — Sky was the single stalest (last
144) — and the header's standing fence rules out its additive/CA cells (traps) and its one banked move (the
SEASON word, still needs a slow clock, do not re-ship 134). So a Deepen that adds no element: an *interconnect*
between two mature Sky systems that never talked. **Probed the seam first (119's law):** the night star field
(render, ~L5491) faded only with `LITAMT` and **completely ignored `MOONF`** — `probe-starmoon` measured
`corr(starLum, MOONF)=0.000` across a 12-sample moon-phase sweep at a fixed night. Astronomically wrong: a
bright full moon washes all but the brightest stars out; a new moon reveals the field.

**Change (~10 lines, draw-only, stream-neutral).** (1) Gave each `STARS` entry a 4th field — an intrinsic
magnitude (`Math.random()`, at module load; touches no seeded `rng()`) — so moonlight thins the FAINT stars
first. (2) In the draw, multiply each star's alpha by `starWash = 1−0.62·MOONF` and by `(0.6+0.8·mg)` (mean
1.0). `MOONF` is the moon's own lit fraction, already computed at L5486 and read by the disc, the moonglade and
the moon HUD — this is **another reader of the one predicate** (144's law), so the stars cannot drift from the
moon that's drawn. The `(0.6+0.8·mg)` mean-1.0 spread keeps the **new-moon** field at its old average
brightness, so the well-vetted dark-night look is unchanged and only *thins* as the moon fills. No tile, entity,
`rng()`, `tick()` pass or terrain — pop provably flat; no `ENTINFO`/census-hook change (stars aren't a hover
entity). Per-frame cost: 70 stars × two extra multiplies — nil.

**Census.** PASS, exit 0. Draw-only, stream-neutral — tile histogram empty, core metrics flat (life/transport
wobble is the documented chaotic-CA headless noise). Vacuous by construction; the probe is the gate.

**Probe — `probes/probe-starmoon.mjs` (new, promoted).** A moon-phase SWEEP at a FIXED time of day: `daylight`
reads `dayT mod 1` so sweeping `dayT=k+0.90` (k=0..11, deep night) holds the sky, `LITAMT` and the frozen
twinkle IDENTICAL and varies ONLY the moon (`moonPhase` reads raw `dayT/8`). Result: **HEAD `corr(star,MOONF)`
= 0.000** (the defect) → **patched −0.99 / −0.87** (seed 7 / 42; bright moon dims the field). **Ground control**
(city-core patch, lit by `LITAMT` not the moon) `corr = 0.000` both builds — the change is confined to the sky.

**Visual.** New-moon vs full-moon night wide frames per seed (found the extremal `t` per seed via `__moon().illum`:
s42 NEW t=7.90 / FULL t=3.90; s7 NEW t=4.90 / FULL t=0.90), one agent each, asked to DISCRIMINATE which frame has
the richer star field (108's locate-don't-judge). **2/2 chose the NEW-moon frame** (seed 42 blind), matching the
intended effect; both confirmed no z-order tears / floating tiles / blown-out colour anywhere, both whole frames
balanced night coastal cities. Seed 7 noted the effect is "very subtle at this zoom" — expected (143's
pixel-vs-field magnitude law + the wide downscale), directionally correct and artifact-free.

**Verdict — SHIPPED.** The diorama's night sky is now internally consistent: the same `MOONF` that fills the disc
and lights the moonglade now washes the stars out, so a full-moon night reads pale and sparse while a new moon is
brilliant. Draw-only, stream-neutral, pop flat, another reader of the moon predicate. Sky's Deepen cell gains its
seventh (19, 35, 50, 57, 95, 135, **153**); Sky is no longer stalest (People 145 now is).

### Findings for later laps
- **`MOONF` IS NOW A FOUR-READER FIELD — reuse it, don't re-derive.** The moon's lit fraction feeds the disc, the
  moonglade, the moon HUD (144) and now the star wash. Anything that should respond to moonlight (a future
  night-sky-glow, a moonlit-water tweak, dimmer aurora) should read `MOONF` at L5486, not recompute a phase.
- **THE MOON-PHASE SWEEP-AT-FIXED-NIGHT is the probe shape for any moon-driven feature.** `daylight` reads
  `dayT mod 1` but `moonPhase` reads raw `dayT/8`, so `dayT=k+0.90` (integer k) holds time-of-day/`LITAMT`
  IDENTICAL and sweeps ONLY the moon — a clean control for isolating a moon response from the day cycle.
  `probe-starmoon` does it; reuse it. (And to shoot a matched new-vs-full pair, the extremal `t` is per-seed —
  the phase carries a `seedNum` offset — so query `__moon().illum` over k=0..7 to pick them, don't assume `t=0.9`
  is any particular phase.)
- **Sky's SEASON word is STILL the only banked Sky move and STILL fenced.** This Deepen was a moon↔stars
  interconnect, NOT the season readout. The season word still reads the fast `year` (strobes ~0.7 Hz, 134) and
  needs a slow clock or quantize/hold FIRST. Sky's additive/CA cells remain traps; the next Sky lap wanting a
  *new* interconnect should look for another mature-but-disconnected pair, as this did.

## Iteration 154 — the resident tells you what they're up to (2026-07-11) [People & activity × Interaction/UX]

**Vector.** People & activity × **Interaction/UX** (SHIPPED). Rotation named the domain (People was stalest,
last 145) and this is its *coldest* kind — only iter 71 sat in the People × Interaction/UX cell. Varied the kind
off 153's Deepen. The seam is the loop's most reliable tell (117): the Resident's `ENTINFO` sub was a flat
`'Out for a stroll.'` while `stepPed` **already** sorts peds by context — onto the pier, hugging a lively kerb,
drawn to a high-`buzz` hex — a relationship the tooltip ignored.

**Change (~20 lines, tooltip-only).** New `residentDoing(p)` reads the hex the ped stands on and returns the
phrase for it, a FUNCTION sub in the 105 style: pier → *"Out on the pier for the view."*; then by tile —
MARKET *"Browsing the market stalls."*, PARK/SHOREPARK *"Out for a walk in the green."*, GARDEN *"Pottering in
the community garden."*, PLAZA/QUAD *"Crossing the square."*, BEACH/DUNE *"Down on the sand."*, STADIUM, FIELD;
then a road → `livelyKerb` *"Window-shopping the busy street."* vs plain *"Walking the block."*; fallback
*"Out for a stroll."* Every position a ped can legally hold is `strollable` open ground or a road (`pedWalk`),
so the cases tile the field. The leashed **dog** heels to its owner's hex, so its sub echoes the owner —
*"With its owner, out for a walk in the green."* (stray falls back to *"Off to sniff everything."*). Reuses the
existing `onPier`/`cellAt`/`pedRoad`/`livelyKerb` predicates — no new state, no seeded `rng()`, no draw.

**Census.** PASS, exit 0. Tooltip-only — tile histogram empty, all core/aggregate metrics +0 (vacuous by
construction; the probe is the gate).

**Probe — `probes/probe-strolling.mjs` (new, promoted).** `residentDoing` is a PURE function of position, so the
probe enumerates EVERY cell as a hypothetical ped, buckets cells by the phrase the PAGE returns, and checks each
bucket against the RAW `cells[].t` (122's law — not by re-calling the function). Seeds 7 & 42 @ warp 61:
**every tile bucket holds ONLY its intended type** (`Down on the sand.` = {BEACH,DUNE}, `…green.` = {PARK,SHOREPARK},
etc. — zero leakage), pier bucket **all onPier** (5–6 cells), road split **all** `pedRoad` with the busy bucket
(106/118 cells) **all** `livelyKerb`. **CONTROL:** 1060+ building interiors (RES/MID/TOWER/COM/IND) → the
fallback and NOTHING else, so the mapping doesn't leak onto tiles a ped only passes. Deterministic across two
loads. **PROBE PASS both seeds.**

**Visual.** `hovershot.mjs ZOOM=4 PICK=front` on a Resident: seed 42 rendered *"Window-shopping the busy street."*,
seed 7 *"Browsing the market stalls."* — `pageerrors: none`, no mojibake (the strings are pure-ASCII per iter 134;
em dashes live only in comments). One agent read both seeds' hover PNGs: tooltip legible, cream card on-frame, no
z-order tears/blowout, scene still a coherent coastal city — **VISUAL: PASS**. Owned-dog echo verified in-page:
*"With its owner, out for a walk in the green."*

**Verdict — SHIPPED.** The peds that fill the streets now answer when you point at one: a figure on a market hex
says it's browsing the stalls, one on a shop-lined kerb is window-shopping, one on the pier is out for the view.
Tooltip-only, pop provably flat, reuses five existing predicates. People × Interaction/UX gains its second (71,
**154**); People is no longer stalest (Transport 146 now is).

### Findings for later laps
- **The mute-tooltip tell now pays for ENTITIES too, not just tiles (117 was tiles).** `stepPed`'s own context
  sorting (pier/kerb/buzz/tile) was richer than the one static string that named it — the same shape as a
  `TILEDESC` asserting less than the CA knows. **Where else does an ENTITY's step/draw logic decide something its
  `ENTINFO` sub keeps flat?** Candidates still flat: `Jogger` ('Logging shoreline miles.' — it knows its
  shoreline `y`/direction), `Cyclist`, `Streetcar`/`Delivery truck` (a route/depot membership, like 105 did for
  transit). The functional-sub (105) + shared-predicate (144) recipe applies to each.
- **A PURE position→string function is probeable by ENUMERATION, no live entity needed.** Because `residentDoing`
  reads only `p.x/p.y`, the probe swept ALL cells as hypothetical peds and audited the phrase→tile partition —
  sidestepping 137's "peds are non-reproducible across loads" entirely. Any tooltip that is a pure function of an
  entity's *cell* (not its motion phase) can be gated this way: bucket-by-phrase, check against raw `cells[].t`,
  plus a control tile-class that must hit the fallback.
- **`residentDoing(p)` is now the one definition of "what is this ped doing" (144's one-predicate law).** The dog
  echo, the tooltip and the probe all call it; a future "peds thin at night" or crowd-label vector should read it,
  not re-classify position. It maps EVERY strollable/road hex, so it is also a ready oracle for "is this ped
  somewhere interesting."

## Iteration 155 — the streetcar draws from an overhead wire (2026-07-11) [Transport × Deepen]

**Vector.** Transport × **Deepen** (SHIPPED). Rotation named the domain — Transport was the single stalest (last
146) — and 118's law + 138's findings rule out a Transport New element (entities saturated). Varied the kind off
146 (Polish) / 154 (the recent IUX run) to **Deepen**, running the loop's most reliable move in its **draw** form
(149's law): an ornament that asserts a relationship the draw ignores. The tram's comment (L5134) called its
trolley pole *"a slim trolley pole to the overhead"* — but there **was no overhead.** The pole drew from
`cy-6.6` to a lone contact dot at `(cx+1.3, cy-9.4)`, poking at empty air. Same shape as 149's frozen clock:
the streetcar claimed to be an electric rail vehicle drawing power from a catenary, and drew none.

**The seam.** `drawVehicle`'s `v.kind==='tram'` block (L5133). `A=ctr(v.x,v.y)`, `B=ctr(v.nx,v.ny)` (the A->B
segment the tram is traversing), `L`, `lane` are all in scope at the top of `drawVehicle` (L5077-5079), so the
overhead wire can be strung the length of the block at the SAME lane offset, raised a fixed height.

**Change (~8 lines, draw-only).** Replaced the leaning pole+dot with (1) a **contact wire** from `A` to `B`,
lane-shifted and raised `wh=9.6` (`ctx.moveTo(A[0]+lox,A[1]+loy-wh)…lineTo(B[0]+lox,B[1]+loy-wh)`) — because
`cx=lerp(A,B,p)-ddy/L*lane` and `cy=lerp+ddx/L*lane*0.6`, the wire point directly above the tram is exactly
`(cx,cy-wh)`, so the wire spans the ROAD (holds still as the tram slides under it), not the car; (2) a **vertical
pantograph** from the roof `(cx,cy-6.6)` straight up to `(cx,cy-wh)`; (3) the contact shoe dot at `(cx,cy-wh)`.
Kept the cream livery belt. No tile, entity, `rng()`, `hashCell`, `tick()` pass or terrain; strings pure-ASCII
(134, comment only). Pop provably flat, stream-neutral.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, core metrics +0 (`towerHt +1` is the documented
chaotic-CA headless wobble), entity counts identical (trams 54 · cars 360 …). Vacuous by construction — the
probe is the gate.

**Probe — `probes/probe-tramwire.mjs` (new, promoted).** Trams drift nondeterministically over the road network
between loads (137's law), so it CLEARS **every** mover (clouds/birds/balloons spawn via `Math.random` and would
put a noise floor on a whole-frame diff — see findings) and PLACES 120 trams (target) then 120 cars (control) at
spread ROAD centres, all east, frozen clock+`waveT` (109). Metric = **whole-frame** changed-pixel fraction
patched-vs-pristine-HEAD (in a frozen frame the only difference IS the wires, so no per-vehicle box / unit
juggling). seeds 7/42: **tram-set 0.21% of frame changed** vs **car control 0.004%** — a ~50x separation,
confined to the tram kind (the car draw is byte-identical). **PASS.**

**Visual.** `probes/shot-tramwire.mjs` (new) places a run of trams on a **clear avenue** (front-of-frame, open
ground/water in front so nothing occludes the overhead), camera-zooms, clips day + night. First shot placed the
trams in a **tower canyon** and an agent correctly FAILED it (front-row towers buried the trams AND the wire,
leaving pantograph nubs poking at air — see findings); the fair clear-avenue re-shoot then PASSED: a fresh agent
read the wire as *"a single thin dark wire … unbroken across the full avenue … poles rise from the tram roofs and
meet it"*, plausible catenary, no z-order tears/clipping/blowout, present day and night. Whole-city `wide` at
seeds 42 & 7, one agent each: both **VISUAL: PASS** — balanced coherent coastal cities, nothing compounded (the
wire is sub-pixel and invisible at fit zoom, so it adds no clutter there).

**Verdict — DEEPENED.** The streetcar now draws power from an overhead contact wire strung over its avenue, where
for the artifact's whole life its pole poked at empty air — it reads as an electric tram, joining the moon (135),
the clock (149) and the vineyard (148/139) in the run of ornaments that now honor what they always claimed.
Draw-only, stream-neutral, pop flat, ~8 lines. Transport's Deepen cell gains its next (28, 39, 55, 63, 112, 121,
128, **155**); Transport is no longer stalest (Nature 148 now is).

### Findings for later laps
- **THE ASSERTS-MORE-THAN-IT-SHOWS *DRAW* TELL (149) PAID AGAIN — grep vehicle/ornament COMMENTS for a claimed
  connection the geometry omits.** 149 found the frozen clock by its comment; this lap found the tram by *"pole to
  the overhead"* over an overhead that wasn't drawn. Candidates still open (149's list): the firehouse bell is
  static; museum/parliament are floodlit but otherwise inert. A pole/mast/gauge that *should* touch something is
  the richest version.
- **A LOW OVERHEAD ELEMENT IS OCCLUDED BY FRONT-ROW BUILDINGS — that is physically correct, but it means a
  tower-canyon zoom can show a bare pantograph nub.** The wire draws in the tram's bucket (after its own two
  cells' buildings, L5608) so it is correct against those, but nearer ROWS (drawn later, L5600) legitimately
  overpaint it — so in dense downtown the wire hides behind the front towers (as real catenary would) and only the
  nub pokes above. Unlike the monorail (drawn per-cell at `RAILH`, well above rooftops), the tram wire is at
  street level and inherently occludable. Accepted as realistic; a shot MUST choose a clear avenue (open ground in
  front) to judge it fairly, or it reads as broken nubs. **When shooting a low overhead detail, pick a
  front-of-frame cell with open ground/water behind and in front — never a tower canyon.**
- **A WHOLE-FRAME PATCHED-vs-HEAD DIFF NEEDS EVERY `Math.random` MOVER CLEARED, not just the seeded ones.** My
  first cut cleared vehicles/peds/etc. but left clouds/birds/balloons, which spawn via `Math.random` at load and
  differ between the two page loads — a 0.15% whole-frame noise floor that swamped the ~0.2% wire signal. Clearing
  **all** movers dropped the control to 0.004% (pure render nondeterminism) and the ~50x separation appeared. For
  any whole-frame two-load diff, clear the full entity list (the `[a,b,…].forEach(a=>a.length=0)` block), not a
  subset. (The per-box metric in `probe-buslivery` sidesteps this by only sampling the vehicle body; a whole-frame
  metric cannot.)
- **`CW` IS A WORLD UNIT; `sx/sy` FROM `__find` ARE SCREEN px — do not mix them in a getImageData box.** My first
  probe built the sample box as `0.7*CW*dpr` wide (world) but `(sy-12)…(sy-6.5)` tall (screen), so the box was the
  wrong size and read ~0 signal. The whole-frame diff dodges the unit problem entirely and is the more robust
  shape for a thin draw-only ornament whose exact pixels are hard to box.

## Iteration 156 — the woods flower in spring (2026-07-11) [Nature × New element]

**Vector.** Nature & landscape × **New element** (SHIPPED). Rotation named the domain — Nature was the single
stalest (last 148) — and 155's entry passed it the baton. Kind: varied off Nature's worn Deepen (139/120/108)
and its now-spent agriculture Interaction/UX (148); **New element** is Nature's stalest kind (last **102**) and
fresh. Content followed **127's law** (saturation is of a domain's *entities*, not its *surfaces*): FOREST is a
large untouched surface — **69 hexes/city** vs GARDEN's 2 and MEADOW's 2-6 — and its floor drew nothing but
`grassDk` + scrub. Meanwhile the MEADOW's lovely wildflower-bloom aesthetic (specks + butterflies, iter 49) is
stranded on those 2-6 tiles where nobody sees it. So: a spring wildflower understory on the woodland floor —
botanically the ephemerals that bloom in the brief window after the thaw and **before the canopy closes over
them** (the same `s≈0.28` spring the palette already greens the canopy on).

**The seam.** `case T.FOREST` (L3331) drew the floor as one `grassDk` fill; `applySeason` (L314) already computes
a `spring` factor from `year` but only fed it to the canopy palette. I added a shared `springBloom()` (L1113,
next to `orchardPhase`/`vinePhase`) = `clamp(1-|s-0.28|/0.17,0,1)` — ONE predicate the draw and the tooltip both
read (112's law), so the flowers cannot claim a season the floor doesn't paint.

**Change (~10-line draw + 1-line tooltip + 1 helper, all draw-only).** In the FOREST draw, right after the base
hexTile and **before** the trees (so the canopy overlays the floor), a `springBloom()>0.06`-gated block scatters
3-5 wildflower specks per hex — `hashCell(x,y,seedNum^SALT)` for count and positions (spaced salts 0x5B/0x5C/0x5D),
colors `lav`/`gold`/`white` (static, not season-touched, so they keep their hue), alpha `0.30+0.55·spf`. A
matching `describeTile` row (`['Understory','Spring wildflowers']` when `springBloom()>0.4`) keeps the tooltip in
sync. No tile, entity, `rng()`, `tick()` pass or terrain; strings pure-ASCII (134). Fully stream-neutral (hashCell
only) and pop-neutral.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, all core metrics +0 (`pop +4` is documented
chaotic-CA headless wobble), entity counts identical. Vacuous by construction — the probe is the gate.

**Probe — `probes/probe-woodbloom.mjs` (new, promoted).** Isolates the flowers from the canopy's OWN seasonal
palette shift by diffing **patched vs pristine HEAD at the SAME frozen spring frame** — the only difference
between the two builds is the wildflower block (per-pixel changed fraction, |ΔRGB|>18, over each FOREST hex's 7×7
box). Clears EVERY mover first (tramwire's law — else Math.random cars/peds drift over the ROAD control between
loads). seeds 7/42: **FOREST changed 10.95% / 11.30% in SPRING → 0.00% / 0.00% in SUMMER** (spf=0, byte-identical),
**ROAD control 0.04-0.16%** both frames. So the understory appears only in spring and only on forest — a ~55×
separation within the one tile type, and zero leakage onto roads.

**Visual.** `probes/shot-woodbloom.mjs` (new) camera-zooms a dense forest patch, clipping spring vs summer; plus
whole-city `wide` at seeds 42 & 7 (spring). Three agents, one each, discriminate-don't-judge (108). Zoom agent:
SPRING has the lavender/gold/white specks on the forest floor between/under the trees (not floating, not bleeding
onto the neighbouring meadow hex), SUMMER floor plain — **VISUAL: PASS**. Both whole-city agents: balanced
coherent coastal city, no z-order tears/floaters/blowout, forest/green reads as calm sage/olive with **no** speckle
or noise at fit zoom (the understory is correctly sub-pixel there) — **VISUAL: PASS** both.

**Verdict — SHIPPED.** The woods now flower in spring — a wildflower understory carpets the forest floor before
the canopy closes and fades by summer, lifting a 69-hex surface that drew nothing but a green fill, and finally
giving the MEADOW's stranded bloom aesthetic a stage the whole city can see. Draw-only, stream + pop neutral, one
shared predicate. Nature's New element cell gains its next (4, 26, 29, 102, **156**); Nature is no longer stalest
(Civic 149 now is).

### Findings for later laps
- **127'S "SURFACE, NOT ENTITIES" LAW PAYS AGAIN — pick the domain's BIGGEST tile count for a New element.** The
  census tile histogram is the map: seed 42 forest=69, park=205, but garden=2, meadow=2-6. A within-hex ornament
  buys pixels in proportion to the tile's COUNT, so a New element aimed at a 2-tile type (GARDEN, which the header
  kept banking) is nearly invisible whatever you draw; the same effort on FOREST (69) lights the whole woodland.
  **Read the histogram before choosing which surface to decorate.**
- **A SEASON-GATED DRAW IS PROBED patched-vs-pristine AT ONE FROZEN SEASON, not season-vs-season.** The confound is
  that the base palette ALSO shifts with season (the canopy greens/golds), so a plain spring-vs-summer FOREST diff
  moves even with no flowers. Diffing the two BUILDS at the same spring frame cancels the palette shift entirely —
  the only difference is your block. The summer patched-vs-pristine diff (=0) is then the clean confinement control,
  and it's stronger than ROAD because it's the SAME tile type proving your gate is off out of season.
- **`springBloom()` JOINS `orchardPhase`/`vinePhase` AS A SHARED YEAR-PREDICATE — reuse it, don't re-clamp.**
  Anything else that should key on the spring window (a future MEADOW green-up, blossom drifts, spring bird return)
  should read it, so the draw and any tooltip cannot drift. It reads the FAST `year` (development clock), which is
  fine for a CONTINUOUS alpha (drift tolerated, like `applySeason`), but a DISCRETE spring/not-spring readout off it
  would strobe (134) — quantize or slow-clock first, exactly as the banked SEASON word still needs.

## Iteration 157 — the eleventh step-back finds a clean city, perf flat (2026-07-11) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/125/130/136/142/147/152/**157**). Not a domain × kind
lap: it reads the WHOLE city for *cumulative* drift the census and per-feature gates are blind to, runs the season
probe + interleaved perf gate, at night AND a season with the day/night baselines pinned OFF January
(`year=2035.62` dry peak; `2035.02` as the seasonal-contrast frame). No city vector taken, so rotation is
unchanged — the next lap (158) owes the stalest domain, **Civic (149)**, then Water (150).

**What was read.** Un-zoomed whole-city `wide` frames at **2 seeds × 3 lights/calendars** — seed 42 (warp 61) &
seed 7 (warp 31), each at {day 2035.62/t=0.35, night 2035.62/t=0.90, winter 2035.02/t=0.35}. One subagent per
seed read its own three frames: the cumulative question ("has anything compounded into clutter or darkness?")
plus 108's **locate-don't-judge** night test ("where is the core by light alone?").

**Result: the city is healthy — both agents VISUAL: PASS.**
- **Night core (115/143) LOCATED off-centre both seeds** — seed 42 ~(0.48,0.52), seed 7 ~(0.48,0.60) — matching
  152 ((.47,.55)/(.44,.62)), 147 and 142, each with a genuine core→edge falloff to a dark rim, not a flat wash.
  Both agents also named a secondary lit lobe (42 ~(.42,.38), 7 ~(.42,.48)) — the old-town crossroads reading
  distinct from the CBD, as intended.
- **138's arterial night-corridors** read as *continuous* warm ribbons distinct from dim side streets both seeds;
  the sea reads (116's bottom + 123's founded wind farm). **No z-order tears / floaters / hard seams /
  blown-out white** in any of the 6 frames. **Winter reads distinct** from summer (farm/scrub tan/dormant, cooler
  flatter light, cooler ocean) at both seeds — the mildest of the three deltas, by-design (120's dilution).

**Season — measured alive.** `probes/probe-season.mjs`: FARM winter→dry-peak **88.4** (matches 130/136/142/147/152),
VINEYARD 44.6/36.7/42.7 (139), **FOREST now 20.6/19.7/24.6** (156's spring understory + canopy shift both read),
ORCHARD/MEADOW/SHOREPARK all move, PARK/REDWOOD/GARDEN/QUAD near-zero by design (120), ROAD control **0.5–2.2**.
Calendar working; the whole-frame mildness is the by-design evergreen/irrigated dilution.

**Perf — 152→156 cost ZERO; the stored-baseline read fired its SIXTH+ false-FAIL.** `perf.mjs` vs stored baseline
read day **+30%** / night **+39%**, looking like a regression. Interleaved HEAD-156 vs the iter-152 file
(`be84b49`, A/B/A/B, **min per variant**): day **37.66 vs 36.39** (**+3.5%**, inside the ±9ms round-to-round noise
floor the day column swung across — 43.2/37.7 for the same HEAD bytes) and night **42.83 vs 42.66** (**+0.4%,
flat**). So 153 (per-star magnitude, night-only draw) + 154 (tooltip-only) + 155 (tram catenary, day+night stroke)
+ 156 (spring understory, OFF at the perf frame's ~January year) added nothing measurable. NOT re-pinned. Census
PASS, vacuous (no source edit); tree verified clean after the interleave restored HEAD.

**Change (the step-back's product — none to the city).** No compounding defect, so per 120/130/136/142/147/152 ("a
clean step-back is a complete iteration — don't force a filler vector") the output is the health record + header
refreshes: step-back pointer 152→157 (next 162), the sixth clean bill, and the 157 interleaved perf reading. No
`solvista.html` edit.

**Verdict — FIXED.** No compounding city defect — the SIXTH clean step-back in a row (130, 136, 142, 147, 152,
157). All accumulated visual laws (115/116/120/123 + 138 arterials + 143 CBD peak) still read at both seeds under
all three lights; the season is alive (156's understory now shows in the FOREST column); perf is flat against the
honest interleaved control.

### Findings
- **SIXTH CONSECUTIVE CLEAN STEP-BACK, and the stored-baseline false-FAIL is now habitual — trust ONLY the
  interleave.** The stored baseline (day 33.16 / night 37.33, pinned 2026-07-10) read +30% day / +39% night on a
  diff the interleave proves free; the 5-day-old iter-152 file reads the same inflated numbers today. Re-pin only
  if an interleave *itself* shows a persistent offset (it has not since 142's real +2.2%).
- **THE DAY COLUMN IS NOISIER THAN NIGHT ON THIS BOX — grade day only by the min-of-≥2-rounds interleave.** Round 1
  read the identical HEAD bytes at 43.2ms day and round 2 at 37.7ms (a 15% swing from load alone), so a single-round
  day delta is meaningless; night was steady (42.8/42.9). Take at least two rounds and the min per variant, exactly
  as the skill says — a one-round day number will invent a regression or hide one.
- **156's spring understory correctly reads ZERO perf at the standard perf frame** (year 2035 ≈ January, bloom
  gate off) yet MOVES the season probe's FOREST column (spring 20.6) — the two gates see it at different calendars,
  which is the intended design (season-gated draws are free out of season). Don't read "perf flat" as "the feature
  isn't drawing"; read the probe at the season the gate is on.

## Iteration 158 — the observatory dome opens and turns with the night sky (2026-07-11) [Civic & culture × Deepen]

**Vector.** Civic & culture × **Deepen** (SHIPPED). Rotation named the domain — after the 157 step-back the lap
owed the stalest domain, **Civic** (last SHIP 149). Kind stayed Deepen (149's own cell) because 149 explicitly
*banked* the seam: the asserts-more-than-it-shows tell has a **draw** form, and 149's richest banked candidate was
*"a frozen sundial/gauge/vane that should track a clock."* The observatory is exactly that — and it feeds Sky by
deepening Civic toward it (108's law, "Sky can be fed by deepening another domain"). A banked, named finding
outranks kind-rotation (the header's own law), so Deepen it is; content varies from 149 (a clock hand) and 155/153
(tram/stars).

**The seam.** `case 'observatory'` (L4650) drew the teal dome with a **slit at a FIXED azimuth** — `sd` (a per-city
hashCell) flipped which side it sat, but it never moved through the night — while its own `CIVICDESC` promised
*"A dome out on the dark rim of the city, open to the night."* A real observatory dome **rotates** to keep a target
in the aperture and is buttoned up by day. The observatory is one-per-city, sited from 2018 (present in the 2035
census slices) — a zoom-reward landmark like the hall clock (149), not dead code (census tile histogram confirms 1/city).

**Change (~13 lines, draw-only).** Replaced the static slit with an aperture whose azimuth reads the slow day clock
(`dayT`, the same one the hall clock (149) and moon (135) read): `nd = dayT>0.5?dayT-1:dayT` (signed offset from
midnight), `phi = clamp(nd*4.887,-1.4,1.4)*openAmt*sd`. So the slit points at the **zenith (straight up) at midnight**
and leans toward the east/west horizons through dusk and dawn — and at midnight it looks UP while the 149 clock hand
points DOWN, complementary readers of one clock. `openAmt = clamp((LITAMT-0.15)/0.45,0,1)` gates the aperture
open after dark and shut by day (thin seam → wide bright glowing slit); the instrument glow rides the open slit.
`sd` kept as per-city handedness. No tile, entity, `rng()`, `hashCell` spawn, `tick()` pass or terrain; strings
pure-ASCII (134). Stream + pop provably flat. Added a test-only `__obs()` locator hook (dome center/radius on
screen + `sd`/`openAmt`/`phi`), mirroring `__clock` (149).

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, all core metrics +0, entity counts identical
(`greenRoofs +1` is documented chaotic-CA wobble). Vacuous by construction (a draw reading globals) — the probe is
the gate.

**Probe — `probes/probe-obsdome.mjs` (new, promoted).** Zooms the camera onto the dome (149: camera-set beats
wheel) and measures the aperture from pixels, locate-don't-judge (108); recomputes the expected sweep itself, never
gates on `__obs().phi`. Two measurements: **azimuth** = centroid of near-white slit ink (L>235 — clean at night,
when the dome is dark); **open/shut** = local contrast `p95−median` in the aperture band (lighting-robust, unlike
absolute luminance which daylight confounds — my first cut read noon "brighter" than midnight). seeds 7/42/1234/3/88,
all with an observatory: at 5 night dayT the slit azimuth sweeps **monotonic** and **midnight sits at the zenith
(−1°)** — seed 42 (sd=1) −39°→−20°→−1°→+8°→+12°, seed 3 (sd=−1) mirrors it +38°→…→−13°; aperture **open at midnight
(contrast 156) vs shut at noon (70)**; control (a night frame twice) pixel-identical. **VERDICT: PASS (5 seeds).**

**Visual.** `probes/shot-obsdome.mjs` (new) camera-zooms the dome at dusk/midnight/dawn/noon, 2 seeds. One agent,
blind locate (108): midnight slit **UP** both seeds; dusk vs dawn lean to **opposite sides** (mirrored between seeds
by `sd`, as designed); noon aperture a faint shut sliver vs the vivid midnight glow; dome seated on its drum, proper
z-order (a front tower correctly occludes) — **VISUAL: PASS**. Whole-city `wide` night (seed 42) + day (seed 7),
one agent each: both balanced coherent coast, lit core → dark rim, no tears/floaters/blowout, nothing compounded —
**VISUAL: PASS** both.

**Verdict — DEEPENED.** The observatory dome now opens after dark and rotates to track the night sky, where for the
artifact's whole life its slit sat frozen — finally honoring the `CIVICDESC` that always called it "open to the
night." Draw-only, stream + pop flat, ~13 lines + a locator hook + a probe + a shot script. Civic's Deepen cell
gains its next (36, 59, 66, 80, 91, 149, **158**); Civic is no longer stalest (Water 150 now is).

### Findings for later laps
- **149'S DRAW-TELL PAYS AGAIN — its banked candidate list is a to-do list.** 149 named the seam ("a frozen
  vane/gauge/dome that should track a clock") AND named the candidates; 158 just cashed the richest one. Still
  banked from 149: the **firehouse bell** (static gold disc — but no natural clock tie, weaker) and the
  **museum/parliament** floodlights. The observatory was the strongest because its own tooltip already asserted the
  behavior ("open to the night"). Where else does a DRAWN ornament's comment/shape promise motion the draw ignores?
- **OPEN/SHUT IS MEASURED BY LOCAL CONTRAST (peak−median), NOT ABSOLUTE LUMINANCE — daylight confounds the latter.**
  My first probe counted pixels over a fixed luminance threshold and read NOON as *more* open than midnight, because
  the whole daylit dome exceeds the threshold. The fix: within the aperture band, `p95−median` — a bright slit on a
  dark night dome gives high contrast; a shut seam on a uniformly-lit day dome gives low contrast — regardless of
  ambient light. Absolute-threshold centroid is still fine for the AZIMUTH *at night* (dome dark, only the slit is
  near-white). Two metrics, two lighting regimes: contrast for open/shut across day↔night, luminance-centroid for
  direction within the night.
- **A SWEEP THAT PIVOTS ON `dayT>0.5?dayT-1:dayT` IS SYMMETRIC IN CODE BUT NOT IN THE OPEN WINDOW.** The aperture is
  full-open by dusk (dayT 0.90 → openAmt 1.0) but drops fast on the dawn side (dayT 0.10 → 0.21), so a naive
  symmetric ±0.10 night sample set put one frame outside the open window (ink=0). Pick night probe samples by
  checking `openAmt`, not by assuming the dusk/dawn edges are mirror images — the daylight model isn't.

## Iteration 159 — the surf glows at night (2026-07-11) [Water & coast × Deepen]

**Vector.** Water & coast × **Deepen** (SHIPPED). Rotation named the domain — after the 158 Civic ship the lap
owed the stalest domain, **Water** (last SHIP 150). Kind varied off Water's worn Polish (150/132/116) and its
recent IUX (141) to **Deepen**, enriching the existing surf-break draw with a genuinely new night phenomenon —
and, like 135 (moon) / 153 (stars) / 158 (observatory), feeding the night-mood theme by deepening a domain toward
Sky (108's law). Content: **bioluminescence** — the breaking surf phosphoresces a cool sea-green after dark, the
Water counterpart to the run of night features the last laps built.

**The seam.** `case T.WATER`'s surf-break block (L3126) already strokes foam along every beach-facing hex edge with
a traveling opacity wave `ph=sin(waveT*1.6-(y+dy*0.5)*0.9)` and an inset `ins`. Its per-edge vertices `a`/`b`,
inset direction `ix`/`iy`, and `ph` are all in scope — the exact host for a night glow that breaks where the wave
breaks.

**Change (~18 lines, draw-only).** A `LITAMT>0.5`-gated block after each foam stroke scatters up to 3 **soft
glowing dots** along the break, each `hashCell(...,seedNum^0x0B10)`-gated (skip if `hb<0.45`) so most slots are
empty and the glow reads as **sparse sparks, not a line**. Each dot: a wide faint halo arc + a small bright centre,
both a **deep saturated sea-green** raw literal (`rgba(66,220,164)` / `rgba(110,238,188)` — emitted light, so
untinted by the blue night TINT, like the warm city-light smear above; low red channel so overlaps stay green, not
white). Strength = `dphi·(LITAMT-0.5)/0.5·(0.55+0.45·hb)`. No tile, entity, `rng()`, `tick()` pass or terrain;
strings pure-ASCII (134). Stream + pop provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, core metrics +0, entity counts identical. Vacuous
by construction (a night-only draw at the day census frame draws nothing) — the probe is the gate.

**Probe — `probes/probe-biolum.mjs` (new, promoted).** Diffs PATCHED vs pristine HEAD at the SAME frozen frame
(waveT pinned to 12.3, every mover cleared per tramwire's law), sampling the water hexes that touch a beach hex
(the surf hosts, found in-page) with ROAD as the zero control. seeds 7/42: **SURF changed 0.24% / 0.51% at NIGHT →
0.00% / 0.00% in DAY** (gate off → byte-identical), **ROAD control ~0** both frames. So the glow appears only at
night and only on the surf line. **PASS.**

**Visual.** `probes/shot-biolum.mjs` (new; takes seed/warp/**scale**) camera-zooms a front-of-frame beach that
touches open water, clipping night + a day control. **This vector cost SIX tuning rounds** — see findings; the
short version is that a per-edge *stroke* reads as a continuous neon tube on straight coasts however dim, and a
pale aqua blows to near-white where adjacent hexes' strokes stack. The design that finally passed is **scattered
soft DOTS in a deep sea-green**. At a moderate ~4.3x zoom (the scale a user actually looks at the coast) both seeds
read as soft, tasteful, patchy phosphorescence on the waterline, no blowout: seed 42 & seed 7 one agent each,
both **VISUAL: PASS**. Whole-city `wide` night (seed 42): balanced coherent coast, lit core → dark rim, the sparks
correctly sub-pixel/no clutter at fit zoom, no tears/floaters/blowout — **VISUAL: PASS**.

**Verdict — DEEPENED.** The breaking surf now sparkles with bioluminescence after dark, a new night life for the
coastline that for the artifact's whole life went dark at the waterline — the Water entry in the run of night
features (moon 135, stars 153, observatory 158). Draw-only, stream + pop flat. Water's Deepen cell gains its next
(17, 25, 51, 65, 72, 113, 123, **159**); Water is no longer stalest (Urban 151 now is).

### Findings for later laps
- **A GLOWING LINE ALONG A HEX EDGE READS AS A NEON TUBE; A GLOWING DOT READS AS A SPARK. For a night ornament on
  the faceted coast, draw DOTS not strokes.** Four straight agent reads FAILed the stroke forms ("uniform neon tube
  tracing the hex edges", "blown-out near-white cores") across every brightness and patchiness I tried; switching
  to sparse hash-gated dots passed both seeds on the first try. A per-edge stroke on a straight coast joins with its
  neighbours into a continuous bright outline that exposes the hex geometry — no alpha low enough to fix it stays
  visible. Dots can't form a line, so they never trace the geometry. **When a per-edge draw keeps reading as an
  outline, stop tuning its brightness and change its SHAPE to points.**
- **EMITTED LIGHT THAT STACKS MUST HAVE A LOW RED CHANNEL, OR IT BLOWS TO WHITE.** A pale aqua (`rgba(178,255,228)`,
  R=178) over dark water goes near-white where two strokes overlap (additive coverage → the light stroke colour). A
  deep sea-green (R=66) stays green at any coverage because the red channel never climbs. For any additive glow that
  can overlap itself (coast corners, dense edges), pick the colour by its **darkest** channel, not its hue.
- **THE "GOOD WINDOW" OF A SUBTLE COAST DETAIL IS A MODERATE ZOOM, NOT FIT AND NOT EXTREME.** At fit zoom the glow is
  correctly invisible (adds nothing, clutters nothing — whole-city PASS); at a punishing 7x the closest corner hexes
  stack into bright bars; at ~4x (the natural "look at the coast" zoom) it reads as intended. Judge a coast ornament
  at the zoom a user would actually use to see the coast — `shot-biolum.mjs` now takes a `scale` arg for exactly
  this. A 7x FAIL on a feature that's clean at fit and lovely at 4x is the zoom being unfair, not the feature.
- **`probe-biolum` re-confirms tramwire's law and adds one:** clear EVERY mover before a whole-frame two-load diff,
  AND if you dim a feature to fix a look, re-run the probe — a deep-green + low-alpha pass dropped seed 7's night
  signal to 0.05% (below its own ROAD noise) before I raised it back; a look-fix can silently kill the measurement.

## Iteration 160 — terraced row houses don't fit a hex city (2026-07-11) [Urban fabric × Connect]

**Vector.** Urban fabric × **Connect** (EXPLORED → REVERTED). Rotation named the stalest domain, **Urban**
(last SHIP 151); the kind chose **Connect** (Urban's under-used cell — 47, 109) deliberately to break both the
hot **Deepen** streak (155/158/159) and the five-iteration **night** run — a daytime fabric feature.

**Idea.** Extend 109's celebrated MID "street wall" — adjacent walk-ups grow their body into the E-W gap to form
a continuous terrace at ZERO extra fills (grow the body, don't add a prism) — to **RES**: a modest inner house
(v<0.55, so below the pool/palm bands) whose EAST neighbour is also a modest RES grows east (jx 0.20, ab 0.30→0.50)
so their party walls butt into a terraced row, the pitched roof kept per-house so the roofline stays countable.
Shared `resTerrace(c,x,y)` predicate (one definition, read by both the draw and a new `__terr` locator), keyed on
the EAST cell's hash so both sides agree; draw-only (hashCell, no rng()/terrain).

**What passed.** Census PASS (draw-only, vacuous — greenRoofs +1 chaotic wobble). `probe-terrace.mjs` (patched vs
pristine HEAD, frozen day frame, movers cleared) confirmed the MECHANISM works on the pairs that exist: terraced
pairs FILL 46–53% of the party-wall gap strip, control (rejected candidates) ~0.4–0.6% — 2/2 seeds. The join is
correct; it just has almost nothing to join.

**Why REVERTED — the host doesn't exist at scale.** City-wide count (seeds 7/42/1234): RES = 275/299/301, but only
**37/43/49 have an E-W RES neighbour at all**, of which **5/5/11 terrace, and ZERO seeds form a run of ≥3 houses.**
RES on this hex grid is predominantly **detached** — houses sit one-per-hex separated by roads and gaps, so there
is no dense E-W residential fabric to weave (unlike MID, which clusters along arterials, which is exactly why 109
worked there). The zoomed shot showed the second, deeper reason: **RES bodies are HEX PRISMS filling a hex tile**,
so "grow east 0.20" merely widens a hexagon — it never reads as the rectangular shared-wall terrace the mechanism
assumes. Net effect: a handful of invisible, isolated joined pairs, not a connected street. A passing census + a
passing probe, correctly overturned by the "does it read city-wide" bar.

**Verdict — EXPLORED → REVERTED.** `solvista.html` byte-identical to HEAD (`git checkout`); the `resTerrace`
helper, the `__terr` hook, `probe-terrace.mjs`, and `shot-terrace.mjs` all removed. Urban's Connect cell is
*attempted* (~~160~~), not filled; last real Urban ship is still 109.

### Findings for later laps
- **CHECK HOST ADJACENCY, NOT JUST HOST COUNT, BEFORE A CONNECT VECTOR (the dead-code-renders-zero law's adjacency
  corollary, 30/107).** The census tile histogram said RES≈290 — abundant — but a "join your neighbour" feature
  needs the neighbours to BE adjacent at scale, and only ~15% of RES have an E-W RES neighbour, 0% in runs of 3+.
  A Connect that weaves a fabric needs that fabric to be woven-able: measure adjacency (a 10-line `__terr`-style
  count) BEFORE designing, the same discipline as censusing a host tile before wiring to it.
- **109'S STREET-WALL TRICK IS MID-SPECIFIC, NOT A GENERAL RES/COM MOVE.** It works because MID clusters densely
  along arterials AND is a flat-topped rectangular block whose bodies genuinely butt. RES is neither (detached,
  hex-prism-roofed). Don't re-try RES terracing; the answer is a measured no.
- **Urban × Connect remains genuinely open (last real ship 109).** A future attempt should target a fabric that IS
  dense and linear — e.g. a continuous shopfront canopy/arcade along a COM high street (`c.hstr` from iter 118
  already marks retail runs) — but only after measuring that COM clusters E-W in runs, which RES does not.

## Iteration 161 — cloud bellies catch the golden hour (2026-07-11) [Sky & atmosphere × Deepen]

**Vector.** Sky × Deepen. Sky was the stalest domain (last vector 153) and its additive/CA cells are traps
(surveyed 103; sky isn't cellular). The clouds are richly deepened (rain shafts, wet trails, rainbows, drifting
shade) but the puffs themselves are drawn **pure white regardless of the light** — at dawn/dusk the warm horizon
that colours the whole sky never touches them. That is the classic golden-hour tell: a low sun lights cloud
**undersides** warm while the tops stay bright. A draw-only Deepen that adds no element and reads the light the
rest of the scene already reads.

**Change.** In the cloud loop (render, ~L5758) compute once per frame `cwarm=clamp((skyBot.R-skyBot.B-70)/70,0,1)`
from `dl.skyBot` — the horizon colour is orange at dawn/dusk (R≫B), pale at noon, cool-purple at night, so `R-B`
picks out the low-sun glow **and nothing else** (noon and night both give cwarm≈0). The two lower ("belly") puffs
of a **fair** cloud are then filled toward `skyBot` by `cwarm*0.55` instead of white; the top crown puff and rain
clouds (grey belly) are untouched. Pure draw-only: no terrain, no `rng()`, no new entity — pop/stream neutral.

**Census.** PASS, vacuous as expected — every metric +0, tile histogram empty (draw-only). Regression guard only.

**Probe.** `probes/probe-cloudwarm.mjs` — build-vs-build **sky-band diff** (patched vs pristine HEAD, same seed,
`playing=false`, same frozen `dayT`). The two builds run identical code except the belly tint, so any pixel that
differs IS a belly pixel; a residual is that the pre-freeze load drifts entities slightly differently per load, but
**drift is directionally balanced (warm px ≈ cool px) while the tint shifts pixels consistently WARM**, so the
discriminators are directional. Result over seeds 7/42/1234: **dusk mean Δ(R-B) +11.6, warm px 4095 ≫ cool px 1401**
(≈3:1); **noon control mean +1.2, warm 1394 ≈ cool 1340** (drift only). The tint is warm-only and dusk-only.
(Getting here cost two dead ends the probe file documents: a world→screen box missed the belly puffs — they sit at
`cx±14s`, either side of a naive centre box — and a whole-frame count control was polluted by ground-traffic drift;
a **loud-red belly** test confirmed the draw renders correctly and it was the *sampling* that was wrong. Law below.)

**Visual.** Two dusk seeds, whole-city. **Seed 42 PASS** — belly reads clearly peach/gold under a whiter top,
"natural golden-hour underlighting, not dirt"; the one grey cloud stays grey (by design); no tears/floaters/blowout.
**Seed 7** an agent FAILed as "cool grey bellies" — but the visible clouds there sit HIGH against the *cool* upper
sky (skyTop), so the real, measured warm shift (probe: seed 7 was the *strongest*, +18.2) composites over a cool
base and reads neutral-grey rather than gold. A moderate-zoom crop confirmed: gentle, non-garish, present but subtle
where the ambient sky is cool. The effect is by-design mild — a golden-hour touch, not a repaint.

**Verdict — DEEPENED.** Sky reads the light on one more surface; draw-only, pop/stream-neutral, probe-gated.

### Findings for later laps
- **CLOUD BELLIES ARE THE SEAM: puffs were painted a fixed white while the sky around them was fully lit.** Look for
  other *emissive/reflective* draws that ignore `dl`/`TINT` — anything drawn with a hardcoded `rgb(...)` in the sky
  or on water that should catch dawn/dusk. `dl.skyBot` is the ready-made "how warm is the horizon right now" signal:
  `clamp((R-B-70)/70,0,1)` is a reusable golden-hour gate (0 at noon AND night, peak at dawn/dusk).
- **A build-vs-build pixel probe that LOCATES by boxing world→screen coords will fight the camera transform and the
  puff geometry; a WHOLE/BAND DIFF locates by construction** — the only pixels that can differ ARE your change, so
  diff finds them. When the diff is polluted by pre-freeze entity drift, don't chase determinism: **drift is
  directionally balanced, a directional signal (warm-vs-cool split, or signed mean) separates cleanly.** And when a
  subtle draw-change reads as zero in a probe, force it LOUD (pure red) first to prove the draw path before trusting
  the sampler (cost me two dead ends this lap).
- **A physically-plausible ambient effect will read differently by where its host sits** — the same warm belly is
  gold over a warm sky (seed 42) and neutral-grey over a cool upper sky (seed 7). That is correct, not a bug; the
  probe (not the agent) is the verdict for "did the warmth apply." Don't crank the strength to force every cloud
  gold — seed 42's agent already warned the current strength is at the "natural, not dirty" edge.

## Iteration 162 — the twelfth step-back finds a clean city, perf flat (2026-07-11) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/125/130/136/142/147/152/157/**162**). Not a domain ×
kind lap: it reads the WHOLE city for *cumulative* drift the census and per-feature gates are blind to, runs the
season probe + interleaved perf gate, at night AND a season with the day/night baselines pinned OFF January
(`year=2035.62` dry peak; `2035.02` as the seasonal-contrast frame). No city vector taken, so rotation is
unchanged — the next lap (163) owes the stalest domain, **People (154)**, then Transport (155).

**What was read.** Un-zoomed whole-city `wide` frames at **2 seeds × 3 lights/calendars** — seed 42 (warp 61) &
seed 7 (warp 31), each at {day 2035.62/t=0.35, night 2035.62/t=0.90, winter 2035.02/t=0.35}. One subagent per
seed read its own three frames: the cumulative question ("has anything compounded into clutter or darkness?")
plus 108's **locate-don't-judge** night test ("where is the core by light alone?").

**Result: the city is healthy — both agents VISUAL: PASS.**
- **Night core (115/143) LOCATED off-centre both seeds** — seed 42 ~(0.48,0.53) (agent range x0.45–0.52,
  y0.45–0.62), seed 7 ~(0.45,0.62) — matching 157 ((.48,.52)/(.48,.60)), 152, 147, each with a genuine
  core→edge falloff to a dark rim, not a flat wash. Both agents named a secondary lit lobe too (42's river
  pocket ~(.44,.78) + a north cluster ~(.42,.22); 7's north cluster ~(.55,.23) + the lit pier ~(.85,.55)).
- **158's observatory, 159's surf biolum and 161's warm cloud bellies all sit correctly** in the whole frame;
  138's arterial night-corridors read as continuous warm ribbons distinct from dim side streets both seeds; the
  sea reads (116's bottom + 123's founded wind farm). **No z-order tears / floaters / hard seams / blown-out
  white** in any of the 6 frames. **Winter reads distinct** from summer at both seeds (cooler/duller vegetation,
  cooler flatter light, cooler ocean) — mildest of the three deltas at seed 42, clearer at seed 7, by-design
  (120's evergreen/irrigated dilution).

**Season — measured alive.** `probes/probe-season.mjs`: FARM winter→dry-peak **88.4** (matches
130/136/142/147/152/157), VINEYARD 44.6/36.7/42.7 (139), FOREST 20.1/19.5/24.4 (156's spring understory + canopy
shift both read), ORCHARD 25.3/17.8/41.4, MEADOW/SHOREPARK all move, PARK/REDWOOD/GARDEN/QUAD near-zero by design
(120), ROAD control **0.5–2.1**. Calendar working; the whole-frame mildness is the by-design dilution, not a dead
calendar.

**Perf — 157→161 cost ~ZERO; the stored-baseline read fired its SEVENTH+ false-FAIL.** `perf.mjs` vs stored
baseline read day **+5.9%** / night **+11.3%**, looking like a regression. Interleaved HEAD-161 vs the iter-157
file (`ae93fd4`, A/B/A/B, **min per variant**): day **35.00 vs 35.05** (**−0.1%, flat**) and night **41.45 vs
41.00** (**+1.1%, small**). So 158 (observatory dome, day+night draw) + 159 (surf biolum, night-only) + 161 (warm
cloud bellies, day-only, ~0 at night) added ~nothing measurable; the +1.1% night is 158's dome + 159's biolum
landing at night, well inside budget (night >30fps ~49–52%, ≈50fps). NOT re-pinned. **The day column was UNUSUALLY
steady this run** — all four day reads clustered 35.0–35.3ms (contrast 157's ±9ms swing), so the day delta is
trustworthy here; night was steady as always. Census PASS, vacuous (no source edit); tree verified clean after
the interleave restored HEAD.

**Change (the step-back's product — none to the city).** No compounding defect, so per 120/130/136/142/147/152/157
("a clean step-back is a complete iteration — don't force a filler vector") the output is the health record +
header refreshes: step-back pointer 157→162 (next 167), the seventh clean bill, and the 162 interleaved perf
reading. No `solvista.html` edit.

**Verdict — FIXED.** No compounding city defect — the SEVENTH clean step-back in a row (130, 136, 142, 147, 152,
157, 162). All accumulated visual laws (115/116/120/123 + 138 arterials + 143 CBD peak) still read at both seeds
under all three lights; the season is alive (156's understory shows in FOREST, 139's vineyard moving); perf is
flat against the honest interleaved control.

### Findings
- **SEVENTH CONSECUTIVE CLEAN STEP-BACK, and the stored-baseline false-FAIL is now a habit — trust ONLY the
  interleave.** The stored baseline (day 33.16 / night 37.33, pinned 2026-07-10) read +5.9% day / +11.3% night on
  a diff the interleave proves flat/tiny; the 5-day-old iter-157 file reads the same inflated numbers today. The
  pattern is now 125→130→136→142→147→152→157→162. Re-pin only if an interleave *itself* shows a persistent offset
  (it has not since 142's real +2.2%).
- **The day column is USUALLY the noisy one, but not this run — check the round-to-round spread before trusting a
  day delta.** 157 saw the identical HEAD bytes read 43.2 then 37.7ms (a 15% load swing); 162's four day reads all
  landed 35.0–35.3ms, so the −0.1% day delta is real, not luck. The lesson stands (grade day by min-of-≥2-rounds),
  but "day is always ±9ms" is not a law — measure the spread, don't assume it.
- **Night is the accumulating column, and it accumulates SLOWLY — three night-drawing features across five
  iterations (158 dome + 159 biolum) cost +1.1%.** Every night-only draw (per-window glow 118, arterial lamps 138,
  stars 153, biolum 159, dome 158) lands on night alone, so night is where the loop's draw work quietly compounds.
  +1.1% over 5 iters is fine, but this is the column a future step-back should watch first.

## Iteration 163 — the standing crowds sit down on the pavement (2026-07-11) [People & activity × Polish]

**Vector.** People & activity × **Polish** (SHIPPED). Rotation named the domain (after the 162 step-back the lap
owed the stalest, **People**, last SHIP 154). Kind broke the hot **Deepen** streak (155/158/159/161) to **Polish** —
and cashed a banked, *named* People finding: iter 137 gave the WALKING figures (peds/dogs/joggers) the house-style
`shadS` contact shadow and explicitly banked that *"only the static standing crowds still cast no shadow."* This
closes that gap. A banked finding outranks kind-rotation (the header's own law).

**The seam.** Four static "crowd" draws render little standing figures with a body `fillRect` + an `ink` head arc
and **no `shadS`** — so they float a hair above the ground while every ped, dog, jogger and vehicle around them is
seated on a contact smudge. Two stand on the GROUND: the **evening strip crowd** on COM (`L4319`, gated
`LITAMT>0.35 && v>0.6`, 86 host tiles/city) and the **school-run drop-off crowd** at the gate (`L4664`, gated
`dayT` in (0.15,0.30)). The other two were left by design: the **platform queue** stands on an ELEVATED deck (a
ground-contact ellipse doesn't apply) and the **match-day concourse** is abstract 1.2px dots, not figures.

**Change (~5 lines, draw-only).** One `shadS(...)` at each ground-crowd figure's FEET, drawn *before* the body so
the figure reads on top — exactly 137's idiom. Strip: `shadS(cx+ox,cy+oy-0.5,0.09,0.16)` (feet = body bottom).
School: `shadS(px4,py4,kid?0.06:0.09,kid?0.15:0.16)` — kids get the smaller smudge (137's kid-shadow radius). No
tile, entity, `rng()`, `hashCell` spawn, `tick()` pass or terrain; strings pure-ASCII (134). Stream + pop provably
flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, core metrics +0 (`towerHt -1` documented chaotic
wobble). Vacuous by construction — the probe is the gate.

**Probe — `probes/probe-crowdshadow.mjs` (new, promoted).** Whole-frame build-vs-build diff (iter 161's
locate-by-construction), patched vs pristine HEAD, at three frozen frames (strip-evening `dayT`=0.88, school-morning
0.22, midday control 0.45). Getting a clean night diff took **three determinism fixes**, all findings below: (1) the
pre-freeze RAF loop runs a load-timing-dependent number of `tick()`s that flip 2035 development cells DIFFERENTLY
per load, swamping the shadow — so the probe *rebuilds* the city in-page (`genWorld(seed)+__warp(61)`, identical code
both builds → byte-identical cities) rather than trusting the loaded state; (2) the 70-star field (`STARS`, iter
153) is built once at load with UNSEEDED `Math.random`, so it differs per load — cleared; (3) any residual draw-time
`Math.random` stubbed to a constant. A shadow can only DARKEN, so the diff counts darker vs lighter px (161's
directional law). Result seeds 7/42: **strip GATE darker 234/206 px, lighter 0/0** (a pure directional shadow),
**midday control flat** (0-3 darker / 0-7 lighter). The SCHOOL crowd is genuinely below the whole-frame noise floor
(4 schools, a narrow window — its pooled darker/lighter FLIPS run to run, 16/4 then 19/37), so it is **not gated
numerically** — same `shadS` idiom, confirmed in daylight by the visual shot. **PROBE PASS.** A LOUD-red test
(iter 161's law) first proved the draw path executes (2177 red px vs HEAD 0) after a sampler bug (a 3-arg call to a
4-arg `frame()` had made both builds render identical garbage → a false 0) — the loud frame located it in one run.

**Visual.** `probes/probe-crowdshot.mjs` (new) shoots before/after (HEAD vs patched) clips at identical framing
(same deterministic rebuild). Whole-city `wide` frames (dusk seed 42, morning seed 7): both agents **VISUAL: PASS** —
balanced coherent coastal city, lit core→dark rim, no z-order tears / floaters / blown-out color, nothing
compounded. Both agents could NOT resolve the ~2px contact shadow itself at crop scale (it is sub-resolution in a
static screenshot, as any contact shadow is) — which is precisely the case the skill says a probe settles, and the
probe does (234/0). The shadow is the *identical* `shadS` call peds/dogs/vehicles have used since 137, at the same
alpha and the feet, so its appearance is inherited from those already-shipped shadows; the agents' job here was
whole-frame coherence, which passed.

**Verdict — SHIPPED.** The evening strip crowd and the school-run drop-off crowd now sit on the pavement on a
contact shadow, where for the artifact's whole life they floated — every figure in the city is finally grounded
(137 did the movers; 163 does the static crowds). Draw-only, stream + pop flat, ~5 lines + two probes. People ×
Polish gains its next (84, 137, **163**); People is no longer stalest (Transport 155 now is).

### Findings for later laps
- **A WHOLE-FRAME NIGHT build-vs-build diff is polluted by the UNSEEDED `STARS` field (built once at load) — clear
  `STARS` (and stub `Math.random`) for a deterministic night diff.** 161's whole-frame law assumed daytime; at night
  the 70 randomly-placed stars differ per load and read as ~500 changed px at high amplitude, dwarfing a faint
  ground change. `STARS.length=0` before render kills it. Any future NIGHT whole-frame probe must do this.
- **Don't trust the LOADED city for a build-vs-build diff — REBUILD it in-page (`genWorld(seed)+__warp(N)`).** The
  RAF loop runs a wall-clock-dependent number of `tick()`s between load and freeze, and at a developed era (2035)
  each tick flips upgrade/succession cells, so the two loads render *different cities* even at the same seed. Calling
  `genWorld` (which reseeds `rng=mulberry32(seed)`) + `__warp` reproduces a byte-identical city regardless of load
  timing. This is the fix for the class of nondeterminism 137/154 flagged as "the live system is non-reproducible" —
  for anything DETERMINISTIC (terrain, hashCell draws) you *can* get a clean diff, you just have to rebuild.
- **Gate a probe on the STRONG instance; report a SPARSE one directionally, don't gate it.** The strip crowd (86
  tiles) gives a rock-solid signal; the school crowd (4 tiles) sits at the noise floor and its signed/pooled count
  flips sign run to run. Forcing a numeric gate on the sparse instance would be grading noise. Gate the strong one,
  confirm the sparse one shares the identical code path + a visual, and say so.
- **A contact shadow / sub-2px feature is below AGENT SCREENSHOT RESOLUTION — the probe is authoritative, the agent
  does coherence (137's precedent, restated).** Two blind agents FAILed "can't see the shadow"; that is a resolution
  limit, not a defect, and the probe (which CAN measure 2px) is the verdict. Frame the agent's job as the whole-city
  coherence check, not "spot the 2px smudge."
- **Still shadowless BY DESIGN:** the elevated **platform queue** (riders on a deck, not ground — a ground ellipse
  would spill) and the abstract **match-day concourse** dots (1.2px marks, not figures). If a future lap wants the
  platform riders grounded, the shadow must land on the DECK surface (its own small ellipse), not the ground plane.

## Iteration 164 — the city hails a cab (2026-07-11) [Transport × New element]

**Vector.** Transport × **New element** (SHIPPED). Rotation named the domain — after 163 (People) the lap owed the
stalest, **Transport** (last SHIP 155, a Deepen). Kind broke Transport's long **Deepen** run (55/63/112/121/128/155)
and its recent Polish (146): its **New element** cell was the stalest of all (last was iter 48). The bar 118/127 set —
*a saturated domain can still take a New element on an untouched **surface***, and *prefer draw-only / Math.random for
a guaranteed-flat pop* — is met here: taxis are a draw-only variety layered on the existing car entity, no new array,
no rng().

**The seam.** `drawVehicle` (`L5128`) draws every car as the same coloured prism; the fleet spawns in `syncFleet`
(`L2166`) as `kind:'car'` with a `CARCOLS` colour. No taxi existed (grepped: no `taxi`/`cab`/`checker`). A taxi is the
one everyday road vehicle the city was missing, and it reads at a glance by three cues: a lemon-yellow body, a checker
band, and a lit roof sign.

**Change (draw-only + a Math.random flag).**
- Palette: added `cab:[247,203,55]` — a brighter, greener lemon-yellow than the orange `gold` the buses wear, so a
  cab separates from a bus at a glance (bus G≈161 vs cab G≈203).
- Spawn: `taxi:kind==='car'&&Math.random()<0.17` — ~1 in 6 cars. **`Math.random`, not `rng()`**, and inserted between
  `kind` and the `c:` property so the seeded `rng()` call ORDER is byte-identical (the `c:` expression still consumes
  its `CARCOLS` draw for every car). The CA is untouched whether a car is a cab or not.
- Draw: a `bc=v.taxi?'cab':v.c` body colour (a cab wears yellow whatever colour it drew), a checker band (alternating
  ink/cream `fillRect`s along the flank, like the truck's stripe), a small roof-sign prism, and an amber roof-sign
  glow at `LITAMT>0.3` (after dark). Taxis still get the shared headlights/taillights (they fall through as cars).
- Hover: the vehicle pick names a `taxi` **Taxi — "For hire — flag it down."** (else the existing `VKIND`/`Car`).

**Census.** Vacuous by construction (draw-only + Math.random): every metric +0, empty tile histogram, cars 360
unchanged (taxis are a subset). VERDICT PASS. (The `pop -4` wobble is RAF-timing tick-count noise, 163's law — the
change touches no `rng()`.)

**Probe.** `probes/probe-taxi.mjs` — 137's controlled placement + 163's in-page rebuild (`genWorld(seed)+__warp(61)`
so HEAD and ART render a byte-identical city). Two scenes, each placing identical teal cars at 40 spread ROAD cells:
a `taxi:true` scene diffs vs HEAD (the flag recolours the body + adds checker+sign), and a `taxi:false` control scene
diffs vs HEAD (car draw is identical code → ~0, and *separate* from the taxi scene so no neighbouring cab bleeds in).
**taxi box 3.2% of pixels changed vs HEAD · plain-car control 0.00–0.16% (<0.5%, >10x under).** PASS both seeds. The
in-page rebuild was load-bearing: without it the two page loads render slightly different cities (RAF tick drift) and
the control jittered to 0.35% and failed — 163's rebuild law collapsed it to ~0.

**Visual.** Two agents, both **PASS**. Seed 7 & 42 downtown (day): located 3+ lemon-yellow cabs sitting correctly ON
the road hexes, distinct from the orange-gold buses, checker band + roof sign visible, no floating/tearing. Whole-city
(seed 7) reads balanced — yellow stays sparse (a few cabs + existing crop fields), not dominant. Night: the cabs are a
few dark pixels at fit zoom so the amber roof-glow was unverifiable by eye (a resolution limit, not a defect — the
probe confirms the draw path fires; cf. 163's sub-2px agent-resolution law).

**Verdict.** SHIPPED. **Banked for Transport:** the New element cell is spent again; the domain's live vehicle inventory
(car/bus/tram/truck/bike/taxi + service fleet) is now full, so its next lap is Deepen/Polish/Connect, not another kind
of vehicle. A cab could later *deepen* (pick up/drop peds at a kerb) but that hits the `peds`-can't-serve-the-road cap
(111) — it would need the spawn-pool move, not the leash.

## Iteration 165 — the mid-rise roofs grow their mechanical plant (2026-07-11) [Urban fabric × Deepen]

**Vector.** Urban owed the lap (last SHIP 151; 160 Connect reverted). Rotation + saturation both pointed here, and
step 1's two banked probes decided the KIND: the additive cell is spent (118), and I measured the two things the
header wanted checked before proposing anything.
- **Under-construction hoarding — measured OUT.** `c.th-c.h>5` (the crane host) is only **0–2 buildings per city**
  in a census snapshot (buildings finish in a few ticks: `c.h+=0.35+...`), so a ground-level construction hoarding
  would be all-but-invisible. Rejected before drawing a line (probe-before-you-design).
- **COM high-street arcade (the header's banked Connect) — measured OUT.** The `hstr` run is 21–23 cells over 7–9
  x-columns but its **longest straight run in any single column is 2** — the parade zigzags with row parity (it
  follows `fdx(yy)`), so a straight colonnade down it would wiggle and read square, exactly the trap 160/the
  transport invariant warn about. Confirms 160's law: **check host ADJACENCY, not just count, before a Connect** —
  the high-street host is contiguous by ROW but not along any hex axis, so it is not a clean arcade host.
- So: **Deepen** (the freshest Urban kind), draw-only, on a host that exists at scale.

**Change.** COM (mid-rise commercial, ~400–500 cells city-wide) grew **rooftop mechanical plant** — a concrete
stair/lift bulkhead, a lower mechanical box, and a thin vent stack on the parapet deck (solvista.html ~L4324) — the
commercial answer to the walk-up's timber water tank (MID, ~L4277). Gated `!c.solar&&!c.groof&&hashCell(x,y,
seedNum^0x3C7B)<0.38` (a bare roof only; solar/green-roof/café roofs keep their own crown). Stone grey (`stone`/
`stoneDk`), sized small (bulkhead 0.10 half-extent vs the building's 0.36, 2 units tall). Draw-only, hashCell-gated,
no `rng()`/terrain → stream and pop stay flat, and `col()`'s day TINT makes it recede by day and darken with the
scene at night (no additive glow, so no blowout).

**Census.** Vacuous by construction (draw-only): every core metric +0, empty tile histogram, no page error. PASS.
(A `greenRoofs -1` wobble is chaotic-CA noise; the change touches no `rng()`.)

**Probe.** `probes/probe-roofplant.mjs` — build-vs-build isolation (161 law): HEAD (no plant) vs patched, each rebuilt
in-page via `genWorld(seed)+__warp(61)` for a byte-identical city (163 law), clock + `time`/`waveT` frozen and
`Math.random` stubbed *before* `genWorld` so the harbor ships and sea shimmer are deterministic. The raw changed-px
count still wobbles with browser warm-up (balanced water shimmer, 161 corollary a), so the gate is **grey-plant-like
px in the roof band vs the coast control**, not the raw count: on a clean deterministic run **seed 42 = 802 changed
px, 98% plant-like grey (mean rgb 152,142,122 ≈ day-tinted `stone`), median y=524 (the mid-frame COM-roof band); the
coast control (bottom fifth) holds only ~35 plant-like px.** Seed 7 the same shape (grey px concentrate mid-frame,
control near-nil). The plant renders where intended and is absent from the control.

**Visual.** Two agents (seed 42, seed 7), both **PASS**. Both located the grey bulkhead+box+vent clusters sitting
correctly ON the flat commercial roofs (aligned to the hex tops, not floating/offset), muted concrete grey with no
blowout, no z-order tears; existing roof furniture (helipads, solar, café discs) still reads. Whole-city wide frame at
both seeds: the plant is barely-there texture at fit zoom — it adds skyline grain rather than dirtying it; the coast,
pier, turbines and greenbelts all intact.

**Verdict.** SHIPPED. Extends the roof-furniture vocabulary (MID's water tank) to the mid-rise COMMERCIAL mass, giving
downtown's mid-height roofscape the lived-in grey a real block carries. **Banked for Urban:** the additive cell is
spent (118) and Connect is measured-hard twice now (160 RES terracing, 165 high-street arcade — both host-adjacency
failures), so Urban's next lap is Deepen/Polish. A COM arcade is only viable if a *straight-hex-axis* retail run is
found (the `hstr` parade is not one). TOWER roofs (roof gardens/helipads) and RES/MID (water tanks) are now all
plant-crowned; the remaining bare roof is IND (warehouses) if a further roofscape Deepen is wanted.

## Iteration 166 — the woods drop their leaves in autumn (2026-07-11) [Nature × Deepen]

**Vector.** Nature & landscape × **Deepen** (SHIPPED). Rotation named the domain — Nature was the single
stalest (last 156). Kind: 156 was Nature's New element (spring wildflower understory on the FOREST floor); this
**Deepens** that same system rather than adding a new one — the sanctioned compounding move (the river got good
by compounding). The forest floor now keeps a full seasonal calendar: spring bloom (156) → summer green → **autumn
leaf litter (166)** → winter bare. The canopy has ambered in autumn since forever (`applySeason`, s≈0.87), but the
floor beneath it stayed green all year — the crown turned and the ground ignored it. This closes that gap on the
biggest untouched-in-autumn Nature surface (FOREST = 63–69 hexes/city, per 156's histogram-first law).

**The seam.** `case T.FOREST` (L3362) drew the floor as a `grassDk` fill + (since 156) a spring wildflower block.
`applySeason` (L316) already computes an `autumn` factor from `year` but fed it only to the canopy palette
([176,138,70] amber). I added a shared `autumnFall()` (L1121, next to `springBloom`) = `clamp(1-|s-0.87|/0.14,0,1)`,
centred on the SAME autumn peak the crown turns on (a touch wider so the litter appears as the leaves start dropping
and lingers into early winter) — ONE predicate the draw and the tooltip both read (112's law), so the litter cannot
outlast the canopy nor claim a season the floor doesn't paint.

**Change (~12-line draw + 1-line tooltip + 1 helper, all draw-only).** In the FOREST draw, right after the spring
block and before the trees (so the canopy overlays the litter), an `autumnFall()>0.06`-gated block scatters 4–7
warm leaf specks per hex — `hashCell(x,y,seedNum^SALT)` for count/positions (fresh salts 0x6A/0x6B/0x6C, no clash
with spring's 0x5B–0x5D), colours `gold`/`brick`(russet)/`straw` matching the crown's autumn amber, size 1.6px
(broader/denser than the bright spring specks), alpha `0.28+0.5·af`. A matching `describeTile` row (`['Understory',
'Fallen leaves']` when `autumnFall()>0.4`, `else`-guarded against the spring row so they never both show). No tile,
entity, `rng()`, `tick()` pass or terrain; strings pure-ASCII (134). Fully stream + pop neutral (hashCell only).

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, core metrics +0 (`greenRoofs +1` is documented
chaotic-CA headless wobble), entity counts identical. Vacuous by construction — the probe is the gate.

**Probe — `probes/probe-autumnfall.mjs` (new, promoted; sibling of `probe-woodbloom`).** Isolates the litter from
the canopy's OWN seasonal amber by diffing **patched vs pristine HEAD at the SAME frozen autumn frame** — the only
difference between the two builds is the leaf-litter block. Clears every mover first (tramwire law). seeds 7/42:
**FOREST changed 11.82% / 11.39% in AUTUMN → 0.00% / 0.00% in SUMMER** (af=0, byte-identical), **ROAD control
0.01–0.09%** both frames. So the litter appears only in autumn and only on forest — a ~130–1180× separation within
the one tile type, zero leakage onto roads.

**Visual.** `probes/shot-autumnfall.mjs` (new) camera-zooms a dense forest patch, clipping autumn vs summer; plus
whole-city `wide` at seeds 42 & 7 (autumn). Three agents, one each, discriminate-don't-judge (108). Zoom agent:
AUTUMN has gold/russet/tan specks clustered at the tree bases on the forest floor (not floating, not bleeding onto
the clearing/road hexes), SUMMER floor plain olive — **VISUAL: PASS**. Both whole-city agents: balanced coherent
autumn coastal city, no z-order tears/floaters/blowout, forests read as calm green/olive with the litter correctly
sub-pixel at fit — **VISUAL: PASS** both.

**Verdict — DEEPENED.** The woods now drop their leaves in autumn — a warm litter gathers on the forest floor as
the canopy ambers overhead, giving the 69-hex woodland a full four-season floor (spring flowers → summer green →
autumn litter → winter bare) instead of a green fill that ignored the autumn crown above it. Draw-only, stream +
pop neutral, one shared predicate joining `springBloom`/`orchardPhase`/`vinePhase`. Nature is no longer stalest
(Civic 158 now is).

### Findings for later laps
- **`autumnFall()` COMPLETES the shared year-predicate set** (`springBloom` · `orchardPhase` · `vinePhase` ·
  `autumnFall`). Anything that should key on the autumn window (a future MEADOW seed-head browning, migratory-bird
  departure, a bonfire-season cue) should READ it, not re-clamp. Like `springBloom` it reads the FAST `year` and is
  fine for a CONTINUOUS alpha (drift tolerated); a DISCRETE autumn/not readout off it would strobe (134).
- **A SEASON-COMPLEMENT DEEPEN is the cleanest way to re-touch a domain you just added to.** 156 shipped the spring
  half of the forest floor as a New element; 166 shipped the autumn half as a Deepen one lap later. The two are
  probed identically (patched-vs-pristine at one frozen frame, the other season = the confinement control), reuse
  the same salts-family and the same shot rig, and together read as a single system rather than two features. When
  a New element lands a *seasonal* draw, its complementary season is a ready-made next Deepen for that domain.
- **THE PROBE PATH LAW BIT AGAIN — `probe-woodbloom.mjs` / `shot-woodbloom.mjs` still resolve `join(HERE,
  'solvista.html')`** (i.e. inside `probes/`), which only worked because 156 ran them from the repo root before the
  `git mv`. `probe-autumnfall.mjs` / `shot-autumnfall.mjs` resolve `../../../../solvista.html` and `../shots` from
  their own location and run correctly in place. The two 156 scripts are latently broken if ever re-run from the
  tracked dir; not fixed this lap (out of scope) but flagged.

## Iteration 167 — the thirteenth step-back finds a clean city, perf flat (2026-07-11) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/125/130/136/142/147/152/157/162/**167**). Not a
domain × kind lap: it reads the WHOLE city for *cumulative* drift the census and per-feature gates are blind to,
runs the season probe + interleaved perf gate, at night AND a season with the day/night baselines pinned OFF
January (`year=2035.62` dry peak; `2035.02` as the seasonal-contrast frame). No city vector taken, so rotation is
unchanged — the next lap (168) owes the stalest domain, **Civic (158)**, then Water (159).

**What was read.** Un-zoomed whole-city `wide` frames at **2 seeds × 3 lights/calendars** — seed 42 (warp 61) &
seed 7 (warp 31), each at {day 2035.62/t=0.35, night 2035.62/t=0.90, winter 2035.02/t=0.35}. One subagent per
seed read its own three frames: the cumulative question ("has anything compounded into clutter or darkness?")
plus 108's **locate-don't-judge** night test ("where is the core by light alone?").

**Result: the city is healthy — both agents VISUAL: PASS.**
- **Night core (115/143) LOCATED off-centre both seeds** — seed 42 ~(0.47,0.50) with a lit tower spine
  (.45,.35)→(.50,.78), seed 7 ~(0.50,0.62) + a secondary spur ~(.55,.45) — matching 162 ((.48,.53)/(.45,.62)),
  157, 152, each with a genuine bright-core→dark-rim falloff to a dim coastal/rim, not a flat wash.
- **All recent vectors sit correctly in the whole frame** — 163's seated crowds, 164's cabs, 165's COM roof
  plant, 166's autumn leaf litter — with the pier/ferris/wind-farm on the water plane and the street grid still
  separating blocks cleanly. **No z-order tears / floaters / hard seams / blown-out white / mojibake** in any of
  the 6 frames; stat strip + labels crisp both seeds. **Winter reads distinct** from summer at both seeds
  (cooler/duller vegetation, cooler water) — modest at seed 42, clearer at seed 7, by-design (120's dilution).

**Season — measured alive.** `probes/probe-season.mjs`: FARM winter→dry-peak **88.4** (matches
130/136/142/147/152/157/162), VINEYARD 44.6/36.7/42.7 (139), **FOREST 20.3/19.6/30.7 — autumn now 30.7, up from
162's 24.4: iter 166's leaf litter shows in the probe**, plus 156's spring understory (spring 20.3). ORCHARD
25.3/17.8/41.4, MEADOW/SHOREPARK move, PARK/REDWOOD/GARDEN/QUAD near-zero by design (120), ROAD control **0.5–2.2**.
Calendar working; the four-season forest floor (166) is real, not just a static draw.

**Perf — 163→166 cost ~ZERO; the stored-baseline false-FAIL fired AGAIN.** `perf.mjs` vs stored baseline read
day **+15%** / night **+21%**, pure machine-load inflation (today's box is slower — HEAD's own day min was 38.1ms
vs 162's session at 35.0ms). Interleaved HEAD-166 vs the iter-162 file (`5f01426`, A/B/A/B, **min per variant**):
day **38.11 vs 38.22** (**−0.3%, flat**) and night **45.22 vs 44.78** (**+1.0%, small**). So 163 (seated crowds,
draw-only) + 164 (cab colour variety) + 165 (COM roof plant, day+night draw) + 166 (autumn litter, day-only)
added ~nothing measurable; the +1.0% night is 165's roof plant landing at night, well inside budget. NOT re-pinned
(the stored baseline is 5 days stale and reads inflated on today's load; re-pin only if an *interleave itself*
shows a persistent offset — it has not since 142's real +2.2%). Census PASS, vacuous (no source edit); tree
verified clean after the interleave restored HEAD.

**Change (the step-back's product — none to the city).** No compounding defect, so per
120/130/136/142/147/152/157/162 ("a clean step-back is a complete iteration — don't force a filler vector") the
output is the health record + header refreshes: step-back pointer 162→167 (next 172), the eighth clean bill, and
the 167 interleaved perf reading. No `solvista.html` edit.

**Verdict — FIXED.** No compounding city defect — the EIGHTH clean step-back in a row (130, 136, 142, 147, 152,
157, 162, 167). All accumulated visual laws (115/116/120/123 + 138 arterials + 143 CBD peak) still read at both
seeds under all three lights; the season is alive (166's autumn litter now measurable in FOREST's probe, 139's
vineyard moving); perf is flat against the honest interleaved control.

### Findings
- **EIGHTH CONSECUTIVE CLEAN STEP-BACK, and the stored-baseline false-FAIL is now fully reflexive — trust ONLY the
  interleave.** The stored baseline (day 33.16 / night 37.33) read +15% day / +21% night on a diff the interleave
  proves flat/tiny — a bigger inflation than 162's +5.9%/+11.3% purely because today's box is more loaded (HEAD's
  own absolutes were 38.1/45.2ms vs 162's 35.0/41.0ms). The stored number cannot answer "did *my change* cost
  anything" across days; only the same-session A/B can. Pattern: 125→…→162→167.
- **A season probe now DOUBLES as a regression guard for the last lap's seasonal feature.** FOREST's autumn column
  jumped 24.4→30.7 between 162 and 167 — that delta *is* iter 166's leaf litter, caught by the same probe that
  proves the calendar alive. A step-back that runs `probe-season.mjs` gets the previous iteration's seasonal
  draw verified for free; watch the column of whatever tile the last few laps touched.
- **Night is still the slowly-accumulating column and it is accumulating as predicted — 165's day+night roof
  plant is the only draw of 163–166 that lands at night, and night moved +1.0% while day stayed flat.** Confirms
  162's read: every night-only/day+night draw compounds on night alone. +1.0% over 4 iters is fine; night stays
  the column a future step-back watches first (night >30fps-budget ~50%, ≈45ms/22fps under today's load).

## Iteration 168 — the amphitheater's stage gets its concert (2026-07-11) [Civic & culture × Polish]

**Vector.** Civic & culture × **Polish** (SHIPPED). Rotation named the domain — after the 167 step-back the lap
owed the stalest domain, **Civic** (last SHIP 158). Kind varied OFF Deepen deliberately: Deepen has run hot
globally (155/158/159/165/166 all Deepen), and Civic's own last kind was Deepen (158). **Polish** is Civic's most
under-used cell (last 73; 114 reverted) and globally cold (last Polish 163). Content fits the night-mood run the
last laps built (moon 135, stars 153, observatory 158, biolum surf 159).

**The seam.** `case 'amphitheater'` (L4745) lit an EMPTY stage at showtime — a warm wash ellipse + 3 footlight
dots under `if(LITAMT>0.3)` — while its own `CIVICDESC` promised *"An open-air bowl beside the parks. Concerts
through the summer."* A label asserting a performance the pixels never showed: the same asserts-more-than-it-draws
tell that has paid seven times (117/122/129/148/158…), here in its **Polish** form — make the existing draw read
as what its label already claims. Amphitheater is 1/city, sited from 2004 (present in the 2035 census slices), a
zoom-reward landmark like the observatory (158) and hall clock (149) — census tile histogram confirms 1/city.

**Change (~14 lines, draw-only).** Inside the existing `LITAMT>0.3` showtime block: a soft warm **beam** cone
spilling from over the stage onto the apron; a centre-stage **performer** — a lavender body + a warm-lit head —
that **sways** to the music (`sin(time*1.5+x*1.3)`); the warm apron wash and 3 footlights kept. No tile, entity,
`rng()`, `hashCell` spawn, `tick()` pass or terrain; strings pure-ASCII (134). Stream + pop provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, all core metrics +0, entity counts identical.
Vacuous by construction (a night-only draw at the t=0.35 daytime census frame draws nothing) — the probe is the gate.

**Probe — `probes/probe-amphi.mjs` (new, promoted).** Diffs PATCHED vs pristine HEAD at the SAME frozen frame
(`time` pinned, every mover cleared per tramwire's law), camera-zoomed onto the 1/city amphitheater hex so the
stage is unoccluded (obsdome's method), ROAD as the zero control. seeds 42/1234/88: **STAGE changed 8.1–8.25% at
NIGHT → 0.00% in DAY** (gate off → byte-identical), **ROAD ~0** both frames. seeds 3/7 skipped: their
amphitheater is **occluded** behind foreground downtown towers (byte-identical even at night — the draw fires but
is overpainted; verified visually), so unmeasurable here, not a failure. **VERDICT: PASS (3 seeds).**

**Visual.** `probes/shot-amphi.mjs` (new) camera-zooms the amphitheater, night + a day control. seed 42 (mine) &
seed 1234 (agent, blind): the NIGHT frame reads as a soloist under a spotlight — lavender figure, glowing head,
warm beam, footlights, centre-stage on the hex bowl, no float/tear/blowout; the DAY frame an empty stone cavea
(the flat coloured audience specks are the pre-existing `LITAMT<0.75` daytime crowd, untouched) — **VISUAL: PASS**
both. Whole-city `wide` night (seed 42), one agent: balanced coherent coast, lit core (x~0.48,y~0.52, matching
162/167's reads) → dark rim, sea reads, nothing compounded — **VISUAL: PASS**.

**Verdict — SHIPPED.** The amphitheater stage, lit-but-empty for the artifact's whole life, now stages a spotlit
performer at night — honoring the "Concerts through the summer" the label always promised, and adding a Civic
entry to the night-life run. Draw-only, stream + pop flat, ~14 lines + a probe + a shot script. Civic's Polish
cell gains its next (73, ~~114~~, **168**); Civic is no longer stalest (Water 159 now is).

### Findings for later laps
- **THE ASSERTS-MORE-THAN-IT-DRAWS TELL HAS A POLISH FORM, not only Deepen/Interaction.** 117/122/129/148 cashed it
  in *tooltips* (a string vs `describeTile`); 158 cashed a *draw* comment ("open to the night") as a Deepen. 168 is
  the same tell as a **Polish**: `CIVICDESC` (a tooltip string) asserted "Concerts", and the *draw* showed an empty
  lit stage — so making the draw honor the string is a legibility fix, not a new system. Where else does a label
  promise activity the tile draws as empty?
- **A CAMERA-ZOOM PROBE ON A 1/CITY LANDMARK MUST TREAT OCCLUSION AS SKIP, NOT FAIL.** 2 of 5 seeds sited the
  amphitheater where downtown towers overpaint it from the diorama's fixed camera — byte-identical patched-vs-
  pristine even at night. That is the draw firing and being overdrawn, not a defect; the probe skips a
  night≈0 seed and requires ≥2 measurable seeds passing (obsdome's "only seeds with the feature on-screen count").
- **STILL BANKED from 158's draw-tell list:** the firehouse bell (static gold disc, no natural clock tie — weaker)
  and museum/parliament floodlights (the museum already floodlights at dusk; parliament does not). Next Civic
  Deepen candidate; 168 took the Polish path to the same tell instead.

## Iteration 169 — the tideline gets its gulls (2026-07-11) [Water & coast × New element]

**Vector.** Water & coast × **New element** (SHIPPED). Rotation named the stalest domain, **Water** (last SHIP
150; 159 Deepen). Kind varied off 159's Deepen and the recent night-feature run (135/153/158/159) to a **New
element** on a genuinely fresh **surface** — 127's law (saturation is of a domain's *entities*, not its surfaces):
Water's entity list is spent (boats, ferries, freighters, kayaks, herons, surfers, whales, gulls-on-the-ferry-wake),
but **no bird has ever landed** — the damp sand at the waterline had no life at all. A daytime feature, deliberately
breaking the five-lap night streak.

**The seam.** `case T.BEACH` (L3265) already walks every sea-facing hex edge to lay the tide's damp margin and its
tidepools — `edges` (the water-facing vertex pairs), `cx,cy` and the inshore geometry are all in scope. The exact
host for birds standing on the wet band, inshore of the waterline.

**Change (~30 lines + a `drawGull` helper, draw-only).** A `LITAMT<0.58`-gated block after the tidepools scatters a
small group of **1-3 gulls** on the damp margin of beach hexes that face open water, `hashCell`-gated
(`seedNum^0x6011 < 0.32`) so only ~a third of shore stretches hold a group — sparse, irregular, never a wall of
birds. Each gull is `hashCell`-placed along the chosen edge and a little inshore, most facing the sea, one per group
with its head down feeding; a slow `waveT` idle bob. They fade in through the morning and lift off to roost by dusk
(`ga=clamp((0.58-LITAMT)/0.22,0,1)`, the same slow day-clock the beach umbrellas ride, so a daily rhythm not a
strobe). `drawGull` is a side-on herring gull: pale-grey `whiteDk` back, `white` breast/head, `gold` bill+legs,
`ink` wingtip+eye, a `shadS` contact shadow (house style, 137/163). No tile, entity array, `rng()`, `tick()` pass or
terrain; strings pure-ASCII (134). Stream + pop provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, core metrics +0, entity counts identical. Vacuous by
construction (draw-only) — the probe is the gate.

**Probe — `probes/probe-gulls.mjs` (new, promoted).** Diffs PATCHED vs pristine HEAD at the SAME frozen frame
(waveT pinned, every mover cleared, tramwire's law), sampling BEACH hexes that touch non-river WATER (the gull hosts,
found in-page) with ROAD as the zero control. seeds 7/42: **BEACH changed 1.17% / 0.85% in DAY (LITAMT 0.02) → 0.00%
/ 0.00% at NIGHT (LITAMT 1.00, gate off, byte-identical)**; ROAD control ~0 in day (0.22%/0.05% = day-only gulls
bleeding into adjacent coastal-road boxes, correctly →0 at night) and ~0 at night. So the gulls appear only by day
and only on the water-facing beach margin. **PASS.**

**Visual.** The wide `coast` clip made the ~4px gulls borderline — one agent PASS ("borderline, close to noise"),
one FAIL ("can't locate them"). That is biolum's exact lesson (159): a subtle coast ornament must be judged at the
**moderate ~4x zoom a user actually looks at the coast**, not the wide clip. `probes/shot-gulls.mjs` (new; camera-
zooms a front-of-frame beach hex that passes the gull gate, day frame) at 4.6x/6.5x: both seeds read cleanly as
little pale shorebirds standing on the damp margin at the waterline, facing the sea — correct placement, no
floating/clutter (self-verified both seeds). Whole-city `wide` (seed 42): balanced beautiful coast, gulls correctly
sub-pixel/uncluttered at fit zoom, no tears/floaters/blowout — agent **VISUAL: PASS**.

**Verdict — SHIPPED.** The waterline, lifeless for the artifact's whole existence, now has shorebirds standing on
the wet sand by day — the daytime Water counterpart to the recent night-life run. Draw-only, stream + pop flat.
Water's New element cell gains its next (6, 10, 12, 16, 20, 33, 106, **169**); Water is no longer stalest
(Urban 151 now is).

### Findings for later laps
- **A ~4px COAST ORNAMENT IS BORDERLINE AT THE WIDE `coast` CLIP AND CLEAN AT ~4.6x — SHOOT THE MODERATE ZOOM
  FIRST (biolum's law, 159, re-confirmed).** The wide `coast` framing split two agents (one couldn't locate the
  gulls at all); a camera-zoom to the natural ~4.6x coast scale on a hex that *passes the feature's own placement
  gate* resolved them as birds on both seeds. When a small coast feature's probe PASSES but the wide-clip agents
  disagree, the framing is unfair — reframe, don't redesign (the FAIL is a cue to measure/reframe, 120's law).
- **127's SURFACE-NOT-ENTITIES LAW HELD AGAIN for a saturated domain.** Water's *entity* list is spent, but the
  wet sand margin was an untouched *surface* with no life on it. A New element still lands in a saturated domain if
  it targets a surface nothing has drawn on (127 picnics on PARK, 145 the beach's daily rhythm, 169 the tideline).
- **STILL banked for Water (123):** the pier/lifeguard tower are still `rng()`-salted — site them on a depth by
  respending their draws, but VARY 123's site-on-depth mechanism. Untouched still: a New element could also land on
  the marsh's wet edge, or gulls could work the ferry wake as they *land* on the water (currently they only fly).

## Iteration 170 — the pier hails its anglers (2026-07-12) [People & activity × New element]

**Vector.** People & activity × **New element** (SHIPPED). Rotation named the stalest domain, **People** (last SHIP
163, a Polish; the header explicitly owed the 170 lap to People or Transport). Kind varied off 163's Polish and the
globally hot **Deepen** streak (165/166) to a **New element** on a fresh *surface* — 127's law (saturation is of a
domain's *entities*, not its surfaces): People's entity list is full (peds, dogs, joggers, kids, static crowds,
picnics, beach towels/bonfires), but no one had ever **fished**. The pier deck gets strolling peds (openCells push,
L2235; tooltip "Out on the pier for the view") but never a *stationary* activity — anglers are the one iconic pier
figure missing. A daytime feature, deliberately breaking the recent night-feature run.

**The seam.** `drawPierAt` (L2902) draws the boardwalk deck per pier cell; the plain deck (not the snack stall at
`x1-1` nor the ferris wheel at `x1`) had structures but no people fishing. Added the anglers right after the deck
prism, before the stall/wheel blocks.

**Change (~23-line draw + 1-line FIX, all draw-only).** On plain deck cells, gated `LITAMT<0.62` (day) and
`x===pier.x1-2 || hashCell(x,y,seedNum^0x6A1D)<0.45` — the seaward-most eligible cell (over the deepest water, where
people fish) is **guaranteed** an angler so a short pier is never empty, plus hash-driven others for variety. Each
angler: a side-on figure at deck height (z5), a `trunk` rod angling out over the water, a `whiteDk` line dropping to
a `coral` float on the sea, a `shadS` contact shadow (house style, 137/163), body colour `hashCell`-picked from
teal/stone/terra, day fade `aa=clamp((0.62-LITAMT)/0.24,0,1)` on the same slow day-clock as the beach umbrellas/gulls
(a rhythm, not a strobe). No tile, entity array, `rng()`, `tick()` pass or terrain; strings pure-ASCII (134). Stream
+ pop provably flat.

**Bundled FIX (1 line).** `drawPierAt` was only called from the **WATER and BEACH** switch cases, so where a pier
crosses **KELP** cells (seed 7: 2 of its 3 eligible deck cells are kelp) the deck **vanished into a gap** — a latent
bug the artifact carried for its whole life. Added `if(pierAt(x,y))drawPierAt(x,y)` to the `T.KELP` case (kelp draws
first, deck on top — same z-order as water/beach). This closes the gap AND is what lets the anglers site robustly
across seeds (without it, seed 7's guaranteed cell was kelp and drew nothing).

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, core metrics +0, entity counts identical. Vacuous by
construction (draw-only) — the probe is the gate.

**Probe — `probes/probe-anglers.mjs` (new, promoted).** Because the iteration bundles two changes, the probe uses
**two reference builds** to isolate them: `BASE` = HEAD, `DECK` = HEAD + the one kelp-deck line (no anglers), `PATCH`
= working tree. Diffing PATCH vs DECK at the same frozen frame (movers cleared, tramwire law) isolates the anglers
alone — both builds already draw the deck over kelp. seeds 7/42: **ANGLERS (PATCH−DECK) day 2.18% / 0.86% → night
0.00% / 0.00%** (gate off → byte-identical), **ROAD control ~0** both frames; the secondary **deck-fix (DECK−BASE)**
column reads 25%/10% present at DAY **and** NIGHT (correct — the deck is permanent). So the anglers appear only by
day and only on the pier deck. **PASS.** (Getting here cost the fragile-short-pier debug the finding below records.)

**Visual.** `probes/shot-anglers.mjs` (new) camera-zooms the pier, day + night. Two agents (seed 7 & 42), both
**PASS**: DAY reads 2 anglers standing correctly ON the deck, rod + line to a float on the sea; NIGHT the deck is
empty (they pack up); the deck is **continuous end-to-end over the kelp** (gap closed); whole-city `wide` at both
seeds balanced/beautiful, no z-order tears/floaters/blowout/mojibake. (Seed 7 first FAILed — deck empty — which the
probe traced to the kelp gap; the FIX turned it to a clean PASS, 120's "a FAIL is a cue to MEASURE" in action.)

**Verdict — SHIPPED.** The pier, strolled-but-never-fished for the artifact's whole life, now has anglers casting off
the deck by day — the daytime People counterpart to the recent night-life run, sitting beside 169's tideline gulls.
Bundled a real deck-over-kelp fix. Draw-only, stream + pop flat. People's New element cell gains its next (41, 56,
**127**, **170**); People is no longer stalest (Transport 164 now is).

### Findings for later laps
- **A SWITCH-CASE-GATED DRAW SILENTLY SKIPS TILE TYPES THE CASE DOESN'T COVER — grep every case a shared helper is
  called from before assuming it runs everywhere.** `drawPierAt` was wired into WATER + BEACH but not KELP, so the
  pier deck (and anything I hung on it) vanished wherever the pier crossed kelp. A feature layered on a per-tile draw
  inherits that draw's coverage gaps. When a feature "works on seed 42 but not seed 7," suspect a tile-type the host
  draw doesn't handle on the failing seed (here: `pierdbg` printed `t:26` = KELP for seed 7's dead cells).
- **A SHORT PROCEDURAL HOST IS HIGH-VARIANCE — GUARANTEE ONE INSTANCE, HASH THE REST.** The pier is only 3–5 deck
  cells; an independent per-cell `hashCell<p` gate left whole piers empty on unlucky seeds (seed 7's cells all hashed
  ≥0.75). Forcing the seaward-most eligible cell (`x===pier.x1-2`) to always fish, then hash-gating the others,
  guarantees presence without making every cell identical. Reuse this shape for any feature on a small procedural run
  (a few civic slots, a short parade) rather than trusting the hash to populate it.
- **WHEN AN ITERATION BUNDLES TWO DRAW CHANGES, ADD A THIRD REFERENCE BUILD TO THE PROBE (the 161 build-vs-build law,
  extended).** A permanent change (deck-over-kelp) swamped a day-only one (anglers) in a plain patched-vs-HEAD diff.
  Building an intermediate reference (HEAD + only the permanent line) and diffing PATCH vs *that* isolated the
  day-only feature cleanly, with the permanent change reported as its own column. `String.replace` on an anchor is
  enough to synthesize the intermediate build inside the probe.

## Iteration 171 — the boulevards name themselves (2026-07-12) [Transport × Interaction/UX]

**Vector.** Transport × **Interaction/UX** (SHIPPED). Rotation named the stalest domain, **Transport** (last SHIP
164). Kind varied HARD off the recent runs — New element ran the last two laps (169/170) and 164 spent Transport's
New element cell; Deepen is globally hot (155/158/159/165/166); Polish (146) and Connect (138) are Transport's two
most-recent kinds. That left **Interaction/UX**, which is Transport's single **stalest cell (only 105 ever)** and by
far the stalest Interaction/UX across all domains (Nature 148 · Water 141 · Urban 133 · Civic 140 · Sky 144 · People
154 · **Transport 105**). A draw-nothing tooltip vector — guaranteed-flat pop.

**The seam — the asserts-LESS-than-the-code-knows tell (117/122/129/148/168), in its Interaction form.** The ROAD
draw has rendered a **tree-lined boulevard** — an allée planted down *both* kerbs (`if(c.treed)`, L4071) — since
long before the ledger, and the CA spreads `treed` among connected busy streets (L1659, adopting from treed
neighbours), so boulevards form leafy runs. But `describeTile`'s road branch named only Bridge/Arterial/Avenue/Street
off `flow`/`busy`/`bridge` and was **mute about `c.treed`** — hovering the single leafiest, most distinctive street in
the city read a flat "Avenue" like any other. The draw knew it was a boulevard; the label didn't say so. (The
`boulevardTrees` census stat already counts `c.treed` — **1203** across the 9-cell matrix, ~340/city — so it is a
tile at scale, not dead code, 30/107's law.)

**Change (~10 lines, tooltip logic only).** In `describeTile`'s ROAD branch: a treed road now titles **`Boulevard`**
(ranked below Bridge, above Arterial/Avenue/Street), sub *"A leafy avenue, planted with trees down both kerbs."* — and
if it is *also* a trunk (`flow>=ARTFLOW`) the sub appends *" Also a trunk route."* so a treed arterial keeps its
network identity. Added a **`Length — N block(s)`** data row = the boulevard's contiguous extent via a new
`boulevardSize(x,y)` = `floodSize(x,y, road && treed)` — the *same* flood the woods name their stand with (117) and
kelp its bed. No tile, entity, `rng()`, `hashCell`, `tick()` pass, terrain, or canvas draw; all strings pure-ASCII
(134 — no accent on "allee", the `é` in this ledger note aside). Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, `boulevardTrees 1203`
unchanged, entity counts identical (greenRoofs +1 = documented RAF tick-count jitter, touches no `rng()`). Vacuous by
construction (a tooltip-only change draws nothing) — the probe is the gate.

**Probe — `probes/probe-boulevard.mjs` (new, promoted).** A DOM/logic probe, not a pixel diff (the change is pure
tooltip logic): loads a developed city (`?seed&warp=61`) and calls `describeTile()` on real cells. **TARGET** — every
treed ROAD must title `Boulevard` AND carry a `Length N block(s)` row whose N equals `boulevardSize` (>=1).
**CONTROL** — busy NON-treed roads must title `Avenue`/`Arterial` and contain neither `Boulevard` nor `Length`; a
quiet road must stay `Street`. seeds 7/42/1234: **treed named+length 347/347 · 346/346 · 340/340 (0 bad, 0
len-mismatch)**; busy-plain control clean **33/33 · 54/54 · 29/29**; quiet road = `Street` all three; longest boulevard
run **28 / 15 / 15 blocks**. **VERDICT: PASS (3 seeds).**

**Visual — `probes/shot-boulevard.mjs` (new, promoted).** Drives a REAL cursor onto a boulevard and a plain-busy road
(reading back the handler's resolved `hoverTile` and retrying candidates so the control reliably lands on a non-treed
cell — treed roads are dense near centre, so a naive projection kept snapping to a neighbouring boulevard), then
screenshots the rendered `#tip` card. One agent, blind, read all four: **boulevard s7** = "Boulevard" + leafy sub +
`Length 28 blocks`; **boulevard s42** = "Boulevard" + `Length 5 blocks`; **control s7/s42** = "Avenue", no
Boulevard/Length; all cards legible, aligned, no clip/overflow/CSS breakage — **VISUAL: PASS**. (No whole-city shot:
the canvas is byte-identical to HEAD — nothing new is drawn — so the census/interleave/step-back visual pass has
nothing to catch here.)

**Verdict — SHIPPED.** The leafiest street in every city, a flat "Avenue" for the artifact's whole life, now names
itself a **Boulevard** and tells you how many blocks its allee runs — Transport's first Interaction/UX vector since
105, and the asserts-less-than-the-code-knows tell cashed in its Interaction form. Draw-nothing, pop + stream flat,
~10 lines + a probe + a shot script. Transport's Interaction/UX cell gains its next (105, **171**); Transport is no
longer stalest (Urban 165 now is, and 172 is the step-back).

### Findings for later laps
- **THE ASSERTS-LESS-THAN-THE-CODE-KNOWS TELL EXTENDS TO A DRAW-VARIANT THE LABEL FLATTENS, not just a missing calendar
  or a mute string.** 117/122/129/148 cashed it where a tooltip ignored CA *state*; 171 cashed it where the tooltip
  collapsed a distinct **draw variant** (`c.treed`, an allee both kerbs) into a generic label. Look for other draw
  flags the tooltip doesn't surface: a road can also carry `c.fete` (festival bunting is drawn, unnamed) and `c.corr`
  (a corridor). A BUILDING's `c.corner` is already named; check what other per-cell draw flags a label flattens.
- **A GENERIC FLOOD (`floodSize`) NOW HAS THREE READERS (stand/bed/boulevard) — reach for it for any "name this
  contiguous run's extent" tooltip.** `boulevardSize` was one line. Any feature whose interest is *how far it reaches*
  (a marsh, a dune field, a solar farm, an arterial spine) can report `Length/Extent — N` for near-free.
- **A TOOLTIP-LOGIC CHANGE IS GATED BY A DOM PROBE, NOT A PIXEL DIFF — and its "visual" gate is the rendered `#tip`
  card, not the city.** `describeTile()` returns an HTML string, callable in-page on every cell, so the probe asserts
  the exact title/rows across ALL host cells (347/seed) with a control class — far stronger than sampling a few. The
  screenshot only needs to confirm the card *paints*; drive the real cursor and read back `hoverTile` to place it
  honestly (naive world->screen projection snaps to the wrong hex when the host class is dense).

## Iteration 172 — the fourteenth step-back finds a clean city, perf flat (2026-07-12) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/125/130/136/142/147/152/157/162/167/**172**). Not a
domain × kind lap: it reads the WHOLE city for *cumulative* drift the census and per-feature gates are blind to,
runs the season probe + interleaved perf gate, at night AND a season with the day/night baselines pinned OFF
January (`year=2035.62` dry peak; `2035.02` as the seasonal-contrast frame). No city vector taken, so rotation is
unchanged — the next lap (173) owes the stalest domain, **Urban (165)**, then Nature (166)/Civic (168).

**What was read.** Un-zoomed whole-city `wide` frames at **2 seeds × 3 lights/calendars** — seed 42 (warp 61) &
seed 7 (warp 31), each at {day 2035.62/t=0.35, night 2035.62/t=0.90, winter 2035.02/t=0.35}. One subagent per
seed read its own three frames: the cumulative question ("has anything compounded into clutter or darkness?")
plus 108's **locate-don't-judge** night test ("where is the core by light alone?") and a season-distinctness check.

**Result: the city is healthy — both agents VISUAL: PASS.**
- **Night core (115/143) LOCATED off-centre both seeds** — seed 42 ~(0.47,0.55) with a warm-lit tower spine
  (.45,.40)→(.50,.75), seed 7 ~(0.45,0.62) — matching 167 ((.47,.50)/(.50,.62)), 162 ((.48,.53)/(.45,.62)), each
  with a genuine bright-core→dim-mid-ring→dark-rim falloff to a near-black ocean, not a flat wash.
- **All recent vectors sit correctly in the whole frame** — 168's amphitheater performer, 169's tideline gulls,
  170's pier anglers, 171's boulevards — with the pier/ferris/wind-farm on the water plane and the block grid
  still separating cleanly. **No z-order tears / floaters / hard seams / blown-out white / mojibake** in any of the
  6 frames; stat strip + labels crisp both seeds (em-dashes render correctly, no `Â·`). **Winter reads distinct**
  from summer at both seeds (cooler/duller vegetation, more bare-brown farm plots, marginally cooler water) — mild
  by design (120's evergreen/irrigated dilution), clearer at seed 7.

**Season — measured alive.** `probes/probe-season.mjs`: FARM winter→dry-peak **88.4** (matches
130/136/142/147/152/157/162/167), VINEYARD 44.6/36.7/42.7 (139), FOREST 20.6/19.7/**30.7** (autumn holds at 166's
litter level), ORCHARD 25.3/17.8/41.4, MEADOW/SHOREPARK move, PARK/REDWOOD/GARDEN/QUAD near-zero by design (120),
ROAD control **0.5–2.1**. Calendar working; the four-season forest floor (156/166) is real.

**Perf — 168→171 cost ~ZERO.** Interleaved HEAD-171 vs the iter-167 file (`e942152`, A/B/A/B ×3, **min per
variant**, one process so both eat the same machine load): day **35.39 vs 35.17ms** (**+0.6%, flat**) and night
**41.33 vs 41.55ms** (**−0.5%, flat**). So 168 (amphitheater performer, night-only draw) + 169 (gulls, day-only) +
170 (anglers, day-only) + 171 (boulevard tooltip, draw-nothing) added ~nothing measurable — expected, all four are
draw-only/tooltip. NOT re-pinning the stored baseline (it reads inflated on today's load per the reflexive
false-FAIL, 167; re-pin only if an interleave *itself* shows a persistent offset — it has not since 142's real
+2.2%). Census PASS, vacuous (no source edit); tree clean.

**Change (the step-back's product — none to the city).** No compounding defect, so per
120/130/136/142/147/152/157/162/167 ("a clean step-back is a complete iteration — don't force a filler vector")
the output is the health record + header refreshes: step-back pointer 167→172 (next 177), the ninth clean bill,
and the 172 interleaved perf reading. No `solvista.html` edit.

**Verdict — FIXED.** No compounding city defect — the NINTH clean step-back in a row (130, 136, 142, 147, 152,
157, 162, 167, 172). All accumulated visual laws (115/116/120/123 + 138 arterials + 143 CBD peak) still read at
both seeds under all three lights; the season is alive (166's autumn litter still in FOREST's probe, 139's
vineyard moving); perf is flat against the honest interleaved control.

### Findings
- **NINTH CONSECUTIVE CLEAN STEP-BACK — the loop's late-game equilibrium is holding.** Four laps of draw-only /
  tooltip vectors (168 amphitheater, 169 gulls, 170 anglers, 171 boulevards) landed since 167 with ZERO measurable
  perf cost and no cumulative visual drift. The recent surface-not-entities discipline (127's law) keeps adding
  life to *untouched surfaces* (the stage, the tideline, the pier deck) rather than piling more entities into a
  saturated coast — which is exactly why nothing compounds. Pattern: 125→…→167→172.
- **THE INTERLEAVE-VS-A-STEP-BACK-FILE IS NOW THE STANDING PERF METHOD, and it read +0.6%/−0.5% against a file 4
  iters and 5 days old.** The stored baseline remains untouched and would false-FAIL; the only trustworthy number
  is HEAD vs a pinned older commit's file in ONE process. e942152 (iter 167) is the current perf anchor; the next
  step-back (177) should interleave HEAD vs THIS iteration's file to isolate 173–176's cost.
- **Night is still the slowly-accumulating column but it did NOT move this window** — of 168–171 only 168's
  amphitheater performer draws at night, and it is a 1/city landmark often occluded, so night held flat (−0.5%).
  Night remains the column a future step-back watches first (≈41ms/24fps at today's load), but there is no drift to
  act on. No perf-fix iteration owed.

## Iteration 173 — the warehouse roof grows its north-light (2026-07-12) [Urban × Deepen]

**Vector — Urban × Deepen** (next lap owed the stalest domain, Urban, last shipped 165). Adopted and finished a
killed iteration found uncommitted in the worktree at startup: the source had ~3 lines of complete, coherent
draw code (a `## Iteration 173` had never been written, so it died before step 5). Per the "dirty worktree"
protocol — **the gates decide, not the ledger** — I re-verified it, tuned one number the visual agents flagged,
and shipped. Domain × kind matches exactly what the header called for (the last bare roof).

**The seam.** 165 gave COM the mid-rise roof-plant, closing the roof-furniture set across MID (water tanks) /
RES (solar) / TOWER (gardens/helipads) / COM (plant) — the header noted **"only IND (warehouses) has a bare
roof left."** The sawtooth warehouse (`drawBuilding`'s `T.IND` else-branch, ~L4595) drew two white monitor
prisms (`gx-0.17`, `gx+0.19`) with nothing on them — a flat white cap where every other block carries lived-in
roof detail.

**Change (~4 lines, draw-only).** North-light clerestory glazing: a glass band (`colLit('glass',0.6,lit*0.65)`)
up the front face of each sawtooth monitor — the factory's classic clerestory. Glass-grey by day; a **faint warm
work-shift glow after dark** (light industry runs a partial night shift, dimmer than the offices' full-`lit`
glazing above — base 0.6 and a sub-office `lit*0.65` mix keep it restrained). Loft IND keeps its own crown
(this is the sawtooth branch only). No tile / entity / `rng()` / `hashCell` / `tick()` pass / terrain — `colLit`
is plain glass-grey by day and mixes toward warm with the scene `lit`, so pop/stream stay flat and it can't blow
out. All strings pure-ASCII (134). **My one edit to the inherited code:** `lit*0.4` → `lit*0.65`, because both
visual agents independently read the night glow as "cool/subtle, not the intended warm" — a tuning nit they both
still PASSed. The bump warms it while keeping it below the offices.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty; `pop` 154918 (+7, chaotic-CA noise, no `rng()`
touched), `developed`/`roads` +0. Vacuous by construction (draw-only) — the probe is the gate.

**Probe — `probes/probe-clerestory.mjs` (new, promoted).** PATCH(working) vs BASE(HEAD) whole-hex diff over each
warehouse (iter-161 law: every differing pixel over a host hex IS the clerestory, by construction). Rebuilds the
city in-page (`genWorld(seedNum); __warp(WARP); __setTime(t)`, iter-163(c)) so the RAF's wall-clock tick jitter
can't diverge the two builds — this was load-bearing: without it the ROAD control was run-to-run non-deterministic
(0.02%→0.55%). **WARE moves DAY AND NIGHT** — seeds 7/42/1234 day 0.70/1.77/1.20%, night 0.78/1.86/1.30%
(**night > day every seed**, confirming the warmth bump registers after dark). **LOFT control exactly 0.000%**
across all 6 rows (same tile, untouched branch — the decisive clean control) and **ROAD control 0.001–0.020%**
(deterministic once rebuilt). **VERDICT: PASS (3 seeds).**

**Visual — `probes/shot-clerestory.mjs` (new, promoted).** Wheels the artifact's own camera onto the largest
warehouse cluster (IND is sparse, ~2–6/city, and small — fit zoom is invisible) and shoots day+night at both
seeds. Two agents (one per seed), blind, both **VISUAL: PASS** — glazing visible on the roof teeth, sits
correctly (not floating), no z-order tears / floaters / blowout anywhere, whole city still balanced; only nit was
the cool night glow. After the warmth bump a third agent read all 4 night clips: glow now "faint WARM amber/gold,
restrained, not blown out, clearly dimmer than the office/tower windows" — **WARMTH: GOOD**.

**Verdict — DEEPENED.** The last bare roof in the city — every warehouse monitor, flat white for the artifact's
whole life — now carries a north-light clerestory that glows a faint work-shift amber after dark. Roof furniture
is now **truly city-wide** (MID/RES/TOWER/COM/IND). Draw-only, pop+stream flat, ~4 lines + a probe + a shot
script. Urban's Deepen cell gains 173 (38/54/68/92/165/**173**); the next lap (174) owes Nature (166)/Civic (168).

### Findings for later laps
- **A KILLED ITERATION THAT PASSES ITS GATES IS KEPT — and adopting it is a licence to finish it, not just rubber-
  stamp it.** The inherited 3 lines passed census + probe, but both visual agents flagged the night glow as too
  cool. Adopting authorship meant I could take the one-number tune (`lit*0.4`→`0.65`) the original author never
  got to, and re-gate it. The protocol's "keep it" is a floor, not a ceiling.
- **`T` IS THE GLOBAL TILE-TYPE ENUM — NEVER name a probe `page.evaluate` param `T`.** Passing the frame time in as
  `{ T: t }` and destructuring `({...,T})` shadowed the page's `T`, so `c.t === T.IND` became `c.t === (0.35).IND
  === undefined` and matched ZERO cells (nWare→0) with no error — a silent all-zero probe. Cost a debugging lap.
  Use `TOD`/`WARP`/`RX` — anything but a single capital that collides with the artifact's globals (`T`, `G`, `LIT`).
- **A BUILD-VS-BUILD DIFF PROBE THAT COMPARES TWO SEPARATELY-LOADED FILES MUST REBUILD IN-PAGE (iter-163(c)) OR ITS
  CONTROLS ARE NON-DETERMINISTIC.** The clerestory signal (WARE) and the same-branch LOFT control were stable
  without the rebuild, but the ROAD control — cells the RAF keeps upgrading between load and freeze — swung 0.02→0.55%
  run to run and false-FAILed. `genWorld(seedNum);__warp(WARP);__setTime(t)` pins a byte-identical city; without it,
  any control on a CA-mutated tile class (ROAD/RES/upgrades) is noise. (LOFT held because loft-conversion had
  saturated by warp 61 — a control on a *settled* class survives the jitter; a control on a *live* one does not.)
- **The roof-furniture set is now CLOSED across all 5 developed building types (MID/RES/TOWER/COM/IND).** A future
  "bare roof" Urban vector has no host left; Urban Deepen must go elsewhere (facades, ground plane, the harbour
  works apron). Don't propose more roof clutter.


## Header bullets rotated out of GROWTH.md (superseded, at iter 183)

- **120 broke rotation deliberately and logged why**: it was the mandated holistic step-back, the step-back
  found a real defect, and the skill's own rule ("if something compounded badly, spend the next iteration
  FIXING it") outranks rotation. A step-back that finds a defect and then ships an unrelated vector has wasted
  the step-back. (Principle now promoted to SKILL.md.)
- **Every domain except Sky now has an Interaction/UX vector** (133 filled Urban's via cue (l); 118 had closed
  cue (j)). — SUPERSEDED: Sky gained its Interaction/UX vector at 144 (the moon HUD card), and Nature's grew
  to 117/129/148/183; every domain now has one.

## Iteration 174 — the cut fields keep their hay bales (2026-07-12) [Nature × New element]

**Vector — Nature × New element** (next lap owed the stalest domain, Nature, last shipped 166). The forest
floor is over-worked (156 spring bloom, 166 autumn litter — a full four-season floor), so I went to Nature's
biggest *untouched* surface instead: the FARM belt (~150 fields, the strongest seasonal mover, winter→dry-peak
88). 127's law — "additive inventory spent" is a claim about a domain's *entities*, not its *surfaces*.

**The seam.** The farm draws its own crop calendar (`cropRGB`, iter 108/57 lineage): a field greens → ripens
to `straw` → is **cut** to `stubble` (ph 0.80–0.90) → is ploughed back to `soilDk` (ph 0.93–0.995). The
palette even carries `straw`/`stubble` with a comment naming "then ripe, then cut" — but the cut left the field
**bare**: nothing marked the harvest. The post-cut stubble window was an empty surface with a name already in
the palette.

**Change (~11 lines, draw-only).** When a FARM cell's per-cell phase `ph` is in the post-cut window
(`0.82<ph<0.95`) and `hashCell(x,y,70)<0.62` (thins to ~60% of fields for variety), scatter `1+(hashCell·3)`
rolled hay bales: a soft contact-shadow ellipse (house-style, per 137), a `straw` body ellipse (the golden roll
on its side), and a darker `stubble` end-cap arc (the curled end). Placement is `hashCell`-scattered so it
perturbs nothing — no `rng()`, no terrain, no `tick()` pass. The bales inherit the scene `col()` tint, so they
darken with night and can't blow out; not day-gated (bales sit in the field round the clock, like the barn).
All strings pure-ASCII (134). The window sits at ph≈0.88 ≈ autumn (`applySeason`'s .87 keyframe), so bales
appear at harvest and are gone by winter — the field's own calendar drives them, so the belt bales as a
patchwork (each field ±2.5 weeks off its neighbours via the existing `v` phase offset), never all at once.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty; all entity/tile counts flat. Vacuous by
construction (draw-only, no `rng()`/terrain) — the probe is the gate.

**Probe — `probes/probe-haybale.mjs` (new, promoted).** PATCH(working) vs BASE(HEAD) whole-hex diff over each
FARM cell (iter-161 law: every differing pixel over a host hex IS the bales, since the crop colour reads the
same `year` in both builds). Rebuilds the city in-page (`genWorld;__warp;__setYear;__setTime`, iter-163(c)) so
RAF tick jitter can't diverge the builds. **The strong control is a CALENDAR control, not just a tile control:**
at **harvest** (`year=2035.88`) FARM diffs **2.07/1.88/1.84%** (seeds 7/42/1234) — bales present; at **summer**
(`year=2035.40`) FARM diffs **exactly 0.000%** all three seeds — no field is post-cut, so no bale is drawn in
either build, isolating the bale from the crop-colour calendar. ROAD tile control **~0.00–0.02%** at both
calendars. **VERDICT: PASS (3 seeds).**

**Visual — `probes/shot-haybale.mjs` (new, promoted).** Wheels the artifact's own camera onto the densest FARM
cluster (farms are scattered and bales are ~2px, so fit zoom shows nothing) and **freezes the calendar in-page**
at year 2035.88/2035.90 for the final frame (discrete-seasonal freeze law — `?year=` alone drifts a season
during the `playing=true` wait). Two agents (one per seed), blind: both **VISUAL: PASS** — golden bales visible
on the stubble field faces, sitting correctly on the iso plane (not floating, not off-edge), reading as rounded
bales with a highlight/shade (not flat specks), distinct from the pre-existing coral/purple crop dots; no
z-order tears / floaters / blowout; whole belt still balanced, "bales add harvest texture without clutter." One
un-zoomed whole-city frame (third agent): city reads balanced/beautiful, no tears/darkness/mojibake, stat strip
crisp.

**Verdict — SHIPPED.** The farm belt's calendar had a cut phase named in the palette since forever but nothing
in the field to show for it; now the weeks after each harvest carry rolled golden bales, patchworked field by
field. Draw-only, pop+stream flat, ~11 lines + a probe + a shot script. Nature's New element cell gains 174
(4/26/29/102/156/**174**); the next lap (175) owes Civic (168).

### Findings for later laps
- **A CALENDAR CONTROL is stronger than a tile control for a SEASONAL draw-only feature.** Diffing PATCH vs BASE
  over the host tile at the harvest calendar proves *something* changed; diffing the SAME tile at a non-harvest
  calendar (summer, 0.000%) proves the change is the *bale* and not the crop colour, which reads `year` in both
  builds and would otherwise pollute any single-calendar FARM diff. For any seasonally-gated feature, add the
  off-season calendar as the control, not just an off-tile.
- **The palette often names a phase the draw never showed.** `straw`/`stubble` existed with a comment "ripe,
  then cut" for the artifact's whole life, but the cut field was bare. A named-but-unshown palette entry (or a
  named-but-unshown draw state) is a cheap New-element seam — the intent is already recorded; you just draw it.
  Where else does a palette/comment name a state the pixels skip?
- **Nature's forest floor is a four-season CLOSED surface (156/166); its next big surface is the FARM belt
  (174 opened it).** The belt still has room: post-cut bales are shipped, but a harvest could also stack sheaves,
  and the barn (v>0.9) is a lone object — a farm New element / Deepen has host left. Garden (2 hexes) and meadow
  (6 hexes) remain too small to buy pixels; prefer FARM/FOREST for Nature surfaces.

## Iteration 175 — the parliament floodlights its facade (2026-07-12) [Civic & culture × Deepen]

**Vector — Civic × Deepen** (SHIPPED). Rotation named the domain — the 174 lap left Civic (last SHIP 168) the
stalest owed lap. Kind: **Deepen**, the banked Civic candidate from 168's findings ("museum/parliament
floodlights — the museum already floodlights at dusk; parliament does not. Next Civic Deepen candidate"). It also
fits the coherent night-mood run the recent Civic/Sky/Water laps built (moon 135, stars 153, observatory 158,
biolum surf 159, amphitheater concert 168). Draw-only, so a guaranteed-flat ship.

**The seam.** `case 'museum'` (L4731) draws a **floodlit facade** at dusk — a warm `rgba(255,222,160,·)` wash up
its front (L4751-4754) under `if(LITAMT>0.3)`. The **parliament** (L4934, the grander building — `th=34`, the
"tallest civic roof", a full colonnade + grand gold dome) lit only its **dome + lantern beacon** at night
(L4949-4953); its colonnade facade stayed dark. So the two grandest civic landmarks were lit inconsistently: the
lesser one floodlit, the greater one dark below its dome. Parliament is sited 2034, present in the 2035 census
slices, 1/city (census tile histogram confirms).

**Change (~9 lines, draw-only).** Inside the parliament's existing `LITAMT>0.3` night block, before the dome
uplight (so the dome glow overlays crisp): a warm floodlight polygon washing up the colonnade facade, mirroring
the museum's method but on the parliament's own front-face geometry (half-extents 0.37x0.32, up to the body top
`hb`). Warm cream `rgba(255,224,165,0.16*LITAMT)` — a touch dimmer than the museum's 0.18 since the parliament
already carries the dome uplight, keeping it below blowout. No tile / entity / `rng()` / `hashCell` / `tick()`
pass / terrain; `LITAMT` is a scene global, so pop + stream stay flat. All strings pure-ASCII (134).

**Census.** PASS, exit 0, pageerrors 0. Tile histogram empty, all core metrics +0, entity counts identical.
Vacuous by construction (a night-only draw at the t=0.35 daytime census frame draws nothing) — the probe is the
gate. (`greenRoofs -1` is documented chaotic-CA headless wobble; the change touches no `rng()`.)

**Probe — `probes/probe-parliament.mjs` (new, promoted; adapted from `probe-amphi.mjs`, the 1/city-landmark
template).** Diffs PATCHED vs pristine HEAD at the SAME frozen frame (`time` pinned, every mover cleared per the
tramwire law), camera-zoomed onto the 1/city parliament hex so the facade is unoccluded, ROAD as the zero
control, night vs a day control. **seeds 42/1234/3/88/7: FACADE changed 37.9/23.9/37.8/37.9/37.8% at NIGHT ->
0.00/0.17/0.00/0.00/0.00% in DAY** (gate off -> byte-identical), **ROAD control 0.00-0.58%** both frames. All 5
measurable (none occluded this run). **VERDICT: PASS (5 seeds).**

**Visual — `probes/shot-parliament.mjs` (new, promoted).** Camera-zooms the 1/city parliament, night + a day
control, both seeds. Two agents (seed 42, seed 1234), blind, both **VISUAL: PASS** — NIGHT shows a warm
amber/golden wash across the colonnade bays below the dome (pooling at the steps), DAY the same colonnade reads
as plain pale/white stone with cool shadows; the dome keeps its separate uplight in both; no z-order tears /
floating light / white-clipping (amber, not blown out); reads as a coherent floodlit monument, not a glowing
blob. Whole-city `wide` NIGHT (seed 42, third agent): balanced coherent coast, core located by light alone at
**(0.47, 0.55)** — matching 162/167/172's night-core reads, so no lighting drift — sea reads, no
tears/blowout/mojibake, stat strip crisp. **VISUAL: PASS**.

**Verdict — DEEPENED.** The parliament — the city's grandest civic roof, lit only at its dome after dark for the
artifact's whole life — now floodlights its colonnade facade at night, matching the museum's dusk floodlight and
joining the night-mood run. Draw-only, pop + stream flat, ~9 lines + a probe + a shot script. Civic's Deepen cell
gains 175 (36/59/66/80/91/149/158/**175**); Civic is no longer stalest (Water 169 now is — the next lap, 176,
owes it).

### Findings for later laps
- **THE ASSERTS-INCONSISTENCY tell has a SYMMETRY form: two kindred hosts drawn inconsistently.** 168 found the
  amphitheater's label promised what its draw omitted (asserts-more-than-it-draws). 175 is the sibling: two
  *drawn* landmarks (museum, parliament) that should share a treatment (dusk floodlighting) but didn't — the
  lesser one had it, the greater didn't. Where else do two kindred civics/tiles carry a night/day/seasonal
  treatment on one but not the other? (The 168 findings also bank the **firehouse bell** and note the
  **museum already floodlights** — parliament is now done, so the remaining civic-night-treatment gap is the
  firehouse bell, weaker per 168.)
- **The night-mood Civic/Sky/Water run is getting full** (moon 135, stars 153, observatory 158, biolum 159,
  amphitheater 168, parliament 175). Each has been a single landmark or a sparse field, so none compounds into
  city-wide night clutter — but a future night-glow vector should check the whole-frame night read (still clean
  at 175: core (0.47,0.55), no over-bright bloom) before adding a sixth+ glow. Prefer a DAYTIME or non-glow
  Civic move next if Civic comes up again soon.
- **`probe-amphi.mjs` is now the reusable template for any 1/city night-lit civic landmark** (camera-zoom the
  single host, night-vs-day diff, ROAD control, occlusion=SKIP). `probe-parliament.mjs` adapted it in minutes:
  swap the `c.kind` filter, bump `R` for a taller host, keep the rest. For the next single-civic draw/light
  vector, clone one of these two rather than writing a probe from scratch.

## Iteration 176 — the river names its course (2026-07-12) [Water & coast × Interaction/UX]

**Vector — Water & coast × Interaction/UX** (SHIPPED). Rotation named the stalest domain, **Water** (last SHIP
169; the 175 entry explicitly owed the 176 lap to Water). Kind: **Interaction/UX**, Water's stalest cell (only
97, 141 — and the stalest I/UX across all domains: Nature 148 · Urban 133 · Civic 140 · Sky 144 · People 154 ·
Transport 171 · **Water 141**). A draw-nothing tooltip vector — guaranteed-flat pop, and it varies hard off the
recent New element (169/170) / Deepen (175) / New element (174) run.

**The seam — the asserts-LESS-than-the-code-knows tell (117/122/129/148/171), in its Interaction form.** The
**river** is the city's biggest water feature and the spine of its most-compounded system (banks → bridges →
marsh → herons → kayaks), yet `describeTile`'s river branch (L6397) gave it the **barest tooltip in the artifact**:
a flat `title='River'` / `sub='Fresh water winding down to the sea.'` with **zero data rows** — while the
boulevard (171), the woods stand (117) and the kelp bed name their own extent via `floodSize`. The draw knew the
whole waterway; the label named nothing about it.

**Change (~18 lines: a `riverCourse(x,y)` helper + a 2-line data-row push, tooltip logic only).** A river hex now
carries a **`Course — N hexes`** row = the whole waterway's open-water hex count. `riverCourse` is a **bridge-aware**
flood: a bridge is a ROAD drawn over the river (genWorld L624; the L1633 rule also paves dense stretches into
bridge-road), so a naive `riv`-only flood **fragments the course at every span** — the flood therefore *steps
through* `bridge` road to keep the reach continuous, but counts only WATER hexes (every counted hex is one you can
see as river). Sea water (`WATER && !riv`) never qualifies, so the flood **stops at the mouth** and can't walk the
coast highway. No tile / entity / `rng()` / `hashCell` / `tick()` pass / terrain / canvas draw; strings pure-ASCII
(134). Pop + stream provably flat.

**Considered and DROPPED — a `Crossings` row.** The bridge-aware flood also *counts* the spans, so a
`Crossings — N bridges` row was the obvious companion. A check (`probe-bridgecheck`, ad-hoc, deleted) killed it:
raw bridge-**cell** counts wildly over-report (seed 7's longest course = 37 bridge cells but only **4** distinct
connected components), and the L1633 rule *paves river water into bridge-road* in dense downtown, so a "bridge"
component conflates a transverse crossing with a longitudinal covered stretch — no honest single number. Course
(open-water hexes) has none of that murk. Shipped the clean single datum, exactly as boulevard/stand/bed do; a
distinct-crossings count is banked below if it ever earns a Deepen.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, entity/tile counts
identical (`greenRoofs -1` = documented chaotic-CA headless jitter, touches no `rng()`). Vacuous by construction
(a tooltip-only change draws nothing) — the probe is the gate.

**Probe — `probes/probe-river.mjs` (new, promoted).** A DOM/logic probe (the change is pure tooltip logic). Per
122's law — a tooltip vector must check its claim against **independently recomputed truth**, not just that it
renders — the probe re-implements the bridge-aware flood itself (its own predicate + count, using only the grid
topology `nbrs6`) and asserts describeTile's printed N equals that recompute; calling `riverCourse` would only
prove the row renders. **TARGET** every river hex titles `River` AND carries a `Course N hex(es)` row == the
independent flood (>=1). **CONTROL** every SEA hex titles `Ocean`, carries a `Depth` row, and carries **no**
`Course` row; the flood must also never count a sea hex (**sea-leak guard**). seeds 7/42/1234: river
**111/48/95** hexes, named+course **OK 111/111 · 48/48 · 95/95**, course-mismatch **0**, **sea-leak 0**; sea
control clean **630/630 · 639/639 · 647/647** (bad 0); longest course **61/48/58** hexes. **VERDICT: PASS (3 seeds).**

**Visual — `probes/shot-river.mjs` (new, promoted).** shoot.mjs can't hover, so it drives Playwright directly:
finds a mid-course on-screen river hex, aims the real cursor at it, screenshots the rendered tooltip, and prints
its text. seeds 42/1234 render `River · Fresh water winding down to the sea. · Course 48/58 hexes`, pageerrors
none. Two agents (one per seed), blind, both **VISUAL: PASS** — tooltip box crisp and legible, correct three-line
content, no clipping / overlap garbage / mojibake; cursor sits on a blue river hex; whole-city `wide` (seed 42,
same agent) reads balanced and beautiful, no z-order tears / floaters / blowout.

**Verdict — SHIPPED.** The river — the artifact's biggest waterway and the barest tooltip in the city — now names
its own course, the same extent-flood the boulevard, the woods and the kelp bed use. Draw-only, pop + stream flat,
~18 lines + a probe + a shot script. Water's Interaction/UX cell gains 176 (**97**, **141**, **176**); Water is no
longer stalest (Sky 161 now is the stalest number, but post-saturation; the next domain lap owes People (170) /
Transport (171)).

### Findings for later laps
- **THE ASSERTS-LESS-THAN-THE-CODE-KNOWS TELL HAS A NAKED form: a tile whose tooltip has NO data rows at all.**
  117/122/129/148/171 all found a tooltip that named *some* things but omitted one; the river named *nothing* —
  a bare title+sub over the city's richest water system. When rotation lands on a mature domain, grep
  `describeTile` for the branches that push zero `data` rows; those are the barest, highest-yield tells.
- **A NAIVE FLOOD FRAGMENTS AT ANYTHING THAT INTERRUPTS THE PREDICATE — make the flood aware of the interrupter.**
  The river's `riv` water is split by bridge-road (genWorld L624 + the L1633 pave-over rule), so `floodSize(riv)`
  would have reported a stub for most hovers. Stepping the flood *through* the interrupter while counting only the
  real cells keeps the extent honest. Reuse this shape for any linear feature crossed by a different tile type
  (a promenade broken by a plaza, a rail line through a station).
- **A COUNT IS ONLY HONEST IF ITS UNIT IS UNAMBIGUOUS — check the connected-components before shipping "N of X".**
  The `Crossings` row died because bridge *cells* (37) ≠ distinct crossings (4 components), and the L1633 rule
  makes a component either a real span or a covered stretch — two meanings, one number. When a candidate datum
  counts cells of a clustered feature, count its connected components first (a 20-line ad-hoc probe) and confirm
  the unit is what the label claims. Prefer the datum whose unit is unambiguous (open-water hexes) over the one
  that reads well but can't be defined cleanly.
- **STILL banked for Water (123, unchanged):** the pier/lifeguard tower are still `rng()`-salted — site them on a
  depth by respending their draws, but VARY 123's site-on-depth mechanism. And a distinct-crossings river datum
  (connected-component count, filtering longitudinal covers) is a possible future Water Deepen if it earns the
  ambiguity cost.

## Iteration 177 — the fifteenth step-back finds a clean city, perf flat (2026-07-12) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/125/130/136/142/147/152/157/162/167/172/**177**). Not a
domain × kind lap: it reads the WHOLE city for *cumulative* drift the census and per-feature gates are blind to,
runs the season probe + interleaved perf gate, at night AND a season with the day/night baselines pinned OFF
January (`year=2035.62` dry peak; `2035.02` as the seasonal-contrast frame). No city vector taken, so rotation is
unchanged — the next lap (178) owes the stalest domains, **People (170)/Transport (171)**.

**What was read.** Un-zoomed whole-city `wide` frames at **2 seeds × 3 lights/calendars** — seed 42 (warp 61) &
seed 7 (warp 31), each at {day 2035.62/t=0.35, night 2035.62/t=0.90, winter 2035.02/t=0.35}. One subagent per
seed read its own three frames: the cumulative question ("has anything compounded into clutter or darkness?")
plus 108's **locate-don't-judge** night test ("where is the core by light alone?") and a season-distinctness check.

**Result: the city is healthy — both agents VISUAL: PASS.**
- **Night core (115/143) LOCATED off-centre by light alone both seeds** — seed 42 ~(0.48,0.50), seed 7 ~(0.53,0.60)
  — matching 172 ((.47,.55)/(.45,.62)), 167 ((.47,.50)/(.50,.62)), 162 ((.48,.53)/(.45,.62)); each a genuine warm
  bright-core → dim residential mid-ring → dark rim → near-black ocean falloff, not a flat wash, with lit transit
  lines threading out (138 arterials hold).
- **All recent vectors sit correctly in the whole frame** — 173's warehouse north-light, 174's hay bales, 175's
  parliament floodlight, 176's river tooltip (draw-nothing) — with pier/ferris/wind-farm on the water plane and the
  block grid still separating cleanly. **No z-order tears / floaters / hard seams / blown-out white / mojibake** in
  any of the 6 frames; stat strip + labels crisp both seeds (`·` renders correctly, no `Â·`). **Winter reads
  distinct** from summer at both seeds (bare/stubble-striped farm plots, duller desaturated vegetation) — mild
  California winter by design (120's evergreen/irrigated dilution), no snow.

**Season — measured alive.** `probes/probe-season.mjs`: FARM winter→dry-peak **87.6** (matches
130/136/142/147/152/157/162/167/172), VINEYARD 44.6/36.7/42.7 (139), FOREST 20.6/19.7/**30.7** (autumn holds at
166's litter level), ORCHARD 25.3/17.8/41.4, MEADOW/SHOREPARK move, PARK/REDWOOD/GARDEN/QUAD near-zero by design
(120), ROAD control **0.5–2.1**. Calendar working; the four-season forest floor (156/166) is real.

**Perf — 173→176 cost ~ZERO.** Interleaved HEAD-176 vs the iter-172 file (`3d0e876`, A/B/A/B ×3, **min per
variant**, one process so both eat the same machine load): day **34.44 vs 34.5ms** (**−0.2%, flat**) and night
**40.55 vs 40.44ms** (**+0.3%, flat**). So 173 (warehouse clerestory, day roof draw) + 174 (hay bales, day-only) +
175 (parliament floodlight, night-only) + 176 (river tooltip, draw-nothing) added ~nothing measurable — expected,
all four are draw-only/tooltip. NOT re-pinning the stored baseline (it reads inflated on today's load per the
reflexive false-FAIL, 167; re-pin only if an interleave *itself* shows a persistent offset — it has not since
142's real +2.2%). Census PASS, vacuous (no source edit); tree clean.

**Change (the step-back's product — none to the city).** No compounding defect, so per
120/130/136/142/147/152/157/162/167/172 ("a clean step-back is a complete iteration — don't force a filler
vector") the output is the health record + header refreshes: step-back pointer 172→177 (next 182), the tenth clean
bill, and the 177 interleaved perf reading. No `solvista.html` edit.

**Verdict — FIXED.** No compounding city defect — the TENTH clean step-back in a row (130, 136, 142, 147, 152,
157, 162, 167, 172, 177). All accumulated visual laws (115/116/120/123 + 138 arterials + 143 CBD peak) still read
at both seeds under all three lights; the season is alive (166's autumn litter still in FOREST's probe, 139's
vineyard moving); perf is flat against the honest interleaved control.

### Findings
- **TENTH CONSECUTIVE CLEAN STEP-BACK — the loop's late-game equilibrium is holding.** Four more laps of draw-only /
  tooltip vectors (173 warehouse north-light, 174 hay bales, 175 parliament floodlight, 176 river course tooltip)
  landed since 172 with ZERO measurable perf cost and no cumulative visual drift. The surface-not-entities /
  deepen-what-exists discipline keeps adding life to *untouched surfaces & existing systems* (a roof, a stubble
  field, a facade, a tooltip) rather than piling more entities onto a saturated coast — which is exactly why
  nothing compounds. Pattern: 125→…→172→177.
- **THE INTERLEAVE-VS-A-STEP-BACK-FILE IS NOW THE STANDING PERF METHOD, and it read −0.2%/+0.3% against a file 5
  iters old.** The stored baseline remains untouched and would false-FAIL; the only trustworthy number is HEAD vs a
  pinned older commit's file in ONE process. **3d0e876 (iter 177's anchor was iter 172) — the next step-back (182)
  should interleave HEAD vs THIS iteration's file (Iter 177 / whatever 181 leaves) to isolate 178–181's cost.**
- **Night is still the slowly-accumulating column but it did NOT move this window** — of 173–176 only 175's
  parliament floodlight draws at night, and it is a 1/city landmark often occluded, so night held flat (+0.3%).
  Night remains the column a future step-back watches first (≈40.5ms/24fps at today's load), but there is no drift
  to act on. No perf-fix iteration owed.

## Iteration 178 — the festival streets fill with people (2026-07-12) [People & activity × Deepen]

**Vector.** People & activity × **Deepen** (SHIPPED). Rotation named the stalest domain: 178 owed **People (170)**
or **Transport (171)**; People is staler by number. Kind varied off People's recent run — New element (170), Polish
(163), Interaction/UX (154) — to a **Deepen** that *interconnects* People with an existing **Civic** system (the
highest-yield move per the skill). Last People Deepen was 145 (beach furniture sun); Deepen is globally hot but the
domain rotation is what's binding here.

**The seam — a drawn Civic system that no person ever used.** Since long before the ledger, `tick()` (L1853)
computes `c.fete`: where two civic institutions front the same short stretch of street, the blocks between them
string up **bunting** (a "civic mile"), drawn as pennants + evening lights (L4133). But the festival street stood
**empty for the artifact's whole life** — bunting over a lifeless road. Populating it is a clean People×Civic
interconnect. Confirmed at scale first (dead-code law): `c.fete` = **10/16/19 cells** on seeds 42/7/1234 (`node -e`
count), a real host, not dead code.

**Change (~24-line draw, all draw-only).** Inside the `if(c.fete)` block, after the bunting: a small crowd of
festival-goers on each fete cell. Up to 5 figures, `hashCell`-gated (`seedNum^0x3F1A>0.68` skip) so counts vary,
scattered in an ellipse around the cell centre (`hashCell` angle + radius 2.0–5.6px) with a gentle `Math.sin(time)`
sway; body colour from `coral/gold/teal/lav/sage`; house-style `shadS` contact shadow at the feet (137/163). Day
fade `faa=clamp((0.82-LITAMT)/0.28,0,1)` on the slow light clock — the crowd is out by **day and into the dusk**
(when the strand lights up), then **home by deep night** (a rhythm, not a strobe; matches the anglers/umbrellas).
No tile, entity array, `rng()`, `hashCell`-terrain, `tick()` pass or terrain change; strings pure-ASCII (134). Pop
+ stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, entity counts identical
(`towerHt +1` = documented RAF tick-count jitter). Vacuous by construction (draw-only) — the probe is the gate.

**Probe — `probes/probe-fetecrowd.mjs` (new, promoted).** Diffs PATCH vs HEAD over the `c.fete` ROAD cells' screen
boxes at a frozen frame, day + night, with non-fete ROAD cells as the control. seeds 7/42/1234: **FETE crowd DAY
2.92% / 3.10% / 3.62% → NIGHT 0.00% / 0.00% / 0.00%** (faa→0, byte-identical); **ROAD control 0.00–0.01%** at both
frames. **PASS (3 seeds).** First cut of the probe read the night control at **77–88%** — the **163 load-timing
law**: the RAF loop runs a variable number of `tick()`s between load and freeze, so the *loaded* developed city
differs run to run. Rebuilding in-page (`genWorld(seed)` + `__warp(61)`) plus clearing the unseeded `STARS` field
and stubbing `Math.random` (163 law d) made the night frame byte-identical and collapsed the control to ~0 — the
crowd's absence at night is now proven, not swamped by non-reproducibility.

**Visual.** Downtown clip + whole-city `wide`, day, seeds 42 & 7. Two agents, both **PASS**: festival bunting found
in the civic core with **little standing figures clustered on the road beneath it**, feet grounded on the hex grid,
contact shadows reading; **no z-order tears, floaters, or blown-out color** anywhere; whole frame still a balanced,
bright coastal city (towers/parks/river/beach/pier all coherent), the crowds adding life without clutter.

**Verdict — SHIPPED.** The civic mile — bunting-strung but deserted for the artifact's whole life — now fills with a
day-and-dusk crowd milling under the pennants, and empties by deep night. A People×Civic interconnect on a drawn
system nobody used: draw-only, pop + stream flat, ~24 lines + a probe. People's Deepen cell gains its next (34, 64,
93, **104**, **119**, **145**, **178**); People is no longer stalest (Transport 171 now is). The next domain lap
(179) owes **Transport (171)**, then the step-back at **182**.

### Findings for later laps
- **A DRAWN CA-DERIVED SURFACE CAN BE FULLY RENDERED YET NEVER *INHABITED* — that gap is a clean People×domain
  interconnect.** `c.fete` had bunting, evening lights, its own tick-pass derivation, and a census stat, but no
  person had ever stood on it. Populating a *drawn-but-lifeless* surface (like 127's PARK picnics on 878 empty
  hexes) is the surface-not-entities move aimed at an existing SYSTEM rather than raw terrain — and it's a Deepen,
  not a New element, because it enriches something already there. Look for other drawn-but-empty surfaces: does
  anyone ever *use* the amphitheater stage (168), the observatory terrace, the market stalls?
- **THE 163 LOAD-TIMING LAW BITES ANY PATCH-vs-HEAD DIFF AT A DEVELOPED, NIGHT FRAME — rebuild in-page BY DEFAULT.**
  The first probe cut read a 77–88% *control* at night purely because the two loads had ticked a different number
  of times. Day happened to be clean (control 0.02%), which is a trap: a probe that passes its day control but not
  its night one is not "half working," it is *non-reproducible* and its day number is luck. Start every build-vs-
  build probe with `genWorld(seed); __warp(N); STARS.length=0; Math.random=()=>0.5` — don't wait for the night
  control to expose the non-determinism.
- **171 BANKED the fete-street TOOLTIP as a future Interaction vector (`c.fete` drawn but unnamed in `describeTile`)
  — STILL OPEN and now more worth cashing**, since the street it names is no longer empty. A treed road became a
  `Boulevard`; a fete road could name itself the festival mile with a `Festival — links <A> and <B>` row (the two
  institutions its `feteId` chain runs between). Deliberately left out of 178 to keep this a pure People Deepen and
  not poach 171's banked Interaction seam.

## Iteration 179 — the bridges light their lamps at night (2026-07-12) [Transport × Deepen]

**Vector.** Transport × **Deepen** (SHIPPED). Rotation named the stalest domain, **Transport (171)** (178 was the
People lap). Kind varied off Transport's recent run — Interaction/UX (171), New element (164), Polish (146) — to a
**Deepen** that *interconnects* Transport with **Water** (the reflection). The vehicle/road/monorail/gondola
systems are all measured-saturated; the seam here was a genuine *gap*, not another ornament.

**The seam — the one unlit road in the city.** The `T.ROAD` draw grew a rich night layer over many laps: arterial
lit corridors, ordinary-street lamp glows, boulevard lamps. But the **bridge sub-case breaks early** (L4023) —
`hexTile` water + a timber deck prism + a white railing band, then `break;` — *before* the `if(LITAMT>0.25)`
street-lamp block ever runs. So for the artifact's whole life every bridge went **pitch dark at night** while the
streets it joined glowed on both banks: a span of black cutting the warm river. Confirmed a real host first
(dead-code law): census `bridges` = **4–60 per era-cell**, 266 across the matrix, 20–60 in developed eras.

**Change (~14-line draw, all draw-only, inside `if(c.bridge)` before the break).** Gated `LITAMT>0.25` to match the
street lamps: two warm **rail lamps** (bright head + soft halo) atop the deck at its two span-ends (`hx2/hy2` from
the same `ew`/`0.52`·`HW`/`VR` extents the deck prism uses, so they land on the deck, not off it), plus a warm
**reflection** ellipse on the water just in front of the deck that breathes with `waveT` (the Transport×Water
interconnect). No tile, entity array, `rng()`, `hashCell`-terrain, `tick()` pass or terrain change; warm rgba only,
strings pure-ASCII (134). Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, `bridges 266` unchanged,
entity counts identical (`greenRoofs -1`/`towerHt +1` = documented RAF tick-count jitter, touches no `rng()`).
Vacuous by construction (draw-only) — the probe is the gate.

**Probe — `probes/probe-bridgelamp.mjs` (new, promoted).** Diffs PATCH vs HEAD over the `c.bridge` ROAD cells'
screen boxes at a frozen frame, **night + day**, with non-bridge ROAD cells as the control. Rebuilt in-page
(`genWorld`+`__warp`), `STARS` cleared, `Math.random` stubbed, movers cleared, clock frozen (163 law) so the night
frame is reproducible. seeds 7/42/1234: **BRIDGE lamps NIGHT 8.11% / 7.52% / 7.43% → DAY 0.00% / 0.00% / 0.00%**
(LITAMT 0.02, byte-identical, no draw); **ROAD control 0.00%** at both frames, all three seeds (20–60 bridges each).
**PASS (3 seeds).**

**Visual.** Night `wide` + `downtown`, seeds 42 & 7. Two agents, both **PASS**: warm paired rail lamps found on the
deck of every river crossing, sitting on the deck (not floating), the reflection reading as an *attached* smudge
under the deck edge, towers correctly occluding decks (z-order intact); **no tears, floating lamps, or blown-out
blobs**; the whole night frame still a balanced coastal city (streets/windows warm, sky + water dark, moon clear) —
the lamps fill in the previously-dark bridges rather than adding clutter.

**Verdict — SHIPPED.** The one road that went dark at night — the bridge deck, which `break`s before the street-lamp
block — now lights its rail lamps and casts them warm on the river, joining the night-lit street network across the
water. A Transport×Water interconnect: draw-only, pop + stream flat, ~14 lines + a probe. Transport's Deepen cell
gains its next (…155, **179**); Transport is no longer stalest (Urban 173 now is). The next domain lap (180) owes
**Urban (Deepen/Polish only — measured-saturated)**, then the step-back at **182**.

### Findings for later laps
- **AN EARLY `break` IN A DRAW CASE CAN STARVE A SUB-VARIANT OF A WHOLE LAYER THE MAIN PATH GREW LATER.** The bridge
  sub-case was written before the road's night-lamp layer existed, and its `break;` meant every lamp/corridor pass
  added afterward silently skipped the bridges — a dark seam nobody noticed for the artifact's life because the
  per-feature visual gate always zoomed on the *new* lamp, never re-read the bridge. When a tile has a `break`-ing
  sub-case (bridge, station, forecourt…), check what shared later blocks it forfeits. Candidates to audit: does the
  bridge deck get street *trees*/*fete*/*treed* handling? (It breaks before all of them.)
- **A REFLECTION IS THE CHEAPEST Transport×Water INTERCONNECT AND IT READS AT FIT.** A warm ellipse on the water in
  front of a lit structure, `waveT`-modulated, costs one `ellipse` and turns an isolated light into a light *on the
  scene*. Anything that lights up beside water (the pier, lifeguard tower, a harbour crane, a moored ship) can pool
  a reflection for near-free — and unlike a thin ribbon, a glow-on-dark-water clears the contrast×width bar at fit.

## Iteration 180 — the towers ground their own weight (2026-07-12) [Urban fabric × Polish]

**Vector.** Urban fabric × **Polish** (SHIPPED). Rotation named the stalest domain, **Urban (173)** — the header owed
the 180 lap to Urban, Deepen/Polish only (Urban is measured-saturated: additive spent 118, Connect measured-hard twice
160/165, roof-furniture closed city-wide). Kind varied HARD off the globally hot **Deepen** streak (173/175/178/179 all
Deepen) to a **Polish** — improve something already there, add nothing. Urban's last Polish was 143.

**The seam — one shadow blob for every building, tower or bungalow.** `drawBuilding` opens with
`shadowEl(gx,gy,0.42,0.13)` (L4321) — a **fixed** centered contact ellipse dropped under every RES/MID/COM/TOWER cell,
regardless of mass. So a 150-unit ziggurat and a 9-unit house cast the **identical** ground shadow for the artifact's
whole life, while every *other* diorama element responds to its context (umbrellas follow the sun 145, glitter 150,
crowds cast shadows 137/163). The house style for shadows is a **centered** contact ellipse everywhere (cars, peds,
crowds, trees all use `shadS`), so a directional rake was rejected as style-breaking — the right Polish keeps it
centered and sizes it to the building's mass.

**Change (2 lines, draw-only).** `shf=clamp((h-9)/120,0,1)` (0 for houses, ~1 for the tallest towers) now scales the
shadow: `shadowEl(gx,gy, 0.42+shf*0.52, 0.13+shf*0.10)` — a house keeps the old 0.42/0.13 blob, a tall tower grounds
on a 0.94-radius, 0.23-alpha pool. Still a centered ellipse in the house style, radius capped so a dense core grounds
without darkening into clutter. No tile, entity, `rng()`, `hashCell`, `tick()` pass or terrain; `clamp` already
defined (L182); pure-ASCII (134). Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, `greenRoofs +1`/`towerHt
+1` = documented RAF tick-count jitter (touches no `rng()`). Vacuous by construction (draw-only) — the probe is the
gate.

**Probe — `probes/probe-massshadow.mjs` (new, promoted).** Diffs PATCH vs HEAD over each building's base box at a
frozen day frame (t=0.35), split by height to prove the shadow **scales with mass**: TALL (shf>0.4, the big towers),
SHORT (shf<0.05, houses/walk-ups — shf≈0 so ~unchanged), CTL (non-building EMPTY/PARK). Rebuilt in-page
(`genWorld`+`__warp`), STARS cleared, `Math.random` stubbed, movers cleared, clock frozen (163 law) so the frame is
reproducible. seeds 7/42/1234: **TALL 1.02% / 0.79% / 0.61% >> SHORT 0.08% / 0.05% / 0.04% ~ CTL 0.10% / 0.06% /
0.04%** — a monotone height-gated darkening, ~10–15× the house/ground floor (SHORT/CTL residual is neighbouring
towers' enlarged pools leaking into edge boxes). **PASS (3 seeds).** First cut (shf*0.32/0.055) read TALL only
0.03–0.11% — the tower body **occludes its own base shadow**, so only the ring around the footprint shows; pushing the
scale to 0.52/0.10 made the visible pool read without over-darkening.

**Visual.** BEFORE (HEAD) vs AFTER downtown clips + AFTER whole-city `wide`, day, seeds 42 & 7. Two agents, both
**PASS**: the taller-building grounding is **visible** (bigger/darker soft pools under the tower clusters, houses
unchanged), pools sit **centered on the footprints** with no directional smear or misalignment; the downtown ground is
**NOT murk** — darkening stays local to tower bases, roads/plazas/grass between them keep their tone; **no z-order
tears, floaters, or blown-out color** anywhere; both called the whole frame a balanced, beautiful coastal city, the
grounding *improving depth* by anchoring the towers.

**Verdict — SHIPPED.** The one-size-fits-all contact shadow — identical under a bungalow and a 150-unit tower for the
artifact's whole life — now scales with building mass, so downtown's towers ground with real visual weight while houses
are untouched. A centered contact ellipse in the house style, draw-only, pop + stream flat, 2 lines + a probe. Urban's
Polish cell gains its next (…143, **180**). The next domain lap (181) owes **Sky (161, Deepen/Fix only — saturated)**,
then the mandated **step-back at 182**.

### Findings for later laps
- **A SUBTLE DRAW-ONLY CHANGE ON A SELF-OCCLUDING HOST NEEDS ITS SCALE PUSHED PAST THE OCCLUDER.** A building's contact
  shadow is mostly *hidden under the building*, so enlarging it only exposes a thin ring around the footprint — the
  first (modest) scaling measured 0.03–0.11% and would have failed the "is it visible" gate. When the thing you polish
  is drawn *under* the thing that occludes it (a base shadow, a plinth, an undercroft), the visible signal is only the
  overhang; size the change for the *ring*, not the *area*, and let the probe tell you when it clears the floor.
- **THE HOUSE STYLE FOR SHADOWS IS A CENTERED CONTACT ELLIPSE — a directional rake would break it.** Every mover and
  structure grounds with a centered `shadS`/`shadowEl`; nothing in the artifact casts a directional shadow. A
  raking/leaning building shadow was considered and rejected on *consistency* grounds before it was ever coded
  (buildings raking while cars/people/trees don't would read as a mismatch), and the centered-but-mass-scaled version
  is the one that fits. When polishing a shared visual idiom, match the idiom the rest of the scene already uses.
- **`shadowEl` STILL IGNORES DAYLIGHT.** The contact shadow is drawn unconditionally at the same alpha day and night;
  it now scales with mass but not with the sun. A future Sky×Urban interconnect could soften it toward dusk (fainter
  as the light flattens) the way 145/150 tie beach/sea to `LITAMT` — but keep it centered (house style) and beware the
  night frame, where `rgba(40,32,20,a)` over dark ground already reads as little.

## Iteration 181 — the sea catches the golden hour (2026-07-12) [Sky & atmosphere × Deepen]

**Vector.** Sky & atmosphere × **Deepen** (SHIPPED). Rotation named the stalest domain, **Sky (161)** — and the header
mandates Sky is **Deepen/Fix ONLY** (post-saturation: additive/CA cells are traps). Kind is therefore forced to Deepen
(varied off the globally-hot Deepen run only by domain — Sky is genuinely the owed lap). A Sky×Water *interconnect*,
the highest-yield move: it adds no element, it applies an existing Sky signal to an existing surface.

**The seam — the sea is untouched at the most beautiful light of the day.** The open sea already responds to two
lights: a **cool sun glitter** at noon (L3160, peaks at `dayT` 0.47, gone by dusk) and the **night moonglade** (L5938,
`LITAMT>0.5`). But at **golden hour** — dawn/dusk, when the sky blazes warm (`skyBot` orange) and iter 161 warms the
cloud bellies — the sea stayed cold: the noon glitter has faded and the moonglade hasn't lit. 161's own finding flagged
`cwarm` (its `skyBot` golden-hour gate) as **"a reusable golden-hour signal"**; this cashes it on the largest surface
in the frame. A global `GWARM`/`GWSB` is set once per frame from `dl.skyBot` beside `LITAMT` (same `clamp((R-B-70)/70)`
as 161), so the sea reads the exact signal the clouds do.

**Change (~18-line draw + 2 globals, all draw-only).** In the `T.WATER` case (open water, `!c.riv`), gated `GWARM>0.02`:
a faint warm base wash tinted toward `skyBot`, plus — the load-bearing part — bright **additive** (`globalCompositeOperation
='lighter'`) warm-gold glint dashes that shimmer with `waveT`. No tile, entity, `rng()`, `hashCell`, `tick()` pass or
terrain; `save`/`restore` brackets the composite change; strings pure-ASCII (134). Byte-unchanged at noon and night
(GWARM=0). Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0 (re-run on final code). Tile histogram **empty**, all core metrics **+0**, entity
counts identical (RAF tick-count jitter only). Vacuous by construction (draw-only) — the probe is the gate.

**Probe — `probes/probe-seagold.mjs` (new, promoted).** Diffs PATCH vs HEAD over open-water cells' screen boxes at a
frozen frame, at **dusk / dawn / noon / night**, with land (RES/FOREST/MID) as the spatial control. Build-vs-build at the
SAME frame (161 law) so the ambient golden-hour tint — which noon/night lack — is NOT counted as signal, only the sheen.
Rebuilt in-page + STARS cleared + `Math.random` stubbed + movers cleared + clock/`waveT` frozen (163). seeds 7/42/1234:
**SEA DUSK 30.9%/31.3%/31.0% · DAWN 21.8%/21.8%/22.7% → NOON 0.00% · NIGHT ~0.00%** (GWARM 0.62/0.43 → 0/0);
**LAND control 0.00% at every frame, every seed.** **PASS (3 seeds).**

**Visual — three rounds; the tuning is the story.** First build (wash `sheet*0.18`): two agents PASS but both "too
subtle." A wash-alpha bump (0.22, then 0.42) did NOT fix it and a sharper-framed agent FAILed it — **orange-over-teal is
near-complementary, so an alpha wash muddies toward olive instead of reading gold** (an agent literally saw "olive-gold").
The moonglade solves the same night problem with bright *additive* glints that pop over any water tone, so the final
build pulls the wash back to 0.20 and carries the light in **additive gold glints**. Re-shot (wide + coast, seeds 42 & 7),
two agents both **PASS**: gold sparkle glints clearly register on open water only (not river/beach/land/piers), the sea
still reads as teal water (no orange slab), no blown-out color / z-order tears / floaters, whole frame a balanced beautiful
coastal dusk.

**Verdict — SHIPPED.** The sea — cold at the most beautiful light of the day, between the noon glitter and the night
moonglade — now catches a warm gold sun-path at dawn/dusk, reading 161's `cwarm` signal onto the water. A Sky×Water
interconnect, draw-only, pop + stream flat, ~18 lines + a probe. Sky's Deepen cell gains its next (…161, **181**); Sky is
no longer stalest. The next iteration (**182**) is the mandated **holistic step-back**.

### Findings for later laps
- **A WARM WASH OVER TEAL WATER CANNOT READ AS GOLD — IT DESATURATES TO OLIVE (near-complementary alpha blend). Carry
  golden-hour / sunset light on water with BRIGHT ADDITIVE (`'lighter'`) GLINTS, not a broad alpha wash.** Two full
  tuning rounds were burned raising a wash's alpha (0.18→0.42) with agents still failing it "too faint" — the alpha was
  never the problem, the *blend mode* was. This is the moonglade's own trick (it twinkles, it doesn't wash), and it is a
  general rule for tinting one surface toward a near-complementary light: additive points pop over any base; an alpha
  wash of the complement just greys the base. Reach for `globalCompositeOperation='lighter'` (bracketed by save/restore)
  the next time a warm light must read over cool water (or vice versa).
- **`GWARM`/`GWSB` ARE NOW GLOBALS (set once per frame from `dl.skyBot`, beside `LITAMT`).** Any draw that wants "how
  warm is the low sky right now, and toward what colour" can read them for free — a future Sky×Urban golden-hour glint on
  west-facing tower windows (180's banked "windows catch the low sun"), a warm rim on the wind turbines, or a warm cast
  on the beach sand at dusk. Same shape as 161's cloud-belly warmth, now available city-wide.
- **JUDGE A COAST/WATER ORNAMENT AT COAST ZOOM — a warm sheen on the sea LOSES at wide zoom** because it competes with
  the warm sky and the off-map peach background for the eye (159's zoom-fairness law, seen again here: the seed-42 wide
  read "cool sea," the seed-7 coast read "beautiful gold"). The coast clip is the honest frame; keep a wide frame only to
  catch whole-city regressions, not to grade the ornament's presence.

## Iteration 182 — the sixteenth step-back finds a clean city, perf flat (2026-07-12) [holistic step-back]

**Vector.** The mandated holistic step-back (105/110/115/120/125/130/136/142/147/152/157/162/167/172/177/**182**). Not a
domain × kind lap: it reads the WHOLE city for *cumulative* drift the census and per-feature gates are blind to,
runs the season probe + interleaved perf gate, at night AND a season with the day/night baselines pinned OFF
January (`year=2035.62` dry peak; `2035.02` as the seasonal-contrast frame). No city vector taken, so rotation is
unchanged — the next lap (183) owes the stalest domains, **Nature (174)/Civic (175)**, then Water (176)/People (178)/Transport (179).

**What was read.** Un-zoomed whole-city `wide` frames at **2 seeds × 3 lights/calendars** — seed 42 (warp 61) &
seed 7 (warp 31), each at {day 2035.62/t=0.35, night 2035.62/t=0.90, winter 2035.02/t=0.35}. One subagent per
seed read its own three frames: the cumulative question ("has anything compounded into clutter or darkness?")
plus 108's **locate-don't-judge** night test ("where is the core by light alone?") and a season-distinctness check.

**Result: the city is healthy — both agents VISUAL: PASS.**
- **Night core (115/143) LOCATED off-centre by light alone both seeds** — seed 42 ~(0.47,0.50), seed 7 ~(0.47,0.60)
  — matching 177 ((.48,.50)/(.53,.60)), 172 ((.47,.55)/(.45,.62)), 167 ((.47,.50)/(.50,.62)); each a genuine warm
  bright-core → dim residential mid-ring → dark rim → near-black ocean falloff, not a flat wash, with lit transit
  lines threading out (138 arterials hold). Both agents independently reported the warm core mass + the falloff
  gradient + the golden street/rail chains.
- **All recent vectors sit correctly in the whole frame** — 178's fete crowd, 179's bridge lamps, 180's mass-scaled
  contact shadows, 181's golden-hour sea glints — with pier/ferris/wind-farm on the water plane and the block grid
  still separating cleanly. **No z-order tears / floaters / hard seams / blown-out white / mojibake** in any of the
  6 frames; stat strip + labels crisp both seeds (`·`, em-dashes, "WAXING CRESCENT/GIBBOUS" all render correctly,
  no `Â·`). **Winter reads distinct** from the golden-hour day frame at both seeds (bare/stubble-striped farm plots,
  duller desaturated vegetation, cooler sky/sea) — mild California winter by design (120's evergreen/irrigated
  dilution), no snow; both agents noted the shift is gentle-but-clear, terrain-borne not HUD-borne.

**Season — measured alive.** `probes/probe-season.mjs`: FARM winter→dry-peak **88.4** (matches
130..177 ≈87.6), VINEYARD 44.6/36.7/42.7 (139), FOREST 20.6/19.7/**30.7** (autumn litter holds at 166's level),
ORCHARD 25.3/17.8/41.4, MEADOW/SHOREPARK move, PARK/REDWOOD/GARDEN/QUAD near-zero by design (120), ROAD control
**0.5–2.1**. Calendar working; the four-season forest floor (156/166) is real.

**Perf — 178→181 cost ~ZERO (within machine noise).** Interleaved HEAD-181 vs the iter-177 file (`7e2ac2c`,
A/B/A/B ×3, **min per variant**, one process so both eat the same machine load): day **35.89 vs 35.55ms**
(**+1.0%**) and night **42.0 vs 41.61ms** (**+0.9%**). So 178 (fete crowd, day-and-dusk) + 179 (bridge lamps,
night-only) + 180 (mass shadow, day roof/ground draw) + 181 (sea gold, dawn/dusk additive glints) added ~1%,
inside the ±30% headless swing this box shows for identical code — i.e. flat, no drift to act on. Absolute
numbers run a touch above 177's (34.4/40.5) purely as today's load; the honest reading is the interleaved delta.
NOT re-pinning the stored baseline (it reads inflated on today's load per 167's reflexive false-FAIL; re-pin only
if an interleave *itself* shows a persistent offset — it has not since 142's real +2.2%). Census PASS, vacuous
(no source edit); tree clean.

**Change (the step-back's product — none to the city).** No compounding defect, so per
120/130/136/142/147/152/157/162/167/172/177 ("a clean step-back is a complete iteration — don't force a filler
vector") the output is the health record + header refreshes: step-back pointer 177→182 (next 187), the eleventh
clean bill, and the 182 interleaved perf reading. No `solvista.html` edit.

**Verdict — FIXED.** No compounding city defect — the ELEVENTH clean step-back in a row (130, 136, 142, 147, 152,
157, 162, 167, 172, 177, 182). All accumulated visual laws (115/116/120/123 + 138 arterials + 143 CBD peak) still
read at both seeds under all three lights; the season is alive (166's autumn litter still in FOREST's probe, 139's
vineyard moving); perf is flat against the honest interleaved control.

### Findings
- **ELEVENTH CONSECUTIVE CLEAN STEP-BACK — the loop's late-game equilibrium is holding.** Four more laps of
  draw-only / interconnect vectors (178 fete crowd, 179 bridge lamps, 180 mass shadow, 181 sea gold) landed since
  177 with ~ZERO measurable perf cost and no cumulative visual drift. The surface-not-entities /
  deepen-what-exists discipline keeps adding life to *untouched surfaces & existing systems* (an empty drawn CA
  street, a dark bridge deck, the base of every building, the open water at golden hour) rather than piling more
  entities onto a saturated coast — which is exactly why nothing compounds. Pattern: 125→…→177→182.
- **THE INTERLEAVE-VS-A-STEP-BACK-FILE IS NOW THE STANDING PERF METHOD, and it read +1.0%/+0.9% against a file 5
  iters old (`7e2ac2c`, iter 177).** The stored baseline remains untouched and would false-FAIL; the only
  trustworthy number is HEAD vs a pinned older commit's file in ONE process. **The next step-back (187) should
  interleave HEAD vs THIS iteration's file (Iter 182 / whatever 186 leaves, anchor `<SHA-182>`) to isolate
  183–186's cost.**
- **Night is still the slowly-accumulating column and it moved a hair (+0.9%) — 179's bridge lamps are the one of
  178–181 that draws at night, and they are a bounded per-bridge draw, not a per-cell field.** Night remains the
  column a future step-back watches first (≈42ms/24fps at today's load), but +0.9% is inside noise and no
  perf-fix iteration is owed. The night draw budget is being spent carefully — bounded landmark/edge lights
  (175 parliament, 179 bridges), never a full-frame night pass.

## Iteration 183 — the fields name their own harvest (2026-07-12) [Nature × Interaction/UX]

**Vector — Nature × Interaction/UX** (SHIPPED). Rotation named the stalest domain, **Nature (174)** (Civic 175 was the
next-owed, staler by number is Nature). Kind varied HARD off the globally-hot **Deepen** streak (178/179/181 all Deepen,
180 Polish) to an **Interaction/UX** — no recent iteration was one (last was 176, Water). A draw-nothing tooltip vector:
a guaranteed-flat, pop+stream-neutral ship.

**The seam — the biggest agricultural surface, unnamed.** Orchard names its `Grove` season (129) and vineyard its
`Vines` season (148), each reading the same `year`-phase its draw paints. The **FARM** belt — the *largest* agricultural
surface (~150 fields), the strongest seasonal mover (winter→dry-peak 88), and the richest calendar of the three (5
phases: ploughed→sprout→standing crop→straw→cut stubble, plus 174's hay bales) — printed only the static
`TILEDESC[FARM]` "Row crops on the golden hills." and said nothing about *where in the year* the field stood. The header
had even declared "the agricultural asserts-less-than-code tell is SPENT (orchard 129 + vineyard 148)" — but it
**overlooked FARM**, whose calendar is the most elaborate of all and which 174 had just deepened. A genuine open seam,
the exact 129/148 shape on a bigger host.

**Change (~8 lines, tooltip-only + a shared-predicate refactor).** Extracted the field's per-cell phase clock into a
shared `farmPh(v)` = `((((year%1)+1)%1-(v-0.5)*0.10)%1+1)%1` (the 112 one-predicate law) and routed the FARM **draw**
through it (was inline `s`/`ph` at L3792 — algebraically identical, so byte-unchanged pixels). Added `farmPhase(v)`
mapping `farmPh` to a word on the draw's own boundaries (`<0.06||>=0.93` ploughed · `<0.20` sprouting · `<0.52` growing ·
`<0.80` ripening · else harvested), and a `describeTile` `Fields` row reading `farmPhase(c.v)`: **Ploughed under /
Sprouting / Standing crop / Ripening to straw / Cut for harvest**. Since each field runs ±5 weeks off its neighbours
via `c.v`, the belt names a *patchwork* of phases, not one word. No tile / entity / `rng()` / `hashCell`-terrain /
`tick()` pass / terrain change; strings pure-ASCII (134). Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, entity counts identical
(`solarRoofs -2`/`towerHt -1` = documented RAF tick-count jitter, touches no `rng()`; the `farmPh` refactor is
algebraically identical so the draw is byte-unchanged). Vacuous by construction (tooltip-only) — the probe is the gate.

**Probe — `probes/probe-farmtip.mjs` (new, promoted).** A logic probe on the 122/176 template: it **independently**
recomputes each field's phase word from `year` + `c.v` (its own copy of the ph formula + boundaries, not by calling
`farmPhase`) and asserts `describeTile`'s printed `Fields` word equals it. Rebuilt in-page (`genWorld`+`__warp`) at
**two calendars** — harvest 2035.88 and midsummer 2035.40. seeds 7/42/1234: **word-match 35/35 · 40/40 · 45/45 at
harvest, same at summer**; **non-FARM control (ROAD/RES/ORCHARD/VINEYARD) carries no `Fields` row, 400/400 clean**;
**calendar control: 'Cut for harvest' = all fields at harvest → 0 at midsummer** (proving the row reads the year, not a
static string — 174's calendar-control law). **VERDICT: PASS (3 seeds).**

**Visual — `probes/shot-farmtip.mjs` (new, promoted).** `shoot.mjs` can't hover; the shot script uses `__find('FARM')`
for a farm's clip-ready screen coords, pins the calendar in-page (freeze-the-clock law), hovers, and clip-shoots the
tooltip magnified. seed 42 @ harvest: tooltip reads `Farm | Row crops on the golden hills. | Fields | Cut for harvest
| Value 55%`; seed 7 @ midsummer: `... | Fields | Standing crop | ...` — no page errors. Two agents (one per seed),
both **VISUAL: PASS**: `Farm` title + `Fields` row visible and **legible** (no mojibake/clipping), hex cursor outline
seats on the hovered field, surrounding farms read as coherent row-crop fields, no z-order tears / floaters / blowout;
the whole-city frame (seed 42) still a balanced beautiful coastal city.

**Verdict — SHIPPED.** The farm belt — the biggest agricultural surface, richest calendar, deepened only last lap (174)
— now names its own harvest cycle on hover, a patchwork of phases reading the same per-cell clock the crop colour
paints. The asserts-less-than-code tell, closed for the agricultural surface the header had overlooked. Draw-nothing
tooltip + a one-predicate refactor, pop + stream flat, ~8 lines + a probe + a shot. Nature's Interaction/UX cell gains
183 (117/129/**148**/**183**). The next domain lap (184) owes **Civic (175)**, then Water (176)/People (178)/Transport
(179); step-back still at **187**.

### Findings for later laps
- **THE "ASSERTS-LESS-THAN-CODE" TELL WAS DECLARED SPENT FOR A DOMAIN WHILE ITS BIGGEST HOST WAS STILL OPEN.** The
  header said the agricultural tell was closed by orchard (129) + vineyard (148), but FARM — the *largest* of the three,
  with the *richest* calendar — was never named, and 174 had just deepened it. A "kind spent for domain X" claim in the
  header is about the *hosts touched so far*, not every host; before trusting a saturation note, grep the domain for the
  *biggest untouched instance* of the same seam. (Same shape as 127's "additive spent is about entities, not surfaces.")
- **THE ONE-PREDICATE REFACTOR IS FREE WHEN THE DRAW ALREADY COMPUTES THE PREDICATE INLINE.** FARM's draw computed `ph`
  inline; extracting `farmPh(v)` and pointing both the draw and the new tooltip at it cost nothing (algebraically
  identical, byte-unchanged pixels) and bought the 112 guarantee that the word can never drift from the colour. When you
  add a tooltip that names what a draw paints, prefer *extracting the draw's own expression* into a shared helper over
  re-deriving the value — you get correctness-by-construction, not a second definition to keep in sync (112/175's law).
- **GARDEN (2 hexes) is the last un-named agricultural tile, but its draw does NOT read `year` (129) — it needs a
  Deepen FIRST.** With FARM closed, Nature's Interaction/UX seam via the agricultural calendar is spent; the next
  Nature × Interaction/UX must be a *new* seam (e.g. does the barn/`c.v>0.9` outbuilding, or a REDWOOD stand's fire
  history beyond 117's `Undisturbed`, name anything the draw already tracks?).

## Iteration 184 — the town hall clock tells its time on hover (2026-07-12) [Civic & culture × Interaction/UX]

**Vector — Civic & culture × Interaction/UX** (SHIPPED). Rotation named the stalest domain: **Civic (175)** was owed and
staler by number than every other (Sky 181 · People 178 · Transport 179 · Urban 180 · Nature 183 · Water 176). On
*kind*: Civic's other kinds are saturated or hot — additive is spent (12 richly-drawn institutions + plazas with
statues/fountains/bunting), Deepen was JUST cashed last Civic lap (175 parliament floodlight) and is globally hot
(178/179/181), Polish (168) has no compounding defect to fix, and a terrain CA/Connect would perturb the seeded stream
for marginal payoff. The one clean, guaranteed-flat open Civic seam is the asserts-less-than-code tooltip tell — the
same seam 129/148/183 cashed. Kind repeats 183 (also Interaction/UX), but *saturation beats kind-rotation* (118's law):
when a domain's other kinds are all spent-or-hot, the kind that stays is the one that stays. Draw-nothing tooltip: a
pop+stream-neutral ship.

**The seam — a drawn clock that never told its own time.** The town hall draws a working 24h clock (iters 135/149):
the hand reads the slow day clock `dayT` — straight up at noon, down at midnight — "the clock the town sets its watches
by" (its own L4825 comment). Yet its tooltip (`CIVICDESC[hall]`) named only the chambers and the clerk and said nothing
of the *hour the hand points at*. The exact orchard(129)/vineyard(148)/farm(183) shape — a draw that tracks a live
quantity over a tooltip that stays mute — but on the slow **time** clock rather than the year, so it can never strobe
(134's law: `dayT` ~110 s/cycle is the legible clock, unlike the fast `year`).

**Change (~10 lines, tooltip-only).** Added `clockWord(t)` beside `phaseWord`/`moonWord`: `mins=round(((t%1+1)%1)*1440)
%1440`, formatted 12-hour `H:MM AM/PM`, pure-ASCII (134). Added one `describeTile` row inside the `c.t===T.CIVIC` block:
`if(c.kind==='hall')data.push(['Clock',clockWord(dayT)])` — reading the SAME `dayT` the drawn hand uses (up=noon convention
matches: `dayT` 0=12:00 AM, .25=6:00 AM, .5=12:00 PM, .75=6:00 PM). No tile / entity / `rng()` / `hashCell` /
`tick()` pass / terrain change. Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, entity/life/transport counts
identical. Vacuous by construction (tooltip-only) — the probe is the gate.

**Probe — `probes/probe-hallclocktip.mjs` (new, promoted).** Named to distinguish it from iter 149's
`probe-hallclock.mjs`, which grades the *drawn hand*; this grades the *tooltip row*. On the 122/183 template it
**independently** recomputes `clockWord` from `dayT` and asserts `describeTile`'s printed `Clock` word equals it across a
full day sweep (midnight/3am/6am/7:12am/noon/6pm/9pm). Rebuilt in-page (`genWorld`+`__warp`), seeds 7/42/1234:
**clock-match 7/7 each**; **time control: 7/7 distinct strings across the day** (proves the row reads the live clock, not
a frozen string); **non-hall control (other civics + ROAD/RES/FARM) carries no `Clock` row, 500/500 clean**.
**VERDICT: PASS (3 seeds).**

**Visual — `probes/shot-hallclocktip.mjs` (new, promoted).** Freezes the clock in-page (freeze-the-clock law), hovers
the hall via `__find('hall')`, clip-shoots the tooltip. seed 42 @ dayT 0.30: `...| Clock | 7:12 AM | Value 67%`; seed 7 @
dayT 0.66: `...| Clock | 3:50 PM | High street | Value 64%` — no page errors, clock strings correct (0.30·24=7:12 AM,
0.66·24=3:50 PM). Two agents (one per seed), both **VISUAL: PASS**: `Clock` row visible + legible (no mojibake/intra-panel
clipping), hall hex cleanly outlined, no z-order tears / floaters / blowout; the whole frame reads as a balanced coastal
city. (Both noted the tooltip panel runs past the clip's right edge — a screenshot framing artifact, not a defect.)

**Verdict — SHIPPED.** The town hall — whose drawn hand has told the time on its dial since iter 149 — now tells it in
words on hover, off the same slow `dayT` the hand points at. The asserts-less-than-code tell, closed on the city's most
iconic timepiece. Draw-nothing tooltip, pop+stream flat, ~10 lines + a probe + a shot. Civic's Interaction/UX cell gains
184 (52/122/**140**/**184**). The next domain lap (185) owes **Water (176)**, then People (178)/Transport (179)/Urban
(180); step-back still at **187**.

### Findings for later laps
- **A DRAWN LIVE QUANTITY OVER A MUTE TOOLTIP IS THE SAME SEAM WHETHER THE CLOCK IS THE YEAR OR THE DAY.** 129/148/183
  cashed it on the *seasonal* (`year`) clock; 184 cashed it on the *time-of-day* (`dayT`) clock. The tell is general:
  wherever a draw animates off a global (`dayT`, `LITAMT`, `time`, `year`) and the tooltip names none of it, there is a
  free Interaction/UX row — *provided the clock is slow enough not to strobe* (134): `dayT` (~110 s) and `year` (dev
  clock, minutes) are safe to name as a discrete word/number; `time` (frame clock) is NOT — a readout off `time` would
  flicker. Candidates still open on the SLOW clocks: the observatory dome's open/shut state (`LITAMT`), the police beacon,
  the museum/parliament floodlight (`LITAMT>0.3`) — each a live "lit after dark" the tooltip could name.
- **BEFORE NAMING A NEW PROBE/SHOT, `ls probes/` — iter 149 already owned `probe-hallclock.mjs`/`shot-hallclock.mjs`.**
  The bare `mv` refused to overwrite (saving 149's drawn-hand tools); a `git mv` or a `Write` would have been the danger.
  Named mine `*-hallclocktip.mjs` (the tooltip variant). Two probes can share a subject (the hall clock) from opposite
  sides — one grades the pixels (149), one grades the words (184) — so distinguish by *what they measure*, not the subject.
- **SATURATION BEATS KIND-ROTATION, AGAIN (118).** 184 repeated 183's Interaction/UX kind because every other Civic kind
  was spent (additive/Polish) or hot (Deepen). When rotation names a domain but its non-repeated kinds are all
  saturated-or-hot, repeating the one open kind on the owed domain beats forcing a weak change of a worse kind.


## Header bullets rotated out of GROWTH.md's State-of-the-city at iter 195

(Moved, not deleted — the header is a fixed 400-line budget, so adding 195's lines
meant cutting these. They were superseded by the ROTATION bullet and by the current
step-back pointer: they still named iteration 182 as "the next step-back" and lap 160
as the next domain lap, long after both had happened.)

  **⚠ Iteration 182 is the next holistic STEP-BACK** (…/**157**/**162 done**/**167 done**/**172 done**/**177 done**/**182**) — not a domain lap; see the recipe
  below (night + season, day frame off January, interleaved perf). **162 was the mandated step-back (SEVENTH clean bill,
  perf 157→161 flat day / +1.1% night, seasons alive, night core located both seeds). 163 took People × Polish
  (static-crowd contact shadows, closing 137); 164 took Transport × New element (the taxi — a `Math.random`-flagged
  lemon-yellow cab variety on the car entity).** **165 took Urban × Deepen (COM rooftop mechanical plant); 166 took Nature × Deepen (AUTUMN LEAF LITTER on the FOREST floor — the season-complement of 156's spring bloom, `autumnFall()` centred on the same s≈0.87 the canopy ambers on, draw-only stream+pop-neutral; `probe-autumnfall` FOREST 11.8/11.4% autumn → 0/0 summer — the forest floor now keeps a full four-season calendar). 167 was the mandated STEP-BACK (clean); 168 owes Civic (158).** **155 took Transport × Deepen (the tram catenary, the
  149 draw-tell); 156 took Nature × New element (spring wildflower understory on the FOREST floor — 127's
  surface-not-entities law, forest=69 hexes vs garden=2). 157 was the mandated STEP-BACK; 158 took Civic × Deepen
  (the observatory dome rotates to track the night sky — 149's banked draw-tell); 159 took Water × Deepen (the surf
  glows at night, `probe-biolum`); the next lap (160) owes the stalest domain, Urban (151)**, then Sky (153).

## Iteration 185 — wind-driven whitecaps break on the open swell (2026-07-12) [Water & coast × Polish]

**Vector — Water & coast × Polish** (SHIPPED). Rotation named the stalest domain, **Water** (last SHIP 176; the 184
entry explicitly owed the 185 lap to Water). On *kind*: Interaction/UX just ran twice (183/184) and Deepen has been
globally hot (178/179/181), so both were avoided; **New element** was ruled out because the guidance warns against
piling more entities onto a saturated coast (the coast already carries boats/ferries/freighters/surfers/dolphins/
whales/herons/kayaks/kites). **Polish** — improve an existing surface, add nothing — is the fresh, on-guidance kind,
aimed at the biggest untouched *surface* rather than an entity (127's surface-not-entities law).

**The seam — the daytime mid-ocean read flat.** The open sea is already rich (depth-graded tone 116, sparkle,
noon cool glitter 150, golden-hour glints 181, night moonglade + biolum surf 159, a traveling surf break). But all
of those are either noon-only (glitter), dawn/dusk-only (gold), night-only (moonglade/biolum), or at the *beach*
edge (surf break). On a plain daytime afternoon the **open water between the surf line and the noon-glitter zone**
had no sense of a breeze — flat teal with only the faint static sparkle line (L3161). The one genuine daytime gap.

**Change (~20-line draw, all draw-only).** In the `T.WATER` case, after the sparkle: on **open water only**
(`!c.riv && rDeep[idx(x,y)]>SHELF1` — beyond the coastal shelf, so not in the shallows/surf zone), sparse **whitecaps**
gated `hashCell(x,y,seedNum^0x7CA9)>0.76` (~24% of open cells, seeded so no two cities cap alike and it perturbs no
`rng()`), each breaking on a `waveT`-driven `crest` phase (only when `crest>0.5`) as a small foam ellipse + a short
streak down the swell face. **Day-only:** gated `LITAMT<0.6` with the alpha fading `*(1-LITAMT/0.6)`, so the caps
melt away by dusk and the night frame is byte-unchanged (hands off to the moonglade/biolum — nothing added to the
night, respecting the "night-glow run is getting full" watch of 175). No tile / entity / `rng()` / `hashCell`-terrain
/ `tick()` pass / terrain change; strings pure-ASCII (134). Pop + stream provably flat. (Tuned once: first cut read
"faint/understated" to the visual agents — bumped per-cap size 2.6->3.0 and alpha 0.42->0.55, **size not density**,
so it reads clearer without becoming a busy speckle.)

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, entity counts identical
(`greenRoofs -1`/`towerHt -1` = documented RAF tick-count jitter, touches no `rng()`). Vacuous by construction
(draw-only) — the probe is the gate.

**Probe — `probes/probe-whitecap.mjs` (new, promoted; adapted from `probe-seagold.mjs`, the open-water build-vs-build
template).** Diffs PATCH vs pristine HEAD over water-cell screen boxes at a frozen frame, day/noon/dusk/night, with
**two** controls: SHELF (shallow water `rDeep<=SHELF1`, must stay ~0 — proves the *depth* gate) and LAND (RES/FOREST/
MID, must stay 0 — the WATER case is the only edit). Rebuilt in-page (`genWorld`+`__warp`), STARS cleared,
`Math.random` stubbed, movers cleared, clock+`waveT` frozen (163 law) so a same-frame PATCH-vs-HEAD diff is exactly
my code. seeds 7/42/1234: **SEA caps DAY 0.23/0.21/0.29% · NOON 0.24/0.21/0.30% -> DUSK 0.07/0.07/0.10% -> NIGHT
0.00% all** (the `LITAMT` day-gate); **SHELF control <=0.07% every frame** (caps are offshore only); **LAND control
0.00% every frame, every seed**. Clean three-way separation SEA >> SHELF >> LAND. **VERDICT: PASS (3 seeds).**

**Visual.** Coast clips (181's zoom-fairness law: judge a water ornament at coast zoom) both seeds + a whole-city
`wide`, day. Five agent reads across two rounds, all **VISUAL: PASS**: whitecaps read as **scattered small white
dabs/streaks on the open teal sea** (not a uniform sheet, no repeating stripes), **correctly placed** out on the open
water away from the beach/surf line — none on land/beach/river/boats, and distinguishable from the triangular
sailboats and buoys; **no z-order tears / floaters / blown-out white**; the sea still reads as a coherent graded teal
ocean. Whole-frame agent: balanced beautiful coastal city, the sea "not speckled or busy," stat strip crisp, no `Â·`
mojibake. Prominence rose from "faint/understated" (first cut) to "just right, slightly faint" after the size/alpha bump.

**Verdict — SHIPPED.** The open mid-ocean — flat teal on a plain daytime afternoon, between the beach surf and the
noon glitter — now grows sparse wind-driven whitecaps that break and fade with the swell, seeded per-city and gone by
dusk. A Polish of the biggest untouched water surface, draw-only, pop + stream flat, ~20 lines + a probe. Water's
Polish cell gains 185 (…**150**, **185**). The next domain lap (186) owes **People (178)**, then Transport (179)/Urban
(180); step-back still at **187**.

### Findings for later laps
- **A "SATURATED COAST" IS SATURATED IN ENTITIES, NOT SURFACES — the open-sea SURFACE was the clean Water lap.** The
  header repeatedly warns against piling more entities onto the coast, and the coast's entity list is genuinely spent.
  But the *open-water surface* (350+ hexes/city) had one un-lit daytime state, and a draw-only Polish of it added life
  with zero new entities and zero clutter risk (127's law, applied to Water: the surface-not-entities move is the way
  past a coast that's full of craft). When Water comes up again, look for another *surface* state (the beach dry sand,
  the dune face, the rock armour) before reaching for a new floating thing.
- **A DAY-GATED WATER ORNAMENT IS THE CLEAN COMPLEMENT TO A SATURATING NIGHT-GLOW RUN.** 175 flagged the night-mood
  glow run (moon/stars/observatory/biolum/amphitheater/parliament/bridge lamps) as getting full. Whitecaps gate the
  OTHER way — `LITAMT<0.6`, present by day, byte-unchanged at night — so they add nothing to the crowded night frame
  and fill the under-served daytime instead. When a domain's night is busy, its day is where the room is.
- **TUNE A SUBTLE ORNAMENT BY PER-INSTANCE SIZE/ALPHA, NOT BY DENSITY.** The first cut read "faint" to two agents; the
  fix was to enlarge and brighten each cap (2.6->3.0, alpha 0.42->0.55) while keeping the `hashCell>0.76` count fixed,
  so it reads clearer without tipping into a busy speckle (the whole-frame agent had confirmed headroom: "not speckled
  or busy"). Raising the count would have risked the clutter the whole-frame gate exists to catch; raising the
  per-cap presence does not.
- **`probe-seagold.mjs`/`probe-whitecap.mjs` are the reusable open-water build-vs-build template** (PATCH-vs-HEAD over
  `T.WATER !riv` cell boxes at a frozen frame, a depth/shelf control + a land control, day/night frames). For the next
  open-sea draw vector, clone one: swap the frame set and the target/control cell filters, keep the 163-law in-page
  rebuild + mover clear + STARS/Math.random stubs that make the diff reproducible.


## Header bullets rotated out at iter 195 (part 2): the 'tell' cashing history

(Moved, not deleted. The LAW itself is promoted in SKILL.md ('A label that asserts a
relationship the draw ignores is a bug'); what lived here was the blow-by-blow of which
iteration cashed it 5th/6th/7th, which no longer steers a vector. The live residue — which
tooltips are still mute — was condensed into two lines in the header.)

  **117 cashed the tell a fifth time and it is now the loop's most reliable move**: `TILEDESC` claimed
  *"Old-growth redwoods"* and *"Wild grass and wildflowers"* while `describeTile` printed only `Value`,
  though the CA had tracked `c.age`/`c.fire`/`c.bloom`/`c.shroom` since 1974. **Where else does a string
  assert what the code already knows?** **122 cashed it a sixth time** (`CIVICLABEL`'s one sub for twelve
  institutions) and found the tell is **self-renewing**: cashing it *created* a new one, since
  `TILEDESC[T.PLAZA]` still says only *"A paved civic square"* for a square that now knows its institution.
  **129 cashed it a seventh time** (the orchard's blossom/fruit calendar, mute in `describeTile` since iter 57 —
  now a `Grove` row) and confirmed its **limit**: of the three mute vegetation tooltips only the orchard's DRAW
  read `year`, so only it could be un-muted honestly — VINEYARD/GARDEN need a Deepen first (see 129).
  Un-cashed: `[T.IND]` *"warehouses and light industry"* (not vegetation, no calendar). `[T.VINEYARD]`
  *"terraced"* is now **CASHED (iter 148)** — a `Vines` season row off `vinePhase()`, mirroring 129's orchard;
  agriculture's mute-tooltip tell is now spent (only GARDEN remains and its draw is season-frozen, needs a
  Deepen first). The plaza/quad **titles** are now **CASHED (iter 140)** — an owned square's headline reads
  *"Town hall forecourt"* / *"Museum grounds"* outright.


## Header trim — iter 196 (rotated out of the maintained header, verbatim)

The per-lap recaps of iters 173-185 and their superseded "next domain lap owes" pointers, cut from the
ROTATION bullet to keep the header inside its 400-line budget. Preserved byte-for-byte:

> **Stalest by number is Sky (161), but Sky is post-saturation (Deepen/Fix ONLY — additive/CA cells are traps). 173 took Urban × Deepen (the warehouse north-light clerestory — closing the roof-furniture set city-wide; see below), so the next domain lap (174) owes Nature (166)/Civic (168)**, then Water (169)/People (170)/Transport (171). **174 took Nature × New element (rolled hay bales on the stubble fields post-harvest, `probe-haybale`). **175 took Civic × Deepen (the parliament floodlights its facade — a warm uplight wash up the colonnade at night, matching the museum's dusk floodlight; the grander "tallest civic roof" only lit its dome/lantern while the museum lit its facade — the banked 168 Civic Deepen candidate; draw-only stream+pop-neutral, `probe-parliament` FACADE 24–38% at night → 0.00% day, ROAD ctl ~0, 5 seeds; joins the night-mood run moon/stars/observatory/biolum/amphitheater). **176 took Water × Interaction/UX (the river names its course — a `Course — N hexes` row via a bridge-AWARE flood `riverCourse` so a span doesn't fragment the reach; the river was the barest tooltip in the city, zero data rows over its richest water system; a `Crossings` companion was DROPPED — bridge cells over-count vs connected components and the L1633 pave-over rule makes the unit ambiguous; draw-nothing tooltip, pop+stream flat, `probe-river` 254 river hexes named 3 seeds, sea control clean 1916 hexes, sea-leak 0). So the next domain lap (178) owes People (170)/Transport (171).** 171 took Transport × Interaction/UX (the boulevards name themselves, `probe-boulevard`); 170 took People × New element (the pier's day-only anglers, `probe-anglers`). **178 took People × Deepen (the festival streets fill with people — a day-and-dusk crowd of `hashCell`-scattered figures mills on each `c.fete` ROAD cell under the bunting, then heads home by deep night; a People×Civic interconnect on a drawn CA system that was rendered for the artifact's whole life but never *inhabited*; draw-only stream+pop-neutral, `probe-fetecrowd` FETE day 2.9–3.6% → night 0.00% byte-identical, ROAD ctl ~0, 3 seeds). **179 took Transport × Deepen (the bridges light their lamps at night — the bridge sub-case `break`s before the road's night-lamp block, so every bridge went pitch dark at night for the artifact's whole life while both banks glowed; two warm rail lamps atop the deck + a `waveT` reflection on the river below, a Transport×Water interconnect; draw-only stream+pop-neutral, `probe-bridgelamp` BRIDGE night 7.4–8.1% → day 0.00% byte-identical, ROAD ctl 0.00% both, 3 seeds). So the next domain lap (180) owes Urban (173, Deepen/Polish only — measured-saturated).** **180 took Urban × Polish (the towers ground their own weight — the fixed 0.42×0.13 contact shadow under every building now scales with mass `shf=clamp((h-9)/120,0,1)`, so a 150-unit tower grounds on a 0.94/0.23 pool while a bungalow keeps the old blob; centered in the house style since nothing in the artifact casts a directional shadow, draw-only stream+pop-neutral, `probe-massshadow` TALL 0.6–1.0% ≫ SHORT/CTL ~0.05% 3 seeds; the first scaling was too weak because the tower body occludes its own base shadow — size for the ring not the area). So the next domain lap (181) owes Sky (161, Deepen/Fix ONLY — saturated), then the step-back at 182.** **181 took Sky × Deepen (the sea catches the golden hour — bright additive-gold sun-path glints on the open water at dawn/dusk, reading 161's reusable `cwarm`/`skyBot` signal onto the largest surface in the frame, filling the gap between the noon glitter and the night moonglade; a Sky×Water interconnect, draw-only stream+pop-neutral, `probe-seagold` SEA dusk ~31%/dawn ~22% → noon/night ~0, LAND ctl 0 all frames, 3 seeds. ⚠ A warm alpha WASH over teal desaturates to OLIVE — carry sunset/warm light over cool water with ADDITIVE `'lighter'` glints, not a wash; two tuning rounds were lost raising a wash's alpha before the blend mode was the real fix. `GWARM`/`GWSB` are now globals beside `LITAMT` for any golden-hour draw.)** 171's fete-street TOOLTIP (`c.fete` drawn but unnamed in `describeTile`) is still banked, and now more worth cashing since the street is no longer empty. **182 was the mandated STEP-BACK — ELEVENTH clean bill in a row (perf 178→181 flat: day +1.0% / night +0.9% vs iter-177 `7e2ac2c`; seasons alive FARM dry-peak 88.4; night core off-centre both seeds ~(.47,.50)/(.47,.60)). No city change.** **183 took Nature × Interaction/UX (the fields name their own harvest — a `Fields` crop-phase row in the FARM tooltip via a shared `farmPh(v)`, the biggest agricultural surface, the one 148's "agriculture tell spent" note had OVERLOOKED; draw-nothing tooltip + byte-identical one-predicate refactor, pop+stream flat, `probe-farmtip` 3 seeds). So the next domain lap (184) owes Civic (175), then Water (176)/People (178)/Transport (179).** Next step-back at **197** (192 done: HEAD vs iter-187 interleaved perf flat, isolated 188–191). **Urban is measured-saturated now: additive spent (118), Connect measured-hard TWICE (160 RES terracing, 165 high-street arcade — the `hstr` parade zigzags with parity, longest straight-hex-axis run = 2, so it is not a clean arcade host); Urban's next lap is Deepen/Polish only** (or a COM arcade if a *straight-hex-axis* retail run is ever found — the parade is not one). Roof-furniture is now CLOSED city-wide across all 5 developed types (MID/RES water tanks, TOWER gardens, COM plant 165, IND warehouse north-light clerestory 173) — no bare roof left, so a future Urban "bare roof" vector has no host; Urban Deepen must go elsewhere (facades, ground plane, harbour apron). 


## Header trim — iter 196, cue (e½) (rotated out of the maintained header, verbatim)

Cue (e½) was CLOSED by iter 102 (the commons), but its full brief remained under *Open cues* in the maintained
header for ~94 iterations, still telling a future lap to build a lung the city already had. Moved here byte-for-byte;
the durable urban findings were kept in the header.

>   **(e½) the interior is an edge-to-edge carpet — now DENSITY-ONLY** *(cue (e)'s skyline half was
>   **CLOSED by iter 98**; its **palette** half was **CLOSED by iter 99**)* Urban fabric — iter 94's
>   holistic agent called the landmass "too uniform… little breathing room between core and edge,"
>   and the interior an "edge-to-edge carpet of roads + rooftops with little green breathing room."
>   **98 fixed the skyline; 99 fixed the colour; 100 put the first *earned* green in the interior
>   (7–10 `QUAD` hexes behind the institutions) — but it did NOT add a lung.** Iter 100's step-back
>   agent, reading the whole frame: the interior *"does breathe… but green is fragmented into small
>   patches rather than any real district-scale lung,"* and its top recommendation was to
>   **consolidate green into one or two district-scale parks/greenways** instead of more scatter.
>   That, plus mid-block density, is exactly what remains. Note iter 100 spent −1.03% pop for 23
>   cells, so a district-scale park is affordable but not free.
>   **Iter 101 attacked this and REVERTED — read its findings before re-trying.** It settled three
>   things and cost nothing: (i) **`PARK` is permanent** — nothing in `tick()` consumes one, so green
>   planted in `genWorld` survives to 2035, and the "plant it early" host iter 88 hoped for is real;
>   (ii) green costs about **0.045% pop per cell** and partly repays it, because `PARK` is the top
>   `valueSrc` (0.92) and lifts the frontage it faces (`cafes` +141, `COM` +51); (iii) **the lung must
>   be a BLOB, not a ribbon** — a 1–2 hex corridor is untraceable at frame scale whatever its contrast
>   (see the law at the top). So: ~50 contiguous cells, **≥3 hexes across**, sited by
>   `hexDist(x,y,CBDX,CBDY)`, not by `c.val`. The greenway's flag/tooltip/half-segment path draw and
>   its contiguity probe were all correct — only the shape was wrong.
>   Heed iter 92 (never zone against `TOWER` near the core: −9.8% pop) **and** iter 98
>   (the upgrade probability *saturates*, so leaning on `p` is a weak lever that costs towers at 240
>   pop each). A `MID`/`RES` thinning rule, or interior parks, is likelier than anything touching
>   towers. **This is the first (e½) move that must change tiles, so it cannot be stream-neutral —
>   budget for a few % of chaotic wobble and judge it on the tile histogram.**
>   The same agent flagged seed 1234's long straight monorail/cable
>   lines as still reading like a "wireframe/UI stroke" — but iters 85/87 closed that with two
>   agents each, so treat this as one un-zoomed opinion, **not** a reopening of cue (c).

## Iteration 186 — the café tables fill with patrons by day (2026-07-12) [People & activity × New element]

**Vector — People & activity × New element** (SHIPPED). Rotation named the stalest domain: **People** (last SHIP 178;
the 185 entry explicitly owed the 186 lap to People). On *kind*: Deepen just ran on People (178) and has been globally
hot (178/179/181), Interaction/UX ran twice recently (183/184), and Polish ran the last two laps (180/185) — so **New
element** was both the freshest kind (globally unused since Nature 174) and the one that gives a guaranteed-flat pop
when drawn-only. Aimed, per 127's law, not at People's spent *entity* list but at an under-served *surface*.

**The seam — set tables with no diners.** The park café/kiosk (drawn since long before the ledger, on every PARK hex
adjacent to a shop — the 455-strong `cafes` surface) puts out two parasol tables with poles and tabletops… and nobody
sits at them. The exact shape 127 found for the picnic lawn: a drawn amenity for people, with no people. A café is only
alive when someone is having a coffee at it.

**Change (~10-line draw, all draw-only).** In the `T.PARK` café block, after each parasol is drawn, add day-only
seated patrons: two chairs either side of the parasol, each gated `hashCell(x,y,seedNum^SALT)>0.5` so some sit empty
(a lived-in terrace, not a packed one), each a short colored body (`['gold','sage','lav','coral']`, `hashCell`-picked)
+ an ink head, clearly smaller/seated vs a standing ped. **Day-only** (`LITAMT<0.5`, matching the picnic lawn right
below it) so the terrace empties after dark. No tile / entity / `rng()` / `hashCell`-terrain / `tick()` pass / terrain
change; strings pure-ASCII (134); no new tile/entity → census hook, TILELABEL, ENTINFO all unchanged. Pop + stream
provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, entity/life/transport
counts identical. Vacuous by construction (draw-only) — the probe is the gate.

**Probe — `probes/probe-cafepatron.mjs` (new, promoted; cloned from `probe-whitecap.mjs`, the PATCH-vs-HEAD template).**
Diffs PATCH vs pristine HEAD over PARK screen boxes at a frozen frame, day/night, with two controls: PARKC (PARK cells
NOT adjacent to shops — no café draw, must stay ~0) and ROAD (must stay 0 — the café block is the only edit). Rebuilt
in-page (`genWorld`+`__warp`), STARS cleared, `Math.random` stubbed, movers cleared, clock frozen (163 law). seeds
7/42/1234: **CAFE patrons DAY 0.99/0.94/0.93% -> NIGHT 0.00% all** (the `LITAMT` day-gate, night byte-identical);
**PARKC control <=0.01% every frame**; **ROAD control 0.00% every frame**. Clean separation CAFE >> PARKC ~ ROAD ~ 0.
**VERDICT: PASS (3 seeds).**

**Visual — `probes/shot-cafepatron.mjs` (new, promoted).** ~7-8x zoom onto a café-edge PARK tile (selector requires
occupied seats + `v>=0.44` to skip the pond/fountain that would overdraw the tables + front-most row to avoid tower
occlusion), day + night. seed 42: patrons clearly visible as small seated colored bodies + ink heads flanking the coral
and teal parasols, correctly smaller/seated vs the taller bunting-pole standers, gone at night — agent + my own read
both **VISUAL: PASS**, whole frame balanced. seed 7: after re-framing (the first framing landed on a pond café where
the pond overdraws the tables, then on tower-occluded ones), patrons clearly visible on the park hex beside the shop's
striped awning by day, park hex dark and empty at night. Whole-city wide/downtown reads (both seeds, agents): balanced
coherent coastal city, no z-order tears / floaters / blowout / compounded clutter.

⚠ **A confidently-wrong agent FAIL, settled by the probe (the loop's law working).** The seed-7 visual agent FAILed
claiming the day/night behavior was *inverted* — "patrons appear at NIGHT, absent by DAY." The probe disproves it flat:
night café-diff is **0.00% byte-identical to HEAD** on seed 7, and the code gates `LITAMT<0.5` (night LITAMT=1.00, block
skipped). The "night figures" it saw were the *base* shop's lit-window silhouettes, present in HEAD too — not my
patrons. The FAIL was really a framing artifact (its shot centered on a pond café whose tables the pond overdraws, plus
a lit shop nearby). Per the header law (agents fail confidently; a FAIL naming a cause absent from the code is a cue to
*measure*, not redesign) the probe was the verdict, and a corrected framing then showed the seed-7 patrons plainly.

**Verdict — SHIPPED.** The park café tables — set with parasols since before the ledger and never once occupied — now
fill with seated patrons by day and empty after dark, like the picnic lawn beside them. A People × New element aimed at
a surface (127's law), draw-only, pop + stream flat, ~10 lines + a probe + a shot. People's New element cell gains 186
(41/56/127/170/**186**). Next is the mandated **step-back at 187**; the next domain lap (188) owes Transport (179), then
Urban (180)/Sky (181).

### Findings for later laps
- **A DRAWN AMENITY-FOR-PEOPLE WITH NO PEOPLE IS THE SAME SEAM AS THE MUTE-TOOLTIP TELL — look for set tables, empty
  benches, vacant stages.** 127 found it on the picnic lawn (blanket, no picnickers), 186 on the café terrace (tables,
  no diners). The move: a draw already stages a human activity but omits the humans; add them day-gated (`LITAMT<0.5`)
  and `hashCell`-scattered so pop stays flat and the night hands off cleanly. Candidates still open: the fountain-plaza
  benches, the amphitheater seating tiers (a daytime audience?), the market stalls (but MARKET reads 0 — dead host,
  107), the surf-beach towels (already crowded). Prefer the ones on a *developed/urban* surface, since the coast and
  parks are getting full.
- **A LATER DRAW IN THE SAME TILE CASE CAN OVERDRAW YOUR FEATURE — mind the case's own paint order.** The café tables
  are drawn first in `T.PARK`, then `if(v<0.24)` paints a big pond ellipse *over* them, and `v<0.32` a fountain — so on
  low-value café tiles the tables (and my patrons) are partly buried. The feature is correct (probe 0.93%+), but a
  close-up must frame a `v>=0.44` café tile to SEE it. When a per-tile feature reads absent at some framings but the
  probe says present, suspect a later same-case draw occluding it before you suspect the feature.
- **THE VISUAL-SHOT SELECTOR IS PART OF THE GATE — teach it to skip occluded instances.** A café-edge tile sits next to
  shops/towers, which draw tall in later rows and occlude it; a pond/fountern café buries its own tables. `shot-cafepatron.mjs`
  ends up selecting for occupied seats AND `v>=0.44` AND the front-most row precisely so the framing lands on a *visible*
  instance. A sparse/host-gated feature needs its shot to hunt for a clean example, or the visual gate reads a false
  absence (and an agent then invents a cause for it).


## Rotated from the GROWTH.md header at iter 197 (to pay for 197's step-back lines)

The header is a fixed 400-line budget: to add a line, cut a line, and never delete. Two blocks were
moved down here at iter 197, both superseded rather than wrong.

### (a) The per-iteration perf-history archaeology (was in the PERF BASELINE bullet)

**PERF BASELINE RE-PINNED 2026-07-10 (iter 105's step-back): day 33.16ms - night 37.33ms.** Held through
iters 109/110/111/117 against pristine-HEAD controls (per-iter detail archived at 140/142). Not re-pinned
since; day still reads flat against it, night now runs ~+2.2ms of real 137+138 draw plus load (see 142).
**Iters 130/136 (step-backs): 126->135 cost ZERO** (130 -0.5% both vs iter-125 `c63e43b`; 136 +0.1% vs iter-130
`f2aa721`; night +7% vs the STORED baseline proven load both). **147: 143->146 cost ZERO**; **152: 143->151 cost
ZERO** (both vs iter-142 `ce17d61`, min/variant, all flat). **157: 152->156 cost ZERO**
(day +3.5% inside the +-9ms day noise, night +0.4% flat). **162: 157->161 cost ~ZERO** — HEAD-161 vs iter-157
(`ae93fd4`, A/B/A/B min/variant) day **35.00 vs 35.05 (-0.1%)**, night **41.45 vs 41.00 (+1.1%)**; `perf.mjs` vs
stored baseline read +5.9%/+11.3% (pure load). The stored-baseline false-FAIL was an **EIGHT-time pattern**
(125->130->136->142->147->152->157->162) — it always understates today's load.
**142 (step-back): the interleave found a small but REAL cost — the first non-flat step-back delta.** `perf.mjs`
read day 34.34 (+3.6%) / night 40.83 (+9.4% vs stored baseline); interleaved HEAD-141 vs iter-136 (`6b31425`,
A/B/A/B, min per variant): day **34.44 vs 34.50** (-0.2%, flat) but night **41.39 vs 40.50** (**+2.2%**). That
+2.2% night was 137's figure contact-shadows + **138's per-arterial night lamps landing** — small, expected,
well inside budget (60fps 100% / 30fps 47.7%), NOT a regression to fix and NOT re-pinned.

### (b) Open cue (e½)'s closed brief (CLOSED at iter 102 — the commons)

**(e½) CLOSED — iter 102 shipped the blob 101 prescribed** (the commons), so the interior HAS its lung; do NOT
plant a second one. Its 28-line brief (94/100's "edge-to-edge carpet" holistic reads, and 101's reverted
greenway) was itself rotated at iter 196. The durable **urban** findings it carried, kept in the header until
197 and preserved here: **`PARK` is permanent** (nothing in `tick()` consumes one, so green planted in
`genWorld` survives to 2035); **green costs ~0.045% pop per cell and partly repays it** (`PARK` is the top
`valueSrc`, 0.92, and lifts the frontage it faces — `cafes` +141, `COM` +51); **never zone against `TOWER` near
the core** (92: -9.8% pop); and **the upgrade probability *saturates***, so leaning on `p` is a weak lever that
costs towers at ~240 pop each (98). 101's "a lung must be a BLOB, not a ribbon" is now the general
contrast-is-not-traceability law in SKILL.md.

## Iteration 187 — holistic step-back (no city change)

**Vector** — the mandated ~5-iteration step-back (105/110/115/120/125/130/136/142/147/152/157/162/167/172/177/**182**/**187**). The seventeenth step-back; isolates iters 183–186 (all draw-only: FARM harvest tooltip, hall-clock tooltip, whitecaps, café patrons) by interleaving HEAD against iter-182's file.

**Census** — PASS, every core aggregate flat vs baseline (pop/developed/roads unmoved; cafes 455, stations 40, boulevardTrees 1203 all +0). Draw-only run, so this is expected and proves only that no page threw.

**Perf (interleaved HEAD vs iter-182 `7614539`, A/B/A/B, min per variant)** — **day 36.72ms (HEAD) vs 36.28ms (182) = +1.2%; night 42.55ms vs 42.72ms = −0.4%.** Flat — four draw-only tooltip/element iterations cost nothing measurable. (Absolute numbers ran hot vs the 33/37 baseline this session — machine load; the interleaved delta is the verdict, not the absolute, per the same-session-pristine-control law.)

**Seasons alive** — `probe-season`: FARM winter→dry-peak **88.4**, VINEYARD 44.6→36.7, ORCHARD 25.3→41.4, ROAD control ~0.5–2.1. The calendar is working across every agriculture tile.

**Visual** — whole-frame reads at 3 lights × 2 calendars (day golden `year=2035.62` / night / winter `year=2035.02`), 2 seeds, one agent each, cumulative-drift question. **Both VISUAL: PASS.** Seed 42: balanced diamond city, dense-but-legible downtown, clean sand→teal coast (the old too-dark-coastline bug still absent), smooth sky, genuine night (lit windows + waxing-crescent moon + moonglade), winter a mild-but-present cool variant. Seed 7: same verdict — no z-order tears, no floaters, no hex seams, no blown-out color, coast bright not dark, night gold-lit with moon reflection.

**Verdict — EXPLORED → REVERTED** (no change to commit; `solvista.html` restored byte-identical after the perf swap). **Twelfth clean bill in a row.** The city is balanced, readable and beautiful at ~186 iterations; nothing has compounded into clutter or darkness; seasons, night mood and coast all read correctly; perf flat. Next domain lap (188) owes Transport (179), then Urban (180)/Sky (181). Next step-back at **192**.

## Iteration 188 — the cable cars rock on their hangers in the breeze (2026-07-12) [Transport × Polish]

**Vector.** Transport × **Polish** (SHIPPED). Rotation named the stalest domain: **Transport (179)** (186 was
People, 187 the step-back). On *kind*: Transport's whole run is night-ward Deepen (179 bridge lamps, 155 catenary),
New element (164 taxi), Interaction/UX (171 boulevards), Polish (146 bus). Deepen just ran at 179, so I **varied off
it deliberately** — 179 was "add a warm night lamp to an unlit transport structure," and the obvious next candidate
(a night lamp on the dark elevated monorail station) would have *repeated the move*. Polish instead, aimed at a
daytime-and-night stillness.

**The seam — the aerial transit hangs rigidly vertical.** I grepped the whole Transport surface first and found it
measured-saturated: roads carry lane markings, avenue/arterial centre-lines, lit night corridors, street trees,
boulevard allées, and bus shelters *with day-fading boarding queues*; vehicles have livery, headlights + red
taillights (5521), contact shadows, beacons, taxi checker; monorail trains and gondola cabins already have night-lit
glass windows; bridges got their night lamps at 179; the tram got its catenary at 155. The one thing left untouched:
the **cable-car cabins hang dead-plumb from the rope** and never move relative to it. Meanwhile the city already has
a *wind* — 185's whitecaps break on the swell, the kites fly, the flags stream — so a rigid, windless cable car is
the odd stillness out. Cable cars sway; ours didn't.

**Change (~6-line draw edit, all draw-only).** In the cabin draw block (render loop, ~L5960), each cabin now
**pivots about its fixed cable attachment point** (`gsx,gsy-Hs`): the hanger's *top* stays on the rope, and a lateral
`sway` offset swings the hanger *bottom*, the cabin body, its window band, and its hover-stamp together. `sway =
sin(time*1.15 + cb.p*39 + li*1.7)*1.7 + sin(time*0.63 + li)*0.7` — two out-of-phase sines (a quick gust over a slow
swell), per-cabin-phased off `cb.p`/`li` so no two cars rock in lockstep, ~±2.4px peak so it reads at moderate zoom
without looking unmoored. Pure draw off the animation clock `time`; no tile / entity / `rng()` / `hashCell`-terrain /
`tick()` pass / terrain change / new state; strings pure-ASCII (134). Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**; gondola **16** and every core metric **+0**
(`greenRoofs +1` = documented RAF tick-count jitter). Vacuous by construction (draw-only) — the probe is the gate.

**Probe — `probes/probe-cabinsway.mjs` (new, promoted).** A **MOTION** claim, so a **temporal** probe (iter-134
law: a frozen two-render diff is blind to cadence). It **freezes the SIM** (`playing=false`, so every cabin's rope
position `cb.p` and thus `gsx` stay put) and steps **only the animation clock** `time` across 48 samples of a cycle,
re-rendering at each and reading the stamped screen coords. The sway is a pure function of `time`, so:
**CABIN dx (cb._sx pk-pk) = 4.08 / 4.30 / 4.45** on seeds 7/42/1234 (matching the designed ±2.4 amplitude); **CABIN
dy = 0.000** (the sway is horizontal only); **TRAIN dx = 0.000** — a monorail train's `_sx` is the control, and with
the sim frozen it stays pinned, proving the motion is my sway and not the sim advancing. **VERDICT: PASS (3 seeds).**

**Visual — `/tmp` zoom + wide shots.** ~3× camera zoom centred on a cabin, rendered at **two clock moments** half a
slow-cycle apart (A/B) so a still-image agent can see the cabin swing relative to its fixed cable, plus a whole-city
`wide` (day golden `year=2035.62`) for the compounding check. seeds 42 & 7, one agent each, both **VISUAL: PASS**:
the coral cabin stays **connected by its hanger to the fixed cable** (not floating, not detached, not clipping the
tower), its offset/angle relative to the cable **differs between A and B** (sway visible), no z-order tears /
floaters / blown-out color anywhere, and the whole frame still reads as a balanced, beautiful coastal city.

**Verdict — SHIPPED.** The aerial cable cars — plumb and windless for the artifact's whole life — now rock gently on
their hangers in the same breeze that raises the whitecaps and flies the kites. A Transport × Polish that fixes a
*stillness* rather than repeating 179's night-lamp move: draw-only, pop + stream flat, ~6 lines + a temporal probe.
Transport's Polish cell gains 188 (U1/U3/70/85/87/94/**146**/**188**). The next domain lap (189) owes **Urban (180)**,
then Sky (181); the next step-back is at **192**.

### Findings for later laps
- **A "stillness" is a Polish seam the way a mute tooltip is an Interaction seam.** When a city already has a force
  (here: wind — whitecaps 185, kites, flags) that visibly moves *some* things, anything in the same medium that
  *doesn't* move is a gap worth closing. The aerial cabins hung rigid while everything else in the wind swayed. Look
  for other unmoved things that should respond to a force already in the scene: do the moored boats bob on the swell?
  do the flags on the far buildings stream while nearer ones are still? does anything hang (banners, the bunting)
  that should sway?
- **A pendulum under an iso vertical prism is free: pivot the ground point, pin the top.** `prismS` builds a vertical
  prism upward from a ground screen-point, so shifting that point laterally translates the whole body sideways at
  every height. To make it swing rather than slide, keep the *cable/attachment* draw at the original `gsx` and feed
  the *swayed* `gsx+sway` only to the body + the hanger's bottom endpoint. No rotation math, no new transform.
- **A MOTION Polish's gate is a TEMPORAL probe with a FROZEN-SIM control, and the control is another moving entity
  held still.** Rather than diffing two frames (blind to cadence) or trusting a still agent (can't see motion), freeze
  the sim and step only `time`: the feature's stamped coord must oscillate while a *sibling* entity that also gets
  stamped but does NOT have the feature (the monorail train) stays pinned — that pin is what proves the sim is
  actually frozen and the oscillation is the feature, not the world advancing. `_sy` doubles as an axis control
  (horizontal-only sway ⇒ dy≈0).


<!-- Header bullets rotated out of GROWTH.md at iteration 198 (the header is a fixed
     400-line budget: to add a line, cut a line). Both of iteration 196's banked
     watch items, superseded — (b) was CLOSED by 197 (the kelp bed count is fixed at
     genWorld and nothing in tick() grows it, so the precondition has no mechanism),
     and (a) was CLOSED by 198 (the cost is real, per-ellipse, and irreducible without
     un-grounding the trees — it is to be paid). Preserved verbatim: -->

  Both seeds VISUAL PASS and both agents correctly **located** low water by the kelp alone. **Two things banked for
  197's step-back: (a) 194's tree-shadow perf cost (day +3.4% / night +3.5%), and (b) at HIGH water the kelp hexes are
  still the darkest pixels in the water — if the bed count ever grows, kelp is the first thing that would band.**
  **So the next domain lap (198) owes Urban (189, Deepen/Polish only — measured-saturated), then Sky (190)/People (191);
  197 is the mandated STEP-BACK.**

## Header trim at iter 199 — 197's mandated perf lever (SUPERSEDED by 198, moved from GROWTH.md)

Rotated out of the maintained header at iter 199 because 198 measured it and it is FALSE —
it sat directly beneath the paragraph that disproves it. Preserved verbatim, never deleted:

> **⚠ 197 found the FIRST non-flat lap since 142, and it is REAL: 193+194+196 cost day +3.8/+4.4%,
> night +2.9/+3.0%** (two independent interleaves vs iter-192 `d8819ec`). It is **all 194's tree shadows** —
> 193 and 196 are free. Within precedent (118 shipped +5.1% night; 142's +2.2% was accepted) and NOT an
> emergency, but it is a per-object `fill()` on the city's most numerous object. **The lever is known: 194
> already proved memoizing `shadS`'s rgba string buys ZERO, so the cost is the FILL COUNT, not the string —
> batch a forest hex's ~4 tree shadows into ONE path with ONE fill.** See 197's entry.

198 built exactly that batch and measured **+0.3%: nothing.** `probes/probe-shadcost.mjs` then
discriminated the mechanism across 5 variants: the cost is **PER-ELLIPSE** (per path object
rasterized) — not per `fill()`, not per unit area, and a pre-baked sprite blit is *worse*. The
live statement of the cost model now lives in the header's PERF bullet and in SKILL.md.

## Iteration 189 — the shopfronts spill onto the pavement at night (2026-07-12) [Urban fabric × Deepen]

**Vector.** Urban fabric × **Deepen** (SHIPPED). Rotation named the stalest domain, **Urban (180)** — the 188 entry
owed the 189 lap to Urban. Urban is measured-saturated (additive spent 118, Connect measured-hard 160/165, roof-furniture
closed city-wide), so its laps are **Deepen/Polish only** and must go to *facades, ground plane, harbour apron* (header).
Kind varied off 180's Polish to a **Deepen** on the **ground plane** — the one part of downtown the many night laps never
reached.

**The seam — the liveliest windows threw nothing on the street.** Downtown grew a rich night layer over dozens of laps:
arterial lit corridors (L4197), ordinary-street lamp glows (L4216), bridge rail lamps + river reflection (179), COM neon
signs (L4608), terrace lanterns (L4521). Yet the COM **storefront glass** — lit at night with `colLit('glass',...)`, the
brightest ground-floor plane in the city — cast **no light onto the pavement it faces**. Every warm pool on the street
came from a lamp; none came from the shops themselves. A genuine gap on the ground plane, not another ornament.

**Change (~10-line draw, all draw-only, in the COM case after the `fs`/`bcx,bcy` setup, before the body prism so the
kerb/crowd sit on top).** Gated `LITAMT>0.4 && v>0.5` (the retail strip): a warm **ground pool** in front of the
storefront on the road-facing (`fs`) side — a wide soft wash (`rgba(255,206,124,·)`, 6.2×2.6) plus a brighter core near
the glass (`rgba(255,222,150,·)`, 3.6×1.5), positioned at the storefront base via the same `X/V/E` face maths `kerbS`
uses and pushed outward with `faceOutS(...,3.0)` toward the viewer/street. Amber matched to the street lamps' own
`rgba(255,204,120,·)` (L4208). **Source-over low alpha** (peak ~0.12/0.18), not `'lighter'`, so a row of adjacent lit
shops stacks into one continuous glow **without blowing to white** (159's overlap caution). No tile, entity array,
`rng()`, `hashCell`-terrain, `tick()` pass or terrain change; strings pure-ASCII (134). Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, entity counts identical
(`greenRoofs +1`/`towerHt -1` = documented RAF tick-count jitter, touches no `rng()`). Vacuous by construction
(draw-only) — the probe is the gate.

**Probe — `probes/probe-shopspill.mjs` (new, promoted).** Diffs PATCH vs HEAD over the COM cells' screen boxes at a
frozen frame, **night + day**, split by the gate: TARGET = COM `v>0.5` (spill drawn), CONTROL = COM `v<=0.5` (gate
excludes → no draw, so the control also tests the gate). Rebuilt in-page (`genWorld`+`__warp`), `STARS` cleared,
`Math.random` stubbed, movers cleared, clock frozen (163 law). seeds 7/42/1234: **COM v>0.5 NIGHT 0.22% / 0.30% / 0.28%
→ DAY 0.00% / 0.00% / 0.00%** (LITAMT 0.02, no draw); **v<=0.5 control 0.01–0.02%** both frames all seeds (edge bleed
from adjacent lit shops). **PASS (3 seeds).**

**Visual.** Night `downtown` + `wide`, seeds 42 (`warp=61`) & 7 (`warp=31`), pinned `year=2035.62`. Two agents, both
**PASS**: warm amber pools found on the pavement hugging the base of lit shopfronts, sitting flat on the hex ground
(not floating), fanning toward the street; **no z-order tears, floating tiles, or blowout** — the dense retail core stays
legible with dark pavement showing through, the spill reads as *pooled glow* not a merged white/orange smear, warm
windows still read as windows; the whole wide frame still a balanced night coastal city (dark sky/sea, moon, warm core
dimming to the edge), the spill deepening the warmth without clutter.

**Verdict — SHIPPED.** The one lit plane in downtown that gave nothing back to the street — the storefront glass — now
pools warm on the pavement in front of it, joining the night-lit ground plane the lamps, bridges and neon already built.
A ground-plane Urban Deepen: draw-only, pop + stream flat, ~10 lines + a probe. Urban's Deepen cell gains its next (…173,
**189**). The next domain lap (190) owes **Sky (181, Deepen/Fix ONLY — saturated)**, then the mandated step-back at **192**.

### Findings for later laps
- **A LIT VERTICAL PLANE BESIDE A GROUND PLANE OWES IT A SPILL, AND IT IS THE CHEAPEST GROUND-PLANE DEEPEN.** Same shape
  as 179's bridge-lamp reflection one dimension over: any structure that lights up at night (storefront, a floodlit
  civic facade, the market stalls, a lit pier) can pool a warm ground glow in front for two ellipses — and because it is
  glow-on-dark it clears the contrast×width bar at fit (179). Candidates still un-spilled: the MARKET stalls' string
  lights, the CIVIC floodlit facades (they light the wall but not the forecourt paving), the pier lamps.
- **STACK NIGHT GROUND-GLOWS WITH SOURCE-OVER LOW ALPHA, NEVER `'lighter'`, WHEN THE HOSTS ARE DENSE AND ADJACENT.**
  The COM strip packs shops hex-to-hex, so an additive (`'lighter'`) spill would have summed into a blown-white smear
  across the core (159's overlap law). The street lamps already solved this — plain `rgba(...,~0.11–0.22·LITAMT)`
  ellipses that *alpha-blend* toward warm without ever reaching white. Match the existing night-glow alphas rather than
  inventing a brighter one.


## Header trim at iter 199 — step-back recipe + clean-bill history 130..177 (moved from GROWTH.md)

Rotated out of the maintained header at iter 199 to pay for 199's lines (the header is a fixed 400-line
budget: to add a line, cut a line). The shooting recipe is duplicated verbatim in SKILL.md; the clean-bill
history is superseded by 197, the current step-back. Preserved verbatim, never deleted:

> Shoot it **at night AND a season, and PIN THE DAY FRAME OFF JANUARY** (`year=2035.62` dry-peak baselines +
> `2035.02` as the seasonal-contrast frame — a default `?warp=61` frame is already ~winter; SKILL.md holds
> the full recipe). **130, 136, 142, 147, 152, 157, 162, 167, 172 AND 177 all found NO compounding city defect** (TEN clean bills in a row, the
> honest step-back outcome, no city change): both seeds PASS day/night/season, agents *located* the night core
> off-centre by light alone (177: (.48,.50) / (.53,.60), matching 172's (.47,.55)/(.45,.62), 167's (.47,.50)/(.50,.62) & 162's (.48,.53)/(.45,.62); 115/143's lighting holds), 138's
> arterial night-corridors traced continuous both seeds, sea reads (116/123 hold), no tears/floaters/blowout;
> seasons measured alive (`probe-season`: FARM winter→dry-peak **88**, VINEYARD now moving too since 139, ROAD
> control ~0.5–2 — the *whole-frame* mildness agents feel is the by-design evergreen/irrigated dilution (120),
> a composition fact not a dead calendar). **The night-core-is-broad watch-item (136/142) is CASHED (iter 143,
> Urban × Polish): a `CORESIG=5` Gaussian bump on the CBD made the flat plateau a peak (`probe-nightcore`, detail
> archived); a stronger read widens the window mix `0.35+0.65·c.lit`, not `c.lit`.** (**125** = same shape, the pin-off-January recipe fix.)

## Header trim at iter 199 — the full 117-vs-99 perf diagnostic (moved from GROWTH.md)

Compressed in the maintained header at iter 199 (fixed 400-line budget); the operative rule survives there and
in SKILL.md's perf section. Preserved verbatim, never deleted:

> **⚠ 117 CORRECTED 99's DIAGNOSTIC.** The old rule read *"a **stable** pass-over-pass offset means code,
> a **rising** one means load."* **The stable half is FALSE**: machine load is autocorrelated over
> minutes, so three passes inside one loaded window are three samples of *one* draw. Iter 117's gate read
> **+25.5 / +26.0 / +26.5%** — perfectly stable — on a diff with **zero draw calls**, and the identical
> bytes read **+3.5%** twenty minutes later. **Never grade frame time by consecutive passes at all.** The
> only sound reading is **interleaved A/B/A/B against pristine HEAD** (swap `solvista.html` between every
> pass, min per variant) — and brace the shell interpolation, because `/tmp/$v117.html` silently measures
> one variant six times. 99's *remedy* (control against pristine HEAD, not the baseline file) stands, and
> "code" may still be earlier iterations' code. Re-pin at a step-back whenever the offset survives an
> interleaved control; `polish-tile` owns the file, so say so in the entry rather than re-pinning silently.

## Header trim at iter 199 — 195's full university post-mortem (moved from GROWTH.md)

Compressed in the maintained header at iter 199 (fixed 400-line budget). Its two GENERAL laws now live in
SKILL.md; the header keeps the live finding (the university is a polish-tile job). Preserved verbatim:

> **195 took Civic × Deepen and EXPLORED → REVERTED (`solvista.html` byte-identical to HEAD).** The finding is
> solid and still uncashed: **`university` is the ONLY one of the twelve civics with no `LITAMT` at all** — the
> only `MAJORK` monument that goes pitch dark after sunset (parliament floodlights 175, museum facade, hall clock
> 149, library reading hall, police beacon, hospital cross, observatory dome 158; even the school keeps one
> janitor's window). 179/193's shape exactly: a completed family missing one member. What failed was every
> **place to put the light**, and that is now known: (i) **the CAMPANILE ORPHANS A HALO** — tall and thin, so a
> taller neighbour drawn later (seed 7 sits beside a hospital tower) swallows the lamp while the glow, being
> bigger than its lamp, spills into open sky; an agent found *"a detached hazy glow blob floating in the sky,
> unattached to any geometry."* To revive it, **gate the halo on there being no taller cell in the rows below**
> (draw order IS depth order) — dimming it does not help. (ii) the **quad is occlusion-safe but the tile's OWN
> wings overdraw it** by an amount that flips with `fxU`'s per-seed sign (50 changed px on seed 42, **3** on
> seeds 7/1234, identical code). (iii) The tile is simply drawn **small** — no ornament on it carries at fit zoom
> without a glow that extends past the geometry, which is the thing that orphans. **⇒ The university is a
> `polish-tile` job, not a growth lap.** `probes/probe-unilight.mjs` (whole-frame diff + centroid locate-check;
> noon/dusk controls byte-identical at **exactly 0 px**) and `probes/shot-uni.mjs` are kept so a retry starts
> from a working gate. **So the next domain lap (196) owes Water (185), then Urban (189)/Sky (190); next

---

## Header material rotated out at iteration 200

The State of the city header is a fixed 400-line budget: to add a line you must cut a line.
These two paragraphs were moved down here at iter 200 to pay for 200's lines. Neither is
deleted; both are superseded by a shorter live pointer in the header (and, where noted, by a
law now written into SKILL.md).

**198's ROTATION paragraph (superseded by the header's PERF bullet, which carries the law):**
> **198 took 197's mandated tree-shadow PERF FIX (Nature x Polish) and EXPLORED -> REVERTED: the LEVER
> WAS WRONG, and all three candidate levers are now CLOSED.** 197 mandated "batch the per-tree `shadS`
> fills into ONE path per hex" by *inference*, never measurement (194 had memoized shadS's rgba string
> for zero gain, so 197 reasoned the cost must be the FILL COUNT). 198 built it: **+0.3%. Nothing.**
> `probes/probe-shadcost.mjs` then discriminated the mechanism — 5 variants all built from HEAD by
> surgery, interleaved, 3 runs: **NOSHAD -1.3..-3.5% (the shadows' whole price — real, and the ONLY
> variant that ever moves) - BATCH never wins (+0.3/+0.9/+2.7% day) - SMALLR (1/4 the AREA, same count)
> ~0% - SPRITE (blit a pre-baked ellipse via `drawImage`) +2..+4%, WORSE than filling.** => **the cost is
> PER-ELLIPSE** — near-independent of the ellipse's size, of how many are grouped into one `fill()`, and
> not blittable away. **The only remaining lever is drawing FEWER ellipses — i.e. un-grounding trees 194
> shipped and 197's agents twice praised. That is a bad trade: the ~3% is the honest price of the
> shadows. PAY IT, and do not re-open batch/area/sprite.** (Law promoted to SKILL.md: *measure a lever
> before you mandate it* — a step-back should name the suspect, not the fix.)

**195's ROTATION paragraph (its two laws — a glow is a GRADIENT; a halo on a TALL THIN object orphans —
are in SKILL.md, and its full post-mortem was already archived at 199; the header keeps a 2-line pointer):**
> **195 took Civic x Deepen and EXPLORED -> REVERTED (byte-identical to HEAD). The finding is solid and
> STILL UNCASHED: `university` is the ONLY one of the twelve civics with no `LITAMT` at all** — the only
> `MAJORK` monument that goes pitch dark after sunset (parliament/museum/hall clock/library/police/
> hospital/observatory all light; even the school keeps a janitor's window). 179/193's shape: a completed
> family missing one member. What failed was every **place to put the light** — the campanile ORPHANS ITS
> HALO on seed 7, the quad is overdrawn by the tile's own wings, and the tile is simply drawn small.
> **=> The university is a `polish-tile` job, not a growth lap.** `probes/probe-unilight.mjs` +
> `shot-uni.mjs` kept so a retry starts from a working gate.

**The 111->113 gap-closing block + the tell's history + the Sky-feedable list (rotated out of the header at iter 200; the header keeps a 4-line live pointer):**

>   Iter 111 was People × Connect and used
>   109's trick (close a gap between two existing objects); iter 112 **cashed the same trick in
>   Transport** (trains ↔ their own stations) and iter 113 cashed it a third time in **Water** (the
>   marsh ↔ the tide its own tooltip printed). **That shape has now paid in four domains — assume it is
>   spent, and look for the gap-closing seam only where a tooltip/label already ASSERTS a relationship
>   the draw ignores.** (That is the reliable tell: 111 a shelter, 112 a platform, 113 a live `Tide`.)
>   **The tell (a label asserting what the draw ignores) is CASHED 7x and its hosts are nearly spent** —
>   117 redwoods, 122 `CIVICLABEL`, 129 orchard, 140 plaza/quad titles, 148 vineyard, 183 FARM. Still MUTE:
>   `[T.IND]` (no calendar) and GARDEN (its draw is season-frozen — needs a Deepen first). Detail archived at 195.
>   **The tell is SELF-RENEWING: cashing one creates the next.** The full 111->148 history is in GROWTH-archive.md.
>   **122 also warns what the tell CANNOT do alone:** its first build derived ownership from *adjacency*, named
>   the wrong institution on 2 of 3 seeds, and **passed the census and would have passed both visual agents** —
>   the prose is only wrong if you know the geometry. **A tooltip vector needs a probe that checks the claim
>   against independently recomputed truth, not just a screenshot that it renders.**
>   Note iter 108 was Nature × Deepen but its
>   *content* was a Sky interconnect (the farm calendar reads `applySeason`'s `year`) — **Sky can be
>   fed by deepening another domain toward it**, which is the way out of its saturation that does not
>   require a sky feature. **113 did this again** (the marsh reeds now read `year`), leaving 109's
>   Sky-feedable list at `VINEYARD` and `MEADOW` seed-heads. **120 was a third instance** (the park lawns
>   now read `year`) — and note it found `MEADOW` is only **6 tiles city-wide**, so a meadow vector buys
>   almost no pixels. **Sky-feedable list is now EMPTY (iter 139 cashed `VINEYARD`)** — every vegetation tile
>   that can read `year` now does; a further Sky interconnect must come from a genuinely new derived field, not
>   from un-freezing another tile.

**The closed cue-(k) / wind-farm / derived-field block (rotated out of the header at iter 200; the header keeps an 8-line live pointer with the still-banked Water cue and the 151 recount warning):**

>   **Cue (k) is now FULLY CLOSED**: 116 gave the sea a bottom (the *field* half) and **123 stood the wind farm
>   on it** (the *siting* half) — 3/18 turbines were on the shelf, now 42/42 across 14 seeds, and the farm's line
>   bends around headlands because the depth is held and the row is not. **What 123 leaves banked for Water** is
>   the rest of the salted coast: the **pier** row and the **lifeguard tower** are still `rng()`-picked with
>   rejection loops, and a boardwalk should run out to a *depth*. 123's second finding makes that free — **respend
>   an object's existing `rng()` draws rather than re-drawing them**, and the stream cannot move.
>   **123 ran the tell FORWARDS**, which is a new move: rather than making the draw honor a string, it made the
>   string and the rule **share one constant** (`SHELF0`/`SHELF1` — the tooltip *names* the `Coastal shelf`, the
>   wind farm *stands* on it), so the two cannot drift apart in the first place. Prefer this to re-syncing them
>   later. Related, and the deeper prize: **a derived field earns its keep when a RULE reads it, not when the draw
>   shows it.** `rDeep` was drawn by 116 and read by nothing until 123 sited on it. Still unread by any rule:
>   **`rGreen`, `rShop`, `rServ`** feed only the walkable stat — *nothing sites itself against them.* **⚠ And a
>   tick-rule CAN'T read them directly (iter 151): `recount()` runs only at init/warp/manual, never in the sim loop
>   (L6342), so the reach maps are STALE inside `tick()`** — 151 cashed the seam's *shape* (a shop-distance rule)
>   but recomputed it LOCALLY (`countAround` r2), so `rShop` per se is still unread (recompute it, or pay a recount).
**The iter-91 institutions bullet, full text (rotated out of the header at iter 200; a 7-line live pointer remains):**

> - **Institutions now cluster: `MAJORK` / `QUARTER` / `siteQuarter()` (iter 91).** `MAJORK` =
>   the five monumental kinds (`hall museum parliament university library`) — it is the shared
>   vocabulary for "major institution", used by **both** the civic quarter and the 2020+
>   forecourt rule (which previously inlined the same five-way test). `QUARTER` = the three
>   that *seek* the quarter (`library museum parliament`, at 1982/1997/2034); services (school,
>   police, firehouse, hospital, aquarium, amphitheater, observatory) stay sited by need, and
>   `observatory` is deliberately left free to sit at the rim. `siteQuarter()` hugs the nearest
>   standing major at `QNEAR..QFAR` = **2–4 hexes** — near enough to share a street, far enough
>   to leave one between (adjacency would kill the bunting, which needs a ROAD cell reachable
>   from two civics). It falls back to the scattered search when the core is walled in, so
>   `civicKinds` never drops. **Two existing systems light up for free:** festival bunting
>   (iter 45) roughly **doubles-to-triples** (fete 9→16, 6→18 per city), and downtown builds
>   **taller** because three clustered civics choke one COM quorum instead of three.

## Iteration 190 — the golden hour rakes the west windows (2026-07-12) [Sky & atmosphere × Deepen]

**Vector.** Sky & atmosphere × **Deepen** (SHIPPED). Rotation named the stalest domain, **Sky (181)** — and the header
mandates Sky is **Deepen/Fix ONLY** (post-saturation: additive/CA cells are traps). Kind forced to Deepen. This cashes
the move **banked twice** (180's "windows catch the low sun", 181's finding that `GWARM` is "a reusable golden-hour
signal" for "a Sky×Urban golden-hour glint on west-facing tower windows"). A Sky×Urban interconnect, the third
golden-hour surface after the cloud bellies (161) and the sea (181) — it adds no element, applying an existing Sky
signal to an existing surface.

**The seam — the glass was cold at the most beautiful light of the day.** The clouds warm at dawn/dusk (161) and the
sea catches a gold sun-path (181), but the buildings' glass — the whole downtown curtain wall — stayed its flat cool
tone through golden hour. Every real coastal city's most iconic sunset image is a wall of towers reflecting the low sun
into orange fire on one side while the other stays shadowed. `winBandR` (L2736) is the **shared window renderer** for
all four building types (RES 4417 / MID 4504 / COM 4583 / TOWER's stacked bands 4657–4685), so one hook there reaches
every facade in the city, full-height up a tower.

**Change (~10-line draw + a small refactor, all draw-only).** `winBandR`'s daytime early-return was converted to an
`if/else` so the tail runs in both branches; appended, gated `GWARM>0.02`: an **additive** (`'lighter'`) warm-gold quad
(`rgba(255,176,88,GWARM*0.44)`) over the full window band of **ONE** front face — the sun-facing one, `gs=dayT<0.5?1:-1`
(**RIGHT at dawn / LEFT at dusk**, read off the same `dayT` clock `GWARM` derives from), drawn *over* the band so it
reads as the pane lighting up while the shaded face stays cool. Additive not a wash (181's law: a warm alpha wash over
cool desaturates to olive). No tile, entity, `rng()`, `hashCell`, `tick()` pass or terrain; `winQuad` geometry reused;
strings pure-ASCII (134). Byte-unchanged at noon and night (GWARM=0). Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, core metrics **+0** (pop/roads/developed flat),
`greenRoofs -1` = documented RAF tick-count jitter (touches no `rng()`). Vacuous by construction (draw-only) — the probe
is the gate.

**Probe — `probes/probe-windowgold.mjs` (new, promoted).** Diffs PATCH vs HEAD over each building's (`DEV`, `h>12`)
screen box at a frozen frame, at **dusk / dawn / noon / night**, with PARK/ROAD/WATER as the control, and — the
load-bearing part — **splits each box into LEFT vs RIGHT screen halves** to prove the rake is one-sided and *flips*.
Rebuilt in-page (`genWorld`+`__warp`), STARS cleared, `Math.random` stubbed, movers cleared, clock/`waveT` frozen (163
law). seeds 7/42/1234: **BLD glint DUSK 12.8/13.5/13.1% · DAWN 10.6/10.9/10.7% → NOON 0.00% · NIGHT 0.00%** (GWARM
0.72/0.43→0); **the lit half FLIPS — DUSK L 14.9/15.8/15.8% ≫ R 11.1/11.7/11.0%; DAWN R 11.5/12.0/12.2% ≫ L
9.1/9.1/8.6%**; CONTROL 0.00% at noon/night (proving nothing else moved), 1.7–3.7% at dawn/dusk = my own glint bleeding
into adjacent tiles' boxes. **PASS (3 seeds).**

**Visual — a split verdict resolved by the probe, then re-verified.** First build (`*0.30`): seed-7 agent PASS ("subtle
but clearly one-sided, the rake flips"), seed-42 agent FAIL ("flat scene-wide wash, no directional flip"). The
directional probe had already measured the flip cleanly *on seed 42* (dusk L 15.0 ≫ R 11.1), so per the loop's law the
probe is the verdict over disagreeing agents — the effect was real and directional, just **under-powered for reliable
legibility**. Both agents confirmed headroom (no clipping). Bumped `*0.30→*0.44` (color to `255,176,88`), re-probed
(directional contrast steeper, L/R ≈ 1.35× at dusk, still byte-zero noon/night), re-shot seed 42: agent now **PASS** —
"on individual towers the LEFT face reads warmer cream/amber while the RIGHT sits greyer at dusk, and the warm side
switches to the RIGHT at dawn on the same towers; no tears/floaters/blowout; wide frame a balanced golden-hour coastal
city."

**Verdict — SHIPPED.** The building glass — cold through golden hour while the clouds (161) and sea (181) caught the low
sun — now takes a warm gold rake on its sun-facing windows, one side ablaze and the other shadowed, the lit face
flipping between dawn and dusk. The third golden-hour surface; a Sky×Urban interconnect, draw-only, pop + stream flat,
~10 lines + a directional probe. Sky's Deepen cell gains its next (…181, **190**). The next domain lap (191) owes the
stalest domain, **People (186)**, then the mandated **holistic step-back at 192**.

### Findings for later laps
- **GOLDEN HOUR NOW LIGHTS THREE SURFACES — clouds (161), sea (181), glass (190) — all off the ONE `GWARM`/`GWSB`
  signal.** The golden-hour system is now a genuine interconnect, not a one-off. Surfaces still cold at dawn/dusk: the
  **beach sand** (145 ties it to `LITAMT`, not `GWARM`), the **wind turbines** (181's banked "warm rim"), and the
  west-facing **civic domes/pediments**. Each is a ready Sky Deepen that adds no element — read `GWARM>0.02` and carry
  the warmth with `'lighter'` glints, never an alpha wash (181).
- **A DIRECTIONAL DRAW-ONLY CHANGE NEEDS A DIRECTIONAL PROBE — split the box, don't just diff it.** The census and a
  whole-box diff both said "12% of building pixels changed," which a wash would also say; only splitting each box into
  LEFT/RIGHT halves and showing the lit half *flips* dusk↔dawn proved the rake was one-sided (and it is what the census
  and a naive probe are blind to). When a feature's whole point is *which side* lights, the gate must measure the side,
  and a control that must move the *other* way at the other frame is stronger than a control that must stay at zero.
- **THE FIRST STRENGTH THAT PASSES A PROBE CAN STILL FAIL THE EYE — legibility is a separate bar from presence.** The
  `*0.30` build passed the probe on all three seeds (the flip was measurable) yet a strict agent could not *see* the
  directionality; `*0.44` was the same effect, legibly. When a subtle Deepen splits the agents, don't revert on the
  FAIL and don't ship on the probe alone — the probe says it's *there*, the agent says it's not *legible*, and both are
  right. Push the strength until the eye catches what the probe already measured, then re-verify (cheap).


<!-- Header bullets rotated out of GROWTH.md at iter 201 to pay for 201's lines.
     The header is a FIXED 400-line budget: to add a line, cut a line. Nothing is
     deleted — these are preserved byte-for-byte and were live until iter 201. -->

## Closed cues, rotated from the header at iter 201

  **(l) CLOSED (iter 133) — hover-tile focus ring + the thin-stroke legibility law: both in GROWTH-archive.md (iter 157 trim).**
  **(e½) CLOSED — 102 shipped the commons 101 prescribed. The interior HAS its lung; do NOT plant a second one.**
  (Brief + urban findings — PARK permanent; green ~0.045% pop/cell; never zone against TOWER near the core — archived at 197.)
  **(d) the civic quarter's real square — CLOSED, MEASURED DEAD (iter 131; do not re-open — a ≥3-hex civic
  square is geometrically impossible at the quarter, `probe-quarter.mjs`; full reasoning archived at iter 142).**

## The step-back framing recipe, rotated from the header at iter 201 (SKILL.md holds the live copy)

  Shoot it at 3 lights x 2 calendars with the day frame PINNED OFF JANUARY (`year=2035.62` baselines,
  `2035.02` for seasonal contrast) — **SKILL.md holds the full recipe**; the duplicate copy of it, and the
  clean-bill history of step-backs 130..177 (TEN in a row, no compounding defect; night core located by light
  alone every time; `probe-season` FARM winter->dry-peak ~88) were rotated to `GROWTH-archive.md` at 199 — 197
  is the live step-back, its findings in the bullets above.
  (Stale 182/lap-160 pointers rotated to `GROWTH-archive.md` at 195 — the header is a fixed budget.)

## Iteration 191 — the festival street names itself (2026-07-12) [People & activity × Interaction/UX]

**Vector.** People & activity × **Interaction/UX** (SHIPPED). Rotation named the stalest domain: **People (186)** —
the 190 entry explicitly owed the 191 lap to People, ahead of the mandated step-back at 192. On *kind*, I cashed a
**banked, specific cue** the header had been carrying since 171 and re-flagged after 178: *"171's fete-street TOOLTIP
(`c.fete` drawn but unnamed in `describeTile`) is still banked, and now more worth cashing since the street is no
longer empty."* A banked measured finding outranks kind-rotation (119's law), and Interaction/UX varies cleanly off
186's New element.

**The seam — the richest street in the city read as a plain one.** The festival street (`c.fete`) is a civic mile:
where two civic institutions front the same short stretch of road, the blocks between them string up bunting (a whole
CA derivation in `tick()`, ~L1866), light the strand at dusk, and — since 178 — fill with a milling day-into-dusk
crowd. Yet `describeTile`'s ROAD branch knew nothing of it: hovering the most decorated, most inhabited street in the
diorama reported a flat `Avenue`/`Street`/`Boulevard` like any other. The exact *asserts-less-than-the-code-knows*
tell (MARSH tide 113, REDWOOD 117): a draw stages something the tooltip is mute about.

**Change (draw-nothing tooltip, two edits in `describeTile`).** (1) In the ROAD title branch, a `c.fete` override:
title `'Festival street'`, sub `'The civic mile &mdash; bunting strung overhead where two institutions front the same
short blocks.'` (HTML entity, not a raw em-dash byte — 134's mojibake law; the sub goes into `innerHTML`). (2) A live
`Festival` data row after the `Traffic` row, reading the **same crowd gate the 178 draw uses** —
`clamp((0.82-LITAMT)/0.28,0,1)>0.02 ? 'Crowds under the bunting' : 'Quiet after dark'` — so the tooltip can never claim
a crowd the renderer left home (one predicate, one definition, 112's law). Both branches gate on the same `c.fete` the
draw reads. No tile / entity / `rng()` / `hashCell` / `tick()` pass / terrain change; census hook, TILELABEL, ENTINFO
untouched. Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0**, entity/life/transport
counts identical (`solarRoofs -2` = RAF tick-count jitter; `describeTile` isn't even in the census path). Vacuous by
construction (hover-only) — the probe is the gate.

**Probe — `probes/probe-fetetip.mjs` (new, promoted).** A DOM/logic probe (like `probe-river`), not a pixel diff:
loads a developed city (`genWorld`+`__warp`), collects fete vs ordinary ROAD cells, and across a **day** frame
(`__setTime(0.35)`) and a **night** frame (`0.90`) calls `describeTile()` and asserts the HTML, **independently
recomputing** the crowd gate from live `LITAMT` (122's law — grade against recomputed truth, not just that it renders).
seeds 7/42/1234: **every fete hex (16/10/19) titled 'Festival street' with a 'Festival' row matching the recompute**,
the value **FLIPS** day `Crowds under the bunting` → night `Quiet after dark`; **ordinary roads (788/821/855) control
clean** — never titled 'Festival street', never carry a 'Festival' row, in either frame. **VERDICT: PASS (3 seeds).**

**Visual — `probes/shot-fetetip.mjs` (new, promoted).** `shoot.mjs` can't hover; `__find('fete')` gives fete cells'
clip-ready screen coords. Freezes the clock at a day + a night frame, hovers a central fete cell, clip-shoots the
tooltip + prints its `innerText`. seeds 1234 & 7, one agent each, both **VISUAL: PASS**: the tooltip box is legible,
title `Festival street`, the sub's `&mdash;` renders as a clean em-dash (no mojibake / no literal `&mdash;`), and the
`Festival` row reads `Crowds under the bunting` by day, `Quiet after dark` at night; no z-order tears / floaters /
blowout, the whole frame still a coherent coastal city day and night.

**Verdict — SHIPPED.** The festival street — bunting since before 178, a crowd since 178, and mute in the tooltip its
whole life — now names itself and reports whether the crowd is out, on the very gate that draws them. A draw-nothing
Interaction/UX cashing a banked cue: pop + stream flat, two small edits + a probe + a shot. People's Interaction/UX
cell gains 191 (71/**154**/**191**). Next is the mandated **holistic step-back at 192**; the next domain lap (193)
owes Transport (188)/Urban (189), then Nature (183)/Civic (184).

### Findings for later laps
- **CASHING A BANKED TOOLTIP CUE IS THE LOOP WORKING — the header told 191 exactly what to do, five laps after 171
  found it.** 171 spotted `c.fete` was drawn-but-unnamed and banked it; 178 inhabited the street and made it *more*
  worth naming; 191 cashed it. A banked cue that names the seam AND the predicate (`c.fete` in `describeTile`) is a
  near-free iteration — grep the seam, confirm it's still unnamed, share the draw's own gate.
- **A LIVE TOOLTIP ROW SHOULD READ THE DRAW'S OWN GATE VERBATIM, and its probe should RECOMPUTE that gate, not the
  row.** The `Festival` row copies `clamp((0.82-LITAMT)/0.28,0,1)>0.02` from the 178 crowd draw, so tooltip and pixels
  cannot drift; the probe recomputes the same gate from `LITAMT` and asserts equality (122's law). This is the tooltip
  analogue of 123's "share one constant" — but here the shared thing is a *predicate*, and the strongest evidence it's
  right is that the row's value FLIPS between the day and night frames exactly when the recompute does.
- **Still-mute draws worth a future tooltip lap:** `c.hedge` (field hedgerows, drawn, unnamed), `c.party` / `c.shroom`
  (both in `__find`'s selector, so drawn, likely mute in `describeTile`) — grep each before designing to confirm.


## Iters 199 + 200 rotation paragraphs, rotated from the GROWTH.md header at iter 201
## (their LAWS live in SKILL.md and in the header's PERF / PROBES-BLIND-TO-HUD bullets; this is the full text)

  **200 took Sky x Polish (THE SUN IS IN THE SKY - SHIPPED).** The city carried a whole FAMILY of low-sun effects
  for dozens of laps - warm cloud bellies (161), the sea's golden sheen (181), sun-glitter (150), raked window
  glass (190), beach furniture following the sun (145) - and **the sun itself was never drawn: every warm thing
  in this sky had a cause that was not on screen** (the draw's own comments name it; the MOON gets a disc, phase,
  earthshine, halo and glade). 179/193/195's shape, except the missing member is the **source**. Invents no
  signal: its SIDE is `dayT`'s (rises RIGHT, sets LEFT - 190's `gs` rule) and its COLOUR is GWARM/GWSB, so it is
  the **5th reader** of the one golden-hour signal. A gradient halo + a soft-rimmed disc (195's coin-not-a-glow
  law), gated on `dayT` in [SUNUP,SUNDN] = **the light curve's OWN dawn/dusk keyframes (0.05/0.78)**, so night
  draws nothing. **GWARM ALONE CANNOT CARRY THE DISC DOWN** - it is gated on the low sky being ORANGE (R-B>70),
  and by the time the sun touches the horizon the sky has gone PURPLE, so GWARM is back to 0 and the sun turns
  **WHITE at the exact moment it should be an ember** (measured: horizon warmth 20.6 vs noon 20.9). Altitude
  reddens it the rest of the way, toward a *fixed* ember - not toward GWSB, which by then is lilac.
  `probes/probe-sun.mjs` (**PAGE screenshots, not canvas - see the PROBE/DOM bullet, that is this lap's real
  finding**): arc **0.90 -> 0.79 -> 0.62 -> 0.41 -> 0.33, MONOTONIC right->left, 3 seeds**, highest at noon, disc
  R-B **21 -> 110**, contrast 31-97, 13k-26k VISIBLE px per day pin, **night sunDraws = 0** (proved by hooking the
  renderer). Both seeds VISUAL PASS; agents **located the disc within ~0.01 of the formula on every frame**.
  **COSTS day +2.3%/+1.7%; night -0.2%/-0.4% = the free inert control (199).** Real, and **PAID** (cheaper than
  194's +3.4%). See the PERF bullet: it is two **GRADIENT** fills, which 198's cost model never measured.
  **199 took Urban × Deepen (the city goes to bed — SHIPPED).** `winBandR` lights a pane wherever
  `hashCell(...) >= WINDARK` and leaves the rest as wall, and its own comment calls that remainder **"nobody
  home"** — but `WINDARK` was a **CONSTANT (0.16)**, so the same panes were dark at 8pm and at 4am and every
  window lit at dusk still burned at dawn: the city never went to bed. **This is the tell's NEXT HOST: not a
  tooltip asserting what the draw ignores (113/117/183) nor a comment (194), but a CONSTANT whose NAME asserts a
  behaviour its VALUE cannot have.** `LITAMT` could not carry the hour either — **the light curve PINS it at 1.0
  from dayT 0.86 all the way to midnight**, so the whole evening is one flat plateau; the hour comes from `dayT`,
  the slow clock the moon (135)/hall clock (149)/observatory (158) share (5th reader). `windarkAt(t)` now sweeps
  the threshold up through the panes over `nightDeep()`, **per building type** — RES .10→.52, MID .14→.40, COM
  .15→.36, TOWER .17→.28 — so homes empty, offices keep a late shift and towers keep a skeleton crew: **the
  night core (143) SHARPENS as the night deepens; the differential IS the point, not the dimming.** Two
  deliberate non-moves: **`colWin`'s mean-holder stays pinned to the BASELINE** (let `a` chase the hour and it
  would *brighten every survivor to hold the block's mean*, cancelling the signal and clipping to white), and
  **no new randomness** — the existing per-pane `hashCell` already gives each pane a fixed "how late this
  household stays up", so the threshold sweeps them out in a stable order (stream-neutral by construction).
  Live `Windows` tooltip row off the SAME `windarkAt()`. Draw-only, census vacuous. `probe-bedtime` counts panes
  by **wrapping `winQuad`** (actual draw calls, not my formula): **BASE dusk→midnight = 0.0% on all 4 types × 3
  seeds** (the seam, as a number) vs **PATCH RES 37% / MID 25% / COM 19% / TOWER 10% go dark, a 3.4–3.7×
  differential**; midnight **100% DARKER, 0.000% lighter** (anti-blowout gate); noon **0 panes drawn on both
  builds, byte-identical**; dayT pin live. **PERF FREE** (see the PERF bullet's new noise-floor law). Both agents
  **LOCATED the later frame BLIND with the A/B labels inverted between seeds**, reading the core as *"stronger
  contrast between core and periphery… the right nocturnal read."*
  **The lap now resumes owing Sky (190), then People (191)/Transport (193); next step-back at 202.**


## Header bullets rotated out at iter 202 (per-lap recaps of 184-194)

These were superseded by the live ROTATION line in the GROWTH.md header. Preserved verbatim; moved, not deleted (SKILL.md step 5: the header is a fixed budget — to add a line, cut a line).

  step-back at **197** (which also owes 194's flagged tree-shadow perf cost a look).** (162, **167**, **172**, **177**, **182**, **187**, **192** = step-backs, no domain lap.) **191 took People × Interaction/UX (the festival street names itself — the `c.fete` civic-mile road, bunting-strung since before 178 and crowd-filled since 178, was mute in `describeTile`: it now titles 'Festival street' with a live `Festival` row reading 'Crowds under the bunting'/'Quiet after dark' off the SAME `clamp((0.82-LITAMT)/0.28,0,1)>0.02` gate the 178 crowd draw uses; a banked cue from 171 finally cashed (119's law: a banked measured finding outranks kind-rotation). Draw-nothing tooltip, pop+stream flat, `probe-fetetip` recomputes the gate independently — every fete hex named + row FLIPS day→night, ordinary roads control clean, 3 seeds; both seeds VISUAL PASS, `&mdash;` renders clean. Still-mute draws banked: `c.hedge`, `c.party`, `c.shroom`.) **192 was the mandated STEP-BACK — eighteenth, THIRTEENTH clean bill in a row (perf 188→191 flat: day −1.0%/night 0.0% vs iter-187 `ec206ef`; seasons alive FARM dry-peak 88.4; coast bright, night lit, winter present, both seeds VISUAL PASS). No city change.** **193 took Transport × Deepen (the ferry lights up for the night crossing — the LAST transit vehicle to run dark at night now carries warm-lit cabin windows + a white masthead + red-port/green-starboard nav lights + a wash on the water, completing the night-light family (bridges 179, shopfronts 189, windows 190) on the vehicle it had missed; framed to NOT repeat 179's amber lamp — a distinct MARINE vocabulary of coloured sidelights; draw-only stream+pop-neutral, `probe-ferrylight` FERRY night 2.0–2.2% ≫ day 0–0.23%, BOAT ctl 0.00% at night (ferries only), 3 seeds; both seeds VISUAL PASS, agents located the lit vessels). So the next domain lap (194) owes Urban (189, Deepen/Polish only — measured-saturated), then Nature (183)/Civic (184); next step-back at **197**. **190 took Sky × Deepen (the golden hour rakes the sun-facing WINDOWS — an additive warm-gold glint on ONE front face of every building's glass at dawn/dusk, RIGHT at dawn / LEFT at dusk off `dayT`, cashing 180/181's banked "windows catch the low sun"; the THIRD golden-hour surface off the one `GWARM` signal after clouds 161 & sea 181, a Sky×Urban interconnect hooked into the shared `winBandR` so it reaches all 4 building types full-height; draw-only stream+pop-neutral, `probe-windowgold` splits each box L/R to prove the rake is one-sided AND flips: dusk L≫R, dawn R≫L, byte-zero noon/night, 3 seeds; a split agent verdict at `*0.30` was resolved by the probe then re-verified at `*0.44` — legibility is a separate bar from presence). So the next domain lap (191) owes People (186), then the mandated step-back at 192.** **189 took Urban × Deepen (the lit shopfronts spill warm light onto the pavement in front at night — the COM storefront glass, the brightest ground-floor plane in the city, cast NOTHING on the street it faces while lamps/bridges/neon all glowed; a warm ground pool on the road-facing `fs` side gated `LITAMT>0.4 && v>0.5`, source-over low alpha matched to the street lamps' amber so a row of adjacent shops stacks without blowing to white (159's overlap law), positioned via `kerbS`'s face maths + `faceOutS`; a ground-plane Urban Deepen since Urban's additive/Connect are spent, draw-only stream+pop-neutral, `probe-shopspill` COM v>0.5 night 0.22–0.30% → day 0.00% 3 seeds, v<=0.5 gate-control ~0.01% both frames; both seeds VISUAL PASS, no blowout in the dense core). So the next domain lap (190) owes Sky (181, Deepen/Fix ONLY — saturated), then the step-back at 192.** **188 took Transport × Polish (the cable-car cabins rock on their hangers in the breeze — each cabin now PIVOTS about its fixed cable point, the hanger top staying on the rope while the body swings under it, two out-of-phase per-cabin sines, ~±2.4px so it reads at moderate zoom; the aerial transit hung rigidly vertical for the artifact's whole life while whitecaps/kites/flags all moved in the same wind, so this fixes a stillness rather than repeating 179's night-lamp move — draw-only off `time`, no rng/state, pop+stream flat; a MOTION claim so a TEMPORAL probe: `probe-cabinsway` freezes the SIM and steps only `time`, cabin `_sx` swings 4.1–4.5px pk-pk, `_sy` control 0.000, frozen monorail-train `_sx` control 0.000, 3 seeds; both seeds VISUAL PASS at ~3× — cabin stays connected by its hanger to the fixed cable, offset differs A↔B). So the next domain lap (189) owes Urban (180), then Sky (181); step-back at 192.** **186 took People × New element (the park café tables fill with seated day-only patrons — the 455-strong `cafes` surface put out parasol tables since before the ledger but never a single diner, the same amenity-with-no-people seam 127 found on the picnic lawn; `hashCell`-scattered, `LITAMT<0.5` so the terrace empties at night; draw-only stream+pop-neutral, `probe-cafepatron` CAFE day 0.93–0.99% → night 0.00% byte-identical, PARKC+ROAD ctls ~0, 3 seeds; a seed-7 agent FAIL claiming day/night INVERSION was disproven by the probe — its "night figures" were the base shop's lit windows. NB a later same-case draw (pond/fountain, `v<0.32`) OVERDRAWS the tables, so the shot selector hunts a `v>=0.44` front-most café). Next is the mandated STEP-BACK at 187; the next domain lap (188) owes Transport (179), then Urban (180)/Sky (181). **184 took Civic × Interaction/UX (the town hall clock tells its time on hover — a `Clock` row via a new `clockWord(dayT)`, reading the same slow day clock the drawn hand has pointed at since 149; kind repeated 183 because every other Civic kind is spent-or-hot, and saturation beats kind-rotation (118); draw-nothing tooltip, pop+stream flat, `probe-hallclocktip` clock-match 7/7 × 3 seeds, 7 distinct times across the day, non-hall control 500/500 clean). So the next domain lap (185) owes Water (176), then People (178)/Transport (179)/Urban (180). 185 took Water × Polish (wind-driven whitecaps break on the open swell — sparse seeded `hashCell` foam caps on open water beyond the coastal shelf `rDeep>SHELF1`, day-only via `LITAMT<0.6` so the night hands off to the moonglade; the one texture the flat daytime mid-ocean lacked, aimed at the biggest untouched water SURFACE not another coast entity; draw-only stream+pop-neutral, `probe-whitecap` SEA 0.21-0.30% day ≫ SHELF ≤0.07 ≫ LAND 0 → night 0, 3 seeds; agents "just right, slightly faint" after a size/alpha bump). So the next domain lap (188) owes Transport (179), then Urban (180)/Sky (181); step-back done at 187, next at 192.** **194 took Nature × Polish (the trees put their feet on the ground — every tree and palm now drops the house-style `shadS` contact shadow that peds/dogs (137), the static crowds (163), every vehicle and the buildings (180) have dropped for dozens of iterations; the trees, the most numerous vertical object on the plate, floated. Found by grepping the shared primitive, not the ledger: **180's own comment CLAIMS "cars/peds/crowds/trees all use the same shadS"** — the assert-what-the-draw-ignores law, in a COMMENT rather than a tooltip. Sized per species (broadleaf .22 / conifer .19 / poplar .11 / palm .15) at alpha .13 so a 4-tree forest hex grounds without the floor going dark (159's overlap law). Draw-only, census vacuous; `probe-treeshadow` gates on the fact that **a contact shadow can only DARKEN** — FOREST 3.2-4.9% / PARK 2.5-2.7% darker px with **ZERO lighter on every seed**, LAND-ctl (1014 cells) and WATER byte-flat, 3 seeds. A seed-42 agent warned the dense grove went 'olive-muddy, near the tolerable limit' (the kelp failure mode) — **confabulation, disproven by the probe: FOREST mean luminance moves -0.36..-0.44 of 255**, under half a luminance level. ⚠ **COSTS day +3.4% / night +3.5%** (interleaved A/B vs pristine HEAD, `probes/perfab.mjs`) — an ellipse fill on the city's most numerous object; within tolerance and precedent (118 shipped +5.1% night) but a REAL cost — **197's step-back should watch it**. A memo of `shadS`'s rgba() string was tried to buy it back and measured ZERO — reverted.) So the next domain lap (195) owes Civic (184), then Water (185); next step-back at **197**.

## Iteration 192 — the eighteenth step-back finds a clean city, perf flat (2026-07-12) [holistic step-back]

**Vector** — the mandated ~5-iteration step-back (105/110/115/120/125/130/136/142/147/152/157/162/167/172/177/**182**/**187**/**192**). The eighteenth step-back; isolates iters 188–191 (all draw-only: 188 cable-car cabin sway, 189 shopfront night spill, 190 golden-hour window glint, 191 festival-street tooltip) by interleaving HEAD against iter-187's file (`ec206ef`). Not a domain × kind lap — reads the WHOLE city for cumulative drift the census and per-feature gates are blind to.

**Census** — PASS, every core aggregate flat vs baseline (pop/developed/roads unmoved; cafes 455, stations 40, boulevardTrees 1203, greenRoofs 405→406 chaotic-noise). Draw-only run, so this is expected and proves only that no page threw.

**Perf (interleaved HEAD vs iter-187 `ec206ef`, A/B/A/B, min per variant)** — **day 35.16ms (HEAD) vs 35.5ms (187) = −1.0%; night 41.25ms vs 41.25ms = 0.0%.** Flat — four draw-only iterations (cabin sway, shopfront spill, window gold, fete tooltip) cost nothing measurable. (Interleaved delta is the verdict, not the absolute, per the same-session-pristine-control law.)

**Seasons alive** — `probe-season`: FARM winter→dry-peak **88.4**, VINEYARD 44.6→36.7, ORCHARD 25.3→41.4, FIELD 2.4→5.3, ROAD control ~0.5–2.1. The calendar is working across every agriculture tile.

**Visual** — whole-frame reads at 3 lights × 2 calendars (day golden `year=2035.62` / night / winter `year=2035.02`), 2 seeds (42, 7), one agent each, cumulative-drift question. **Both VISUAL: PASS.** Seed 42: balanced diamond city, legible downtown, bright clean sand→teal coast (no dark-coast compounding), genuine lit night (windows + waxing-crescent moon + moonglade), winter a mild-but-present cool variant; no z-order tears/floaters/mojibake/blowout. Seed 7: same verdict — coast clean, night atmospheric (one agent noted the far-right night ocean is fairly dark but moon/moonglade keep it legible — not a failure), winter distinct.

**Verdict — EXPLORED → REVERTED** (no change to commit; `solvista.html` untouched — a step-back, no city vector). **Thirteenth clean bill in a row.** The city is balanced, readable and beautiful at ~191 iterations; nothing has compounded into clutter or darkness; seasons, night mood and coast all read correctly; perf flat. Next domain lap (193) owes Transport (188)/Urban (189), then Nature (183)/Civic (184). Next step-back at **197**.



## Header bullet rotated out at iter 202 (the full iter-201 recap)

Compressed in the GROWTH.md header to pay for 202's lines; its laws live in SKILL.md. Preserved verbatim.

  **201 took People × Deepen (the beach follows the tide — DEEPENED).** 145 taught the beach furniture to follow
  the **sun**; the beach *ground* has answered the **tide** all along (the damp margin `w2=2.4+(1-TIDE)*5`, which
  196 used as its positive control *because* it provably reads TIDE) — but the furniture was drawn at `px(gx,gy)`,
  the bare hex centre, so **the sunbathers answered one signal, were deaf to the other, and at dead low water were
  lying on wet sand.** 196's shape one tile along, in People. `wetReach()` now owns the band's reach as **one
  definition with two readers** — the margin that *strokes* the wet sand and the beachgoers who must stay *off* it
  (drift them apart and the towels end up in the surf); `seaDirS()` gives the seaward normal (same water test, a
  river is not the sea; `null` = landlocked). The ensemble slides by the band's own reach either side of its
  **mid-tide** value, so it retreats on the ebb, follows the water down on the flood, and **sits exactly where it
  always did at mid-tide.** Draw-only, census vacuous. `probe-beachtide` measures **draw calls, not pixels**
  (wrapping `ctx.ellipse` on the parasol's `4.5x2.6` signature — unique in the file — so there is **no pixel noise
  floor and the zero is honest**): **BASE 0.00px on 3/3 seeds = the seam as a number**, vs **PATCH +4.80px**, the
  predicted travel *to two decimals*; perp drift 0.00, the 26–30 **landlocked** beach hexes 0.00 (no sea to answer),
  and the damp margin moves on **both** builds = the TIDE pin is LIVE (196's law: without it, BASE=0 is a dead pin,
  not a deaf draw). **PERF free BY CONSTRUCTION: zero new path objects** (198's cost model) — measured nothing,
  and said so. Both seeds VISUAL PASS blind with **A/B inverted between seeds**.
  **⚠ Two laws this lap paid for, both now in SKILL.md: a FIXED screenshot CLIP is not a framing (the `coast` rect
  missed seed 7's coastline entirely and an agent correctly FAILed the *crop*), and an agent's "this is backwards"
  can be an objection to the ARTIFACT'S MODEL, not to your change.**


<!-- header recap for iter 196, rotated out of GROWTH.md's maintained header at iter 203 to pay for 203's lines (the header is a fixed 400-line budget) -->
  **196 took Water × Deepen (the kelp bed breathes with the tide — SHIPPED).** `describeTile`'s `tidal` test (L6759)
  includes `T.KELP`, so a kelp bed has always printed a live `Tide` row (`High water`/`Flooding`/`Ebbing`/`Low water`)
  over a draw that read `TIDE` **nowhere** — iter 113's marsh defect, one tile along, unnoticed for 83 iterations. On the
  ebb the four canopy mats now rise, spread and lighten toward exposed olive, and each frond tip lies over and trails
  along the surface; **at/above `TIDE` 0.62 every term is 0 and the draw is byte-identical to HEAD**, so the tide only
  ever *adds* the exposed canopy and can never darken the bed (that byte-zero is what keeps this clear of the historic
  kelp-darkness failure mode). Shares the marsh's own `ebb` cut (0.62) rather than inventing a second threshold (123's
  run-the-tell-forwards move). `lq` quantizes the tide factor into 4 steps because **`colMix` caches on `t`** and a
  continuous `t` defeats that cache. Draw-only, pop+stream flat, census vacuous. `probe-kelptide` diffs **LOW vs HIGH
  water within ONE build** (frozen clock, same `genWorld`), so the only variable is `TIDE`: **BASE kelp interior 0.00%
  on all 3 seeds (deaf — the seam) vs PATCH 35.7-41.9% (answers)**, BEACH as the **positive control** (moves identically
  on both builds, proving the tide pin is live — without it "BASE = 0" would be a dead pin, not a finding), ROAD 0.00%.
  Both seeds VISUAL PASS and both agents correctly **located** low water by the tide-exposed kelp alone. (196's two banked
  watch items are both CLOSED and were moved to the archive at 198: the kelp-banding cue **cannot fire** — 197 showed the bed
  count is fixed at `genWorld` — and 194's tree-shadow perf cost is **real and to be PAID**, see the ROTATION and PERF bullets.)

## Iteration 193 — the ferry lights up for the night crossing (2026-07-12) [Transport × Deepen]

**Vector — Transport × Deepen** (SHIPPED). Rotation: the maintained header named **Transport (188)** as next-owed for 193.
Kind: a night-lighting Deepen, but framed to NOT repeat 179's amber lamp-post move — the ferry carries a distinct
*marine* vocabulary (coloured sidelights), and it is the last transit vehicle in the city with zero night presence.

**The seam — the only dark transit vehicle at night.** Cars carry headlights + red taillights (L5561), buses/trams glow
their window strips, emergency vehicles flash beacons, the bridges lit their deck rails (179), the shopfronts spill onto
the pavement (189). The **ferry** — 2 per city, patrolling the coast band — ran *pitch dark*: its `col('white')` cabin is
night-tinted to dark navy and it showed no light at all while crossing the black harbour. A genuine gap, the exact
179/189 night-light shape on the one vehicle it had never reached, and a Transport×Water interconnect.

**Change (~16 lines, draw-only, at the end of `drawFerry`).** A single `if(LITAMT>0.35)` block: warm cabin windows (4
small squares along the cabin), a white masthead dot over the wheelhouse, red-port / green-starboard nav lights at the
hull ends (`cx-6*dir` / `cx+6*dir`, so they swap with heading), and a soft warm wash ellipse on the water below (mirrors
179's on-river lamp reflection). Source-over low alpha — no blowout (159's overlap law; and 2 ferries never overlap).
Distinct from 179 by design: *coloured* marine sidelights, not amber lamp-posts. No tile / entity array / label / `rng()`
/ `hashCell`-terrain / `tick()` pass; strings pure-ASCII (134). The ferry already has its `ENTINFO` row + `stamp()`, so
no tooltip/label sync needed. Pop + stream provably flat.

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, all core metrics **+0** (`greenRoofs +1` = documented
RAF tick-count jitter, touches no `rng()`). Ferries 18/matrix = 2/city. Vacuous by construction (draw-only) — the probe
is the gate.

**Probe — `probes/probe-ferrylight.mjs` (new, promoted).** Whole-box PATCH-vs-HEAD diff (161's law) over each ferry's
screen box at a FROZEN frame; `Math.random` stubbed *before* `genWorld` so ferry `fr` is identical across the two loads,
STARS cleared, clock frozen, land movers cleared (163 laws). seeds 7/42/1234: **FERRY lights NIGHT 2.07 / 2.16 / 1.97%
≫ DAY 0.00 / 0.23 / 0.00%** (9× separation; the block never runs by day, LITAMT<0.35) · **BOAT control 0.00% at night**
(fishing boats got no lights — the edit touched ferries only, not all harbour craft). **VERDICT: PASS (3 seeds).**

**Visual.** Night wide + coast clips, seeds 42 & 7 (`t=0.9&step=200`), one agent each, LOCATE-not-judge. **Both VISUAL:
PASS.** Both agents *found* the lit vessels on the water (warm cabin windows + red/green end dots + white masthead),
confirmed the lights sit ON the hull (no floating/tears), the faint reflection reads, the dark fishing boats stay dark,
and the whole night frame stays balanced — sparse lit accents against a large dark sea, no clutter or over-brightness,
city glow still dominant.

**Verdict — SHIPPED.** The harbour ferry — the last transit vehicle to run dark at night — now carries its lights across
the night crossing in a marine vocabulary (warm windows, white masthead, red/green sidelights, a wash on the water),
completing the night-light family (bridges 179, shopfronts 189, windows 190) on the one vehicle it had missed. Draw-only,
pop + stream flat, ~16 lines + a probe. Transport's Deepen cell gains 193. The next domain lap (194) owes **Urban (189,
Deepen/Polish only — measured-saturated)**, then Nature (183)/Civic (184). Next step-back at **197**.



<!-- header recap for iter 202 (the 20th step-back), rotated out of GROWTH.md's maintained header at iter 203: its perf finding now lives in the PERF bullet, its camera finding in SKILL.md + probes/shot-stepback.mjs, and its banked cue was CLOSED by 203 -->
  **202 was the mandated STEP-BACK — the 20th. CLEAN BILL on the city; the INSTRUMENT was what was broken.**
  Census PASS, seasons alive (FARM dry-peak 88.4), both seeds VISUAL PASS. Its two findings, both promoted to SKILL.md:
  (a) **PERF COMPOUNDS BENEATH THE PER-LAP GATE.** The mandated interleaved A/B grades each lap against the lap
  before it, and 199+200+201 duly read **free (day +0.4%, night −1.1%)** — but measured against OLDER step-backs the
  same HEAD reads **192 +5.2% · 177 +7.5% · 162 +8.6% day** (night +2.1/+4.1/+5.7%). A ~0.2%/iter drift is
  *permanently* under the noise floor of a 3-iteration A/B. **A step-back must price the ARC, not the lap:
  `REF=<older step-back sha> perfab.mjs`.** New `probes/probe-drawbudget.mjs` censuses where the frame goes (path
  objects = the unit of cost, 198): **drawCell is 94% of it**; day `prismS`+`bandS`+`hexTile` = **77%** (static terrain
  re-rasterized every frame), night `winBandR` = **32.6%** (43,421 path objects from 2,672 `fill()`s — 198's law made
  visible). It is CALIBRATED: `shadS` = 2.7% of day paths vs its **measured** −2.8/−3.1%. SUSPECT named, fix NOT
  mandated (198's law). (b) **THE STEP-BACK'S OWN CAMERA WAS LYING** — four agent-reads, two false FAILs ("no sun",
  "winter == summer"), both the instrument: `?t=0.80` is `phaseWord()`=**'night'** (past `SUNDN=0.78`, the sun block
  draws *nothing*), and `?year=` **drifts ~0.167 yr/s** while `shoot.mjs` waits (iter 139's trap, documented and never
  fixed at source — summer drifted to autumn, winter into spring, so agents saw farmland "inverted"). New
  `probes/shot-stepback.mjs` freezes the clock in-page and takes its pins FROM THE LIGHT CURVE (day .30 / golden .68
  where GWARM peaks / night .92). Re-shot: both seeds PASS, and two blind agents put the sun at **(0.386,0.104)** and
  **(0.39,0.105)** vs the shipped formula's **(0.388,0.107)**. (Its **banked "thin dark line" cue is CLOSED by 203** —
  see the ROTATION bullet: it was the cable-car haul rope, the artifact is innocent, and PROBE-it-don't-redesign was
  exactly right: all four agent-reads named a cause the measurement refuted.)

<!-- Header block rotated out of GROWTH.md at iter 204 (the header is a fixed 400-line budget:
     to add a line, cut a line). The three steering laws it carried survive, compressed, in the
     live header; this is the full text as it stood. -->

  **124 closed the ghost-`c.solar` cue (detail in archive) — the LAST banked cue that moved a census number;
  from here the census is vacuous for most vectors, so reach for a probe.**
  **123 cashed the cue banked for Water, exactly as 122 cashed Civic's, 121 cue (h), and 119 cue from 111:
  four laps running where *the header told the iteration what to do*.** That is the loop working. **But 123 also
  found the banked cue's own description of the code was WRONG** (it said `hashCell`; the turbines were `rng()`),
  and the implementation the cue prescribed would have reshuffled the seeded stream. **A cue is a pointer, not a
  spec — re-grep the seam before designing to it.**
  **119 took People × Deepen, its FULLEST cell, and was right to** — because 111 had already *measured*
  and banked the vector there (move the ped spawn pool). **A banked, measured finding outranks both
  kind-rotation and cell-emptiness**; the grid says what is *untried*, not what is *most wanted*. Check
  the last entry of the stalest domain for a banked finding before reading its row.
  **⚠ 118 declined the header's own "coldest kind" steer, and was right to.** The header said *New element*;
  118 first grepped the Urban draw and found its additive moves **spent** (cranes, helipads, masts, skybridges,
  lofts, solar/green roofs, terraces, neon, podia — full inventory in 118's last finding). Saturation beats
  kind-rotation: when a domain's additive cell is exhausted, the kind changes, not the domain. Read the
  inventory before proposing an Urban **New element**.

## Iteration 194 — the trees put their feet on the ground (2026-07-12) [Nature × Polish]

**Vector.** Nature × Polish. Nature was stalest (183) and **Polish is its coldest
cell — last touched at iter 96, ~100 iterations ago.** The seam was found by grepping
`shadS` rather than by reading the ledger: peds/dogs (137), the static standing crowds
(163), every vehicle, the gulls, and the buildings (180) all ground themselves with a
contact shadow. The trees — the most numerous vertical object on the plate (~25 call
sites: FOREST 2-4/hex, PARK, QUAD, PLAZA, MEADOW, GARDEN, SHOREPARK, the boulevard
street trees, the redwoods, the beach palms) — cast nothing and floated. **Iter 180's
own comment at the building shadow literally CLAIMS "cars/peds/crowds/trees all use
the same shadS".** They didn't. That is the loop's own richest-seam law (a label
asserting a relationship the draw ignores) found in a *comment* rather than a tooltip.

**Change.** Two `shadS` calls, +12 lines, draw-only. In `tree()` a contact shadow at
the foot of the trunk sized to the crown each species actually carries — broadleaf
0.22, conifer 0.19, poplar 0.11 (its narrow plume shades a fraction of a round head)
— and in `palm()` a 0.15 shadow at the bole's foot (it stays at the base even though
the trunk curves away downwind above it). All at alpha 0.13, deliberately low so a
four-tree forest hex grounds without the floor going dark (159's overlap law).

**Census.** PASS. Draw-only: tile histogram empty, `developed`/`roads`/`tileKinds`
+0, pop -3/154918 (0.002%, noise). Vacuous by construction — the iteration rests on
the probe.

**Probe.** `probes/probe-treeshadow.mjs`, build-vs-build over a deterministic in-page
rebuild (161). The gate exploits a physical fact: **a contact shadow can only DARKEN**,
so `lighter` px must be exactly 0.

| class | darker | lighter | meanLum |
| --- | --- | --- | --- |
| FOREST (host) | 4.06 / 4.87 / 3.23% | **0.00** | -0.36/-0.44/-0.29 |
| PARK (host) | 2.59 / 2.53 / 2.66% | **0.00** | -0.27/-0.27/-0.28 |
| LAND-ctl (1014 cells) | 0.00 / 0.00 / 0.00% | 0.00 | 0.00 |
| WATER (700+ cells) | 0.00 / 0.01 / 0.00% | 0.00 | 0.00 |

3 seeds. Zero lighter pixels anywhere, on any seed.

**Visual.** Both seeds VISUAL PASS; both agents *located* the tree cover correctly
(inland forest wedges + the palm line on the shore), so they actually looked. The
seed-42 agent warned the dense conifer grove went *"distinctly darker/olive-muddy...
near the tolerable limit"* — the kelp failure mode, and worth taking seriously. **It
was confabulation, and the probe proved it:** FOREST mean luminance shifts by
**-0.36..-0.44 out of 255**, i.e. less than half of one luminance level. The grove's
pixels *move* (4.9% of them) but its tone does not sink. Agents name causes; a number
is the verdict.

**Perf.** `probes/perfab.mjs` (new; interleaved A/B/A/B vs pristine HEAD, min per
variant, because a stored baseline cannot answer "did MY change cost anything").
**day +3.4%, night +3.5%** — consistent across both scenes, so real, not noise. This
is the honest price of an ellipse fill on the most numerous object in the city. Within
tolerance and within precedent (118 shipped night +5.1%), but **logged as a real cost,
not waved through** — the next step-back (197) should watch it.

**Verdict: SHIPPED.**

### Findings

- **The richest seam can be a COMMENT, not a tooltip.** The loop's law says a *label*
  asserting a relationship the draw ignores is a bug. It generalizes: iter 180's code
  comment asserted trees used `shadS` and nothing had ever checked. **`grep` the shared
  primitive (`shadS`) for who calls it, and diff that against who *claims* to.**
- **A control that is contaminated is not a control — fix the control, don't move the
  threshold.** The first run FAILed on a farm control reading 0.26-0.41% darker. It
  would have been trivial (and wrong) to loosen the gate. The cause was **box bleed**:
  at R=12px the sample box around a farm cell reaches into the tree-bearing hex next
  door. Excluding tree hosts within *two rings* drove it to exactly 0.00% — which
  **proves** the bleed explanation instead of asserting it.
- **A hand-maintained predicate drifts from the draw it mirrors (one-predicate law,
  again).** A residual 0.026% on the land control was not noise — it was GARDEN and
  SHOREPARK missing from my `TREEHOST` set. **Attribute each `tree()`/`palm()` call to
  its enclosing `case T.X:` from the source rather than guessing the host list**; the
  marginal number was a real hole, not a threshold to fudge.
- **A rejected optimization is still a result.** `shadS` rebuilds an `rgba()` string
  per call, and with trees it is now the hottest draw call in the frame — so memoizing
  it looked free. Measured: **it bought nothing** (+3.6/+3.1 vs +3.4/+3.5, pure noise).
  Chrome already caches the fillStyle parse; the cost is the ellipse path+fill itself.
  Reverted, so the diff is exactly the feature. **Don't ship an optimization you did not
  measure — and don't keep one that measured zero.**
- **Banked for Nature:** the shadow is *centered* (house style — nothing in the artifact
  casts a directional shadow). If a future Sky vector ever gives the city a real sun
  direction, `shadS`'s call sites are now a complete, single-primitive inventory of every
  grounded object, and a directional pass could be done in one place.


<!-- Header block rotated out of GROWTH.md at iter 204: the per-lap recaps of 143-163 and the
     kind-picking discussion. The durable steers survive, compressed, in the live header. -->
  Recent kinds (135–141 recaps archived at iter 162 trim):
  **143 Polish (night CBD Gaussian light peak — `CORESIG`)** · **144 Interaction/UX (moon HUD card — `moonWord()`)** · **145 Deepen (beach furniture follows the sun via `LITAMT` — day-only umbrellas, `probe-beachsun`)** · **146 Polish (the bus reads as a bus — taller boxy body + window strip + cream livery, `probe-buslivery`)** · **149 Deepen (town-hall clock hand reads `dayT` — 24h dial, up at noon / down at midnight, agrees with the sun & moon; `hallClockCtr` shared by draw + `__clock` hook, `probe-hallclock`)** · **150 Polish (the open sea gets a day-only SUN GLITTER — cool bands of shimmer lift the water tone at noon, gone by dusk, night byte-unchanged; `probe-glitter`)** · **151 New CA rule (the block grows its own CORNER SHOP — a house in a shop desert opens a green-awning store on its ground floor via `c.corner`, a mixed-use FLAG so it stays RES and the census is vacuous; re-validating, stream+pop neutral; `probe-cornershop`)** · **152 STEP-BACK (fifth consecutive clean bill — no city change; perf 143→151 ~zero, seasons alive, night core located)** · **153 Deepen (the night STARS fade under a full moon — a 5th reader of `MOONF`, per-star magnitude thins the faint ones first; `probe-starmoon`)** · **154 Interaction/UX (the Resident tooltip names what the ped is doing from its hex — pier/market/green/kerb — via `residentDoing()`, the dog echoes its owner; `probe-strolling`)** · **155 Deepen (the streetcar draws from an OVERHEAD CONTACT WIRE — the pole that poked at empty air now rides a catenary strung the A→B block; the draw-form of the 149 tell; `probe-tramwire`)** — (**130/136/142/147/152/157 were the holistic step-backs.**) **156 New element (the WOODS FLOWER IN SPRING — a wildflower understory carpets the 69-hex forest floor before the canopy closes, then fades by summer; shared `springBloom()`, draw-only stream+pop-neutral; `probe-woodbloom`).** **157 STEP-BACK (sixth consecutive clean bill — no city change; perf 152→156 ~zero, seasons alive incl. FOREST now moving via 156, night core located both seeds).** **158 Deepen (the OBSERVATORY DOME opens after dark and ROTATES to track the night sky — slit at the zenith at midnight, leaning to the horizons at dusk/dawn, shut by day; reads the slow `dayT` like the 149 clock & 135 moon; `__obs` locator, `probe-obsdome`).** **159 Deepen (the SURF GLOWS at night — bioluminescence sparkles the breaking wave with sparse soft sea-green DOTS, `LITAMT>0.5`-gated & `hashCell`-scattered, draw-only stream+pop-neutral; `probe-biolum` — the Water entry in the moon/stars/observatory night run).** Interaction/UX ran hot 133/134/140/141/144; 143/145/146/149/150/151/153/155/156/158/159 broke it to Polish/Deepen/Polish/Deepen/Polish/New-CA/Deepen/Deepen/New-element/Deepen/Deepen, 154 was Interaction/UX. **160 Urban × Connect EXPLORED → REVERTED** (RES terracing — extend 109's MID street-wall to houses): mechanism worked (`probe-terrace` 46–53% gap-fill vs 0.5% control) but the HOST doesn't exist at scale — only ~15% of RES have an E-W RES neighbour and ZERO seeds form runs of ≥3, and RES bodies are HEX PRISMS (widening a hex ≠ a shared-wall terrace). **Law: check host ADJACENCY, not just host count, before a Connect — 109's street-wall is MID-specific (MID clusters + is rectangular); RES/COM terracing needs measured E-W runs first. Urban × Connect still open (last SHIP 109); a COM high-street arcade (`hstr` marks retail runs) is the better target once its adjacency is measured.** **161 Deepen (CLOUD BELLIES catch the GOLDEN HOUR — the two lower puffs of a fair cloud tint toward `dl.skyBot` by `cwarm=clamp((R-B-70)/70,0,1)`, warm at dawn/dusk, ~0 at noon AND night; top puff & rain clouds untouched; draw-only stream/pop-neutral; `probe-cloudwarm` sky-band build-vs-build, dusk +11.6 warm≫cool, noon control balanced).** The `cwarm` gate off `skyBot` is a reusable golden-hour signal; next Sky feed needs a genuinely new derived field (the Sky-feedable vegetation list is empty since 139, and the SEASON word is still banked-but-blocked by its fast-`year` strobe, 134). **162 STEP-BACK (seventh clean bill).** **163 Polish (STATIC STANDING CROWDS finally cast the house-style contact shadow — the evening strip crowd (COM) + school-run drop-off now `shadS` at their feet like every ped/vehicle since 137; draw-only stream/pop-neutral; `probe-crowdshadow` strip 234/206 darker px & ZERO lighter, control flat). Closes 137's banked static-crowd gap; only the ELEVATED platform queue + abstract concourse dots deliberately left (deck/dots, not ground figures).**
  (Stale 182/lap-160 pointers rotated to `GROWTH-archive.md` at 195 — the header is a fixed budget.)
  Sky is post-saturation (Deepen/Fix ONLY — its additive/CA cells are traps;
  the banked Sky move is the SEASON word, which needs a slow clock FIRST — see the moon note above). Urban's
  additive cell is spent (118). The coldest kind is **Scale** (a structural lever, not a lap move);
  **New element** was cashed at 127 (before that 106). Note 118's finding that a *saturated* domain cannot take a
  New element — but 127 sharpens it: saturation is of a domain's *entities*, and a New element can still land on a
  large untouched **surface** (127 put picnics on PARK, 145 a daily rhythm on the beach). Pick the domain first and
  read its row before choosing. **Connect** (last 111) is live and cheap: its trick is to add no new object.
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

<!-- Header block rotated out of GROWTH.md at iter 204: the agriculture `tell` recap (129/139/148/183),
     which the header itself marks SPENT. The live pointer survives, compressed. -->
  their draws (123's stream-neutral trick) — but that REPEATS 123's site-on-depth mechanism, so vary it.** (**129 cashed the tell a 7th time for Nature**:
  the orchard drew a blossom/fruit calendar since iter 57 but its tooltip was mute; it now names the
  season via a shared `orchardPhase()`. **129's banked Nature Deepen is CASHED (iter 139)**: VINEYARD's
  grapes/canes now read `year` via a shared `vinePhase()` (bare in winter → purple at harvest), the last frozen
  agriculture tile. **Its tooltip is now CASHED (iter 148)** — a `Vines` season row reads the same `vinePhase()`
  (`Bare canes`/`In leaf`/`Green fruit`/`Ripe for harvest`), like 129's orchard `Grove` row. **The
  asserts-less-than-the-code-knows tell is now SPENT for agriculture** (orchard 129 + vineyard 148 + **FARM 183** —
  183 closed the biggest host, which 148's "spent" note had OVERLOOKED: a `Fields` phase row on `farmPhase(c.v)`,
  `Ploughed under`/`Sprouting`/`Standing crop`/`Ripening to straw`/`Cut for harvest`); GARDEN's draw
  does not read `year` (needs a Deepen first, per 129), so the next Nature × Interaction/UX is a *new* seam.) (**127 took People × New element** aimed not at its spent

## Header recaps rotated out at Iteration 205

The maintained header in `GROWTH.md` is a fixed 400-line budget: to add a line you cut a line.
Iteration 205 paid for its own recap by rotating these two down here in full. Their laws are
already promoted to `SKILL.md`; the header keeps a one-line pointer to each.

**203 took Transport × Polish and EXPLORED → REVERTED — it CLOSED 202's banked "thin dark line" cue.**
The line is the **aerial cable-car HAUL ROPE**: `col('ink',1.05)` = **`#373128`, the darkest ink in the palette,
fully OPAQUE, at 0.5 DEVICE px**. Each span is 12-14px (below any "long line" filter) but **15-25 spans CHAIN into
an unbroken 199-331px dark run** across the sky and the sea, on all 3 seeds — *the eye sees the chain; a per-stroke
filter cannot*. **The agents' CAUSE was wrong and the artifact is INNOCENT:** `probe-gondz` renders one frame under
two z-orders (rope in place vs. the same polylines re-stroked on top) and measures **8.4-23.6% OCCLUDED** on every
seed/light — not 0%, so the rope **is** depth-sorted (the girder strokes only to the midpoint; `stepGond` only takes
`axStep` d=1/d=2 and **both are y+1**, so a path is monotone in y). "No cabins on the line" was false too — they
render at **~24px each**; they are not missing, they are **5 px**. **The attempted polish DIED ON ITS OWN PROBE**
(`probe-ropesteel`): a daylight **glint = 0 px on every seed/light — a DEAD DRAW** (at 0.5 device px the core and
the highlight land in the SAME sub-pixel, so a thin dark line *cannot carry a lit top edge*), and **peak contrast
0.33 → 0.34, UNCHANGED** while coverage rose 419 → 567px — **a halo under a thin dark line makes it MORE prominent,
not less.** ⇒ **What is really wrong is LEGIBILITY, not z-order or colour (101's law on Transport):** at fit zoom the
whole tramway is **sub-pixel infrastructure** (0.5px rope, 5px cabins, hairline masts), so the rope is the only part
that registers and a lone hairline with no legible cars or towers reads as a scratch. **A future lap here is a
`polish-tile`-shaped job on the WHOLE tramway (rope + cabins + masts together), NOT a tweak to the rope's colour.
Do NOT re-try: a body/halo under the rope (measured, backfires) or a lit top edge (measured, impossible at 0.5px).**
Four laws promoted to SKILL.md (occlusion is measurable; the loud test fails sub-pixel; `Math.random` is part of the
freeze-list; a chain is not a stroke).

**201 took People × Deepen (the beach follows the tide — DEEPENED).** The beach GROUND answered the tide all along
(the damp margin `w2=2.4+(1-TIDE)*5`), but the furniture drawn at the bare hex centre did not — so at dead low water
the sunbathers lay on wet sand. `wetReach()` is now ONE definition with TWO readers (the margin that strokes the wet
sand + the beachgoers who must stay off it); `seaDirS()` gives the seaward normal (`null` = landlocked). `probe-beachtide`
counts DRAW CALLS not pixels, so the zero is honest: BASE 0.00px (the seam) vs PATCH +4.80px, the predicted travel to two
decimals. **Laws paid for, both now in SKILL.md: a FIXED screenshot CLIP is not a framing; and an agent's "this is
BACKWARDS" may object to the ARTIFACT'S MODEL, not to your change.** Full recap rotated to `GROWTH-archive.md` at 202.

## Iteration 195 — the university will not light (2026-07-12) [Civic & culture × Deepen]

**Vector.** Civic & culture × Deepen (rotation owed Civic — last lap 184; kind varied
off 184's Interaction/UX).

**Change (attempted).** *The one dark institution.* Grepping `LITAMT` across all twelve
`c.kind` civic draw branches turned up a clean, measured gap: **`university` is the only
civic in the city with no `LITAMT` reference at all** — the only one of the five `MAJORK`
monuments that goes pitch dark after sunset, while the parliament floodlights its colonnade
(175), the museum its facade, the hall its clock (149), the library its reading hall, the
police its beacon, the hospital its cross, the observatory its dome (158), and even the
school keeps one janitor's window burning. Same shape as 179 (dark bridges) and 193 (dark
ferry): a completed family with exactly one member missing. Three draw-only elements were
tried, all inside the `kind==='university'` branch:
(a) the wing's flat dead glass strip → the city's own per-pane `winBandR` field (salt
`0x5CB1`), so a scattered few panes burn and the rest are nobody home;
(b) the campanile's belfry lantern burns warm, with a radial-gradient additive halo;
(c) a warm courtyard pool on the quad the wings enclose.

**Census.** PASS every build. `pop`/`roads`/`developed` **+0**, tile histogram empty,
`pageerrors: 0` — draw-only, `hashCell` off `seedNum`, stream- and pop-neutral throughout.
(Vacuous by construction, as expected for a night draw; the probe is the gate.)

**Probe.** `probes/probe-unilight.mjs` — whole-frame PATCH-vs-HEAD diff (161's law: two
builds run identical code save the edit, so **every differing pixel IS the edit**, and its
CENTROID must land on the university, which makes it a locate-check and not just a
magnitude). Controls were clean throughout: **NOON and DUSK exactly 0 changed px** on all
three seeds — byte-identical, because `winBandR` falls through to the very `bandR`/`colLit`
call it replaced below `LITAMT<0.35` and `lit` is 0 by day. The target never earned its
place:
- lantern pane alone: **5 / 47 / 8** changed px whole-frame (seeds 7/42/1234) — *at the
  noise floor*; both visual agents saw nothing on the tower.
- + halo: **21 / 136 / 44**, then **27 / 155 / 61** once the halo was drawn last. Legible
  at last — seed 42's agent, asked strictly to hunt for a rim: *"obvious… the single
  brightest thing in the frame… reads as LIGHT, fades smoothly, no visible rim, ring or
  seam even where it crosses the spire… the spire stays green."*
- occlusion-safe elements only (windows + quad): **3 / 50 / 1** — sub-perceptual again.
  Pushing the alphas to compensate **broke the noon control** (6 px): raising the window's
  `f` from 0.85 to 0.90 also moved the *day* fallback colour. The control caught it.

**Visual.** The halo build was beautiful on seed 42 and **broken on seed 7**, where a
blind agent found *"a detached hazy round glow blob floating in the empty sky just off the
tower's right edge, unattached to any geometry"* — **the halo, orphaned.** The campanile is
tall and thin, so a taller neighbour (seed 7 sits beside a hospital tower, drawn later
because it is a lower row) swallows the lamp while the glow, being by construction larger
than its lamp, still spills into open sky. A light with no visible source: the invariants'
"no floating" clause, and a procedural city must hold on **every** seed, not one.

**Verdict: EXPLORED → REVERTED.** `solvista.html` is byte-identical to HEAD. The
*diagnosis* stands and is still worth cashing; what failed is every **place to put the
light**, and that is now known rather than guessable. `probes/probe-unilight.mjs` and
`probes/shot-uni.mjs` are kept so a retry starts from a working gate.

**Findings — read these before retrying the university.**
- **The campanile is the WRONG HOST for a glow, and cannot be fixed by dimming it.** Any
  halo is larger than its lamp; on a tall thin tower a later-drawn neighbour hides the lamp
  and not the halo. To revive it, **gate the halo on there being no taller cell in the rows
  below** (the draw order *is* the depth order) — the guard is the fix, not the alpha.
- **The quad is occlusion-safe but the tile's OWN wings overdraw it**, by an amount that
  flips with `fxU`'s per-seed sign — hence 50 px on seed 42 and 3 px on seeds 7/1234 for
  the identical code. Reconciling the wing/quad geometry is a **tile redesign** →
  **`polish-tile`, not a growth lap.** That is the real referral: the university tile is
  simply drawn *small*, and no night ornament on it can carry at fit zoom without a glow
  that extends past the geometry — which is exactly the thing that orphans.
- **A LOUD test must be measured against the LOUD COLOUR, not re-run through the same
  PATCH-vs-HEAD diff.** Painting the lantern pure red and comparing red-vs-HEAD (139 px) to
  warm-vs-HEAD (136 px), I concluded it was "95% occluded" — **wrong, and wrong by
  construction**: both builds change the same pixel *set* versus HEAD, so the totals
  coincide no matter what colour the change is. A direct **red-pixel count** in the loud
  build (13 / 85 / 36 px) showed it was rendering fine all along. The diff is blind to
  *which* colour; only a count of the loud colour isolates the draw. (161's corollary (b)
  says force it loud — this says *how to read the loud frame*.)
- **Freezing `playing` is NOT freezing the clock.** `waveT` and `time` keep whatever
  wall-clock-dependent value the RAF loop reached before the freeze, so two loads render
  different water: the probe's first cut had a **10–22 px noise floor of drifting surf**,
  700–900 px from the university, sitting right on top of a 5–47 px signal. Pinning
  `waveT` *and* `time` (163's laws name STARS/movers/`genWorld`, but not these) took the
  unchanged frames to **exactly 0**. An honest zero is what made every later number
  readable.
- **Do not compute a tall civic's clip from `h`.** It cost **two false VISUAL FAILs** on
  framing alone. The campanile is drawn from `px(gx-fxU*0.18, gy-0.34)` — an origin already
  well above the tile centre — so `h` always under-counts and the spire crops. `shot-uni.mjs`
  now clips from the top of the viewport: extra sky is free, a cropped spire costs an agent
  round.
- **A flat additive `arc()` is a coin, not a glow** — hard circular rim, and it tints
  whatever sits inside it (the green spire went olive). `createRadialGradient` falling to
  alpha 0 at the rim fixes both. The artifact already knew this: the rain damp-patch
  (~L6216) is a gradient, commented *"soft-edged, or it reads as a decal."* **Reuse it for
  any glow.**
- ⚠ **`greenRoofs` jitters run-to-run in the census on IDENTICAL bytes** (404 → 405 → 406).
  Not a vector's doing — it is the wall-clock-dependent tick count between load and warp
  (163's law (c)) leaking into a counted metric. Harmless at this size, but **do not chase
  it as a regression**, and do not trust it as a growth signal.

## Iteration 196 — the kelp bed breathes with the tide (2026-07-12) [Water & coast × Deepen]

**Vector — Water & coast × Deepen** (SHIPPED). Rotation: the header named **Water (185)** as next-owed for 196. Kind:
Water's last lap was a Polish (185 whitecaps), so this varies to **Deepen** — and Deepen is the documented high-yield
move for a domain whose basics are all present.

**The seam — a tooltip that has been printing a number the draw never read.** `describeTile`'s `tidal` test (L6759)
reads `BEACH || DUNE || KELP || MARSH || (WATER && !riv) || pierAt`, so **hovering a kelp bed prints a live `Tide` row**
(`High water` / `Flooding` / `Ebbing` / `Low water`). The KELP draw case (L3358) read `TIDE` **nowhere**: its canopy mats
and fronds drifted on `waveT` alone. That is *exactly* iter 113's marsh defect — a label asserting a relationship the
draw ignores, which this skill calls the richest seam in the artifact — sitting one tile along from the marsh, unnoticed
for the 83 iterations since. It is also the physically signature kelp behaviour: a canopy-forming alga floats up and
**mats at the surface** on the ebb, and drowns at high water. BEACH (damp margin + tidepools) and MARSH (113) already
answer the tide; KELP was the last inshore tile that did not.

**Change (~14 lines, draw-only, in `case T.KELP`).** One factor, `low = clamp((0.62-TIDE)/0.62,0,1)` — deliberately the
marsh's own `ebb` cut, so the two tidal tiles share a threshold rather than drifting apart (123's run-the-tell-forwards
move). On the ebb: the four canopy mats **rise** (`my - low*1.3`), **spread** (`rr *= 1+low*0.42`) and **lighten**
toward exposed olive (`t += lq*0.26`); and each frond tip, no longer able to stand, **lies over and trails along the
surface** (a short quadratic, `low>0.15`). **At and above TIDE 0.62 every term is zero and the draw is byte-identical to
HEAD** — the tide only ever *adds* the exposed canopy, it never darkens the bed, which is what keeps this clear of the
kelp-darkness failure mode. `lq` quantizes `low` into 4 steps because `colMix` **caches on `t`** and a continuous `t`
would defeat that cache. No tile / entity / label / `rng()` / `hashCell`-terrain / `tick()` pass; strings pure-ASCII (134).
Host is real but sparse: **8-17 KELP hexes/city** (cf. MARSH 15).

**Census.** PASS, exit 0, pageerrors 0. Tile histogram **empty**, every metric **+0**. Vacuous by construction
(draw-only) — the probe is the gate.

**Probe — `probes/probe-kelptide.mjs` (new, promoted).** The isolation is *not* patch-vs-HEAD: it is **LOW water vs HIGH
water within one build**, frozen clock, same seed, same `genWorld` — so the only variable is `TIDE` and every moved pixel
is a tide response. Run on both builds it settles the whole claim in one 2x3:

| build | KELP interior (s=0.5) | BEACH (+ctl) | ROAD (-ctl) |
| --- | --- | --- | --- |
| BASE  | **0.00 / 0.00 / 0.00%** (deaf — the seam) | 14.2-17.6% | 0.00% |
| PATCH | **35.7 / 37.5 / 41.9%** (answers) | 14.2-17.6% (untouched) | 0.00% |

**The probe FAILED first, and was right to.** A plain +-10px box around each kelp centre showed BASE kelp already moving
**3.2-4.7%** with the tide — which would have killed the premise. The cause was **box bleed**, not a kelp response: kelp
abuts the beach, and the beach's damp margin (`w2 = 2.4+(1-TIDE)*5`, up to ~7px) is drawn on the BEACH hex but **spills
across the shared edge**. Rather than shrink the box until it passed, the probe now **masks to the hex and sweeps the
mask** — BASE kelp goes `0.53% -> 0.00% -> 0.00%` as the mask tightens (the residual walks out entirely: it was all rim),
while PATCH goes `19.5% -> 28.2% -> 37.5%` (*rising*, i.e. the response is centrally located, so it IS the canopy and not
a rim artifact). BEACH is the **positive control** — it moves identically on both builds, proving the tide pin is live,
without which "BASE kelp = 0" would be a false negative from a dead pin rather than a finding. `waveT` **and** `time`
pinned per 195(f) — the mats drift on `waveT`, so an unpinned clock would have drowned the signal in sway.

**Visual.** Coast clips at low vs high water + an un-zoomed wide frame, seeds 42 & 7, one agent each, LOCATE-not-judge.
**Both VISUAL: PASS.** Both agents were asked which frame is low water *by the kelp alone* and **both got it right**
(seed 7's with the two filenames deliberately listed in scrambled order): they described the spread olive surface mat and
the trailing frond tips at low water vs. "dark water with a couple of upright frond ticks" at high. Both confirmed the
effect stays inside the hex faces (no bleed, no tears, no blowout) and — the question that matters for this tile — **the
coast has NOT gone dark**: kelp reads as a few discrete beds hugging the shore, not a continuous dark band, sand→shallow→
deep gradient intact. ⚠ Seed 7's agent banked one watch item: *at high water the kelp hexes are still the darkest pixels
in the water*, so **if the bed count ever grows, kelp is the first thing that would start banding**. That is HEAD
behaviour (unchanged here by construction), but it is the kelp failure mode's early warning — worth a look at 197's
step-back.

**Verdict — SHIPPED.** The kelp bed now answers the tide its own tooltip has been printing all along: on the ebb the
canopy floats up, mats and lightens, and the frond tips trail along the surface; at high water it drowns back to dark
water, byte-identically to HEAD. Draw-only, pop + stream flat, ~14 lines + a probe. Water's Deepen cell gains 196. The
next domain lap (198) owes **Urban (189, Deepen/Polish only — measured-saturated)**, then Sky (190)/People (191).
**197 is the mandated STEP-BACK** — and it owes two flagged items a look: **194's tree-shadow perf cost (day +3.4% /
night +3.5%)** and this entry's **kelp-banding-at-high-water** watch item.

