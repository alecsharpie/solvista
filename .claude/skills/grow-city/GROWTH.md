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
| **Water & coast** | 6, 10, 12, 16, 20, 33 | | 17, 25, 51, 65, 72 | 22 | | U2, 44, 58 |
| **Urban fabric** | 32, 62 | 7, 23 | 38, 54, 68 | 47 | 8, 14, 24 | |
| **Transport** | 2, 9, 21, 31, 48 | | 28, 39, 55, 63 | 5, 15 | | U1, U3, 70 |
| **Civic & culture** | 3, 11, 18, 30 | 36 | 36, 59, 66 | 45 | | |
| **Sky & atmosphere** | 27, 43 | | 19, 35, 50, 57 | | | 61 |
| **People & activity** | 41, 56 | 49 | 34, 64 | | | |

- **Interaction/UX kind:** tile tooltip (U2, user-directed) + **entity
  tooltips (iter 42)** + **Est./Built years in tooltips (iter 52, Civic-led)**
  + **hover focus ring (iter 71, People-led)**.
  When adding an entity array: `stamp()` it in its draw + add an `ENTINFO` row
  (same discipline as the census hook). `stamp()` now also draws the focus ring,
  so any stamped entity is ringable for free.
- **⚠ Overlays drawn last FLOAT (iter 71):** the instinct to draw a highlight
  "last of all, so it can never tear" is wrong in this renderer. Rows draw
  top→bottom, so an entity in row *y* is legitimately occluded by a tower in
  row *y+1* — an overlay drawn after everything then lands on that tower's roof,
  ringing the wrong object. Draw entity overlays **at the entity's own z** (i.e.
  from `stamp()`), and accept that an occluded entity shows no ring. Also:
  `ctx.lineWidth` is in **world** units under the camera transform, so a 2.2px
  stroke is *thicker than a 1.8px pedestrian* — keep entity-scale strokes ≤1.1.
- **Hover verification:** `shoot.mjs` cannot hover. `hovershot.mjs` (iter 71)
  drives Playwright directly: `__ents` aims the real cursor at a named entity,
  `ZOOM=n` wheels the artifact's own camera in (real magnification, not upscaled
  pixels), `PICK=front` favours front rows (a back-row entity may be occluded
  and legitimately ringless). Emits a no-hover control frame + 3 clip scales.
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
  memory — includes iters 1–33 + user passes). **Pending: iters 34–72**
  (joggers · rainbows · forecourt plazas · deer · cranes · station riders ·
  perf fix · evening crowds · entity tooltips · sea fog · river flow ·
  festival streets · field hedgerows · skybridges · city helicopter · block
  parties · wind · tide · Est./Built tooltip years · pasture patchwork ·
  laundry lines · ferry gulls · kids in tow · full seasons · moonglade · the
  school run · fairy rings · sea-fog fix · rooftop water tanks · bus
  stops · dog walkers · tidepools · civic flags · seasonal orchards ·
  rooftop gardens · vehicle headlights/taillights · hover focus ring ·
  **harbor freighters**), the
  `__ents` entity-stamp hook (iter 48), the `__setYear` season-pin hook
  (iter 57), the
  flood/step test hooks, and the concurrent polish-tile session's esplanade +
  tile redesigns; ask for the nod at session end.
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
  Latest reading (iter 71, run because the focus ring draws from `stamp()`, a
  per-entity-per-frame hot path): PASS ×3 by minimum, day floor 25.11ms /
  night 26.33ms (baselines
  24 / 26.61). ⚠ Day floor keeps creeping
  (23.44 @60 → 24.11 @65 → 25.17 @69 → 25.22 @70 → 25.11 @71, +1.8ms over ~10 laps as
  draw work compounds — flags/orchards/roof-gardens/tidepools + the
  concurrent monorail/shoreline). Now ~0.3ms under the ~25.5 fix-lap
  threshold: the NEXT perf reading that crosses it makes the following lap
  a perf-fix lap (profile drawCell hot paths / cache more). Night rose
  +0.27ms @70 (vehicle lights) — cheap, and the day scene is untouched
  because the lights are gated on `LITAMT>0.35`. **Gating new draw work on
  night is a good way to buy detail without touching the day floor.** Fresh-seed probe @69 (seed 314,
  night, 24.8k pop) fully coherent — warm lit windows, moon+moonglade, dense
  but readable; seed 42 golden hour balanced. sea-fog lenses read soft post-61. Sea-fog watch item from
  iter 60 **FIXED at iter 61** (feathered banks + beach-band fade). ⚠ This
  machine runs hot (load avg 4+): run the gate 3× and judge by the MINIMUM.
  ⚠ Harness lesson (iter 65): NEVER run census + shoot.mjs in one parallel
  command — contended Chromiums time out mid-init and produce blank "1974 /
  0 residents" frames that look like a catastrophic regression. Re-shoot
  solo before believing a blank frame.

---

<!-- rotated -->

> **Archive:** the 63 iterations before Iteration 63 live in
> `GROWTH-archive.md`. Nothing reads that file by default — the header grid above
> is the maintained summary. Rotated by `rotate-ledger.mjs`.

<!-- /rotated -->

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
