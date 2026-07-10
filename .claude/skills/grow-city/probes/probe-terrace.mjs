/* probe-terrace: did the party wall actually build a street wall, and only where
   it was told to? Two questions, two instruments.

   (1) GEOMETRY, in-page: walk `cells` and re-apply the join predicate using the
       page's own `hashCell`/`seedNum`, so the probe cannot disagree with the draw
       code about which joints close. Chain the closed joints into terraces along
       the E-W row (the only axis a party wall may run) and report run lengths.
   (2) PIXELS, WITHIN one frame: sample the canvas at the joint's midpoint and at
       a point plainly inside the west building's right-front face, at the same
       height. If the joint closed, the west building's facade now *is* the joint,
       so the two must read the same colour; if it stayed open, the joint sees
       past the buildings to the background and they must differ.
       A pristine-vs-patched diff CANNOT serve here, and it took a wrong reading to
       see why: through an OPEN gap you look at the row behind, whose walk-ups
       legitimately widened, so the "unchanged" control class moves too (measured
       mean d 7.0 where the filler-prism draft read 0.2). The control has to live
       in the same frame as the thing it controls.

   Usage: node probe-terrace.mjs [nseeds]   (default 16) */
import { chromium } from '/Users/alec/.claude/skills/screenshot-verify/node_modules/playwright/index.mjs';
import { pathToFileURL } from 'node:url';

const NSEEDS = +(process.argv[2] || 16);
const SEEDS = Array.from({ length: NSEEDS }, (_, i) => [7, 42, 1234, 3, 5, 99, 11, 23, 77, 101, 202, 313, 404, 555, 606, 808][i] ?? 1000 + i);
const URLQ = 'warp=61&t=0.3&year=2035.30';   /* day: darkWinR is night-only, so the
                                                two sample points share one shade */
const patched = pathToFileURL(process.cwd() + '/solvista.html').href;

/* Re-apply the draw code's join predicate from inside the page, and derive two
   probe points that sit at the SAME WALL HEIGHT z on the west block's right-front
   face. Getting this right is the whole instrument:
     - A prism's front face slopes (its top edge runs from +V at the S-point down
       to +E at the shoulder), so two points at the same SCREEN y sit at different
       z. A first draft sampled a constant screen y and read Δ35 on closed joints
       vs Δ47 on open — a null result — because one point kept landing inside a
       glass window band and the other on plain wall. Invert the face equation and
       pick z, not y.
     - Bands run z = 5+7k .. 8+7k, with a balcony rail to 8.9+7k, so plain wall is
       [8.9+7k, 12+7k). Sample at z = 10+7k, as high up as fits below the parapet:
       high on the facade is also where the row drawn in front is least likely to
       occlude it.
   The joint point is always taken in the CLOSED-hypothetical frame, so it is the
   same fixed spot on the diorama whether or not the joint closed. */
const INJECT = () => {
  window.__joints109 = () => {
    const out = [];
    const AY = 0.30, V = AY * 2 * VR, E = AY * 2 * ER;
    for (let y = 0; y < G; y++) for (let x = 1; x < G; x++) {
      const c = cells[idx(x, y)], w = cells[idx(x - 1, y)];
      if (!c || !w || c.t !== T.MID || w.t !== T.MID) continue;
      const gate = hashCell(x, y, seedNum ^ 0x4E27) < 0.72;
      const hw = Math.min(c.h, w.h);
      const closed = gate && hw > 6;
      /* a short block has no plain-wall band to probe, but it is still a joint and
         must stay in the geometry stats */
      if (hw < 14) { out.push({ x, y, closed, hw, probe: false }); continue; }
      const z = 10 + 7 * Math.max(0, Math.floor((hw - 14) / 7));

      const gxw = (x - 1) + 0.5, gyw = y + 0.5;
      const [bx, by] = px(gxw, gyw);               /* west block's unwidened S-point */
      /* y on a right-front face at world x=p, for a block with S-point cx and
         half-width X: u = (p-cx)/X, y = cy + V + (E-V)u - z */
      const faceY = (p, cx, X) => by + V + (E - V) * ((p - cx) / X) - z;

      const jp = bx + 0.5 * CW;                    /* the joint's midpoint */
      const jcx = bx + 0.16 * CW, jX = 0.5 * CW;   /* closed-hypothetical geometry */
      const wp = bx + 0.25 * CW;                   /* plainly inside the west block */
      const wcx = closed ? jcx : bx, wX = (closed ? 0.5 : 0.34) * CW;

      /* Is this facade visible at all? The row drawn in front stands one ROWY
         lower on screen, so a block there of height hf hides everything below
         z ~ hf - ROWY on this row's wall. Both probe points then read the SAME
         front block and register a false "match". Judge the vector on the joints
         the front row cannot reach. */
      const fr = [cells[idx(x - 1, y + 1)], cells[idx(x, y + 1)]];
      const clear = fr.every(f => !f || !DEV.has(f.t));

      out.push({
        x, y, closed, hw, z, probe: true, clear,
        sx: jp * scale + offX, sy: faceY(jp, jcx, jX) * scale + offY,
        wx: wp * scale + offX, wy: faceY(wp, wcx, wX) * scale + offY,
      });
    }
    return out;
  };
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });

const sample = async (base, seed) => {
  await page.goto(`${base}?seed=${seed}&${URLQ}`, { waitUntil: 'load' });
  await page.waitForTimeout(500);
  await page.evaluate(INJECT);
  return page.evaluate(() => {
    const js = window.__joints109();
    const cv = document.querySelector('canvas');
    const cx = cv.getContext('2d', { willReadFrequently: true });
    const dpr = cv.width / cv.clientWidth;
    const at = (sx, sy) => {
      const px = Math.round(sx * dpr), py = Math.round(sy * dpr);
      if (px < 2 || py < 2 || px > cv.width - 3 || py > cv.height - 3) return null;
      const d = cx.getImageData(px - 1, py - 1, 3, 3).data;
      let R = 0, G2 = 0, B = 0, n = 0;
      for (let i = 0; i < d.length; i += 4) { R += d[i]; G2 += d[i + 1]; B += d[i + 2]; n++; }
      return [R / n, G2 / n, B / n];
    };
    for (const j of js) {
      if (!j.probe) { j.rgb = j.wrgb = null; continue; }
      j.rgb = at(j.sx, j.sy); j.wrgb = at(j.wx, j.wy);
    }
    /* terraces: chain closed joints along each row */
    const key = (x, y) => y * 1e4 + x;
    const closed = new Set(js.filter(j => j.closed).map(j => key(j.x, j.y)));
    const mids = new Set();
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++)
      if (cells[idx(x, y)] && cells[idx(x, y)].t === T.MID) mids.add(key(x, y));
    const runs = [];
    for (const m of mids) {
      const y = Math.floor(m / 1e4), x = m % 1e4;
      if (closed.has(key(x, y))) continue;         /* not a run head */
      let len = 1, cx2 = x;
      while (closed.has(key(cx2 + 1, y))) { len++; cx2++; }
      runs.push(len);
    }
    return { js, mids: mids.size, runs };
  });
};

const d3 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const mean = a => a.length ? a.reduce((s, v) => s + v, 0) / a.length : 0;

let TE = 0, TC = 0, allRuns = [], dOpen = [], dClosed = [], cOpen = [], cClosed = [];
console.log(`joint predicate: MID west-neighbour MID, hashCell(x,y,seed^0x4E27)<0.72, min(h,hw)>6`);
console.log('seed   MID  joints closed  %   terraces  mean  longest');
for (const s of SEEDS) {
  const B = await sample(patched, s);
  const eligible = B.js.length, closedN = B.js.filter(j => j.closed).length;
  TE += eligible; TC += closedN;
  allRuns = allRuns.concat(B.runs);
  for (const j of B.js) {
    if (!j.rgb || !j.wrgb) continue;
    const d = d3(j.rgb, j.wrgb);
    (j.closed ? dClosed : dOpen).push(d);
    if (j.clear) (j.closed ? cClosed : cOpen).push(d);
  }
  const rl = B.runs, longest = Math.max(...rl, 0);
  console.log(`${String(s).padEnd(6)}${String(B.mids).padStart(4)}${String(eligible).padStart(7)}` +
    `${String(closedN).padStart(7)}${String(Math.round(100 * closedN / (eligible || 1))).padStart(4)}%` +
    `${String(rl.length).padStart(9)}${mean(rl).toFixed(2).padStart(7)}${String(longest).padStart(9)}`);
}
const hist = {};
for (const r of allRuns) hist[Math.min(r, 6)] = (hist[Math.min(r, 6)] || 0) + 1;

console.log(`\nTOTAL joints ${TE}, closed ${TC} (${(100 * TC / TE).toFixed(1)}% — gate target 72%)`);
console.log('run-length histogram (cells per terrace, 6+ bucketed):');
for (const k of Object.keys(hist).sort((a, b) => a - b))
  console.log(`  ${k === '6' ? '6+' : k}  ${'#'.repeat(Math.round(hist[k] / 6))} ${hist[k]}`);
/* The headline is per-CELL, not per-run: "65% of terraces are singletons" counts
   every lone walk-up as a terrace of one and buries the result. What a street wall
   claims is that a walk-up has a neighbour to lean on. */
const cells109 = allRuns.reduce((s, r) => s + r, 0), lone = hist[1] || 0;
console.log(`  walk-ups standing in a terrace (run>=2): ${cells109 - lone}/${cells109} = ` +
  `${(100 * (cells109 - lone) / cells109).toFixed(1)}%`);

const row = (lbl, a, tail) => console.log(`  ${lbl.padEnd(15)}n=${String(a.length).padStart(4)}  ` +
  `mean Δ ${mean(a).toFixed(1).padStart(5)}  matches facade (Δ<8): ` +
  `${(100 * a.filter(d => d < 8).length / (a.length || 1)).toFixed(1).padStart(5)}%   ${tail}`);
console.log(`\nPIXEL TEST (one frame): RGB distance between the joint and the west block's own facade`);
row('CLOSED joints', dClosed, '<- wall stands here');
row('OPEN joints', dOpen, '<- control, sees past the block');
console.log(`  -- restricted to joints the row in front cannot occlude --`);
row('CLOSED / clear', cClosed, '<- the vector: the joint IS the facade');
row('OPEN / clear', cOpen, '<- control');

await browser.close();
