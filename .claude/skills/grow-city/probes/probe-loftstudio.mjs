/* probe-loftstudio — the loft's rooftop studio read as a GREEN ROOF (cue au).
 *
 * The mechanism is one line: the studio penthouse was drawn with col('sage') —
 * the EXACT palette entry the green-roof garden (drawBuilding, c.groof) uses for
 * its planter box and shrubs. So it was green-dominant vegetation-coloured, and a
 * viewer read it as a roof garden — a garden the loft's IND tile cannot even carry
 * (c.groof is MID/COM/TOWER only). The fix repaints it white/glass with a warm gold
 * studio lamp.
 *
 * (A) COLOUR PROOF — deterministic, no render, no clock, no noise floor. For the
 *     studio's colours, is G the MAX channel (i.e. is it GREEN)? Measured through
 *     the artifact's OWN col()/colLit(), so it goes through the illuminant (275),
 *     at DAY and at NIGHT. HEAD's sage must be GREEN; the patch's must NOT be.
 *     The green-roof's sage is carried as the thing the studio must no longer match.
 *
 * (B) HOST CENSUS — pure world data: do lofts exist at the seeds/eras the visual
 *     gate will shoot, and where? Prints one loft's hex + screen coords per seed so
 *     the camera can aim at it (201: locate, then aim).
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');
const SRC = process.env.SRC || ART;

const SEEDS = [42, 7, 1234, 99, 2024, 555];

const b = await chromium.launch();
const p = await b.newPage();
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(pathToFileURL(SRC).href);
await p.waitForTimeout(400);

/* ---- (A) COLOUR PROOF ---------------------------------------------------- */
/* isGreen(name-or-rgb): does the illuminated colour have G as its max channel? */
const colours = await p.evaluate(() => {
  playing = false; genWorld(42); window.__warp(2035 - year);
  const parse = (s) => { const m = s.match(/(\d+(?:\.\d+)?)/g); return [+m[0], +m[1], +m[2]]; };
  const out = {};
  for (const [tag, dayT] of [['day', 0.35], ['night', 0.92]]) {
    __setTime(dayT); render();   /* recompute TINT/LIT/lit for this hour */
    const litMix = (typeof lit === 'number') ? lit : 0;
    const rec = {};
    /* HEAD studio + the green-roof it matched */
    rec['HEAD studio (sage 1.0)'] = parse(col('sage', 1));
    rec['green-roof box (sage 1.06)'] = parse(col('sage', 1.06));
    /* patch studio: white walls, glass glazing, gold lamp */
    rec['patch walls (white 1.0)'] = parse(col('white', 1));
    rec['patch glazing (glass 0.82)'] = parse(colLit('glass', 0.82, litMix));
    rec['patch lamp (gold 1.5)'] = parse(col('gold', 1.5));
    out[tag] = rec;
  }
  return out;
});

const isGreen = ([r, g, bl]) => g > r && g > bl;
console.log('=== (A) COLOUR PROOF — is G the max channel (i.e. GREEN)? ===');
for (const tag of ['day', 'night']) {
  console.log(`--- ${tag} ---`);
  for (const [k, rgb] of Object.entries(colours[tag])) {
    const grn = isGreen(rgb);
    console.log(`  ${k.padEnd(28)} rgb(${rgb.map(v => Math.round(v)).join(',')})  ${grn ? 'GREEN' : 'not-green'}`);
  }
}
/* verdict: the two HEAD/green-roof rows must be GREEN; the three patch rows must NOT be */
const sample = colours.day;
const headGreen = isGreen(sample['HEAD studio (sage 1.0)']) && isGreen(sample['green-roof box (sage 1.06)']);
const patchClean = !isGreen(sample['patch walls (white 1.0)'])
  && !isGreen(sample['patch glazing (glass 0.82)'])
  && !isGreen(sample['patch lamp (gold 1.5)']);
console.log(`\nHEAD studio matched the green roof (both GREEN): ${headGreen}`);
console.log(`PATCH studio is no longer green on any layer:    ${patchClean}`);

/* ---- (B) HOST CENSUS ----------------------------------------------------- */
console.log('\n=== (B) LOFT HOSTS @ 2035 (for the visual gate) ===');
for (const seed of SEEDS) {
  const r = await p.evaluate((seed) => {
    playing = false; genWorld(seed); window.__warp(2035 - year);
    const lofts = [];
    for (const i of HEXI) {
      const c = cells[i];
      if (c.t === T.IND && c.loft) { const x = i % G, y = (i / G) | 0; lofts.push([x, y, c.h | 0]); }
    }
    let first = null;
    if (lofts.length) {
      const [lx, ly, lh] = lofts[0];
      const [sx, sy] = ctr(lx, ly);            /* world->screen centre of the loft */
      first = { x: lx, y: ly, h: lh, sx: Math.round(sx), sy: Math.round(sy) };
    }
    return { n: lofts.length, first };
  }, seed);
  console.log(`  seed ${String(seed).padEnd(5)} lofts=${r.n}` +
    (r.first ? `  first @ hex(${r.first.x},${r.first.y}) h${r.first.h}  screen(${r.first.sx},${r.first.sy})` : '  (none)'));
}

await b.close();
