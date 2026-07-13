/* count differing pixels between two PNGs, with a tolerance */
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { readFileSync } from 'node:fs';
const PW = join(homedir(), '.claude/skills/screenshot-verify/node_modules/playwright/index.js');
const { chromium } = (await import(pathToFileURL(PW).href)).default;

const [a, b] = process.argv.slice(2).map(p => resolve(p));
const d64 = (p) => 'data:image/png;base64,' + readFileSync(p).toString('base64');
const br = await chromium.launch();
const page = await br.newPage();
const n = await page.evaluate(async ([ua, ub]) => {
  const load = (u) => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = u; });
  const [ia, ib] = await Promise.all([load(ua), load(ub)]);
  const c = document.createElement('canvas'); c.width = ia.width; c.height = ia.height;
  const x = c.getContext('2d', { willReadFrequently: true });
  x.drawImage(ia, 0, 0); const A = x.getImageData(0, 0, c.width, c.height).data;
  x.clearRect(0, 0, c.width, c.height);
  x.drawImage(ib, 0, 0); const B = x.getImageData(0, 0, c.width, c.height).data;
  let d = 0;
  for (let i = 0; i < A.length; i += 4) {
    if (Math.abs(A[i] - B[i]) > 2 || Math.abs(A[i + 1] - B[i + 1]) > 2 || Math.abs(A[i + 2] - B[i + 2]) > 2) d++;
  }
  return d;
}, [d64(a), d64(b)]);
await br.close();
console.log(`${n} px differ   ${a.split('/').pop()} vs ${b.split('/').pop()}`);
