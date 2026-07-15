/* iter 305 — THE FRONT GREYS THE SKY. The visual gate for the overcast sky.
   The sky is the CSS BACKDROP (200), so this MUST use page.screenshot() (DOM-composited),
   never getImageData. Freezes the world in-page (playing=false stops both clocks), pins the
   wet/dry year and the hour, waits past syncSky's 400ms throttle so the backdrop repaints,
   then shoots the WHOLE un-zoomed frame — the sky is the whole top of the scene, so there is
   nothing to zoom at (the change is the backdrop itself).

   Three frames per seed, named by FILE (239), each self-reporting its state (202):
     storm  — a heavy overhead band (overcast ~0.82): the sky should read leaden/flat.
     clear  — a DRY year at the SAME hour (overcast 0): the CONTROL, and by the fixed point
              it is byte-identical to HEAD — it must look like the normal clear sky (258:
              the success case is a CHANGE, so the control must be the unchanged twin).
     noon   — the storm at midday, to check it reads in flat daylight too.
   Golden hour is the primary pin because a storm eating the golden sheen is the dramatic case. */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = 'file://' + join(HERE, '../../../../solvista.html');
const OUT = process.argv[3] || join(HERE, '../shots/overcast');
const SEED = +(process.argv[2] || 42);
mkdirSync(OUT, { recursive: true });

const br = await chromium.launch();
const p = await br.newPage({ viewport: { width: 1400, height: 900 } });
await p.goto(ART, { waitUntil: 'load' });
await p.evaluate(s => { genWorld(s); __warp(61); playing = false; }, SEED);

/* find the wettest & a dry year */
const yrs = await p.evaluate(() => {
  let dryY = 2010, wetY = 2010, wetV = -1;
  for (let y = 1999; y < 2036; y += 0.1) { year = y; const o = overcast();
    if (o === 0) dryY = y; if (o > wetV) { wetV = o; wetY = y; } }
  return { dryY: +dryY.toFixed(1), wetY: +wetY.toFixed(1) };
});

const shoot = async (name, y, t) => {
  const st = await p.evaluate(([yy, tt]) => { year = yy; dayT = tt;
    return { oc: +overcast().toFixed(2), front: +__front().front.toFixed(2) }; }, [y, t]);
  await p.waitForTimeout(560);                       /* let syncSky repaint the backdrop */
  const file = join(OUT, `s${SEED}-${name}.png`);
  await p.screenshot({ path: file });
  console.log(`${file}   year=${y} dayT=${t} overcast=${st.oc} front=${st.front}`);
};

await shoot('storm-golden', yrs.wetY, 0.68);
await shoot('clear-golden', yrs.dryY, 0.68);
await shoot('storm-noon', yrs.wetY, 0.35);
await br.close();
