const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, 'catalogs', 'master-vision-catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

console.log('Applying catalog fixes...\n');

// Fix 1: Lower Sailor_Kids_School priority
const sailor = catalog['Sailor_Kids_School_byScrappinDoodles'];
console.log(`Sailor_Kids_School priority: ${sailor.priority} → 5`);
sailor.priority = 5;

// Fix 2: Remove counting-to-10 from Sailor topics
const oldTopics = [...sailor.curriculumTopics];
sailor.curriculumTopics = sailor.curriculumTopics.filter(t => t !== 'counting-to-10');
console.log(`Sailor topics: removed 'counting-to-10'`);
console.log(`  Before: ${oldTopics.join(', ')}`);
console.log(`  After: ${sailor.curriculumTopics.join(', ')}`);

// Fix 3: Increase Football_Kids priority
const footballKids = catalog['Football_Kids_by_ScrappinDoodles'];
console.log(`\nFootball_Kids priority: ${footballKids.priority} → 9`);
footballKids.priority = 9;

// Save
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));

console.log('\n✅ Catalog fixes applied successfully!');
