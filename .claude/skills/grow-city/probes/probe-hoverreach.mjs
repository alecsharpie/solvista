/* probe-hoverreach — CAN A VIEWER ACTUALLY HOVER A PERSON?
 *
 * The claim, in the viewer's units (205): "I pointed at the man and nothing happened."
 * So: of the CSS pixels where a class is ACTUALLY DRAWN, what fraction of them return
 * that class from the artifact's own pickEntity()?  The right answer is ~100%, and
 * anything less is the defect stated with no threshold invented (236).
 *
 * The ink is isolated by SUPPRESSING the class's own draw fn inside ONE page (230/234):
 * render shipped -> render with the fn stubbed -> the changed pixels ARE that draw, off
 * the final composited canvas, so occlusion is measured for free and the floor is 0 px.
 * BUILD-AGNOSTIC: nothing here reads a source file, so one file grades HEAD and the patch.
 *
 * Controls:
 *   - VEHICLE (r=6) and WHALE (r=12) are the same mechanism at a bigger radius: if they
 *     score high and the ped scores low, the radius is the cause and not the rig (248).
 *   - TILE REACH is the must-not-move column (250): of the frame's live pixels that draw
 *     NO entity, what fraction still name a TILE? Widening a pick disc can only ever eat
 *     into this, so it must hold at ~100% and the entity-covered share of the frame must
 *     stay small.
 */
import {join, dirname} from 'path';
import {homedir} from 'os';
import {fileURLToPath, pathToFileURL} from 'url';
const HERE = dirname(fileURLToPath(import.meta.url));
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const {chromium} = (await import(pathToFileURL(PW).href)).default;
const ART = pathToFileURL(join(HERE, 'solvista.html')).href;
const SEEDS = [42, 7, 1234];

/* the classes we can isolate by stubbing one draw fn */
const CLASSES = [
  {name: 'Resident', fn: 'drawPed',    want: n => n === 'Resident' || n === 'Good dog'},
  {name: 'Vehicle',  fn: 'drawVehicle',want: n => /Car|Taxi|bus|Police|Ambul|Fire|Streetcar|truck|Cyclist/i.test(n)},
];

const run = async (page, seed) => page.evaluate(async ([seed, CLASSES]) => {
  /* --- freeze the world: every clock the frame loop writes (275) --- */
  playing = false;
  time = 0; waveT = 0; WINDA = 0.5; dayT = 0.35;
  STARS.length = 0; flock = null;
  genWorld(seed); __warp(61);
  for (const c of cells) if (c.h < c.th) c.h = c.th;   /* 272: render() grows c.h */
  __setTime(0.35);

  const W = innerWidth, H = innerHeight, D = dpr;
  const grab = () => {
    render();
    const g = cvs.getContext('2d').getImageData(0, 0, cvs.width, cvs.height).data;
    return g;
  };
  const at = (g, x, y) => {                      /* CSS px -> device px */
    const i = (((y * D) | 0) * cvs.width + ((x * D) | 0)) * 4;
    return [g[i], g[i + 1], g[i + 2], g[i + 3]];
  };

  const A = grab();                              /* as shipped, stamps live */
  const floorA = grab();                         /* the floor: two renders, no change */
  let floor = 0;
  for (let i = 0; i < A.length; i += 4) if (A[i] !== floorA[i] || A[i + 1] !== floorA[i + 1]) floor++;

  const out = {floor, fitScale, scale, dpr: D, classes: [], tile: null};

  /* --- per class: ink mask, then the pick test over its own ink --- */
  const inkOf = {};
  for (const cl of CLASSES) {
    const keep = window[cl.fn];
    window[cl.fn] = () => {};
    const B = grab();
    window[cl.fn] = keep;
    grab();                                      /* restore the shipped frame + its stamps */

    const px = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const a = at(A, x, y), b = at(B, x, y);
      if (Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) > 12) px.push([x, y]);
    }
    inkOf[cl.name] = px;
    out.classes.push({name: cl.name, ink: px.length});
  }
  return {out, inkOf: Object.fromEntries(Object.entries(inkOf).map(([k, v]) => [k, v]))};
}, [seed, CLASSES.map(c => ({name: c.name, fn: c.fn}))]);

/* the pick test runs in a second evaluate so the regexes can cross the boundary as source */
const pickTest = (page, ink, names) => page.evaluate(([ink, names]) => {
  const res = {};
  for (const [cls, px] of Object.entries(ink)) {
    const re = new RegExp(names[cls], 'i');
    let hit = 0, other = 0, none = 0;
    for (const [x, y] of px) {
      const wx = (x - offX) / scale, wy = (y - offY) / scale;
      const pe = pickEntity(wx, wy);
      if (!pe) none++;
      else if (re.test(pe[0])) hit++;
      else other++;
    }
    res[cls] = {n: px.length, hit, other, none};
  }
  /* must-not-move: the tile reach. Sample the live plate on a coarse grid; a pixel that
     draws no entity must still name a TILE, and the entity-covered share must stay small. */
  const covered = new Set();
  for (const px of Object.values(ink)) for (const [x, y] of px) covered.add(y * 4096 + x);
  let live = 0, entity = 0, tile = 0;
  const g = cvs.getContext('2d').getImageData(0, 0, cvs.width, cvs.height).data;
  for (let y = 0; y < innerHeight; y += 3) for (let x = 0; x < innerWidth; x += 3) {
    const i = (((y * dpr) | 0) * cvs.width + ((x * dpr) | 0)) * 4;
    if (g[i + 3] < 8) continue;                    /* the void: render() clearRect()s it */
    live++;
    const wx = (x - offX) / scale, wy = (y - offY) / scale;
    const pe = pickEntity(wx, wy);
    if (pe) { entity++; continue; }
    const y0 = Math.round(wy / ROWY - 0.5), x0 = Math.round(wx / CW - 1);
    let ok = false;
    for (let yy = y0 - 1; yy <= y0 + 1 && !ok; yy++) for (let xx = x0; xx <= x0 + 2; xx++)
      if (inB(xx, yy)) { ok = true; break; }
    if (ok) tile++;
  }
  res._tile = {live, entity, tile};
  return res;
}, [ink, names]);

const names = {Resident: 'Resident|Good dog', Vehicle: 'Car|Taxi|bus|Police|Ambulance|Fire|Streetcar|truck|Cyclist'};

const browser = await chromium.launch();
console.log('probe-hoverreach — of the pixels where a class is DRAWN, what % name it on hover?\n');
console.log('seed  class      drawn px   NAMES IT   names other   names NOTHING   pick r (CSS px)');
for (const seed of SEEDS) {
  const page = await browser.newPage({viewport: {width: 1400, height: 900}});
  await page.addInitScript(() => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  });
  await page.goto(ART); await page.waitForTimeout(400);
  const {out, inkOf} = await run(page, seed);
  const res = await pickTest(page, inkOf, names);
  const sc = out.scale;
  for (const c of out.classes) {
    const r = res[c.name];
    const pr = (c.name === 'Resident' ? 5 : 6) * sc;
    console.log(`${String(seed).padEnd(5)} ${c.name.padEnd(10)} ${String(r.n).padStart(8)}   ${(100 * r.hit / (r.n || 1)).toFixed(1).padStart(6)}%   ${(100 * r.other / (r.n || 1)).toFixed(1).padStart(8)}%   ${(100 * r.none / (r.n || 1)).toFixed(1).padStart(11)}%   ${pr.toFixed(1).padStart(6)}`);
  }
  const t = res._tile;
  console.log(`      [control] live px ${t.live}  ->  names an entity ${(100 * t.entity / t.live).toFixed(2)}%   names a TILE ${(100 * t.tile / t.live).toFixed(2)}%   (floor ${out.floor} px, fitScale ${out.fitScale.toFixed(3)}, scale ${sc.toFixed(3)})\n`);
  await page.close();
}
await browser.close();
