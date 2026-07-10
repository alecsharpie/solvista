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

