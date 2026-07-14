#!/usr/bin/env node
/* shot-hoverstale — the ring and the card, six seconds after the mouse stopped (iter 278).
 *
 * A still cannot prove a verb (134/258): "the card goes stale" is a claim about TIME, and
 * probe-hoverstale owns it. But the defect leaves a STATIC, SPATIAL trace that a frame can
 * carry — in HEAD the focus ring sails off across the city with the resident while the card,
 * pinned at the cursor, goes on describing them. So the still shows the RING AND THE CARD
 * COMING APART, which is a fact about one frame.
 *
 * The cursor is invisible in a screenshot, so it is marked with a crosshair. That is an
 * instrument artifact and it is drawn in BOTH builds, identically.
 *
 * page.screenshot(), never the canvas: the card is DOM (200).
 * Frames named by FILE with meaningless tokens, map CROSSED between seeds (238/239/268).
 * Drives `zoom`, never `scale` (269).
 */
import {join, dirname} from 'path';
import {homedir} from 'os';
import {fileURLToPath, pathToFileURL} from 'url';
import {mkdirSync} from 'fs';
const HERE = dirname(fileURLToPath(import.meta.url));
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const {chromium} = (await import(pathToFileURL(PW).href)).default;

const OUT = process.argv[2] || join(HERE, '../shots/hover');
mkdirSync(OUT, {recursive: true});
const PATCH = join(HERE, '../../../../solvista.html');
const HEAD = '/tmp/head.html';
const SECS = 6;

/* crossed map (238/268): the treatment is not in the same slot on both seeds */
const PLAN = [
  {seed: 42, kappa: PATCH, sigma: HEAD},
  {seed: 7,  kappa: HEAD,  sigma: PATCH},
];

const shoot = async (browser, src, seed, token, outdir) => {
  const page = await browser.newPage({viewport: {width: 1400, height: 900}});
  await page.addInitScript(() => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  });
  await page.goto(pathToFileURL(src).href);
  await page.waitForTimeout(400);

  const info = await page.evaluate(([seed, secs]) => {
    playing = false;
    time = 0; waveT = 0; WINDA = 0.5;
    STARS.length = 0; flock = null;
    genWorld(seed); __warp(61);
    for (const c of cells) if (c.h < c.th) c.h = c.th;
    __setTime(0.35);
    render();

    /* A CAR, not a resident. probe-hoverstale measures a vehicle out of its own pick disc in
       0.5s (against a resident's 2-5s), so in a few seconds of held cursor its ring is right
       across the frame — which is the whole point of the still. Taken near the plate's middle
       so clampPan cannot strand the aim (272). */
    const mid = vehicles.filter(v => v._sf !== undefined)
      .sort((a, b) => Math.hypot(a.x - G / 2, a.y - G / 2) - Math.hypot(b.x - G / 2, b.y - G / 2))[0];

    /* 269: drive zoom, never scale — the app derives scale = fitScale*zoom */
    zoom = 5; scale = fitScale * zoom;
    offX = innerWidth / 2 - mid._sx * scale;
    offY = innerHeight / 2 - mid._sy * scale;
    if (typeof clampPan === 'function') clampPan();
    render();

    /* the cursor: an INTEGER pixel — MouseEvent's clientX is a `long` and truncates */
    const mx = Math.round(mid._sx * scale + offX), my = Math.round((mid._sy - 3) * scale + offY);
    cvs.dispatchEvent(new MouseEvent('mousemove', {clientX: mx, clientY: my}));

    /* hold the cursor perfectly still and let the city move under it */
    for (let k = 0; k < secs * 20; k++) {
      for (let i = 0; i < 10; i++) advanceEntities(0.05, 1);
      render();
      if (typeof hoverRefresh === 'function') hoverRefresh();
    }
    render();

    /* Where did the focus ring end up? — and there are TWO of them. stamp() rings a hovered
       ENTITY at its feet; render()'s post-pass rings a hovered TILE as a hex outline. The
       first cut of this camera reported only the entity ring, so it captioned a frame with a
       plainly-drawn tile ring "focus ring is ABSENT" — a caption in the RULE's units rather
       than the VIEWER's (236), and a visual agent duly called it a tooling bug. It was. */
    const ringX = hoverEnt ? hoverEnt._sx * scale + offX : null;
    const ringY = hoverEnt ? hoverEnt._sy * scale + offY : null;
    const entDist = ringX === null ? null : Math.round(Math.hypot(ringX - mx, ringY - my));
    let tileDist = null;
    if (hoverTile && !hoverEnt) {
      const [tx, ty] = ctr(hoverTile.x, hoverTile.y);
      tileDist = Math.round(Math.hypot(tx * scale + offX - mx, ty * scale + offY - my));
    }
    /* ...and say so when the ring the artifact IS drawing cannot be SEEN: a ring 1108px from
       the pointer is off a 1400x900 canvas (max on-screen distance ~837px), and an occluded
       entity gets no ring at all, because stamp() draws it inside the entity's own z-bucket.
       Reporting a distance for a ring that is not in the frame is 236 again — the caption in
       the RULE's units, not the VIEWER's. */
    const off = entDist !== null &&
      (ringX < 0 || ringY < 0 || ringX > innerWidth || ringY > innerHeight);
    const ring = entDist !== null
      ? 'an ENTITY ring ' + entDist + 'px from the pointer' +
        (off ? ' — OFF-CANVAS, not in this frame' : ' (may be occluded: the ring shares the entity\'s z)')
      : tileDist !== null ? 'a TILE ring ' + tileDist + 'px from the pointer'
      : 'NO ring anywhere';
    const card = document.getElementById('tip');
    const says = card.style.display === 'none' ? '(no card)'
      : (card.querySelector('.tt') || {}).textContent + ' / ' + (card.querySelector('.td') || {}).textContent;

    /* the crosshair — an INSTRUMENT mark, drawn the same in both builds */
    const ch = document.createElement('div');
    ch.style.cssText = 'position:fixed;z-index:99;pointer-events:none;left:' + (mx - 11) + 'px;top:' + (my - 11) +
      'px;width:22px;height:22px;border:1.5px solid #ff2bd1;border-radius:50%;box-shadow:0 0 0 1px #fff';
    document.body.appendChild(ch);

    return {mx, my, says, ring, entDist, tileDist, hasRefresh: typeof hoverRefresh === 'function'};
  }, [seed, SECS]);

  /* a caption that reports the frame's own state (202) — but NEVER the build (blind) */
  await page.evaluate(([token, info, secs]) => {
    const d = document.createElement('div');
    d.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:99;background:#000c;color:#fff;' +
      'font:12px monospace;padding:6px 9px;border-radius:5px;white-space:pre';
    d.textContent = token + '  ·  cursor held still ' + secs + 's (pink circle = the POINTER)\n' +
      'focus ring: ' + info.ring + '\ncard says: ' + info.says;
    document.body.appendChild(d);
  }, [token, info, SECS]);

  const f = join(outdir, `s${seed}-${token}.png`);
  await page.screenshot({path: f});
  console.log(`  s${seed} ${token.padEnd(6)} [hoverRefresh:${info.hasRefresh ? 'yes' : 'NO '}]  ${info.ring.padEnd(36)} ·  card: ${info.says.slice(0, 46)}`);
  await page.close();
  return f;
};

const browser = await chromium.launch();
for (const p of PLAN) {
  console.log(`seed ${p.seed}:`);
  await shoot(browser, p.kappa, p.seed, 'kappa', OUT);
  await shoot(browser, p.sigma, p.seed, 'sigma', OUT);
}
await browser.close();
console.log('\nmap (do NOT give this to the agents):');
for (const p of PLAN) console.log(`  seed ${p.seed}: kappa=${p.kappa === PATCH ? 'PATCH' : 'HEAD'}  sigma=${p.sigma === PATCH ? 'PATCH' : 'HEAD'}`);
