/* probe-seedlessdither — cue (g): a seedless hashCell PRESENCE decision paints
   the IDENTICAL per-cell dither in every city, breaching the #1 invariant
   ("new city every load"). This reimplements the artifact's exact hashCell
   (solvista.html:185) and shows, over a grid of cells and the 3 census seeds:
     OLD (seedless salt)  -> presence mask IDENTICAL across seeds  (the breach; 0 flips)
     NEW (seedNum^salt)   -> presence mask VARIES across seeds      (the fix)
   The OLD column is the control that MUST read 0 flips; a NEW column that also
   reads 0 would mean the salt never reached seedNum (fix is dead). No browser,
   no clock, no noise floor: it is pure arithmetic, so it can only fail on a
   real mistake in the salting. */
const hashCell = (x, y, s) => {
  let h = (x * 374761393 + y * 668265263 + s * 974711) | 0;
  h = (h ^ (h >>> 13)) * 1274126177 | 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};
const SEEDS = [7, 42, 1234];

/* the three genuine PRESENCE breaches, with their thresholds and the base
   salt each seedless call uses today. r/cc for the fruit are folded into the
   base so every (x,y,base) is one presence decision. */
const CASES = [
  { name: 'night waterfront smear  (5835)', base: 77,  newSalt: s => (s ^ 0x577) >>> 0, T: 0.30 },
  { name: 'FARM hay bales          (6525)', base: 70,  newSalt: s => (s ^ 0x7A1) >>> 0, T: 0.62 },
  { name: 'FARM harvest fruit      (6562)', base: 53,  newSalt: s => (s ^ 0x9C3) >>> 0, T: 0.60 },
];

/* a representative patch of cells (any integer grid works — the breach is that
   presence is a pure function of (x,y), independent of seed) */
const cells = [];
for (let x = 20; x < 60; x++) for (let y = 8; y < 56; y++) cells.push([x, y]);

const maskFlips = (saltOf, T) => {
  /* for each cell, is the presence-boolean the same across all 3 seeds? */
  let identical = 0, varying = 0;
  for (const [x, y] of cells) {
    const bits = SEEDS.map(seed => hashCell(x, y, saltOf(seed)) < T);
    (bits.every(b => b === bits[0]) ? identical++ : varying++);
  }
  return { identical, varying, pctVary: (100 * varying / cells.length).toFixed(1) };
};

console.log(`cells sampled: ${cells.length}   seeds: ${SEEDS.join(',')}\n`);
console.log('case                              OLD(seedless)      NEW(seedNum^salt)');
for (const c of CASES) {
  const oldM = maskFlips(() => c.base, c.T);          /* salt ignores seed */
  const newM = maskFlips(c.newSalt, c.T);             /* salt = seedNum^base */
  const oldStr = `${oldM.pctVary}% vary (${oldM.varying}/${cells.length})`;
  const newStr = `${newM.pctVary}% vary (${newM.varying}/${cells.length})`;
  const ok = oldM.varying === 0 && newM.varying > 0 ? 'OK' : 'FAIL';
  console.log(`${c.name}   ${oldStr.padEnd(18)} ${newStr.padEnd(18)} ${ok}`);
}
console.log('\nOLD must be 0% (control: seedless = same city every load = the breach)');
console.log('NEW must be >0% (fix: presence now varies per seed)');
