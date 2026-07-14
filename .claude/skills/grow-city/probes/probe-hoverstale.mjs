#!/usr/bin/env node
/* probe-hoverstale — HOW LONG CAN YOU LOOK AT A HOVER CARD BEFORE IT IS A LIE? (iter 278)
 *
 * Every gate this loop owns is FROZEN (134), so a claim about a readout's CADENCE has no
 * instrument. This is the temporal one: it drives the artifact's OWN `advanceEntities` and
 * `render()`, holds a cursor still on an entity, and asks each tick what the card SAYS
 * against what is actually under the cursor.
 *
 * Two ways a card can lie, and they are different defects:
 *   GHOST  — the card names an entity that is no longer under the cursor (it walked off,
 *            or somebody else walked in front of it).
 *   STALE  — the right entity is still there, but its `sub` has changed since the card was
 *            built (the resident left the park; the bus pulled in; the ferry berthed).
 *
 * BUILD-AGNOSTIC (230): it needs no patch and no source swap. `card0` (what a build that
 * freezes the card shows forever) and `truth` (what a live re-pick returns now) are BOTH
 * computable from HEAD, so the gap between them IS the defect — and after the fix the same
 * run must show the shipped card tracking `truth`.
 *
 * Controls:
 *   TILE  — the must-not-move column (250). A tile does not move, so a tile card is correct
 *           forever in BOTH builds; if it ever reads stale here, the RIG is broken, not the
 *           city. It is also 248's free positive control: a correct sibling of the readout
 *           under test, on the same code path, that must come back flat.
 *   t=0   — the fixed point (245/253). At the instant of the mousemove the two builds agree
 *           BY CONSTRUCTION, so the patch must be byte-identical there.
 */
import {join, dirname} from 'path';
import {homedir} from 'os';
import {fileURLToPath, pathToFileURL} from 'url';
import {existsSync} from 'fs';
const HERE = dirname(fileURLToPath(import.meta.url));
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const {chromium} = (await import(pathToFileURL(PW).href)).default;
const A1 = join(HERE, '../../../../solvista.html'), A2 = join(HERE, 'solvista.html');
const ART = pathToFileURL(process.env.SRC || (existsSync(A1) ? A1 : A2)).href;

const SEEDS = [42, 7, 1234];
const SECS = 20;               /* how long a viewer plausibly rests the cursor on something */

const run = (page, seed, secs) => page.evaluate(async ([seed, secs]) => {
  playing = false;
  time = 0; waveT = 0; WINDA = 0.5;
  STARS.length = 0; flock = null;
  genWorld(seed); __warp(61);
  for (const c of cells) if (c.h < c.th) c.h = c.th;    /* 272: render() grows c.h */
  __setTime(0.35);
  render();

  /* TRUTH: what is under (mx,my) right now, and the exact html the artifact would build
     for it. Kept in the artifact's own format so it can be compared to the SHIPPED card. */
  const cardAt = (mx, my) => {
    const wx = (mx - offX) / scale, wy = (my - offY) / scale;
    const pe = pickEntity(wx, wy);
    if (pe) return {ent: pe[2], name: pe[0], sub: pe[1],
      html: '<p class="tt">' + pe[0] + '</p><p class="td">' + pe[1] + '</p>'};
    const y0 = Math.round(wy / ROWY - 0.5), x0 = Math.round(wx / CW - 1);
    let x = -1, y = -1, bd = 1e9;
    for (let yy = y0 - 1; yy <= y0 + 1; yy++) for (let xx = x0; xx <= x0 + 2; xx++) {
      if (!inB(xx, yy)) continue;
      const dx = wx - (xx + 0.5 + (yy & 1) * 0.5) * CW, dy = (wy - (yy + 0.5) * ROWY) * 1.73;
      const d = dx * dx + dy * dy; if (d < bd) { bd = d; x = xx; y = yy; }
    }
    const c = cellAt(x, y);
    return c ? {ent: null, name: 'TILE', sub: describeTile(c, x, y), html: describeTile(c, x, y)} : null;
  };
  /* SHIPPED: what the card actually SAYS. Driven through the real mousemove listener, then
     re-read off the DOM — so this measures the artifact's delivery, not a re-implementation
     of it (205: a probe whose threshold is in the units of your own design is grading its
     own homework). BUILD-AGNOSTIC: HEAD has no hoverRefresh, so on HEAD the guarded call is
     a no-op and the card simply stays as the listener left it — which IS the defect. */
  const tip = document.getElementById('tip');
  /* ⚠ the cursor MUST be integral before it goes anywhere: MouseEvent's clientX/clientY are
     `long` in the init dict, so a fractional pixel is TRUNCATED on the way in. The listener
     then picks at a point up to 1px from where the probe's own truth re-picks — and on a
     3.2 CSS-px pick disc that is enough to flip the answer at the rim. It read as a 5-11%
     residual GHOST rate that looked exactly like a real defect in the fix. */
  const point = (mx, my) => cvs.dispatchEvent(new MouseEvent('mousemove', {clientX: mx, clientY: my}));
  const refresh = () => { if (typeof hoverRefresh === 'function') hoverRefresh(); };
  const shipped = () => tip.style.display === 'none' ? null : tip.innerHTML;
  /* ...and the TRUTH string must go through the SAME serializer before it is compared, or
     the probe convicts the artifact of the DOM's own canonicalisation. Reading .innerHTML
     back does not return the string you assigned — it returns the DOM's re-serialization of
     it (273's law, arriving on the DOM instead of on fillStyle). The tell was the TILE
     control, which CANNOT move and still read 16.7% stale. */
  const canon = document.createElement('div');
  const norm = h => { canon.innerHTML = h; return canon.innerHTML; };

  /* the classes we hold a cursor on, plus the TILE control */
  const groups = {Resident: peds, Vehicle: vehicles};
  const rows = [];

  /* The sim is stepped at the app's own max dt (frame() clamps to 0.05), but the CARD is
     only sampled twice a second — a viewer reading a sentence does not need frame
     resolution, and render() is the whole cost here. */
  const DT = 0.05, SUB = 10;                        /* 10 x 0.05s = one 0.5s sample */
  const step = () => { for (let i = 0; i < SUB; i++) advanceEntities(DT, 1); render(); };

  for (const [cls, arr] of Object.entries(groups)) {
    const subs = arr.filter(e => e._sf !== undefined).slice(0, 10);
    let ghost = 0, stale = 0, ok = 0, n = 0, fix0 = 0, fixN = 0; const leaveT = [];
    for (const e of subs) {
      const mx = Math.round(e._sx * scale + offX), my = Math.round((e._sy - 3) * scale + offY);
      const c0 = cardAt(mx, my);
      if (!c0 || c0.ent !== e) continue;            /* not pickable at its own stamp */
      point(mx, my);                                /* a real mousemove, as a user makes */
      /* the FIXED POINT (245/253): at the instant of the mousemove both builds must build
         the identical card, by construction. It is exact, and it is checked every subject. */
      fixN++; if (shipped() === norm(c0.html)) fix0++;
      let left = -1;
      for (let k = 1; k <= secs * 2; k++) {
        step(); refresh();
        const cn = cardAt(mx, my), sh = shipped();
        if (left < 0 && (!cn || cn.ent !== e)) left = k / 2;
        n++;
        /* graded against what the card SAYS, not against a re-pick */
        if (!cn) { if (sh === null) ok++; else ghost++; continue; }
        if (sh !== norm(cn.html)) { (cn.ent === c0.ent) ? stale++ : ghost++; }
        else ok++;
      }
      leaveT.push(left < 0 ? secs : left);
    }
    leaveT.sort((a, b) => a - b);
    rows.push({cls, subs: leaveT.length, n, ghost, stale, ok, fix0, fixN,
      med: leaveT.length ? leaveT[leaveT.length >> 1] : -1});
  }

  /* TILE — 248's FREE POSITIVE CONTROL: a correct sibling readout on the same code path.
     A tile does not move, so its card is right for as long as you look at it in BOTH
     builds. If this column ever reads flat, the RIG is broken and not the city — and it is
     what makes the resident's 24% a real flatness rather than a dead probe. */
  {
    let ghost = 0, stale = 0, ok = 0, n = 0, tries = 0, fix0 = 0, fixN = 0;
    for (let i = 0; i < 400 && tries < 6; i++) {
      const x = (Math.random() * G) | 0, y = (Math.random() * G) | 0;
      if (!inB(x, y)) continue;
      const c = cellAt(x, y); if (!c || c.t === T.WATER) continue;
      const [cx, cy] = ctr(x, y);
      const mx = Math.round(cx * scale + offX), my = Math.round(cy * scale + offY);
      const c0 = cardAt(mx, my);
      if (!c0 || c0.name !== 'TILE') continue;      /* an entity is standing on it */
      tries++;
      point(mx, my);
      fixN++; if (shipped() === norm(c0.html)) fix0++;
      for (let k = 1; k <= secs * 2; k++) {
        step(); refresh();
        const cn = cardAt(mx, my), sh = shipped();
        n++;
        if (!cn) { if (sh === null) ok++; else ghost++; continue; }
        if (sh !== norm(cn.html)) { (cn.name === c0.name) ? stale++ : ghost++; }
        else ok++;
      }
    }
    rows.push({cls: 'TILE [control]', subs: tries, n, ghost, stale, ok, fix0, fixN, med: secs});
  }
  return rows;
}, [seed, secs]);

const browser = await chromium.launch();
console.log(`probe-hoverstale — hold the cursor still for ${SECS}s on a thing and read its card.\n`);
console.log('   A card is a GHOST when it names something no longer under the cursor, and STALE when');
console.log('   the thing is still there but has since changed what it is doing.\n');
console.log('   Graded against what the card SAYS (tipEl.innerHTML, driven through the real mousemove');
console.log('   listener), never against a re-pick. BUILD-AGNOSTIC: HEAD has no hoverRefresh.\n');
console.log('seed  class            subj   card CORRECT    GHOST    STALE   t=0 fixed pt   median s until it left the disc');
for (const seed of SEEDS) {
  const page = await browser.newPage({viewport: {width: 1400, height: 900}});
  await page.addInitScript(() => {
    let s = 0x51F3A9C >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  });
  await page.goto(ART); await page.waitForTimeout(400);
  for (const r of await run(page, seed, SECS)) {
    const p = v => (100 * v / (r.n || 1)).toFixed(1).padStart(6) + '%';
    const fp = `${r.fix0}/${r.fixN}`.padStart(7);
    console.log(`${String(seed).padEnd(5)} ${r.cls.padEnd(16)} ${String(r.subs).padStart(4)}     ${p(r.ok)}   ${p(r.ghost)}  ${p(r.stale)}       ${fp}        ${r.med === SECS ? '(never left)' : r.med.toFixed(1) + 's'}`);
  }
  console.log('');
  await page.close();
}
await browser.close();
