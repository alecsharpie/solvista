/* iter 305 — THE FRONT GREYS THE SKY ITSELF. Draw-only, so the census is vacuous; the claim is
   "a heavy overhead band leadens the sky, and only a heavy band does."

   The sky is the CSS BACKDROP (200: render() clearRect()s, so getImageData is blind to it) —
   but syncSky and render both derive it through the SAME shipped functions
   (daylight → overcastSky(…, overcast())), so this measures the transform at the source,
   with no pixels and no noise floor. BUILD-AGNOSTIC: the HEAD-equivalent sky is just
   daylight() with the overcast step NOT applied, computed in the same page — so the diff IS
   the feature, at an EXACT floor of 0, with no source swap.

   Three claims, and the second is the fixed point that makes the first honest:
     (1) WET (a real band, overcast()>0): the sky loses chroma and its top→bottom gradient
         FLATTENS vs the HEAD-equivalent — the sky goes leaden, and the golden-hour sea gate
         (GWARM) falls with it.
     (2) DRY / patchy (overcast()===0): the shipped sky is BYTE-IDENTICAL to HEAD — the
         overcast step is a no-op, so a fair or lightly-showered sky is unchanged. Structural.
     (3) the wiring: the CSS --sky-bot the backdrop actually paints equals the shipped skyBot. */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = 'file://' + join(HERE, '../../../../solvista.html');
const SEEDS = [42, 7];
const PINS = [{ name: 'noon  ', t: 0.35 }, { name: 'golden', t: 0.68 }];

const br = await chromium.launch();
for (const seed of SEEDS) {
  const p = await br.newPage({ viewport: { width: 1400, height: 900 } });
  await p.goto(ART, { waitUntil: 'load' });
  await p.evaluate(s => { genWorld(s); __warp(61); playing = false; }, seed);

  console.log(`\nseed ${seed}`);
  for (const pin of PINS) {
    const r = await p.evaluate(t => {
      dayT = t;
      const lum = v => 0.30 * v[0] + 0.59 * v[1] + 0.11 * v[2];
      const chroma = v => Math.max(v[0], v[1], v[2]) - Math.min(v[0], v[1], v[2]);
      /* the shipped sky at a given year, and the HEAD-equivalent (daylight WITHOUT overcast) */
      const shipped = () => { const d = daylight(sunWarp(dayT)); overcastSky(d.skyTop, d.skyBot, overcast()); return d; };
      const bare = () => daylight(sunWarp(dayT));
      /* the golden-hour sea gate the sky feeds (181), so a storm's mute of the sheen is visible */
      const gwarm = sb => Math.max(0, Math.min(1, (sb[0] - sb[2] - 70) / 70));

      /* find a DRY year (overcast 0) and the WETTEST year over the front's cycle */
      let dryY = 2010, wetY = 2010, wetV = -1;
      for (let y = 1999; y < 2036; y += 0.1) { year = y; const o = overcast();
        if (o === 0) dryY = y;
        if (o > wetV) { wetV = o; wetY = y; } }

      year = dryY; const dOc = overcast(), dShip = shipped(), dBare = bare();
      /* exact fixed point: shipped === bare at every channel of both stops */
      const identical = [...dShip.skyTop, ...dShip.skyBot].every((v, i) => v === [...dBare.skyTop, ...dBare.skyBot][i]);

      year = wetY; const wOc = overcast(), wShip = shipped(), wBare = bare();
      return {
        dryY: +dryY.toFixed(1), dOc: +dOc.toFixed(3), identical,
        wetY: +wetY.toFixed(1), wOc: +wOc.toFixed(3),
        // chroma of each stop, HEAD-equiv (bare) vs shipped, at the wet year
        chBareTop: +chroma(wBare.skyTop).toFixed(1), chShipTop: +chroma(wShip.skyTop).toFixed(1),
        chBareBot: +chroma(wBare.skyBot).toFixed(1), chShipBot: +chroma(wShip.skyBot).toFixed(1),
        // top→bottom luminance gradient (flatness), bare vs shipped
        gradBare: +Math.abs(lum(wBare.skyTop) - lum(wBare.skyBot)).toFixed(1),
        gradShip: +Math.abs(lum(wShip.skyTop) - lum(wShip.skyBot)).toFixed(1),
        // the sea's golden gate, bare vs shipped
        gwBare: +gwarm(wBare.skyBot).toFixed(2), gwShip: +gwarm(wShip.skyBot).toFixed(2),
        shipBot: wShip.skyBot.map(v => v | 0),
      };
    }, pin.t);

    /* the wiring: the page is now pinned at the WET year & this dayT; wait past syncSky's 400ms
       throttle for the RAF loop to paint the backdrop, then read what --sky-bot actually is. */
    await p.waitForTimeout(520);
    const css = (await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--sky-bot').trim()));

    const chDrop = (r.chBareTop + r.chBareBot) - (r.chShipTop + r.chShipBot);
    const wire = css === `rgb(${r.shipBot.join(',')})`;   /* syncSky emits no spaces */
    const ok = r.identical && r.dOc === 0 && r.wOc > 0.4 && chDrop > 8 && r.gradShip < r.gradBare && wire;
    console.log(`  ${pin.name}  DRY @${r.dryY} oc=${r.dOc} shipped==HEAD:${r.identical}   |   WET @${r.wetY} oc=${r.wOc}`);
    console.log(`          chroma top ${r.chBareTop}->${r.chShipTop}  bot ${r.chBareBot}->${r.chShipBot}  (drop ${chDrop.toFixed(1)})  gradient ${r.gradBare}->${r.gradShip}  GWARM ${r.gwBare}->${r.gwShip}  wire:${wire}  ${ok ? 'PASS' : 'FAIL'}`);
  }
  await p.close();
}
await br.close();
