---
name: polish-tile
description: Polish ONE tile type of the Solvista diorama (solvista.html) — e.g. hospital, stadium, park, market — until it is instantly recognizable as what it is, beautiful up close, and still fast. Researches the type's real-world visual language when helpful, redesigns the draw code, then verifies with zoomed before/after screenshots + census + a frame-time gate. Use when asked to "make the X tile look better/amazing", "polish the X tile", or "the X doesn't read as an X". Takes the tile type as its argument.
---

# polish-tile

A **focused beautification loop** for one tile type in `solvista.html`. Where
`grow-city` adds new things, this skill takes something that already exists —
`polish-tile hospital`, `polish-tile stadium`, `polish-tile park` — and iterates
on its rendering until it hits all three goals **at once**:

1. **TRUE** — a stranger glancing at the city says "that's a hospital" without
   being told. The tile carries the real-world visual language of its type.
2. **BEAUTIFUL** — it rewards a zoomed-in look: good silhouette, house palette,
   small seeded asymmetries, and it participates in day/night lighting.
3. **FAST** — `drawCell` runs for every live cell on the plate (**3367** since the
   hexagon plate landed; `G`=67 is only the bounding square) **every frame**.
   Beauty that costs frame time is a regression; the perf gate below measures it.

One invocation = one tile type, polished through up to ~3 design passes, then
verified and logged. Loop-friendly: under `/loop`, do one tile per turn.

## The loop

1. **Orient.** Read `POLISH.md` (this skill's ledger) — don't redo a tile that
   was polished recently unless asked. Map the argument to its draw site:
   - **Ground/landscape tiles** (`T.PARK`, `T.MARKET`, `T.STADIUM`, `T.FARM`,
     `T.MARSH`, `T.LIGHTHOUSE`, …): the `T` enum (~L165) and its branch in
     `drawCell` (~L1262) / `drawBuilding`.
   - **Civic buildings** (hospital, museum, school, aquarium, parliament, …):
     `c.t===T.CIVIC && c.kind==='<name>'` — draw cases `case '<name>'`
     (~L1867–1928), placement in the civic-milestones pass (~L780).
   - When in doubt: `grep -n "case '<name>'\|T\.<NAME>" solvista.html`.
   Also read the current draw code and *understand what it already does* before
   replacing it — keep what works.
2. **Baseline.** Before touching anything:
   ```bash
   node .claude/skills/grow-city/census.mjs --save-baseline
   node .claude/skills/polish-tile/perf.mjs --save-baseline
   ```
   `--save-baseline` pins **one** run, but a reading is judged by the *minimum* of
   three (frame time is noisy on a loaded machine). Pin the same way you judge:
   run the gate a few times, and re-run `--save-baseline` until the saved run is
   the fastest you've seen. A baseline pinned from a slow run hides real
   regressions underneath it; one pinned from a lucky fast run cries wolf.
   …and take BEFORE zoom shots (see *Locating & shooting the tile* below) into
   `.claude/skills/polish-tile/shots/<tile>_before/`.
3. **Research (when helpful).** If the type has a real-world visual language you
   aren't certain of, spend one WebSearch round: "what makes a <type> instantly
   recognizable in isometric / pixel-art city builders" and/or the archetypal
   real features ("hospital architecture distinctive features"). Distill to
   **2–4 signature cues** (hospital: white mass + red/coral cross + ambulance
   bay + helipad; stadium: oval bowl + floodlight masts + colored seating rings).
   Skip research for types you can already name the cues of (park, farm).
4. **Design before coding.** Decide, in one short paragraph you write down:
   the **silhouette** (the shape that reads at 20–40 px), the **one signature
   element** that names the type, the palette (house `col()` names only), the
   **night state** (what glows/lights), and the **seeded variation** (what
   differs instance-to-instance via `hashCell`). Check the checklists below.
5. **Implement** in the house style: `hexTile`/`prismS`/`bandS` for masses
   (~L1130–1170), per-instance variation from `hashCell(x,y,SALT)` — **never
   `rng()`** — and obey the perf rules below. Prefer editing the tile's existing
   case over restructuring the render loop.
6. **Verify — all three gates:**
   - **Visual gate.** AFTER zoom shots at the same spots, **day (t=0.35) and
     night (t=0.8)**, at ≥2 seeds, plus one wide shot to confirm it also reads
     at city scale and sits in the scene (no z-order tears with neighbors,
     no palette clash). **Read the PNGs side by side with the BEFOREs** and
     honestly answer: more recognizable? more beautiful? If not — pass 2.
   - **Census gate.** `node .claude/skills/grow-city/census.mjs` must PASS
     (no page errors, no core collapse). A pure re-skin should leave the tile
     histogram **unchanged** — any tile-count delta means you touched placement
     logic by accident; investigate.
   - **Perf gate.** `node .claude/skills/polish-tile/perf.mjs` must PASS
     (mean frame time within tolerance of baseline; headless timing is noisy —
     if it's borderline, re-run once before believing a regression).
7. **Log.** Append to `POLISH.md`: tile, passes taken, the signature cues you
   chose (so the next polish of a *different* tile doesn't reuse them and blur
   distinctions), perf numbers before/after, verdict, shots dir.

   `solvista.html` **is** the deliverable — one self-contained file, served from
   the repo by GitHub Pages. Nothing to redeploy; a pushed commit is a shipped
   tile. Keep the file standalone (no external assets, no build step).

## Locating & shooting the tile

`solvista.html` exposes `window.__find('<type>')` (next to `__census`, ~L2463)
— pass a `T` enum name (`'PARK'`, `'STADIUM'`) or a civic kind (`'hospital'`).
It returns `[{x,y,sx,sy}, …]` where `sx,sy` are **CSS-pixel screen coords**,
i.e. directly usable as a screenshot `clip` center. Typical flow (script in
scratchpad; borrow Playwright the way `census.mjs` does):

1. Load `solvista.html?seed=42&warp=61&t=0.35` (1440×900 viewport), evaluate
   `window.__find('hospital')`, pick an instance away from the screen edge.
2. Write a temp shoot config, e.g.
   ```json
   { "shots": [ { "name": "day",   "w": 1440, "h": 900, "dsf": 3,
                  "clip": { "x": SX-110, "y": SY-130, "width": 220, "height": 210 } } ] }
   ```
   and shoot day and night:
   ```bash
   node ~/.claude/skills/screenshot-verify/shoot.mjs 'solvista.html?seed=42&warp=61&t=0.35' \
        --config /path/to/clip.json --out .claude/skills/polish-tile/shots/<tile>_after
   ```
   (`t=0.8` for the night variant; re-run `__find` per seed/era — positions move.)
3. **Rare tiles** (one-per-city civics): if you need many instances to judge
   variation, temporarily flood placement (drop the one-per-city guard / raise
   the `hashCell` threshold), shoot, then **revert the debug** and re-run the
   census gate — same technique as grow-city iters 11/16/19.

## Recognizability checklist (TRUE)

- **Silhouette first.** The type should be guessable from the filled shape
  alone. If the cue only lives in a 2-px detail, it fails at city scale.
- **One loud signature element**, not five whispers: the cross, the floodlight
  masts, the bandstand. Secondary cues support it; they don't compete.
- **Distinct from its neighbors in the enum.** Compare against tiles of similar
  color/mass (hospital vs. plain tower; stadium vs. field; market vs. plaza).
  If two tiles could swap captions, the polish isn't done.
- **Reads day AND night.** Night is half the diorama's life — give the tile a
  night identity (lit windows pattern, beacon, floodlight glow) that preserves,
  or even strengthens, the daytime cue.
- **Holds across seeds/eras.** Check ≥2 seeds; seeded variation must never
  suppress the signature element.

## Beauty checklist (BEAUTIFUL)

- House palette via `col()` names only — no new hex literals; the diorama's
  California-coast harmony is the point.
- Light comes from one direction: match how `prismS` shades top/left/right
  faces (`ct`/`cl`/`cr`); hand-drawn details must agree with it.
- **Seeded asymmetry** beats symmetry: nudge positions/counts with
  `hashCell(x,y,SALT)` so no two instances are identical — but keep the
  silhouette and signature element stable.
- Ground the building: a base band, path to the road, or apron so it doesn't
  float on the hex.
- Restraint: 2–3 materials + 1 accent. If it looks busy at dsf 3, it's mud at 1.

## Performance rules (FAST)

The draw code runs per cell **per frame**. Inside any per-cell draw path:

- **No `shadowBlur`, no filters, no gradient construction** (`createLinearGradient`
  et al. allocate per call — if a gradient is essential, cache it in module scope).
- **No allocation**: no new arrays/objects/closures per cell per frame; derive
  per-instance constants from `hashCell` (pure math, cheap) or precompute into
  cell state at placement time.
- **Few paths**: batch same-color shapes into one `beginPath`/`fill`; every
  extra fill/stroke on a common tile type is multiplied by its census count.
  Budget ≈ a dozen fills for a rare civic; ≈ 3–5 for a common landscape tile.
- No `ctx.save()/restore()` or `setTransform` per cell; no text; no off-screen
  work (early-out if the tile can be skipped).
- Animation (flags, glints, beacons) keys off the existing frame clock — don't
  add timers or state that grows.

The gate: `perf.mjs` measures mean/p95 frame time and %-of-frames-over-budget
on a fixed busy scene (seed 42, 2035, day + night) and fails on a real
regression vs. baseline. Vsync can hide small costs on fast machines — so also
respect the static rules above, not just the number.

## Invariants (shared with grow-city — do not regress)

- Procedural, new city every load; a polish must hold across many seeds.
- Randomness from `hashCell(x,y,seedNum^SALT)`, **never `rng()`** — one stray
  `rng()` call reshuffles the whole downstream CA and every census metric.
- Hex projection: `px()`/`ctr()`/`pxc()`, prisms via `hexTile`/`prismS`/`bandS`;
  render order is plain rows top→bottom — draw within the cell's footprint or
  you'll get z-order tears with the row below.
- Keep `__census()` and `__find()` hooks intact and in sync.
- Pure re-skin ⇒ tile histogram unchanged. Placement changes are `grow-city`
  territory; if the polish *requires* one (e.g. hospital needs a road-adjacent
  cell for its ambulance bay), keep it minimal and call it out in the log.

## Files this skill owns

- `perf.mjs` — frame-time gate (`--save-baseline` to pin, else diff).
- `perf-baseline.json` / `perf-latest.json` — captured timings.
- `POLISH.md` — append-only ledger of polished tiles.
- `shots/` — before/after zoom screenshots (scratch).

## Setup (once per machine)

Playwright is borrowed from `screenshot-verify`. If `perf.mjs` can't find a
browser:
```bash
cd ~/.claude/skills/screenshot-verify && npm install && npx playwright install chromium
```
