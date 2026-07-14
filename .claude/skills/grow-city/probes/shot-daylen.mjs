/* 261's camera — CAN A VIEWER SEE THE SEASON NOW?
 *
 * The claim is about WHEN THE SUN IS UP, so the frame that carries it is the EVENING, not
 * noon (noon is the must-not-move control, and it is shot too). Four frames per seed, at the
 * SAME clock (dayT 0.74) and the same two seasons, on BOTH builds:
 *
 *   HEAD  winter  ] identical to each other by construction — HEAD's light curve has no
 *   HEAD  summer  ]  `year` term at all. This is the incumbent, and it is the control.
 *   patch winter  ]  the feature: the sun has SET (winter day ends at dayT 0.701)
 *   patch summer  ]  the feature: the sun is still UP (summer day ends at 0.831)
 *
 * NAMED BY FILE, NEVER BY A LETTER (239) — an A/B letter is a pointer the agent must carry
 * across four images, and pointers get swapped. The build↔season map is CROSSED between the
 * two seeds (238), so "the second one is always the fix" fails on one of them.
 *
 * Every frame SELF-REPORTS its own state in the VIEWER'S units (202/236): not "dayLen=0.08"
 * (the rule's units, which no viewer can arrive at by looking) but "sun DOWN, set at 0.701" —
 * something a person could in principle check against the pixels.
 *
 * page.screenshot(), not getImageData (200): the HUD is DOM and the probes are blind to it.
 * Freeze in-page and FORCE syncSky/syncStats (204), or the sky CSS and the HUD go stale and
 * an agent will correctly FAIL the camera for a bug the city does not have.
 *
 *   node shot-daylen.mjs <outdir>
 */
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = [resolve(HERE, '../../../../solvista.html'), resolve(HERE, 'solvista.html')].find(existsSync);
const OUT = resolve(process.argv[2] || '.claude/skills/grow-city/shots/daylen');
mkdirSync(OUT, { recursive: true });

const HEADF = '/tmp/solvista-head-261-shot.html';
writeFileSync(HEADF, execSync(`git -C ${HERE} show HEAD:solvista.html`, { maxBuffer: 1 << 28 }));

const WINTER = 2035.02, DRYPEAK = 2035.62;
const EVE = 0.74, NOON = 0.42;

const browser = await chromium.launch();

for (const seed of [42, 7]) {
  for (const [tag, file] of [['head', HEADF], ['patch', ART]]) {
    const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
    await page.addInitScript(() => {
      let s = 0x51F3A9C >>> 0;
      Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    });
    await page.goto(pathToFileURL(file).href);
    await page.waitForTimeout(500);

    await page.evaluate((seed) => { playing = false; genWorld(seed); __warp(61); }, seed);

    for (const [season, y] of [['winter', WINTER], ['summer', DRYPEAK]]) {
      for (const [when, t] of [['eve', EVE], ['noon', NOON]]) {
        const state = await page.evaluate(({ y, t }) => {
          __setYear(y); __setTime(t);
          /* frame()'s own order: render() FIRST, then the DOM. 204: force both, or the CSS sky
             (throttled 400ms) and the HUD (only synced while playing) go stale and an agent
             will correctly FAIL the camera for a bug the city does not have. */
          render();
          lastSky = 0; syncSky(performance.now()); syncStats();
          const warp = (typeof sunWarp === 'function') ? sunWarp : (u) => u;
          const up = (u) => { const p = (warp(((u % 1) + 1) % 1) - SUNUP) / (SUNDN - SUNUP); return p > 0 && p < 1; };
          let set = null;
          for (let i = 0; i < 20000; i++) if (up(i / 20000) && !up((i + 1) / 20000)) set = (i + 1) / 20000;
          return { sunUp: up(t), set, lit: +LITAMT.toFixed(2) };
        }, { y, t });
        const f = join(OUT, `${seed}-${tag}-${season}-${when}.png`);
        await page.screenshot({ path: f });
        console.log(`  ${seed}-${tag}-${season}-${when}.png   clock ${t}  ·  sun is ${state.sunUp ? 'UP  ' : 'DOWN'}` +
                    `  ·  today's sunset ${state.set.toFixed(3)}  ·  LITAMT ${state.lit} (0 = full day, 1 = deep night)`);
      }
    }
    await page.close();
  }
}
await browser.close();
console.log(`\n  → ${OUT}`);
