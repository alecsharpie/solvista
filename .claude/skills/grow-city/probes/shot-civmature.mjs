/* shot-civmature — aimed A/B of a mature civic square, iter 326. The lap draws ZERO rng() and
 * no terrain, so HEAD and PATCH build the IDENTICAL city — aiming both at the same plaza hex is
 * a genuinely blind A/B (269: drive `zoom`, never scale; 272: zoom about centre then pan).
 * HEAD is derived from git into /tmp, so this needs no scratch file.  `node shot-civmature.mjs 42` */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;
const HERE = dirname(fileURLToPath(import.meta.url));
const PATCH = join(HERE, '../../../../solvista.html');
const HEAD = '/tmp/civmature-head.html';
writeFileSync(HEAD, execSync('git show HEAD:solvista.html', { cwd: dirname(PATCH), maxBuffer: 1 << 24 }));
const OUT = join(HERE, '../shots');
const SEED = Number(process.argv[2] || 42);
const Z = 5.5;

const b = await chromium.launch();
async function shoot(file, tag, aim) {
  const p = await b.newPage();
  await p.setViewportSize({ width: 1400, height: 900 });
  await p.goto(pathToFileURL(file).href);
  await p.waitForTimeout(300);
  const info = await p.evaluate(({ seed, Z, aim }) => {
    playing = false; genWorld(seed);
    for (let n = 0; n < 800 && year < 2035; n++) { year += 0.075; tick(); }
    __setTime(0.35);
    let best = aim, bc = -1;                       // most-mature plaza, or the caller's forced hex
    if (!best) for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
      const c = cells[idx(x, y)]; if (c && c.t === T.PLAZA && (c.civ || 0) > bc) { bc = c.civ; best = [x, y]; }
    }
    const c = cells[idx(best[0], best[1])];
    const [wx, wy] = ctr(best[0], best[1]);
    resize(); zoom = Z; scale = fitScale * zoom;
    offX = innerWidth / 2 - wx * scale; offY = innerHeight / 2 - wy * scale; clampPan();
    render();
    return { aim: best, civ: c.civ || 0, age: c.age };
  }, { seed: SEED, Z, aim });
  await p.waitForTimeout(120);
  await p.screenshot({ path: join(OUT, tag + '.png') });
  await p.close();
  return info;
}
const ip = await shoot(PATCH, 'civm_' + SEED + '_kappa', null);
const ih = await shoot(HEAD, 'civm_' + SEED + '_sigma', ip.aim);
console.log('seed ' + SEED + '  aim ' + JSON.stringify(ip.aim) + '  civ=' + ip.civ.toFixed(2) + '  age=' + ip.age +
  '   kappa=PATCH sigma=HEAD (cross the map yourself per-seed, 268)');
await b.close();
