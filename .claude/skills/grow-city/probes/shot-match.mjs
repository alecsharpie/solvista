#!/usr/bin/env node
/* shot-match.mjs — the match-day camera (iter 240).
 *
 * Freezes the world IN-PAGE (playing=false stops both clocks) and pins dayT with
 * __setTime, because shoot.mjs's ?t= drifts while it waits (139/202). syncSky/syncStats
 * are forced: a frozen clock does not refresh the DOM (204).
 *
 * It AIMS at the stadium — a rare tile (~1 per city), so a fixed clip is a coin-flip
 * (201) — and shoots the SAME hex under three states, so the set is a blind A/B/C:
 *   match-night  an evening fixture, mid-play: floodlights up, crowd in the stands
 *   dark-night   the SAME hour on a night with NO fixture (this is the control)
 *   match-day    an afternoon fixture: the crowd, played in daylight, no floodlights
 * ...plus the mandatory un-zoomed whole-city night frame.
 *
 * Every frame self-reports its state in the VIEWER'S units (236): not "the rule says
 * there is a match", but how many spectators the frame actually DRAWS.
 *
 *   node shot-match.mjs <seed> <outdir>          SRC=head.html for the HEAD control
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
/* resolve the artifact relative to the PROBE's own location, never an absolute path:
   two probes once hardcoded a worktree path and silently measured the wrong tree */
const ROOT = join(HERE, '../../../../');
const SRC = pathToFileURL(join(ROOT, process.env.SRC || 'solvista.html')).href;

const seed = +(process.argv[2] || 42);
const out = process.argv[3] || join(HERE, 'shots/match');
mkdirSync(out, { recursive: true });
const ZOOM = 4.5;

const br = await chromium.launch();
const page = await br.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
await page.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await page.goto(SRC, { waitUntil: 'load' });

/* which days carry which fixture? (HEAD has none — it plays every night by accident) */
const plan = await page.evaluate(seed => {
  playing = false; genWorld(seed); __warp(61);
  const has = typeof fixtureAt === 'function';
  let eve = -1, aft = -1, off = -1;
  for (let d = 0; d < 40; d++) {
    const ko = has ? fixtureAt(d) : 0.70;          /* HEAD: every night is "on" */
    if (has && ko < 0) { if (off < 0) off = d; continue; }
    if (ko > 0.5) { if (eve < 0) eve = d; } else if (aft < 0) aft = d;
  }
  if (!has) { off = 1; aft = -1; }                 /* HEAD cannot show a dark ground */
  return { has, eve, aft, off };
}, seed);

const FRAMES = [
  ['match-night', plan.eve, 0.70 + 0.08, ZOOM],
  ['dark-night',  plan.off, 0.70 + 0.08, ZOOM],   /* same hour, no fixture — the control */
  ['match-day',   plan.aft, 0.32 + 0.08, ZOOM],
  ['city-night',  plan.eve, 0.70 + 0.08, 0],      /* 0 = leave the camera alone: whole city */
];

for (const [name, day, tod, zoom] of FRAMES) {
  if (day < 0) { console.log(`seed ${seed}  ${name}: no such day in window — skipped`); continue; }
  const st = await page.evaluate(({ seed, day, tod, zoom }) => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    playing = false; genWorld(seed); __warp(61);
    time = 40; waveT = 40;
    __setTime(day + tod);

    const stads = [];
    for (let y = 0; y < G; y++) for (let x = 0; x < G; x++)
      if (cells[idx(x, y)].t === T.STADIUM) stads.push([x, y]);
    const hex = stads[0];

    if (zoom > 0 && hex) {                          /* aim at the ground (201) */
      const [wx, wy] = ctr(hex[0], hex[1]);
      scale = zoom;
      offX = innerWidth / 2 - wx * zoom;
      offY = innerHeight / 2 - wy * zoom;
    } else {
      /* ...and PUT IT BACK. scale/offX are page globals and they SURVIVE the previous
         evaluate: two agents, on two seeds, md5'd the "whole city" frame and found it
         byte-identical to the zoomed one, because "leave the camera alone" left it
         parked on the stadium. The artifact publishes its own fit — use it. */
      window.zoom = 1; scale = fitScale; offX = fitX; offY = fitY;
    }
    lastSky = 0; syncSky(performance.now()); syncStats();   /* 204 */
    render();

    /* self-report in the VIEWER'S units (236): count the spectators the frame DREW,
       not what the rule decided. `hv` is the stadium's own home-colour hash. */
    const live = typeof matchLive === 'function' ? matchLive() : (LITAMT > 0.3);
    let stands = 0, concourse = 0;
    if (hex) {
      const [hx, hy] = hex;
      if (typeof matchGate === 'function') {
        const gate = matchGate();
        for (let j = 0; j < 9; j++) if (hashCell(hx * 7 + j, hy, seedNum ^ 0x4A17) < 0.72 * gate) concourse++;
        if (live) for (let j = 0; j < 24; j++) if (hashCell(hx * 13 + j, hy, seedNum ^ 0x5EA7) < 0.88) stands++;
      } else {                                       /* HEAD: the permanent daylight crowd */
        if (LITAMT < 0.75) for (let j = 0; j < 9; j++)
          if (hashCell(hx * 7 + j, hy, seedNum ^ 0x4A17) < 0.72) concourse++;
      }
    }
    const ko = typeof fixtureAt === 'function' ? fixtureAt(day) : null;
    return { hex, LITAMT: +LITAMT.toFixed(2), live,
             flood: live && LITAMT > 0.3,
             fixture: ko === null ? 'HEAD(none)' : ko < 0 ? 'NO FIXTURE' : ko > 0.5 ? 'evening' : 'afternoon',
             stands, concourse };
  }, { seed, day, tod, zoom });

  console.log(`seed ${seed}  ${name.padEnd(11)} day=${day} tod=${tod.toFixed(2)} `
    + `LITAMT=${st.LITAMT} fixture=${st.fixture} matchLive=${st.live} FLOODLIT=${st.flood} `
    + `| SPECTATORS DRAWN: stands=${st.stands} concourse=${st.concourse}  (stadium hex ${st.hex})`);
  await page.screenshot({ path: join(out, `${seed}-${name}.png`) });   /* DOM-composited (200) */
}
await br.close();
