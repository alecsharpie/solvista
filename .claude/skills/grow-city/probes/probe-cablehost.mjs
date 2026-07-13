/* (an): "black cables leave the shore, cross the beach and open water, and END IN
   THE SEA with no pylon." Before designing anything: WHERE do the aerial lines
   actually run? Pure world data — no render, no clock, no noise floor. */
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
/* Resolve the artifact relative to the PROBE's own location, never an absolute path
   (two probes once hardcoded ../solvista-grow/ and silently measured the worktree).
   SRC= grades pristine HEAD without ever touching the artifact (197). */
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = process.env.SRC ? resolve(process.env.SRC)
                            : resolve(HERE, '../../../../solvista.html');

const browser = await chromium.launch();
const page = await browser.newPage();
page.on('pageerror', e => console.log('PAGE ERROR:', e.message));
await page.goto(pathToFileURL(ART).href);
await page.waitForTimeout(800);

for (const seed of [42, 7, 1234, 99, 5, 2024]) {
  const r = await page.evaluate((seed) => {
    playing = false; genWorld(seed); __warp(61);
    const NAME = {}; for (const k in T) NAME[T[k]] = k;
    const out = [];
    for (const g of gonds) {
      if (!g.path) { out.push({ n: 0 }); continue; }
      const kinds = {}, sea = [], bch = [];
      g.path.forEach(([x, y], i) => {
        const c = cellAt(x, y); const t = c ? NAME[c.t] : 'OFF';
        kinds[t] = (kinds[t] || 0) + 1;
        if (c && WETSET.has(c.t)) sea.push(i);      /* the ONE definition of wet (242) */
        if (t === 'BEACH' || t === 'DUNE') bch.push(i);
      });
      const last = g.path[g.path.length - 1];
      const lc = cellAt(last[0], last[1]);
      out.push({ n: g.path.length, kinds, sea: sea.length, bch: bch.length,
        seaIdx: sea.join(','), endsOn: lc ? NAME[lc.t] : 'OFF',
        endsWet: lc ? WETSET.has(lc.t) : false,
        pyl: g.pyl ? g.pyl.join(',') : '-' });
    }
    const mout = [];
    for (const m of monos) {
      if (!m.path) { mout.push({ n: 0 }); continue; }
      const kinds = {}, wet = [];
      m.path.forEach(([x, y], i) => {
        const c = cellAt(x, y); const t = c ? NAME[c.t] : 'OFF';
        kinds[t] = (kinds[t] || 0) + 1;
        if (t === 'WATER' || t === 'BEACH' || t === 'KELP') wet.push(i);
      });
      mout.push({ n: m.path.length, kinds, wet: wet.length, closed: !!m.closed });
    }
    return { SHOREX, out, mout, shore: shoreAt(((G / 2) | 0)) };
  }, seed);
  console.log(`\n=== seed ${seed}  (SHOREX=${r.SHOREX}, shoreAt(mid)=${r.shore}) ===`);
  for (const m of r.mout) {
    if (!m.n) { console.log('  MONO: not built'); continue; }
    console.log(`  MONO len=${m.n} closed=${m.closed}  wet cells: ${m.wet}  ${JSON.stringify(m.kinds)}`);
  }
  for (const g of r.out) {
    if (!g.n) { console.log('  line: not yet built'); continue; }
    console.log(`  line len=${String(g.n).padStart(2)}  SEA spans: ${g.sea}${g.sea?' [idx '+g.seaIdx+']':''}   beach spans: ${g.bch}   ends on ${g.endsOn}${g.endsWet ? '  <<< IN THE SEA' : ''}`);
  }
}
await browser.close();
