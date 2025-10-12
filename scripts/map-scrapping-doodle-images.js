const fs = require('fs');
const path = require('path');

const scrappingDoodlePath = 'M:/ClaudeCodeProjects/worksheetgenerator-ai/public/images/SCRAPPING DOODLE';

// Object names we want to find (from the prompt vocabulary)
const targetObjects = {
  fruits: ['apple', 'banana', 'orange', 'strawberry', 'grape', 'pear', 'cherry', 'lemon', 'watermelon', 'peach', 'pineapple'],
  garden: ['flower', 'butterfly', 'bee', 'ladybug', 'snail', 'caterpillar', 'bird', 'tree', 'leaf', 'mushroom', 'worm', 'ant'],
  school: ['book', 'pencil', 'eraser', 'crayon', 'marker', 'scissors', 'ruler', 'glue', 'notebook', 'backpack'],
  farm: ['chicken', 'cow', 'sheep', 'pig', 'horse', 'duck', 'goat', 'rabbit', 'goose', 'turkey'],
  toys: ['teddy bear', 'ball', 'block', 'doll', 'toy car', 'car', 'kite', 'yo-yo', 'drum'],
  vegetables: ['carrot', 'tomato', 'corn', 'peas', 'broccoli', 'cucumber', 'pepper', 'potato'],
  sports: ['football', 'basketball', 'tennis ball', 'bat', 'hoop', 'medal'],
  food: ['cookie', 'sandwich', 'cupcake', 'donut', 'bread', 'cheese', 'muffin', 'cracker'],
  shapes: ['star', 'heart', 'circle', 'square', 'triangle', 'diamond', 'moon', 'sun'],
  vehicles: ['car', 'bus', 'bike', 'train', 'boat', 'plane']
};

console.log('🔍 MAPPING SCRAPPING DOODLE IMAGE AVAILABILITY\n');
console.log('Scanning image directories for target objects...\n');
console.log('='.repeat(80));

const foundImages = {};
const notFound = {};

// Recursively scan all PNG files
function scanDirectory(dir, collectionName = '') {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      scanDirectory(filePath, file);
    } else if (file.endsWith('.png') && !file.startsWith('BW_')) {
      const fileName = file.toLowerCase().replace('.png', '');

      // Check against all target objects
      Object.keys(targetObjects).forEach(category => {
        targetObjects[category].forEach(object => {
          const objectKey = object.toLowerCase().replace(/\s+/g, '_');

          // Match if filename contains the object name
          if (fileName.includes(object.toLowerCase().replace(/\s+/g, '_')) ||
              fileName.includes(object.toLowerCase().replace(/\s+/g, '')) ||
              fileName === object.toLowerCase() ||
              fileName === object.toLowerCase() + 's') { // plural

            if (!foundImages[object]) {
              foundImages[object] = [];
            }

            const relativePath = filePath
              .replace('M:/ClaudeCodeProjects/worksheetgenerator-ai/public', '')
              .replace(/\\/g, '/');

            foundImages[object].push({
              category,
              collection: collectionName,
              fileName: file,
              path: relativePath
            });
          }
        });
      });
    }
  });
}

// Scan the directory
scanDirectory(scrappingDoodlePath);

// Identify what's missing
Object.keys(targetObjects).forEach(category => {
  targetObjects[category].forEach(object => {
    if (!foundImages[object]) {
      if (!notFound[category]) {
        notFound[category] = [];
      }
      notFound[category].push(object);
    }
  });
});

// Report findings
console.log('\n✅ FOUND IMAGES (' + Object.keys(foundImages).length + ' objects):');
console.log('='.repeat(80));

Object.keys(targetObjects).forEach(category => {
  const categoryObjects = Object.keys(foundImages).filter(obj =>
    foundImages[obj].some(img => img.category === category)
  );

  if (categoryObjects.length > 0) {
    console.log(`\n📁 ${category.toUpperCase()} (${categoryObjects.length} objects):`);
    categoryObjects.forEach(obj => {
      const images = foundImages[obj];
      console.log(`   ✓ ${obj} (${images.length} image${images.length > 1 ? 's' : ''})`);
      images.slice(0, 2).forEach(img => {
        console.log(`      → ${img.path}`);
      });
      if (images.length > 2) {
        console.log(`      ... and ${images.length - 2} more`);
      }
    });
  }
});

console.log('\n\n❌ NOT FOUND (' + Object.keys(notFound).reduce((sum, cat) => sum + notFound[cat].length, 0) + ' objects):');
console.log('='.repeat(80));

Object.keys(notFound).forEach(category => {
  if (notFound[category].length > 0) {
    console.log(`\n📁 ${category.toUpperCase()}:`);
    notFound[category].forEach(obj => {
      console.log(`   ✗ ${obj}`);
    });
  }
});

// Summary
const totalObjects = Object.keys(targetObjects).reduce((sum, cat) => sum + targetObjects[cat].length, 0);
const foundCount = Object.keys(foundImages).length;
const notFoundCount = totalObjects - foundCount;

console.log('\n\n📊 SUMMARY:');
console.log('='.repeat(80));
console.log(`   Total target objects: ${totalObjects}`);
console.log(`   Found with images: ${foundCount} (${Math.round((foundCount / totalObjects) * 100)}%)`);
console.log(`   Not found: ${notFoundCount} (${Math.round((notFoundCount / totalObjects) * 100)}%)`);

// Save results to JSON
const outputPath = path.join(__dirname, 'image-availability-map.json');
fs.writeFileSync(outputPath, JSON.stringify({
  found: foundImages,
  notFound: notFound,
  summary: {
    totalObjects,
    foundCount,
    notFoundCount,
    successRate: Math.round((foundCount / totalObjects) * 100)
  }
}, null, 2));

console.log(`\n💾 Results saved to: ${outputPath}`);
console.log('\n✅ Scan complete!\n');
