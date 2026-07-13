#!/usr/bin/env node
/* The sea-mirror camera (iter 257) — cue (s), the golden hour.
 *
 * The claim under test is a WHOLE-FRAME one: seven agent reads across five step-backs
 * say the sunset frame "splits into two unrelated colour worlds" because the land
 * catches fire and the sea does not. So there is no close-up to aim (226) — the defect
 * IS the composition, and the only honest framing is the un-zoomed plate. The sea is a
 * third of the canvas; if the fix works you can see it from across the room.
 *
 * Frames, per build:
 *   golden  t=0.68  -- GWARM 0.72, the low-sun band. THE TREATMENT.
 *   day     t=0.30  -- GWARM 0.00. THE DEAD-REGIME CONTROL (199): the patch's `r` is 0
 *                      here, so it must render HEAD's bytes EXACTLY. pngdiff must say 0.
 *   night   t=0.92  -- GWARM 0.00. The second free control, and the one that proves the
 *                      night sea (a shipped, well-liked surface) was not disturbed.
 *
 * Frames are named BY FILE, never "A"/"B" (239): an A/B letter is a pointer the agent
 * must maintain across four images, and pointers get swapped -- 239's agent formed an
 * entirely correct perception and attached it to the wrong build. A path is
 * self-identifying and cannot be.
 *
 *   node probes/shot-seamirror.mjs <seed> <outdir>          # the patch, as it stands
 *   SRC=/tmp/head.html TAG=head node probes/shot-seamirror.mjs <seed> <outdir>
 */
import { homedir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, mkdirSync } from 'node:fs';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
/* resolve the artifact RELATIVE TO THIS FILE, never an absolute path */
const ART = process.env.SRC
  ? resolve(process.env.SRC)
  : [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')].find(f => existsSync(f));
const TAG = process.env.TAG || 'patch';

const seed = parseInt(process.argv[2] || '42', 10);
const outdir = resolve(process.argv[3] || join(HERE, '../shots/seamirror'));
mkdirSync(outdir, { recursive: true });

const FRAMES = [
  { name: 'golden', t: 0.68 },
  { name: 'day',    t: 0.30 },
  { name: 'night',  t: 0.92 },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
page.on('pageerror', e => console.error('PAGE ERROR:', e.message));

console.log(`\n  ${TAG}  <- ${ART}\n`);
for (const f of FRAMES) {
  await page.goto(pathToFileURL(ART).href);
  await page.waitForTimeout(500);
  const st = await page.evaluate(({ seed, t }) => {
    playing = false;                 /* stops BOTH clocks (dayT and year) */
    genWorld(seed);
    __warp(61);                      /* ...which also advances `year`, so pin it after */
    __setYear(2035.62);              /* the dry peak: seasonCool()=0, so 253's fixed point
                                        holds and the golden wash is at its strongest --
                                        which is exactly the pin every agent complained at */
    __setTime(t);
    lastSky = 0; syncSky(performance.now()); syncStats();   /* the frozen clock does not
                                        refresh the DOM (204): force the sky + HUD or the
                                        frame lies about everything outside the canvas */
    render();
    /* Self-report in the VIEWER'S units (236), not the rule's: the sea's actual mean
       rendered colour, straight off the composited canvas, so a mis-pinned frame or a
       dead feature is caught by the tool instead of by a gate round. */
    const g = document.querySelector('canvas').getContext('2d');
    let sr = 0, sg = 0, sb = 0, n = 0;
    for (const c of __deep()) {          /* the artifact's own sea-cell hook: x,y,tone,sx,sy */
      if (c.riv) continue;               /* the open sea only -- the river is a different read */
      const d = g.getImageData(Math.round(c.sx * devicePixelRatio), Math.round(c.sy * devicePixelRatio), 1, 1).data;
      sr += d[0]; sg += d[1]; sb += d[2]; n++;
    }
    const mean = n ? [Math.round(sr / n), Math.round(sg / n), Math.round(sb / n)] : null;
    return { dayT, LITAMT: +LITAMT.toFixed(2), GWARM: +GWARM.toFixed(2),
             phase: phaseWord(dayT), sunUp: dayT >= SUNUP && dayT <= SUNDN,
             hud: document.getElementById('stPhase').textContent, mean, n };
  }, { seed, t: f.t });

  const png = join(outdir, `s${seed}-${f.name}-${TAG}.png`);
  await page.screenshot({ path: png });        /* DOM composited, per iter 200 */
  const sea = st.mean ? `sea=rgb(${st.mean.join(',')}) n=${st.n}` : 'sea=?';
  console.log(`  ${f.name.padEnd(7)} t=${st.dayT.toFixed(2)} GWARM=${String(st.GWARM).padStart(4)} ` +
    `LITAMT=${String(st.LITAMT).padStart(4)} sun=${st.sunUp ? 'UP  ' : 'down'} ` +
    `phase=${st.phase.padEnd(11)} HUD=${(st.hud === st.phase ? 'ok' : 'STALE:' + st.hud).padEnd(8)} ` +
    `${sea.padEnd(28)} -> ${png}`);
}
await browser.close();
