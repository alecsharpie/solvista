# polish-tile ledger

Append-only. One entry per polished tile — this is the loop's memory: which
tiles are already polished, which signature cues are *taken* (a new polish must
not reuse another tile's cue), and what the perf cost was.

Entry format:

```
## <n>. <tile> — <date>
- passes: <how many design passes it took>
- signature cues: <the 2–4 cues chosen — these are now reserved for this tile>
- research: <yes/no — one line on what it contributed, if yes>
- perf: day mean <before> -> <after> ms; night <before> -> <after> ms (gate: PASS/FAIL)
- census: PASS, histogram <unchanged | delta + why>
- shots: shots/<tile>_before/ vs shots/<tile>_after/
- verdict + notes: <what improved; anything left for a future pass>
```

(Older entries carry a `redeploy:` line. `solvista.html` is now served straight
from the repo by GitHub Pages, so there is nothing to redeploy and the field is
retired — leave it on the historical entries, don't add it to new ones.)

---

## 1. stadium — 2026-07-08
- passes: 2 (pass 1: bowl + masts + pitch; pass 2: night glow boost — cones 0.11→0.16, pitch glow 0.3→0.5 + bowl halo)
- signature cues (reserved): raised oval bowl w/ colored seating ring; 4 outward-leaning floodlight masts; floodlit green pitch glow at night; home-color accent (coral/teal/gold seeded per instance)
- research: no — cues were nameable without it
- perf: day 23.94 -> 24.22 ms; night 25.39 -> 25.33 ms (gate: PASS; a first run showed +11.4% day, re-run flat — headless noise, as warned)
- census: PASS; histogram wobbled TOWER -2/WATER +2 — NOT placement (draw-only change): the sim ticks in real time between load and the 500ms census sample, so heavier/lighter first paints shift tick count by ±1. Expect ±2-tile wobble on any draw change.
- shots: shots/stadium_before/ vs shots/stadium_after/ (day42, night42, day7, night7, wide42)
- verdict + notes: was a flat white ring reading as a fountain plaza, invisible at night. Now an extruded bowl (RX13/RY6.4/H8.5) with white concourse, seeded home-color tier, sunken pitch w/ halfway line + center circle, crowd dots (thin at night), 4 masts w/ glowing heads + light cones. Reads at zoom and at city scale (green glow at night). Known limit: in ultra-dense tower pockets (seed 7) the bowl is partly occluded by south towers — inherent row z-order; masts + glow still show.
- redeploy: PENDING (source-only until the artifact is redeployed)

## 2. hospital — 2026-07-08
- passes: 1
- signature cues (reserved): big roof-mounted coral cross on white panel (glows w/ halo at night); two-mass white campus (ward slab + low clinic wing, side seeded); coral medic stripe at roofline; ambulance bay canopy w/ coral stripe + warm night glow
- research: no
- perf: batch gate day 24 -> 23.33 ms, night 26.61 -> 24.44 ms (PASS; shared with library/police/hall — all are 1-per-city tiles)
- census: PASS, histogram unchanged
- shots: shots/hospital_before/ vs shots/hospital_after/ (day/night seed 1234)
- verdict + notes: was a generic white box with a 7px cross lost among towers; now the cross is ~9px on a roof panel, wards stay lit at night, ambo bay grounds it to the street. Reads day + night.
- redeploy: PENDING

## 3. library — 2026-07-08
- passes: 2 (pass 2: windows 2.2->2.6 wide, warmer glow lit*1.5+0.15, light spill on plinth)
- signature cues (reserved): long low reading hall + rooftop clerestory lantern; 3 tall ARCHED windows glowing warm late into the night; terra pergola colonnade entrance (3-4 bays, seeded)
- research: no
- perf: shared batch gate PASS (see hospital entry)
- census: PASS, histogram unchanged
- shots: shots/library_before/ vs shots/library_after/ + library_after2 (day/night seed 7)
- verdict + notes: was a tower with a 12px terra lintel. Now a low institution with a night identity (lit arches). Known limit: can be partly occluded by a south tower in dense blocks (inherent row z-order).
- redeploy: PENDING

## 4. police — 2026-07-08
- passes: 2 (pass 2: beacon bigger + glow r6->8, pulse floor 0.55->0.75)
- signature cues (reserved): teal-and-white CHECKER band at the base (livery); corner watch tower with pulsing BLUE beacon; cool office glass (lit*0.55) vs the city's warm windows
- research: no
- perf: shared batch gate PASS
- census: PASS, histogram unchanged
- shots: shots/police_before/ vs shots/police_after/ + police_after2 (day/night seed 42)
- verdict + notes: was an anonymous box with a 2px lamp. Checker band + blue pulse now name it at zoom; blue is unique among the night's warm lights.
- redeploy: PENDING

## 5. hall — 2026-07-08
- passes: 2 (pass 2: clock ring 3.1->3.4)
- signature cues (reserved): gold dome on a white drum (girth seeded 0.9-1.15) + finial; CLOCK face on the front face, lit warm at night; stepped cream plinth + white pilasters
- research: no
- perf: shared batch gate PASS
- census: PASS, histogram unchanged
- shots: shots/hall_before/ vs shots/hall_after/ (day/night seed 42)
- verdict + notes: dome was 5px and swallowed; now dome+drum+clock read as "town hall" instantly. Kept distinct from parliament (bigger dome + lantern + colonnade) — hall's cue is the clock.
- redeploy: PENDING

## 6. museum — 2026-07-08
- passes: 1
- signature cues (reserved): full-width GOLD PEDIMENT over a white colonnade (temple front); twin hanging banners (coral/teal/lav, seeded); floodlit facade wash at night; low north gallery wing
- research: no
- perf: batch gate day 24 -> 23.44 ms, night 26.61 -> 24.67 ms (PASS; shared with firehouse/school/observatory)
- census: PASS, histogram unchanged
- shots: shots/museum_before/ vs shots/museum_after/ (day/night seed 7)
- verdict + notes: pediment was a 13px roof triangle; now it spans the whole entry face over real columns. Floodlighting gives it a night identity distinct from lit windows.
- redeploy: PENDING

## 7. firehouse — 2026-07-08
- passes: 1
- signature cues (reserved): coral engine house (only coral-bodied civic); 2-3 BIG gold bay doors that glow warm at night (engines ready); rooftop hose-drying tower with gold bell (corner seeded)
- research: no
- perf: shared batch gate PASS
- census: PASS, histogram unchanged
- shots: shots/firehouse_before/ vs shots/firehouse_after/ (day/night seed 42)
- verdict + notes: was a white tower with thin coral band; now a squat coral station you can name at a glance, doors glow at night.
- redeploy: PENDING

## 8. school — 2026-07-08
- passes: 1
- signature cues (reserved): low schoolhouse w/ teal wainscot + terracotta roof; gabled entry porch; gold FLAG on the roof; chalked play-court in the yard (side seeded); goes DARK at night (one janitor window) — darkness among lit blocks is the night cue
- research: no
- perf: shared batch gate PASS
- census: PASS, histogram unchanged
- shots: shots/school_before/ vs shots/school_after/ + school_after2 (day/night seeds 42, 7)
- verdict + notes: was a mid-rise with a tiny flag; now a one-story schoolhouse with yard. 15 per city, so the low silhouette also breaks up residential blocks nicely.
- redeploy: PENDING

## 9. observatory — 2026-07-08
- passes: 2 (pass 2: drum 0.21->0.23, dome r 7.5->8.4)
- signature cues (reserved): the DOME IS THE BUILDING — big teal dome w/ white slit on a narrow white drum + stone terrace; slit glows cyan-white at night w/ instrument-glow leak (azimuth seeded); side lab hut
- research: no
- perf: shared batch gate PASS
- census: PASS, histogram unchanged
- shots: shots/observatory_before/ vs shots/observatory_after/ + _after2/_after3 (day/night seeds 42, 7)
- verdict + notes: dome was 6px atop a generic box; now the silhouette is drum+dome and the night slit-glow is unmistakable.
- redeploy: PENDING

## 10. amphitheater — 2026-07-08
- passes: 2 (pass 2: tier strokes creamDk->cream 1.08, heavier lines)
- signature cues (reserved): concentric stone tiers cut into a LAWN knoll opening toward the viewer (4-5, seeded); low stage house w/ terra roof; teal stage apron; seeded audience specks by day, warm stage wash + footlights at night
- research: no
- perf: batch gate day 24 -> 23.67 ms, night 26.61 -> 25 ms (PASS; shared with aquarium/university/parliament)
- census: PASS, histogram unchanged
- shots: shots/amphitheater_before/ vs shots/amphitheater_after_inj/ (injected at a visible cell — real placements hug the map edge)
- verdict + notes: the old draw painted the generic white civic prism UNDER the tiers, reading as a box on rings. Now it's a true open-air cavea. Note: placements are edge-biased; judged via injection.
- redeploy: PENDING

## 11. aquarium — 2026-07-08
- passes: 1
- signature cues (reserved): teal glass BARREL VAULT w/ glazed crown + center rib; sea-CYAN night glow (vs the city's warm lights); teal tank band w/ 3 portholes; coral fish pennant on a mast
- research: no
- perf: shared batch gate PASS
- census: PASS, histogram unchanged
- shots: shots/aquarium_before/ vs shots/aquarium_after/ (day/night seed 42)
- verdict + notes: dome grew from a 5px cap to the building's whole identity; the cyan glow gives it a unique night color signature.
- redeploy: PENDING

## 12. university — 2026-07-08
- passes: 1
- signature cues (reserved): thin cream CAMPANILE (tallest slender civic element) w/ sage pyramid cap + lit belfry lantern; collegiate quad (sage lawn ellipse + path) framed by two terra-roofed wings (orientation seeded)
- research: no
- perf: shared batch gate PASS
- census: PASS, histogram unchanged
- shots: shots/university_before/ vs shots/university_after2/ (day/night seed 1234, UI cards hidden)
- verdict + notes: placement puts every campus on the far back row, so in practice only the campanile shows over the ridge — it now reads as a proper landmark with a lit lantern at night. Quad/wings verified in code + partial views; moving the campus is grow-city territory.
- redeploy: PENDING

## 13. parliament — 2026-07-08
- passes: 1
- signature cues (reserved): the GRANDEST gold dome (r9 + lantern beacon, uplit at night) on an attic drum; full white colonnade both faces; stepped forecourt; twin gold standards flanking the steps
- research: no
- perf: shared batch gate PASS
- census: PASS, histogram unchanged
- shots: shots/parliament_before/ vs shots/parliament_after/ (day/night seed 42)
- verdict + notes: body no longer a glass tower — now a proper capitol. Kept clearly senior to hall (hall = small dome + clock; parliament = grand dome + colonnade + standards).
- redeploy: PENDING

## 14. ROCK — 2026-07-08
- passes: 1
- signature cues (reserved): faceted granite outcrop (lit crown + shaded south face) + companion stone; gold lichen freckles; size/offset seeded
- research: no
- perf: batch gate day 24 -> 23.67 ms, night 26.61 -> 25.83 ms (PASS; shared with SHOREPARK/SOLARF/PLAZA). Common tile (~18/city) kept to 4 fills + 2 rects.
- census: PASS, histogram unchanged
- shots: shots/rock_before/ vs shots/rock_after/ (day/night seed 42)
- verdict + notes: was two flat grey ellipses reading as puddles; now an angular outcrop that agrees with the light direction.
- redeploy: PENDING

## 15. SHOREPARK — 2026-07-08
- passes: 1 (light pass — identity was already right: palm allée on lawn against the sea)
- signature cues (reserved): palm allée + seaside-park life sprinkled by v: picnic blankets (coral/lav), benches facing the surf, wildflower specks
- research: no
- perf: shared batch gate PASS. Very common tile (~91/city): additions gated to v-subsets, +2 fills max per tile
- census: PASS, histogram unchanged
- shots: shots/shorepark_before/ vs shots/shorepark_after/ (day/night seed 42)
- verdict + notes: strip reads the same at city scale but rewards zoom now.
- redeploy: PENDING

## 16. SOLARF — 2026-07-08
- passes: 1
- signature cues (reserved): 3 tilted dark-blue panel ROWS w/ sun glint on the glass (glint fades at night); white inverter hut w/ red status LED at night
- research: no
- perf: shared batch gate PASS (tile is dormant in the current matrix — 0 instances — so zero live cost)
- census: PASS, histogram unchanged
- shots: shots/solarf_before/ vs shots/solarf_after2/ (injected — type is dormant; grow-city may reintroduce placements)
- verdict + notes: was 3 upright glass slabs reading as nothing; now unmistakably a solar farm. NOTE for grow-city: SOLARF/PLAZA/BURNT have no live placements at warp 61 in seeds 7/42/1234 — a growth vector could revive them.
- redeploy: PENDING

## 17. PLAZA — 2026-07-08
- passes: 1 (light pass; dormant tile, injected to verify)
- signature cues (reserved): paving ROSETTE (double ellipse inlay); grander gold statue on plinth, uplit at night; fountain variant unchanged
- research: no
- perf: shared batch gate PASS (dormant)
- census: PASS, histogram unchanged
- shots: shots/plaza_before/ vs shots/plaza_after2/ (injected)
- verdict + notes: statue now landmark-sized with night uplight; rosette separates plaza paving from PARK's fountain plaza variant.
- redeploy: PENDING

## 18. all remaining types — verify-only sweep — 2026-07-08
- reviewed at dsf-3 zoom, day + night, seeds 42/7/1234: WATER, KELP, BEACH, FOREST, REDWOOD, MEADOW, FARM, ORCHARD, VINEYARD, GARDEN, MARKET, BURNT, MARSH, PARK, ROAD, FIELD, LIGHTHOUSE, EMPTY + RES/MID/COM/TOWER/IND
- verdict: all pass TRUE/BEAUTIFUL/FAST as-is — each has a working silhouette, signature element, night behavior, and seeded variation (see shots/<type>_before/ which double as their verification shots). No changes made; restraint preferred over piling on detail.
- notable existing cues (implicitly reserved): lighthouse red bands + sweeping beam; market striped stalls + string lights; farm gold/sage crop rows on soil; vineyard green trellis rows on pale gold; orchard fruit-tree grid; marsh tidal pools + reeds; kelp swaying fronds; beach boardwalk + bonfire + umbrellas.

## BACKLOG — measured cues banked by the grow-city loop (moved here at iter 275)

These lived in `GROWTH.md`'s maintained header, where the grow-city loop re-read them on EVERY
iteration while being explicitly forbidden to act on them ("do not spend a domain's lap on one").
They are tile redesigns, so they belong to THIS skill. Each has a gate already written.
⚠ **(a), (e) and (f) ARE ONE FINDING — 215's HAIRLINE LAW**: a sub-pixel ornament *tints* its
background instead of marking it, so **the lever is a BODY / SIZE / CONTRAST — never more strokes,
never placement**. Full bodies for the closed ones were archived at grow-city iter 264.

(a) **THE WHOLE ELEVATED TRANSIT is sub-pixel at fit zoom** (0.5px rope, 5px cabins). ⚠ **NEVER RE-OPEN THE Z-ORDER — CLEARED BY PROBE TWICE** (203/212); **15 mis-diagnoses** (269 makes two more — an agent called the rope *"scratches on the image"*, and another filed it as a z-tear **in the HEAD frame** while naming it *"a grey aerial-tramway cable, a different feature"* one frame earlier), and *that persistence IS the evidence: the fault is LEGIBILITY*. Suspect named + priced (256): **`drawMonoAt`, 2.1% of the frame.** *Do NOT re-try a body/halo under the rope (measured — backfires) nor a lit top edge (impossible at 0.5px).* **MOST-REPORTED DEFECT BY A WIDE MARGIN; a `polish-tile` lap is BADLY OVERDUE.** ⚠ **269 adds cue (av): the TRAM's catenary is the SAME 0.5px bug — the family is bigger than the two aerial lines.**
(g) **THE CAPITOL CANNOT CARRY ITS OWN LABEL — IT NEEDS A MASSING REDESIGN** (270; full body in the 270 entry; gate
written: `probe-parlheight.mjs`). `CIVICDESC.parliament` promises *"the tallest civic roof"* and it is **FALSE** (the
university out-tops it **4 seeds in 6**). ⛔ **DO NOT RE-TRY IT AS A HEIGHT CONSTANT — BOTH ROUTES MEASURED AND DEAD**
(taller BODY = *"an office slab wearing a dome as a hat"*; height in a DRUM = *"a minaret"* — two agents, two seeds,
crossed, both rounds; cause is structural, SKILL.md). ➡ The lever is **MASS, not height**: a drum wider than tall.
(e) **THE OBSERVATORY IS TOO SMALL TO READ** (259; ≈ **5.5 CSS px at fit**, on a frame where it is 96.3% visible). ⚠ **SMALL, not BURIED — do NOT re-open the siting.**
(f) **THE WILDFLOWERS ARE SUB-PIXEL** (263; ≈ **1.1 CSS px at fit**, true of HEAD's meadow bloom too). ⛔ **DO NOT RAISE THE PER-HEX BODY LIFT — that is 255's ⛔** (⇒ a hex quilt). ➡ The only way through is **a SHAPE THAT CROSSES TILE BOUNDARIES** (a drift of petals, a streak), never a brighter fill.
(b) **`university` is the ONLY of the twelve civics with no `LITAMT`** — pitch dark after sunset; every place to put the light failed (195). (c) **A parked service vehicle needs its CIVIC TILE to have a visible apron on its front edge** (204). (d) **The marsh reeds do not read** — seven sub-pixel strokes round the pool (cue (i), 113).

**(av) THE TRAM'S CATENARY IS A 0.5px HAIRLINE** (269) — drawn unconditionally and *correctly*, yet **every agent that
looked reported "no overhead wire visible"** ⇒ **215's law: it TINTS rather than MARKS.** Same bug as the elevated
transit's 0.5px rope ⇒ **`polish-tile`, cue (a) FAMILY — the lever is a BODY/WIDTH, never more strokes.**

(g2) **THE FLAME SILHOUETTE** (banked by grow-city iter 279; moved here 280 per 270's scope law — **DO NOT reshape it
in a growth lap; 279 already tried three times**). **Four blind agents on two seeds** called HEAD's two flat triangles
*"a tent" / "a traffic cone" / "a glowing teepee"*. It is now an asymmetric bezier tongue (agents: *"the triangle
problem is fixed"*) and they call it a **candle/teardrop** — it wants **bulge-and-neck**, a visible **lick**, and a
**red→white temperature gradient**. ⚠ **The fire is an EMITTER: it takes a RAW LITERAL, never `col()`** — do not put
it back through the illuminant (279). ⚠ **Nothing burns at 2035** (`year<2030`) ⇒ a `?warp=61` frame can NEVER show a
fire; drive `tick()` to a live episode (`probes/shot-firespark.mjs` aims by measured ink).
