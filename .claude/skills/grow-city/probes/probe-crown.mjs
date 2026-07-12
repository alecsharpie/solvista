/* Cue (af) — "the towers are wallpaper" (six agents across 222/224/227, both seeds).
   Every one of them named the SILHOUETTE and the ROOF, not the colour and not the
   banding — so probe-facade (which measures stripe RHYTHM) is the wrong instrument:
   it already measured TOWER innocent (42-47 rhythms, top 6%) while the agents kept
   pointing at the towers anyway. Both can be true. A tower can wear a unique stripe
   rhythm and still be the same SHAPE as every other tower.

   So this measures the MASSING the frame actually draws: it wraps drawBuilding to
   know which cell is being drawn, and prism() to record every box that cell issues
   (half-width + z range). That is the building's profile, taken from the draw rather
   than re-derived from the source, so it runs unchanged on HEAD and on the patch.

   Reports, per type:
     - distinct SILHOUETTES (the width profile sampled up the building, quantised)
     - the top silhouette's SHARE of the stock   <- the wallpaper number
     - distinct CROWNS (what sits at/above the roofline: the thing the eye reads
       against the sky, and what all six agents actually described)
     - the top crown's share.
   MID is measured alongside TOWER because 227's two agents indicted its roof too.

     node probe-crown.mjs
     ART=/path/to/head.html node probe-crown.mjs */
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
const agg = {};
for (const seed of SEEDS) {
  const r = await pg.evaluate((seed) => {
    playing = false;
    genWorld(seed); __warp(61);
    time = 0; waveT = 0; STARS.length = 0; flock = null;

    const rec = new Map();                    // "x,y" -> {t,h,parts:[[ax,z0,z1]]}
    let CUR = null;
    const oDB = drawBuilding, oPr = prism, oBd = bandR;
    drawBuilding = function (c, x, y, gx, gy) {
      CUR = (c.t === T.TOWER || c.t === T.MID)
        ? (rec.set(x + ',' + y, { t: c.t === T.TOWER ? 'TOWER' : 'MID', h: c.h, parts: [], bands: [] }),
           rec.get(x + ',' + y)) : null;
      const out = oDB.apply(this, arguments); CUR = null; return out;
    };
    prism = function (gx, gy, ax, ay, z0, z1) {
      if (CUR) CUR.parts.push([ax, z0, z1]);
      return oPr.apply(this, arguments);
    };
    bandR = function (gx, gy, ax, ay, z0, z1) {          /* terraces/cornices ride the profile too */
      if (CUR) CUR.bands.push([ax, z0, z1]);
      return oBd.apply(this, arguments);
    };
    render();
    drawBuilding = oDB; prism = oPr; bandR = oBd;

    const q = v => Math.round(v * 50) / 50;             /* 0.02-cell buckets */
    const out = {};
    for (const kind of ['TOWER', 'MID']) {
      const set = [...rec.values()].filter(e => e.t === kind && e.h > 1);

      /* SILHOUETTE: the half-width sampled at 12 heights up the body. This is the
         outline the eye traces against the sky. */
      const silo = e => {
        const s = [];
        for (let i = 0; i < 12; i++) {
          const z = e.h * (i + 0.5) / 12;
          let w = 0;
          for (const [ax, z0, z1] of e.parts) if (z >= z0 && z < z1) w = Math.max(w, ax);
          s.push(q(w));
        }
        return s.join(',');
      };
      /* CROWN: everything at or above the roofline (z >= h - 2), as (width,height)
         pairs — the roof garden, the cap, the parapet, the attic. What reads as the
         building's top. */
      const crown = e => [...e.parts, ...e.bands]
        .filter(([, z0]) => z0 >= e.h - 2)
        .map(([ax, z0, z1]) => q(ax) + ':' + (Math.round((z1 - z0) * 2) / 2))
        .sort().join('|') || 'flat';

      const sh = {}, ch = {};
      for (const e of set) { const a = silo(e), c = crown(e); sh[a] = (sh[a] || 0) + 1; ch[c] = (ch[c] || 0) + 1; }
      const top = h => set.length ? +(Math.max(...Object.values(h)) / set.length * 100).toFixed(1) : 0;
      out[kind] = {
        n: set.length,
        /* Anything the probe cannot SEE reads as `flat`, so ACCOUNT FOR THAT BUCKET before
           believing it -- the helideck and the mast are raw ctx (arc/fillRect), invisible to
           a prism/bandR hook. At diagnosis this bucket was 41% and looked like a defect the
           fix had failed to move; it is really the h>90 helipad towers, which are ~40% of the
           stock and all wore the SAME bare deck. `flatShort` is the honest number: towers that
           could take a crown and have none. It must be 0 on the patch. */
        tall: set.filter(e => e.h > 90).length,
        flatShort: set.filter(e => e.h <= 90 && crown(e) === 'flat').length,
        siloDistinct: Object.keys(sh).length, siloTop: top(sh),
        crownDistinct: Object.keys(ch).length, crownTop: top(ch),
        crownHist: Object.entries(ch).sort((a, c) => c[1] - a[1]).slice(0, 4)
          .map(([k, v]) => `${(v / set.length * 100).toFixed(0)}% ${k}`),
      };
    }
    return out;
  }, seed);

  console.log('\n=== seed ' + seed + ' ===');
  for (const kind of ['TOWER', 'MID']) {
    const o = r[kind];
    (agg[kind] ||= []).push(o);
    console.log(`  ${kind.padEnd(5)} n=${String(o.n).padStart(4)}  ` +
      `SILHOUETTES=${String(o.siloDistinct).padStart(3)} (top=${String(o.siloTop).padStart(5)}%)  ` +
      `CROWNS=${String(o.crownDistinct).padStart(3)} (top=${String(o.crownTop).padStart(5)}%)`);
    console.log(`        crowns: ${o.crownHist.join('  |  ')}   [h>90 helideck=${o.tall}  crownable-but-bare=${o.flatShort}]`);
  }
}
console.log('\n--- means over 3 seeds ---');
for (const kind of ['TOWER', 'MID']) {
  const a = agg[kind], m = k => (a.reduce((s, o) => s + o[k], 0) / a.length).toFixed(1);
  console.log(`  ${kind.padEnd(5)} n=${m('n')}  silhouettes=${m('siloDistinct')} (top=${m('siloTop')}%)  crowns=${m('crownDistinct')} (top=${m('crownTop')}%)`);
}
await b.close();
