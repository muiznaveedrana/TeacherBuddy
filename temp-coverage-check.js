const slugsByYear = require('./temp-worksheet-slugs.json');
const testedSlugs = new Set([
  'fractions-recognising-fractions-v4',
  'fractions-recognising-fractions-v5',
  'fractions-recognising-fractions-v6',
  'measurement-coins-recognition',
  'measurement-coins-recognition-v2',
  'measurement-coins-recognition-v3',
  'measurement-money',
  'measurement-money-v2',
  'measurement-money-v3',
  'measurement-time-sports',
  'measurement-time-v2',
  'measurement-time-weekend',
  'number-counting-counting-to-10-v2'
]);

console.log('='.repeat(70));
console.log('TEST COVERAGE ANALYSIS');
console.log('='.repeat(70));

let totalWS = 0, totalTested = 0;

Object.keys(slugsByYear).sort().forEach(year => {
  const slugs = slugsByYear[year];
  const tested = slugs.filter(s => testedSlugs.has(s));
  const missing = slugs.length - tested.length;
  
  totalWS += slugs.length;
  totalTested += tested.length;
  
  const pct = slugs.length > 0 ? ((tested.length / slugs.length) * 100).toFixed(1) : 0;
  console.log(year.padEnd(12) + ' | WS: ' + String(slugs.length).padStart(3) + ' | Tested: ' + String(tested.length).padStart(3) + ' | Gap: ' + String(missing).padStart(3) + ' | ' + pct + '%');
});

console.log('='.repeat(70));
const totalPct = ((totalTested/totalWS)*100).toFixed(1);
console.log('TOTAL'.padEnd(12) + ' | WS: ' + String(totalWS).padStart(3) + ' | Tested: ' + String(totalTested).padStart(3) + ' | Gap: ' + String(totalWS - totalTested).padStart(3) + ' | ' + totalPct + '%');
console.log('='.repeat(70));
