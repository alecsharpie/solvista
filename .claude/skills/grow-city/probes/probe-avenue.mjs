/* probe-avenue — does the STREETCAR ride the AVENUES?
 *
 * The tooltip says "Riding the avenues since 1985" and the spawn comment says
 * "streetcars ride the avenues from the mid-80s". The spawn picks a UNIFORMLY
 * RANDOM road (byte-identical to the bike/truck spawns either side of it) and
 * stepVehicle has no `flow` term at all. So this asks, in the viewer's units:
 *   what share of a streetcar's LIFE is spent on an arterial?
 *
 * A. HOST (pure world data — no render, no clock, no noise floor).
 *    Does the avenue exist at scale, and is it RIDEABLE? 263's law: a rule that
 *    must TRAVEL a host needs a CONNECTED COMPONENT, not a population. A drainage
 *    tree that collects into arterials may well be a scatter of trunk fragments,
 *    in which case confining a tram to it would strand it and a PREFERENCE is the
 *    only honest mechanism (206: prefer a preference to a gate).
 *
 * B. TEMPORAL (134 — every other gate here is frozen, so "it never rides the
 *    avenue" has no instrument). Drives the artifact's OWN advanceEntities and
 *    samples where each vehicle actually IS, tick by tick.
 *
 * CONTROLS, and they are the whole reason this probe can be believed:
 *   - POLICE = a FREE POSITIVE CONTROL (248). A correct sibling in the same array
 *     and the same step function that PROVABLY reads c.flow (servTarget: `if
 *     (v.kind==='police') if(cell.flow>=ARTFLOW)`). If the cruiser does not show
 *     an arterial share well above chance, the PROBE is broken, not the city.
 *   - CAR / BIKE / TRUCK = the MUST-NOT-MOVE column (250). They are uniform road
 *     walkers by design and SHOULD sit at the chance line. They also give us the
 *     chance line itself, measured rather than assumed.
 *   - The arterial SHARE OF ROADS is the null hypothesis: a uniform walker's
 *     expected occupancy. HEAD's tram sitting ON it is the defect, stated (236).
 *
 * Math.random is re-seeded IN-PAGE (248): addInitScript fixes the PRNG function,
 * but the stream position at load is wall-clock dependent and __warp's ticks
 * branch on it, so two loads would warp different fleets into being.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');
const SRC = process.env.SRC || ART;
const SEEDS = [7, 42, 1234, 5, 99, 2024];
const YEAR = 2035;
const TICKS = 900;          /* sim-seconds of driving to sample over */

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto('file://' + SRC);
await page.waitForFunction(() => window.__census !== undefined);

const rows = [];
for (const seed of SEEDS) {
  const r = await page.evaluate(({ seed, year, ticks }) => {
    /* re-seed in-page: the stream POSITION at load is wall-clock dependent */
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    playing = false;
    genWorld(seed);
    __warp(year - 1974);

    /* ---- A. HOST: is the avenue rideable? ---------------------------------- */
    const road = [], art = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cellAt(x, y); if (!c || c.t !== T.ROAD) continue;
      road.push([x, y]);
      if (c.flow >= ARTFLOW) art.push([x, y]);
    }
    const isArt = (x, y) => { const c = cellAt(x, y); return !!c && c.t === T.ROAD && c.flow >= ARTFLOW; };

    /* biggest connected component of ARTERIAL cells (263: count the component) */
    const seen = new Set(); let biggest = 0, comps = 0;
    let degSum = 0;
    for (const [x, y] of art) {
      /* mean arterial degree: can a tram CONTINUE without leaving the avenue? */
      let d = 0;
      for (const [dx, dy] of nbrDirs(y)) if (isArt(x + dx, y + dy)) d++;
      degSum += d;
      const k = x + ',' + y; if (seen.has(k)) continue;
      comps++;
      let n = 0; const st = [[x, y]]; seen.add(k);
      while (st.length) {
        const [cx, cy] = st.pop(); n++;
        for (const [dx, dy] of nbrDirs(cy)) {
          const nx = cx + dx, ny = cy + dy, kk = nx + ',' + ny;
          if (!seen.has(kk) && isArt(nx, ny)) { seen.add(kk); st.push([nx, ny]); }
        }
      }
      if (n > biggest) biggest = n;
    }
    /* DEAD ENDS: an arterial cell with <2 arterial neighbours cannot be ridden
       THROUGH — roadNbrOpts forbids the U-turn, so a tram confined here strands. */
    let deadEnd = 0;
    for (const [x, y] of art) {
      let d = 0; for (const [dx, dy] of nbrDirs(y)) if (isArt(x + dx, y + dy)) d++;
      if (d < 2) deadEnd++;
    }

    /* ---- B. TEMPORAL: where do the vehicles actually drive? ----------------- */
    const tally = {};
    const bump = (kind, onArt) => {
      const t = tally[kind] || (tally[kind] = { on: 0, n: 0 });
      t.n++; if (onArt) t.on++;
    };
    /* THE COST LEDGER (206). A tram that never leaves one trunk fragment is a
       WORSE artifact than a wanderer — it paces a stub. So count the distinct
       road hexes each vehicle actually reaches. A streetcar SHOULD cover less
       than a random walker (it has a route now); it must not collapse to a stub. */
    const seenBy = {};
    const cover = (kind, i, x, y) => {
      const m = seenBy[kind] || (seenBy[kind] = {});
      (m[i] || (m[i] = new Set())).add(x + ',' + y);
    };
    const dt = 1 / 30;
    for (let i = 0; i < ticks * 30; i++) {
      advanceEntities(dt, 1);
      if (i % 30) continue;                    /* sample once a sim-second */
      vehicles.forEach((v, j) => { bump(v.kind, isArt(v.x, v.y)); cover(v.kind, j, v.x, v.y); });
      trams.forEach((v, j) => { bump('tram', isArt(v.x, v.y)); cover('tram', j, v.x, v.y); });
      trucks.forEach((v, j) => { bump('truck', isArt(v.x, v.y)); cover('truck', j, v.x, v.y); });
      bikes.forEach((v, j) => { bump('bike', isArt(v.x, v.y)); cover('bike', j, v.x, v.y); });
    }
    const share = {}, reach = {};
    for (const k in tally) share[k] = tally[k].n ? tally[k].on / tally[k].n : null;
    for (const k in seenBy) {
      const v = Object.values(seenBy[k]).map(s => s.size);
      reach[k] = v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
    }

    /* ---- D. THE SECOND LEDGER (206): CAN SHE STILL BE SEEN? -----------------
       The avenues concentrate toward the core (c.flow drains there), and so do the
       TOWERS. So a rule that pulls the streetcar onto the trunk may be pulling her
       into the one part of the city that BURIES a ground-level thing — draw order
       is depth order, and both visual agents reported a tram lost among tower roofs.
       That is a pre-existing property of the tram draw (they reported it on HEAD
       too), but this vector could make it BITE MORE OFTEN, which would be a bad
       trade: an avenue-rider nobody can see is worse than a visible wanderer.
       Isolate the trams by SUPPRESSING them and re-rendering IN ONE PAGE (230), so
       the diff IS the tram layer at a floor of exactly 0, read off the final
       composited canvas — occlusion checked for free, and build-agnostic. */
    const cv = document.querySelector('canvas'), cx2 = cv.getContext('2d');
    const grab = () => { render(); return cx2.getImageData(0, 0, cv.width, cv.height).data; };
    scale = fitScale; offX = fitX; offY = fitY; zoom = 1;
    const withT = grab();
    const keep = trams.splice(0, trams.length);      /* suppress the whole layer */
    const noT = grab();
    trams.push(...keep);                             /* ...and put it straight back */
    let ink = 0;
    for (let i = 0; i < withT.length; i += 4) {
      const d = Math.max(Math.abs(withT[i] - noT[i]), Math.abs(withT[i + 1] - noT[i + 1]),
                         Math.abs(withT[i + 2] - noT[i + 2]));
      if (d > 8) ink++;
    }
    const inkPer = trams.length ? ink / trams.length : 0;

    return { inkPer,
      roads: road.length, art: art.length,
      artShare: road.length ? art.length / road.length : 0,
      comps, biggest, deadEnd,
      artDeg: art.length ? degSum / art.length : 0,
      trams: trams.length, share, reach,
      counts: Object.fromEntries(Object.entries(tally).map(([k, v]) => [k, v.n])),
    };
  }, { seed, year: YEAR, ticks: TICKS });
  r.seed = seed;
  rows.push(r);
}
await browser.close();

const pct = v => v == null ? '  —  ' : (v * 100).toFixed(1).padStart(5) + '%';
console.log(`\nprobe-avenue — SRC=${SRC.split('/').slice(-2).join('/')}  year=${YEAR}  ${TICKS} sim-seconds\n`);

console.log('A. THE HOST — is the avenue rideable?  (pure world data)\n');
console.log('  seed | roads |  art | art/roads | comps | biggest | dead-end | mean art degree');
console.log('  -----+-------+------+-----------+-------+---------+----------+----------------');
for (const r of rows) {
  console.log(`  ${String(r.seed).padStart(4)} | ${String(r.roads).padStart(5)} | ${String(r.art).padStart(4)} |` +
    ` ${pct(r.artShare)}    | ${String(r.comps).padStart(5)} | ${String(r.biggest).padStart(7)} |` +
    ` ${String(r.deadEnd).padStart(4)}     | ${r.artDeg.toFixed(2).padStart(6)}`);
}
const mean = f => rows.reduce((a, r) => a + f(r), 0) / rows.length;
console.log(`\n  ⇒ biggest arterial component holds ${(mean(r => r.biggest / r.art) * 100).toFixed(0)}% of all arterial cells;` +
  ` ${(mean(r => r.deadEnd / r.art) * 100).toFixed(0)}% of arterial cells are DEAD ENDS (<2 arterial nbrs).`);
console.log(`     mean arterial degree ${mean(r => r.artDeg).toFixed(2)} — a tram CONFINED to the avenue needs >=2 to drive through.`);

console.log('\n\nB. WHO ACTUALLY RIDES THE AVENUE?  (temporal — the artifact\'s own advanceEntities)\n');
console.log('  Share of sampled sim-seconds spent standing on an arterial hex.\n');
const kinds = ['car', 'bike', 'truck', 'tram', 'police', 'ambo', 'fireeng'];
const hdr = kinds.map(k => k.padStart(7)).join(' |');
console.log('  seed | CHANCE |' + hdr);
console.log('  -----+--------+' + kinds.map(() => '--------').join('+'));
for (const r of rows) {
  const cells = kinds.map(k => pct(r.share[k] ?? null).padStart(7)).join(' |');
  console.log(`  ${String(r.seed).padStart(4)} | ${pct(r.artShare)} |${cells}`);
}
const ms = k => {
  const v = rows.map(r => r.share[k]).filter(x => x != null);
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
};
console.log('  -----+--------+' + kinds.map(() => '--------').join('+'));
console.log(`  mean | ${pct(mean(r => r.artShare))} |` + kinds.map(k => pct(ms(k)).padStart(7)).join(' |'));

console.log('\n\nC. THE COST LEDGER (206) — does she still get around, or does she pace a stub?\n');
console.log('  Distinct road hexes reached per vehicle over the run. A streetcar SHOULD cover');
console.log('  less than a random walker (she has a route); she must not collapse to a stub.\n');
const mr = k => {
  const v = rows.map(r => r.reach[k]).filter(x => x != null);
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
};
console.log('  seed |    car |   bike |  truck |   TRAM |  tram/car');
console.log('  -----+--------+--------+--------+--------+----------');
for (const r of rows) {
  const g = k => (r.reach[k] ?? 0).toFixed(0).padStart(6);
  console.log(`  ${String(r.seed).padStart(4)} | ${g('car')} | ${g('bike')} | ${g('truck')} | ${g('tram')} |` +
    `   ${((r.reach.tram ?? 0) / (r.reach.car || 1)).toFixed(2)}`);
}
console.log('  -----+--------+--------+--------+--------+----------');
console.log(`  mean | ${mr('car').toFixed(0).padStart(6)} | ${mr('bike').toFixed(0).padStart(6)} |` +
  ` ${mr('truck').toFixed(0).padStart(6)} | ${mr('tram').toFixed(0).padStart(6)} |   ${(mr('tram') / mr('car')).toFixed(2)}`);
console.log(`\n  trams per city: ${rows.map(r => r.trams).join(' ')}  (population — wantTrams; must not move)`);

console.log('\n\nD. THE SECOND LEDGER (206) — can she still be SEEN?\n');
console.log('  The avenues concentrate toward the core, and so do the TOWERS. Visible ink per');
console.log('  streetcar, isolated by suppressing the layer and re-rendering in ONE page');
console.log('  (floor exactly 0, occlusion counted off the final composited canvas).\n');
console.log('  seed |  visible px / streetcar');
console.log('  -----+------------------------');
for (const r of rows) console.log(`  ${String(r.seed).padStart(4)} |  ${r.inkPer.toFixed(1).padStart(6)}`);
console.log('  -----+------------------------');
console.log(`  mean |  ${mean(r => r.inkPer).toFixed(1).padStart(6)}`);
console.log('\n  ⇒ Compare against HEAD. A LOWER number means the avenue is burying her downtown,');
console.log('    and an avenue-rider nobody can see is a worse artifact than a visible wanderer.');

const chance = mean(r => r.artShare), tram = ms('tram'), pol = ms('police');
console.log('\n  CONTROLS:');
console.log(`    POLICE (positive, 248 — provably reads c.flow):  ${pct(pol)}  = ${(pol / chance).toFixed(2)}x chance` +
  `  ${pol > chance * 1.3 ? '✅ the probe can SEE an avenue-rider' : '❌ PROBE BROKEN — the known rider does not show'}`);
for (const k of ['car', 'bike', 'truck']) {
  const v = ms(k);
  console.log(`    ${k.toUpperCase().padEnd(6)} (must-not-move, 250 — uniform walkers): ${pct(v)}  = ${(v / chance).toFixed(2)}x chance`);
}
console.log(`\n  ⇒ TRAM: ${pct(tram)} of its life on an avenue, against a chance line of ${pct(chance)}` +
  ` = ${(tram / chance).toFixed(2)}x.`);
console.log(`     The streetcar rides the avenue ${Math.abs(tram / chance - 1) < 0.15 ? 'EXACTLY AS OFTEN AS A RANDOMLY-PARKED CAR DOES.' : 'at ' + (tram / chance).toFixed(2) + 'x chance.'}`);
