# Solvista growth ledger

Append-only log of `grow-city` iterations. Newest at the bottom. Each iteration =
one growth vector, verified by `census.mjs` (numeric, no-regression gate) + a
screenshot pass. This file is the loop's memory: rotate vectors, don't repeat.

Census matrix: seeds `[7, 42, 1234]` × eras `[1985, 2005, 2035]`, `t=0.35`.
Metrics are summed over all 9 cells of the matrix.

## State of the city (maintained header — UPDATE EACH ITERATION)

This grid + the notes below are what step 1 (Orient) reads instead of the whole
archive. Cells hold iteration numbers; `U1`–`U3` are user-directed passes
(U1 generative monorail · U2 feedback polish: smooth water motion / hover
tooltip / kelp re-gate · U3 determinism audit).

| Domain | New element | New CA rule | Deepen | Connect | Scale | Polish |
| --- | --- | --- | --- | --- | --- | --- |
| **Nature** | 4, 26, 29 | 1, 13, 60 | 37, 46, 67 | ~~46~~ | | 53 |
| **Water & coast** | 6, 10, 12, 16, 20, 33 | | 17, 25, 51, 65 | 22 | | U2, 44, 58 |
| **Urban fabric** | 32, 62 | 7, 23 | 38, 54, 68 | 47 | 8, 14, 24 | |
| **Transport** | 2, 9, 21, 31, 48 | | 28, 39, 55, 63 | 5, 15 | | U1, U3 |
| **Civic & culture** | 3, 11, 18, 30 | 36 | 36, 59, 66 | 45 | | |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57 | | | 61 |
| **People & activity** | 41, 56 | 49 | 34, 64 | | | |

- **Interaction/UX kind:** tile tooltip (U2, user-directed) + **entity
  tooltips (iter 42)** + **Est./Built years in tooltips (iter 52, Civic-led)**.
  When adding an entity array: `stamp()` it in its draw + add an `ENTINFO` row
  (same discipline as the census hook).
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
  rotation, is now the binding constraint). ⚠ Nature × Connect is a DEAD END
  (iter 46): woodland
  patches are never within ≤5 axis-steps of each other across open ground in
  real cities — wood-to-wood green links have no geometry to attach to; don't
  re-explore. Explored & reverted: solar-farm contagion (iter 32);
  tuned-not-reverted: forecourt plazas (iter 36 — 1996 start collapsed pop 5%,
  moved to 2020).
- **Live artifact:** last synced 2026-07-08 (label "zoom-and-pan", per project
  memory — includes iters 1–33 + user passes). **Pending: iters 34–69**
  (joggers · rainbows · forecourt plazas · deer · cranes · station riders ·
  perf fix · evening crowds · entity tooltips · sea fog · river flow ·
  festival streets · field hedgerows · skybridges · city helicopter · block
  parties · wind · tide · Est./Built tooltip years · pasture patchwork ·
  laundry lines · ferry gulls · kids in tow · full seasons · moonglade · the
  school run · fairy rings · sea-fog fix · rooftop water tanks · bus
  stops · dog walkers · tidepools · civic flags · seasonal orchards ·
  rooftop gardens), the
  `__ents` entity-stamp hook (iter 48), the `__setYear` season-pin hook
  (iter 57), the
  flood/step test hooks, and the concurrent polish-tile session's esplanade +
  tile redesigns; ask for the nod at session end.
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
  Latest holistic pass (iter 69): PASS ×3 by minimum, day floor 25.17ms /
  night 26.39ms (baselines 24 / 26.61). ⚠ Day floor keeps creeping
  (23.44 @60 → 24.11 @65 → 25.17 @69, +1.7ms over ~9 laps as draw work
  compounds — flags/orchards/roof-gardens/tidepools + the concurrent
  monorail/shoreline). Now ~0.3ms under the ~25.5 fix-lap threshold: the
  NEXT perf reading that crosses it makes the following lap a perf-fix lap
  (profile drawCell hot paths / cache more). Fresh-seed probe @69 (seed 314,
  night, 24.8k pop) fully coherent — warm lit windows, moon+moonglade, dense
  but readable; seed 42 golden hour balanced. sea-fog lenses read soft post-61. Sea-fog watch item from
  iter 60 **FIXED at iter 61** (feathered banks + beach-band fade). ⚠ This
  machine runs hot (load avg 4+): run the gate 3× and judge by the MINIMUM.
  ⚠ Harness lesson (iter 65): NEVER run census + shoot.mjs in one parallel
  command — contended Chromiums time out mid-init and produce blank "1974 /
  0 residents" frames that look like a catastrophic regression. Re-shoot
  solo before believing a blank frame.

---

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
