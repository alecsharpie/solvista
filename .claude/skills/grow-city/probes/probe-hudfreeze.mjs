/* Is the night-frame "DAYTIME" HUD a REAL bug, or is the step-back CAMERA lying?
 *
 * Two agents, two seeds, independently reported the HUD reading "DAYTIME" / "NEW MOON"
 * on a night frame with a crescent moon drawn. 204's law says a frozen clock does not
 * refresh the DOM (syncStats runs only inside the playing branch), so this may be the
 * instrument. Decide it by measurement, three cases:
 *
 *   A  frozen exactly as shot-stepback.mjs does it  (playing=false; __setTime; render)
 *   B  same, but syncStats() forced afterwards
 *   C  clock actually RUNNING (playing=true) — what a real user sees
 *
 * Truth = phaseWord(dayT) / moonWord(moonPhase()) recomputed independently in-page.
 */
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const FILE = join(HERE, 'solvista.html');
const html = readFileSync(FILE, 'utf8');

const srv = createServer((_q, s) => { s.writeHead(200, { 'Content-Type': 'text/html' }); s.end(html); }).listen(0);
const port = srv.address().port;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.goto(`http://127.0.0.1:${port}/?seed=42`, { waitUntil: 'load' });
await page.waitForTimeout(400);

const NIGHT = 0.92;   // the step-back's night pin, taken from the light curve

const read = () => page.evaluate(() => ({
  dayT: +dayT.toFixed(4),
  hudPhase: document.getElementById('stPhase').textContent,
  hudMoonPct: document.getElementById('stMoonPct').textContent,
  hudMoonName: document.getElementById('stMoonName').textContent,
  truePhase: phaseWord(dayT),
  trueMoonName: moonWord(moonPhase()),
  trueMoonPct: Math.round((1 - Math.cos(moonPhase() * 6.2832)) / 2 * 100) + '%',
}));

// A — frozen, exactly as shot-stepback.mjs freezes it
await page.evaluate((t) => { playing = false; __setTime(t); render(); }, NIGHT);
const A = await read();

// B — same frozen world, but force the DOM sync (204's prescription)
await page.evaluate(() => { syncStats(); });
const B = await read();

// C — the live artifact: let the clock RUN until it reaches night on its own
await page.evaluate((t) => { playing = true; __setTime(t); }, NIGHT);
await page.waitForTimeout(1200);           // several ticks land in this window
const C = await read();

const row = (n, r) => {
  const okP = r.hudPhase === r.truePhase, okM = r.hudMoonName === r.trueMoonName;
  console.log(
    `${n}  dayT=${String(r.dayT).padEnd(6)}  HUD="${r.hudPhase}" / ${r.hudMoonPct} ${r.hudMoonName}`.padEnd(62) +
    `TRUTH="${r.truePhase}" / ${r.trueMoonPct} ${r.trueMoonName}`.padEnd(46) +
    `${okP && okM ? 'AGREE' : 'STALE <<<'}`);
  return okP && okM;
};

console.log(`\nseed 42, night pin dayT=${NIGHT}  (phaseWord(0.92) is the truth the canvas draws)\n`);
const a = row('A frozen (as shot-stepback) ', A);
const b = row('B frozen + syncStats()      ', B);
const c = row('C playing (the real user)   ', C);

console.log(`\nVERDICT: ${!a && b && c
  ? 'CAMERA BUG — the artifact is fine; shot-stepback.mjs never calls syncStats(), so its HUD is stale from page load.'
  : a ? 'no stale HUD reproduced — the agents saw something else.'
      : 'ARTIFACT BUG — the HUD is wrong even with the clock running.'}\n`);

await browser.close();
srv.close();
