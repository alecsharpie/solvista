/* Cue (r) — "a building type has become wallpaper" (iter 212, two agents, two seeds).
   Measures the FACADE RHYTHM of the drawn frame, not the source: wraps winBandR and
   records the true SCREEN ROW of every window band it issues. bandS() subtracts z
   straight from screen y, so a band's screen row is what the eye actually sees — and
   two buildings in the SAME cell row share a base y, so identical rhythms put their
   stripes on identical screen rows and chain into corduroy.

   Build-agnostic: it hooks the draw, so it runs unchanged on HEAD and on the patch.
   MID is the treatment; TOWER is the CONTROL (untouched by this vector, and measured
   innocent at diagnosis: 42-47 rhythms, top 6%).

     node probe-facade.mjs            # patched worktree file
     ART=/path/to/head.html node probe-facade.mjs */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = process.env.ART || join(HERE, '../../../../solvista.html');

const SEEDS = [42, 7, 1234];
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1400, height: 900 } });
await pg.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await pg.goto('file://' + ART);
await pg.waitForFunction(() => typeof genWorld === 'function');

console.log('artifact: ' + ART);
for (const seed of SEEDS) {
  const r = await pg.evaluate((seed) => {
    playing = false;
    genWorld(seed); __warp(61);
    time = 0; waveT = 0; STARS.length = 0; flock = null;

    /* record every window band the frame actually draws, by cell + screen row */
    const rec = new Map();                       // "x,y" -> {t, rows:[screenY]}
    const orig = winBandR;
    winBandR = function (gx, gy, ax, ay, z0, z1, x, y, salt, f, litMix) {
      const c = cellAt(x, y);
      if (c && (c.t === T.MID || c.t === T.TOWER)) {
        const k = x + ',' + y;
        let e = rec.get(k);
        if (!e) rec.set(k, e = { t: c.t === T.MID ? 'MID' : 'TOWER', x, y, rows: [] });
        e.rows.push(+(px(gx, gy)[1] - z0).toFixed(2));   // the band's true screen row
      }
      return orig.apply(this, arguments);
    };
    render();
    winBandR = orig;

    const out = {};
    for (const kind of ['MID', 'TOWER']) {
      const set = [...rec.values()].filter(e => e.t === kind);
      const byCell = new Map(set.map(e => [e.x + ',' + e.y, e]));

      /* distinct rhythms actually drawn: the band spacing signature, to 0.25px */
      const sig = e => e.rows.map((z, i) => i ? +(e.rows[i - 1] - z).toFixed(2) : 0)
        .map(d => Math.round(d * 4) / 4).join(',');
      const hist = {};
      for (const e of set) { const s = sig(e); hist[s] = (hist[s] || 0) + 1; }

      /* the corduroy test: E-W neighbours, do their stripes land on the SAME screen rows? */
      let pairs = 0, alignedBands = 0, totalBands = 0;
      for (const e of set) {
        const nb = byCell.get((e.x + 1) + ',' + e.y);
        if (!nb) continue;
        pairs++;
        const B = nb.rows;
        for (const z of e.rows) {
          totalBands++;
          if (B.some(w => Math.abs(w - z) < 0.5)) alignedBands++;
        }
      }
      out[kind] = {
        n: set.length,
        bands: set.reduce((a, e) => a + e.rows.length, 0),
        distinct: Object.keys(hist).length,
        topShare: set.length ? +(Math.max(...Object.values(hist)) / set.length * 100).toFixed(1) : 0,
        pairs,
        alignedPct: totalBands ? +(alignedBands / totalBands * 100).toFixed(1) : 0,
      };
    }
    return out;
  }, seed);

  console.log('\n=== seed ' + seed + ' ===');
  for (const kind of ['MID', 'TOWER']) {
    const o = r[kind];
    const tag = kind === 'MID' ? 'treat' : 'CTRL ';
    console.log(`${tag} ${kind.padEnd(5)} n=${String(o.n).padStart(4)} bands=${String(o.bands).padStart(5)}  ` +
      `distinct rhythms=${String(o.distinct).padStart(4)} (top=${o.topShare}%)  ` +
      `E-W pairs=${String(o.pairs).padStart(3)}  bands on an IDENTICAL screen row as the neighbour: ${o.alignedPct}%`);
  }
}
await b.close();
