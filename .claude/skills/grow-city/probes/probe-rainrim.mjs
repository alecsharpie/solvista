/* probe-rainrim — does the rain shaft paint past the plate's rim, out over the void?
 *
 * Cue (ao): "the rain shafts cross the water's edge and keep raining over the empty
 * cream backdrop". The shaft's rim gate reads the CLOUD'S CENTRE:
 *     inset = min(cl.x - ROWMIN[gy], ROWMAX[gy] - cl.x)
 * but the shaft is a QUAD, ~26*s px wide at the top and ~36*s px at the foot, whose
 * foot is displaced upwind by `rlean`. Its comment claims it is bounded "as the bow
 * is" — and the BOW tests its LEGS (fl/fr), not its centre. So the bow is the
 * POSITIVE CONTROL: same rim, same file, one draw that tests its own extent and one
 * that does not. If the bow reads ~0 overhang and the shaft reads >>0, the
 * instrument is sound and the defect is named.
 *
 * Pure world data: no render, no clock, no pixels, no noise floor.
 * A cloud drifts +x at a steady speed, so sweeping cl.x across the row IS its
 * traverse; we weight each x by `pa`, the alpha the shaft is actually painted at.
 */
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = process.env.SRC ? resolve(process.env.SRC) : resolve(HERE, '../../../../solvista.html');
const SEEDS = [7, 42, 1234, 99, 2024, 555];

const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1400, height: 900 } });
await page.addInitScript(() => {                     /* 213: stub before the page's own script */
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await page.goto('file://' + ART);
await page.waitForFunction(() => typeof window.__census === 'function');

const rows = [];
for (const seed of SEEDS) {
  const r = await page.evaluate((seed) => {
    playing = false;
    genWorld(seed); __warp(61);

    const out = { seed, shaft: [], bow: [] };
    for (const cl of clouds) {
      const gy = cl.y | 0;
      if (!(gy >= 0 && gy < G) || ROWMAX[gy] < ROWMIN[gy]) continue;
      const lo = ROWMIN[gy], hi = ROWMAX[gy];
      const [, cy] = pxc(cl.x, cl.y);
      const py2 = cy - 185 - cy * 0.52;

      /* sweep the cloud across its row — this IS the traverse it makes in play */
      let paintedShaft = 0, wShaft = 0, maxOverAtFull = 0, footOffAtFull = 0;
      let paintedBow = 0, wBow = 0, maxBowOver = 0;
      /* the TWO LEDGERS (206): the EFFECT (rain painted off-plate) and the COST
         (rain painted on-plate, which the fix must not destroy). Ink is the foot's
         width, weighted by the alpha it is drawn at. */
      let headOff = 0, headOn = 0, fixOff = 0, fixOn = 0;
      const STEP = 0.05;
      for (let x = lo - 6; x <= hi + 6; x += STEP) {
        const [cx] = pxc(x, cl.y);
        const w = 1;                                  /* a shower at full weight */
        const rlean = (cy - (py2 + 6 * cl.s)) * (0.06 + 0.08 * WINDA);
        const foot = cx - rlean;

        /* --- the SHAFT, exactly as drawn (top edge cx±26s, foot edge foot±36s) --- */
        const pxL = Math.min(cx - 26 * cl.s, foot - 36 * cl.s);
        const pxR = Math.max(cx + 26 * cl.s, foot + 36 * cl.s);
        const hxL = pxL / CW - 0.25, hxR = pxR / CW - 0.25;   /* pxc: X=(gx+0.25)*CW */
        const insetNow = Math.min(x - lo, hi - x);             /* THE SHIPPED GATE: centre */
        const pa = Math.max(0, Math.min(1, insetNow / 2)) * w;
        const over = Math.max(0, lo - hxL, hxR - hi);          /* hexes past the rim */
        if (pa > 0) { paintedShaft += pa * over * STEP; wShaft += pa * STEP; }
        /* the foot: where the shower actually lands */
        const fL = (foot - 36 * cl.s) / CW - 0.25, fR = (foot + 36 * cl.s) / CW - 0.25;
        const offW = Math.max(0, lo - fL) + Math.max(0, fR - hi);   /* foot width off-plate */
        const onW = Math.max(0, (fR - fL) - offW);                  /* foot width on-plate  */
        if (pa >= 0.999) {
          maxOverAtFull = Math.max(maxOverAtFull, over);
          footOffAtFull = Math.max(footOffAtFull, offW / (fR - fL));
        }
        headOff += pa * offW * STEP; headOn += pa * onW * STEP;

        /* --- THE CANDIDATE FIX: gate on the SHAFT'S OWN EXTENT, as the bow does --- */
        const insetFix = Math.min(hxL - lo, hi - hxR);
        const paFix = Math.max(0, Math.min(1, insetFix / 2)) * w;
        fixOff += paFix * offW * STEP; fixOn += paFix * onW * STEP;

        /* --- the BOW, exactly as drawn: it tests its LEGS (the control) --- */
        const r0 = Math.min(100 * cl.s, 108);
        const fl = x + (-55 * cl.s - r0) / CW, fr = x + (-55 * cl.s + r0) / CW;
        const insetBow = Math.min(fl - lo, hi - fr);
        const paBow = Math.max(0, Math.min(1, insetBow / 2));
        const bowOver = Math.max(0, lo - fl, fr - hi);
        if (paBow > 0) { paintedBow += paBow * bowOver * STEP; wBow += paBow * STEP; maxBowOver = Math.max(maxBowOver, bowOver); }
      }
      out.shaft.push({ s: +cl.s.toFixed(2), meanOver: wShaft ? paintedShaft / wShaft : 0, maxOverAtFull, footOffAtFull,
                       headOff, headOn, fixOff, fixOn });
      out.bow.push({ meanOver: wBow ? paintedBow / wBow : 0, maxOver: maxBowOver });
    }
    return out;
  }, seed);
  rows.push(r);
}
await b.close();

const f = (n, d = 2) => n.toFixed(d).padStart(6);
console.log('\nRAIN SHAFT vs THE RIM — hexes of shaft painted PAST the plate edge (over the void)');
console.log('  (a cloud sweeps its whole row; each x weighted by `pa`, the alpha the shaft is drawn at)\n');
console.log('  seed   clouds |  SHAFT mean-over  max-over@pa=1   foot off-plate@pa=1 |  BOW mean-over  max-over');
let sM = 0, sX = 0, sF = 0, bM = 0, bX = 0, n = 0;
for (const r of rows) {
  const sm = r.shaft.reduce((a, c) => a + c.meanOver, 0) / r.shaft.length;
  const sx = Math.max(...r.shaft.map(c => c.maxOverAtFull));
  const sf = Math.max(...r.shaft.map(c => c.footOffAtFull));
  const bm = r.bow.reduce((a, c) => a + c.meanOver, 0) / r.bow.length;
  const bx = Math.max(...r.bow.map(c => c.maxOver));
  sM += sm; sX = Math.max(sX, sx); sF = Math.max(sF, sf); bM += bm; bX = Math.max(bX, bx); n++;
  console.log(`  ${String(r.seed).padStart(5)}  ${String(r.shaft.length).padStart(6)} | ${f(sm)} hex     ${f(sx)} hex        ${f(sf * 100, 1)}%        | ${f(bm)} hex   ${f(bx)} hex`);
}
console.log(`\n  ALL          | ${f(sM / n)} hex     ${f(sX)} hex        ${f(sF * 100, 1)}%        | ${f(bM / n)} hex   ${f(bX)} hex`);
console.log('\n  SHAFT = the treatment (gate reads the cloud CENTRE).  BOW = the positive control');
console.log('  (same rim, same file, gate reads its own LEGS). The bow MUST read ~0.\n');

/* ---- the TWO LEDGERS (206): does the fix erase the defect WITHOUT starving the feature? ---- */
console.log('THE FIX (gate on the shaft\'s own extent) — the two ledgers\n');
console.log('  seed |  OFF-PLATE rain ink        |  ON-PLATE rain ink (the COST)');
console.log('       |   HEAD      FIX            |   HEAD      FIX      retained');
let HO = 0, FO = 0, HN = 0, FN = 0;
for (const r of rows) {
  const ho = r.shaft.reduce((a, c) => a + c.headOff, 0), fo = r.shaft.reduce((a, c) => a + c.fixOff, 0);
  const hn = r.shaft.reduce((a, c) => a + c.headOn, 0), fn = r.shaft.reduce((a, c) => a + c.fixOn, 0);
  HO += ho; FO += fo; HN += hn; FN += fn;
  console.log(`  ${String(r.seed).padStart(4)} | ${f(ho, 1)}   ${f(fo, 1)}            | ${f(hn, 1)}   ${f(fn, 1)}    ${f(100 * fn / hn, 1)}%`);
}
console.log(`  ---- | ${f(HO, 1)}   ${f(FO, 1)}            | ${f(HN, 1)}   ${f(FN, 1)}    ${f(100 * FN / HN, 1)}%`);
console.log(`\n  OFF-PLATE goes to EXACTLY ${FO.toFixed(3)} by construction: pa>0 now REQUIRES the whole`);
console.log('  shaft inside the rim, so no alpha can ever be spent past it (a drift made');
console.log('  impossible beats one you agree to look for, 223).\n');

/* ================= PART B — THE SHIPPED DRAW, not a model of it =================
 * Part A grades my ARITHMETIC. This grades the CODE: tag the shaft's own gradient
 * ('96,116,142' — unique to it; the wet patch is radial '58,76,96' and the drops are
 * '206,220,236'), record the quad it actually fills, and measure that quad's FOOT
 * against the row's live span. Build-agnostic: runs unchanged on HEAD and the patch,
 * no source swap, so there is no cross-build floor to fight (230).
 * We drive one cloud at a time to a swept x with its shower at FULL weight, and read
 * back what the artifact draws. */
const b2 = await chromium.launch();
const p2 = await b2.newPage({ viewport: { width: 1400, height: 900 } });
await p2.addInitScript(() => {
  let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
});
await p2.goto('file://' + ART);
await p2.waitForFunction(() => typeof window.__census === 'function');

const drawn = [];
for (const seed of [7, 42, 1234]) {
  const r = await p2.evaluate((seed) => {
    playing = false;
    genWorld(seed); __warp(61);
    if (typeof STARS !== 'undefined') STARS.length = 0;

    /* capture the shaft quads the artifact actually fills, in WORLD coords (render()
       has the camera transform applied, so moveTo/lineTo args ARE world px) */
    const quads = [];
    const CLG = ctx.createLinearGradient.bind(ctx);
    const tagged = new WeakSet();
    let cur = [];
    const BP = ctx.beginPath.bind(ctx), MT = ctx.moveTo.bind(ctx),
          LT = ctx.lineTo.bind(ctx), FI = ctx.fill.bind(ctx);
    ctx.createLinearGradient = (...a) => {
      const g = CLG(...a); const AC = g.addColorStop.bind(g);
      g.addColorStop = (o, c) => { if (typeof c === 'string' && c.indexOf('96,116,142') >= 0) tagged.add(g); return AC(o, c); };
      return g;
    };
    ctx.beginPath = () => { cur = []; return BP(); };
    ctx.moveTo = (x, y) => { cur.push([x, y]); return MT(x, y); };
    ctx.lineTo = (x, y) => { cur.push([x, y]); return LT(x, y); };
    ctx.fill = (...a) => { if (tagged.has(ctx.fillStyle) && cur.length === 4) quads.push(cur.slice()); return FI(...a); };

    let worstOver = 0, nDrawn = 0, nOff = 0;
    const wet = rainFront() - WETRAMP - 0.01;    /* this cloud's shower at FULL weight */
    for (let i = 0; i < clouds.length; i++) {
      const cl = clouds[i];
      const gy = cl.y | 0;
      if (!(gy >= 0 && gy < G) || ROWMAX[gy] < ROWMIN[gy]) continue;
      const lo = ROWMIN[gy], hi = ROWMAX[gy], x0 = cl.x, wf0 = clouds.map(c => c.wf);
      clouds.forEach((c, j) => { c.wf = (j === i) ? wet : 1e9; });   /* only this one rains */
      for (let x = lo - 4; x <= hi + 4; x += 0.5) {
        cl.x = x; quads.length = 0;
        render();
        for (const q of quads) {
          const ys = q.map(p => p[1]), ymax = Math.max(...ys);
          const foot = q.filter(p => p[1] > ymax - 0.5);            /* the two foot corners */
          if (foot.length < 2) continue;
          const fx = foot.map(p => p[0] / CW - 0.25);               /* pxc: X=(gx+0.25)*CW */
          const fL = Math.min(...fx), fR = Math.max(...fx);
          const over = Math.max(0, lo - fL, fR - hi);
          nDrawn++; if (over > 0) nOff++;
          worstOver = Math.max(worstOver, over);
        }
      }
      cl.x = x0; clouds.forEach((c, j) => { c.wf = wf0[j]; });
    }
    return { seed, worstOver, nDrawn, nOff };
  }, seed);
  drawn.push(r);
}
await b2.close();

console.log('PART B — THE SHIPPED DRAW: the veil quads the artifact actually FILLS\n');
console.log('  seed | shaft quads drawn | quads with a foot PAST the rim |  worst overhang');
for (const r of drawn)
  console.log(`  ${String(r.seed).padStart(4)} | ${String(r.nDrawn).padStart(17)} | ${String(r.nOff).padStart(9)}  (${(100 * r.nOff / r.nDrawn).toFixed(1).padStart(5)}%)        | ${r.worstOver.toFixed(2).padStart(6)} hex`);
console.log('\n  A veil quad whose FOOT lands past the row\'s live span is rain falling on the void.\n');

