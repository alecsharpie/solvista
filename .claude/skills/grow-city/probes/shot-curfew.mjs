/* The visual gate for iter 210 — the crowd goes to bed.
 *
 * Pin: dayT 0.04, the small hours. This is the hour where the two builds actually diverge,
 * and finding that took a measurement (see find-curfew-diff.mjs). HEAD's gate is LITAMT>0.75,
 * and LITAMT has already fallen to 0.64 by this hour -- so the OLD city has its ENTIRE crowd
 * of 93 back on the street at 3am. The new one has 32, and they are on the lively ground.
 * (At the deeper pin dayT=0.95 the two builds coincide almost exactly, because with a stubbed
 * Math.random they consume the SAME random value -- HEAD hides r<0.5, PATCH hides r<0.505 on
 * quiet ground. A frame shot there shows nothing, which is what the first visual pass found.)
 *
 * Freezes in-page rather than pinning via ?t= (202: shoot.mjs waits, and the clock drifts).
 * Shoots page.screenshot(), not a canvas readback (200). Forces syncSky/syncStats, which a
 * frozen clock does not refresh (204). Aims the close crop at the ground that actually
 * empties, rather than at a rectangle I guessed (201).
 */
import { homedir } from 'node:os';
import { writeFileSync, unlinkSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '../../../..');
const ART = join(ROOT, 'solvista.html');
const OUT = join(ROOT, '.claude/skills/grow-city/shots/curfew');
mkdirSync(OUT, { recursive: true });

const SEEDS = [42, 7];
const T = 0.04;             /* the small hours: LITAMT 0.64, nightAmt ~0.99 */
const VW = 1500, VH = 950;

const BASE = join(ROOT, '.shot-base.html');
writeFileSync(BASE, execSync('git show HEAD:solvista.html', { cwd: ROOT, maxBuffer: 1 << 28 }));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 2 });
page.on('pageerror', e => console.error('PAGE ERROR:', e.message));

const freeze = ({ seed, t }) => {
  playing = false;
  let s = 0x2F6E2B1 >>> 0;                        /* same crowd in both builds (203) */
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  genWorld(seed); __warp(61); __setTime(t);
};

for (const seed of SEEDS) {
  /* First, in the PATCHED build: where does the crowd actually go home? Aim there. */
  await page.goto(pathToFileURL(ART).href);
  await page.waitForTimeout(400);
  const aim = await page.evaluate(({ seed, t, freezeSrc }) => {
    eval('(' + freezeSrc + ')')({ seed, t });
    render();
    const home = peds.filter(p => pedHidden(p));   /* the ones who have gone to bed */
    let best = home[0], bn = 0;
    for (const c of home) {
      const n = home.filter(o => Math.hypot(o.x - c.x, o.y - c.y) < 5).length;
      if (n > bn) { bn = n; best = c; }
    }
    return { x: best.x, y: best.y, n: bn, home: home.length, tot: peds.length };
  }, { seed, t: T, freezeSrc: freeze.toString() });
  console.log(`\nseed ${seed}: ${aim.home}/${aim.tot} residents go home; densest emptying = ` +
    `${aim.n} around hex (${aim.x},${aim.y})`);

  for (const [tag, file] of [['head', BASE], ['patch', ART]]) {
    for (const view of ['city', 'green']) {
      await page.goto(pathToFileURL(file).href);
      await page.waitForTimeout(400);
      const st = await page.evaluate(({ seed, t, view, aim, VW, VH, freezeSrc }) => {
        eval('(' + freezeSrc + ')')({ seed, t });
        if (view === 'green') {
          const [cx, cy] = ctr(aim.x, aim.y);
          scale = 3.6; offX = VW / 2 - cx * scale; offY = VH / 2 - cy * scale;
        }
        lastSky = 0; syncSky(performance.now()); syncStats();  /* a frozen clock refreshes neither (204) */
        render();
        return { dayT: +dayT.toFixed(2), lit: +LITAMT.toFixed(2), vis: peds.filter(p => !pedHidden(p)).length, tot: peds.length };
      }, { seed, t: T, view, aim, VW, VH, freezeSrc: freeze.toString() });
      const png = join(OUT, `s${seed}-${view}-${tag}.png`);
      await page.screenshot({ path: png });
      console.log(`  ${view.padEnd(5)} ${tag.padEnd(5)}  dayT=${st.dayT} LITAMT=${st.lit}  ` +
        `on the street: ${String(st.vis).padStart(3)}/${st.tot}  -> ${png}`);
    }
  }
}
await browser.close();
unlinkSync(BASE);
