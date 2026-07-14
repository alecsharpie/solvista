/* probe-corner — does the corner shop SURVIVE the block it was sited in?
 *
 * tick()'s corner-shop pass (iter 151) opens a ground-floor store on a house that
 * sits in a retail gap. Its own comment makes two promises:
 *
 *   "The pass RE-VALIDATES: a store is absorbed (c.corner cleared) once the growing
 *    city reaches a real shop within 2 of it, so the 'no shop within 2' claim holds
 *    at every tick, not just at placement."
 *   "One store per gap falls out for free."
 *
 * Both promises are made by a pass whose FIRST LINE is `if(c.t!==T.RES)continue;`.
 *
 * `c.corner` is a per-cell FLAG on a borrowed type (274's law). Its DRAW lives inside
 * drawBuilding's `if(c.t===T.RES)` branch and its TOOLTIP gates on `c.t===T.RES` — but
 * the pass's VETO (`countAround(x,y,2,n=>n.corner)>0`) and its RE-VALIDATION do NOT
 * check the type. So the moment a corner house upgrades to a MID, its flag becomes a
 * GHOST: it draws nothing, it names nothing, it is never absorbed — and it goes on
 * vetoing every replacement store within 2 hexes, forever.
 *
 * And the siting rule selects for exactly that (231's law, arriving on a TYPE CHANGE
 * instead of an occlusion): a corner shop needs `countAround(x,y,1,DEV)>=3` — a
 * built-up block — which is the RES->MID upgrade's OWN precondition (`dev>=3`).
 * The rule opens its stores precisely on the houses most likely to be redeveloped.
 *
 * Pure world data: no render, no clock, no pixels, no noise floor, nothing to stub.
 * BUILD-AGNOSTIC — it only reads cells[].t / .corner, which both builds carry, so ONE
 * file grades HEAD and the patch with no source swap and no cross-build floor (230).
 *
 * COLUMNS
 *   LIVE    RES && corner            — what the viewer actually sees. The headline.
 *   GHOST   corner && t!==RES        — draws nothing, names nothing, still vetoes.
 *   BLOCKED houses that pass EVERY corner test and are vetoed ONLY by a ghost
 *           — the stores the city is forbidden to open. This is the COST.
 *   STALE   corner cells with a real shop within 2 (the absorb promise, broken)
 *   MARKET / COM / RES / MID  — the must-not-move columns (250). This lap writes no
 *           terrain and draws no rng(), so every one of them must come back IDENTICAL.
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const ART = join(HERE, '../../../../solvista.html');
const SRC = process.env.SRC || ART;

const SEEDS = [42, 7, 1234, 99, 2024, 555];
const ERAS = [1995, 2010, 2035];

const b = await chromium.launch();
const p = await b.newPage();
await p.addInitScript(() => { let s = 0x51F3A9C >>> 0;
  Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); });
await p.goto(pathToFileURL(SRC).href);
await p.waitForTimeout(400);

const rows = [];
for (const seed of SEEDS) {
  for (const era of ERAS) {
    const r = await p.evaluate(([seed, era]) => {
      playing = false;
      genWorld(seed);
      __warp(era - 1974);

      /* WHICH FLAGS DOES *THIS BUILD* ACTUALLY DRAW? Ask the artifact, do not assume — the
         first cut of this probe hard-coded HEAD's answer (`live = corner && t===RES`) and
         therefore went on calling a patched MID's shop a GHOST, i.e. it filed the FEATURE
         under the DEFECT (268: check WHICH PAIR your instrument compares). The honest test
         is the draw itself: does drawBuilding's MID BRANCH mention c.corner?
         Split on `else if(c.t===T.MID)`, NOT on `c.t===T.MID` — drawBuilding's very first
         line is `const ML=c.t===T.MID?midLook(...):null`, which sits ABOVE the RES branch,
         so splitting on the bare test hands back a tail containing the RES shopfront and
         reports HEAD as patched. It did: HEAD came back 98 shown / 9 ghosts, the exact
         TRANSPOSE of the truth. Match the BRANCH, not the first occurrence of its test. */
      const midTail = drawBuilding.toString().split('else if(c.t===T.MID)')[1] || '';
      const drawsMidShop = /c\.corner/.test(midTail);

      let onRes = 0, onMid = 0, dead = 0, stale = 0, blocked = 0;
      let market = 0, com = 0, res = 0, mid = 0, deadByType = {};

      for (const i of HEXI) {
        const c = cells[i], x = i % G, y = (i / G) | 0;
        if (c.t === T.MARKET) market++;
        if (c.t === T.COM) com++;
        if (c.t === T.RES) res++;
        if (c.t === T.MID) mid++;
        if (!c.corner) continue;
        const nearShop = countAround(x, y, 2, n => n.t === T.COM || n.t === T.MARKET) > 0;
        if (nearShop) stale++;                        /* never absorbed — the broken promise */
        if (c.t === T.RES) onRes++;                   /* drawn by BOTH builds */
        else if (c.t === T.MID) onMid++;              /* drawn ONLY where drawsMidShop */
        else {                                        /* the house is gone: a ghost in BOTH builds */
          dead++;
          const nm = Object.keys(T).find(k => T[k] === c.t) || String(c.t);
          deadByType[nm] = (deadByType[nm] || 0) + 1;
        }
      }
      /* SHOWN = what a viewer can see. GHOST = a flag that draws nothing, names nothing,
         and still vetoes a replacement store within 2 hexes. */
      const shown = onRes + (drawsMidShop ? onMid : 0);
      const ghost = dead + (drawsMidShop ? 0 : onMid);

      /* BLOCKED — a house that satisfies EVERY clause of the corner-shop rule and is
         turned down ONLY by the 2-hex veto, where at least one vetoing flag is a GHOST.
         These are stores the city has a genuine retail gap for and cannot open. */
      for (const i of HEXI) {
        const c = cells[i], x = i % G, y = (i / G) | 0;
        if (c.t !== T.RES || c.corner) continue;
        if (countAround(x, y, 2, n => n.t === T.COM || n.t === T.MARKET) > 0) continue;
        if (!roadNear(x, y)) continue;
        if (countAround(x, y, 1, n => DEV.has(n.t)) < 3) continue;
        if (hashCell(x, y, seedNum ^ 0x5C09) < 0.45) continue;
        const vetoes = countAround(x, y, 2, n => n.corner);
        if (vetoes === 0) continue;                       /* not vetoed at all */
        const ghostVeto = countAround(x, y, 2, n => n.corner && n.t !== T.RES);
        if (ghostVeto > 0) blocked++;                     /* vetoed by something invisible */
      }

      /* POOL — 206's second ledger. If `c.corner` is re-keyed to HOMES (RES|MID), how
         many MID cells would satisfy EVERY other clause of the rule? This bounds the
         flood BEFORE a line of the fix is written: a store on every mid-rise in the
         city would be worse than no store at all. (The 2-hex corner veto is left out:
         it is order-dependent, so this is an UPPER bound on the pool, not a forecast.) */
      let poolMid = 0;
      for (const i of HEXI) {
        const c = cells[i], x = i % G, y = (i / G) | 0;
        if (c.t !== T.MID || c.corner) continue;
        if (countAround(x, y, 2, n => n.t === T.COM || n.t === T.MARKET) > 0) continue;
        if (!roadNear(x, y)) continue;
        if (countAround(x, y, 1, n => DEV.has(n.t)) < 3) continue;
        if (hashCell(x, y, seedNum ^ 0x5C09) < 0.45) continue;
        poolMid++;
      }

      return { shown, ghost, onRes, onMid, dead, stale, blocked, market, com, res, mid, poolMid, drawsMidShop, deadByType };
    }, [seed, era]);
    rows.push({ seed, era, ...r });
  }
}
await b.close();

const pad = (s, n) => String(s).padStart(n);
const P = rows[0].drawsMidShop;
console.log('\nprobe-corner — the corner shop vs the block it stands in');
console.log('SRC =', SRC);
console.log('BUILD =', P ? 'PATCH (drawBuilding\'s MID branch draws c.corner)' : 'HEAD (only the RES branch draws c.corner)');
console.log('\n seed   era | SHOWN  GHOST |  onRES onMID  dead | STALE BLOCKED | MARKET  COM  RES  MID  dead types');
console.log('-'.repeat(104));
for (const r of rows) {
  const gt = Object.entries(r.deadByType).map(([k, v]) => `${k}:${v}`).join(' ') || '-';
  console.log(
    `${pad(r.seed,5)} ${pad(r.era,5)} |${pad(r.shown,6)}${pad(r.ghost,7)} |${pad(r.onRes,7)}${pad(r.onMid,6)}${pad(r.dead,6)} |` +
    `${pad(r.stale,6)}${pad(r.blocked,8)} |${pad(r.market,7)}${pad(r.com,5)}${pad(r.res,5)}${pad(r.mid,5)}  ${gt}`);
}
const at = y => rows.filter(r => r.era === y);
console.log('\n--- by era (mean over 6 seeds) ---');
console.log('  era |  SHOWN   GHOST   STALE  BLOCKED');
for (const era of ERAS) {
  const g = at(era), m = k => (g.reduce((s, r) => s + r[k], 0) / g.length).toFixed(1);
  console.log(`${pad(era,5)} |${pad(m('shown'),7)}${pad(m('ghost'),8)}${pad(m('stale'),8)}${pad(m('blocked'),9)}`);
}
const m35 = at(2035), S = k => m35.reduce((s, r) => s + r[k], 0);
console.log(`\nAt 2035, over 6 seeds: ${S('shown')} corner shops the city SHOWS you, ${S('ghost')} ghosts.`);
if (S('shown') + S('ghost') > 0)
  console.log(`  => ${(100 * S('ghost') / (S('shown') + S('ghost'))).toFixed(0)}% of every corner shop the city ever opened is INVISIBLE.`);
console.log(`  => never absorbed despite a real shop within 2 (the pass's own promise): ${S('stale')}`);
console.log(`  => replacement stores blocked by a ghost veto:                           ${S('blocked')}`);
console.log(`  => flags stranded on a DEMOLISHED lot (park/plaza/grounds):              ${S('dead')}`);
console.log('\nMUST-NOT-MOVE (no terrain written, no rng() drawn): MARKET/COM/RES/MID must be identical to HEAD.');
