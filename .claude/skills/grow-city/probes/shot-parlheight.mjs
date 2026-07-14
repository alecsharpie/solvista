/* shot-parliament — the camera for "the tallest civic roof in Solvista".
 *
 * The subject is GEOMETRY, so 224's law governs the question we may ask: screen-y is
 * DEPTH, not height — the topmost thing in the frame is the farthest-back thing. An
 * agent must therefore judge the capitol by its DRAWN WALL LENGTH, never by where it
 * sits in the frame. The prompt says so explicitly.
 *
 * Blind: frames are named by FILE (239) with MEANINGLESS tokens, not ordinals (268),
 * and the build->token map is CROSSED between seeds (238), so "kappa is the fix" fails
 * on one of them. No caption reveals the treatment.
 *
 * Camera: drives `zoom` and lets the app derive `scale` exactly as its own zoom handler
 * does (269) — writing `scale` directly renders a zoomed canvas under a HUD still saying
 * 1x. Freezes in-page, then render() BEFORE the DOM sync, in frame()'s own order (261),
 * and forces syncSky/syncStats because a frozen clock does not refresh the DOM (204).
 * Shot with page.screenshot() so the DOM is composited (200).
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));

const OUT = process.argv[2] || join(HERE, '.claude/skills/grow-city/shots/parl');
mkdirSync(OUT, { recursive: true });

const PATCH = join(HERE, 'solvista.html');
const HEAD = '/tmp/head.html';
/* the map is CROSSED between seeds: on 42 the patch is kappa, on 7 it is sigma */
const PLAN = [
  { seed: 42, builds: { kappa: PATCH, sigma: HEAD } },
  { seed: 7,  builds: { kappa: HEAD,  sigma: PATCH } },
];

const b = await chromium.launch();

for (const { seed, builds } of PLAN) {
  for (const [token, src] of Object.entries(builds)) {
    const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
    await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
      Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
    await p.goto(pathToFileURL(src).href);
    await p.waitForFunction(() => window.__census !== undefined);

    for (const [name, Z, hour] of [['civic', 3.4, 0.30], ['night', 3.4, 0.88], ['city', 1, 0.30]]) {
      const info = await p.evaluate(({ seed, Z, hour }) => {
        playing = false;
        genWorld(seed); __warp(2035 - 1974);
        time = 1000; waveT = 500; dayT = hour;
        STARS.length = 0; if (typeof flock !== 'undefined') flock = null;

        const parl = __find('parliament')[0];
        /* drive zoom; let the app derive scale, exactly as its own handler does (269) */
        zoom = Z; scale = fitScale * zoom;
        if (Z === 1) { offX = fitX; offY = fitY; }
        else {
          const [wx, wy] = ctr(parl.x, parl.y);
          offX = innerWidth / 2 - wx * scale;
          offY = innerHeight / 2 - wy * scale + 60 * scale / 3.4;   /* a little sky above the dome */
          clampPan();
        }
        render();                       /* frame()'s own order: render, THEN the DOM (261) */
        lastSky = 0; syncSky(performance.now()); syncStats();
        return { hex: `${parl.x},${parl.y}`, zoom, dayT: +dayT.toFixed(3), LITAMT: +LITAMT.toFixed(2) };
      }, { seed, Z, hour });

      /* self-report the frame's STATE only — never the treatment (the pair must stay blind) */
      await p.evaluate((t) => {
        let d = document.getElementById('__cap');
        if (!d) { d = document.createElement('div'); d.id = '__cap';
          d.style.cssText = 'position:fixed;bottom:6px;left:50%;transform:translateX(-50%);z-index:99;'
            + 'font:11px monospace;color:#fff;background:rgba(0,0,0,.6);padding:3px 8px;border-radius:4px';
          document.body.appendChild(d); }
        d.textContent = t;
      }, `seed ${seed} · ${name} · zoom ${info.zoom}x · dayT ${info.dayT} · LITAMT ${info.LITAMT} · capitol hex ${info.hex}`);

      const f = join(OUT, `s${seed}-${token}-${name}.png`);
      await p.screenshot({ path: f });
      console.log(`${f}   zoom=${info.zoom}x dayT=${info.dayT} LITAMT=${info.LITAMT} hex=${info.hex}`);
    }
    await p.close();
  }
}
await b.close();
console.log('\nblind map (DO NOT give this to the agents):');
for (const { seed, builds } of PLAN)
  console.log(`  seed ${seed}: ` + Object.entries(builds).map(([t, s]) => `${t}=${s === PATCH ? 'PATCH' : 'HEAD'}`).join('  '));
