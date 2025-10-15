#!/usr/bin/env node

/**
 * AUTOMATED WORKSHEET_OBJECTS CATALOG GENERATOR
 *
 * Scans the WORKSHEET_OBJECTS directory and generates a comprehensive catalog
 * with metadata, verification status, and usage tracking.
 *
 * Usage:
 *   node scripts/services/generate-worksheet-objects-catalog.js
 *
 * Output:
 *   scripts/catalogs/worksheet-objects-catalog.json
 */

const fs = require('fs').promises;
const path = require('path');

const WORKSHEET_OBJECTS_ROOT = path.join(process.cwd(), 'public', 'images', 'WORKSHEET_OBJECTS');
const CATALOG_OUTPUT = path.join(process.cwd(), 'scripts', 'catalogs', 'worksheet-objects-catalog.json');

// Configuration
const PLURALIZATION_RULES = {
  // Irregular plurals
  'knife': 'knives',
  'leaf': 'leaves',
  'foot': 'feet',
  'tooth': 'teeth',
  'goose': 'geese',
  'mouse': 'mice',
  'child': 'children',
  'person': 'people',
  'sheep': 'sheep',
  'scissors': 'scissors',
  // Objects in our catalog
  'strawberry': 'strawberries',
  'butterfly': 'butterflies',
  'potato': 'potatoes',
  'tomato': 'tomatoes'
};

const AGE_GROUP_MAPPINGS = {
  'counting': ['Reception', 'Year 1', 'Year 2'],
  'addition': ['Year 1', 'Year 2', 'Year 3'],
  'subtraction': ['Year 1', 'Year 2', 'Year 3'],
  'multiplication': ['Year 2', 'Year 3', 'Year 4'],
  'division': ['Year 3', 'Year 4', 'Year 5'],
  'fractions': ['Year 3', 'Year 4', 'Year 5', 'Year 6'],
  'shapes_geometry': ['Reception', 'Year 1', 'Year 2', 'Year 3'],
  'measurement': ['Year 1', 'Year 2', 'Year 3', 'Year 4']
};

/**
 * Pluralize object name
 */
function pluralize(word) {
  // Check irregular plurals first
  if (PLURALIZATION_RULES[word]) {
    return PLURALIZATION_RULES[word];
  }

  // Handle multi-word objects (tennis ball → tennis balls)
  const words = word.split('_');
  if (words.length > 1) {
    const lastWord = words[words.length - 1];
    words[words.length - 1] = pluralize(lastWord);
    return words.join('_').replace(/_/g, ' ');
  }

  // Standard pluralization rules
  if (word.endsWith('y') && !['a', 'e', 'i', 'o', 'u'].includes(word[word.length - 2])) {
    return word.slice(0, -1) + 'ies';
  }
  if (word.endsWith('s') || word.endsWith('x') || word.endsWith('ch') || word.endsWith('sh') || word.endsWith('z')) {
    return word + 'es';
  }
  if (word.endsWith('f')) {
    return word.slice(0, -1) + 'ves';
  }
  if (word.endsWith('fe')) {
    return word.slice(0, -2) + 'ves';
  }
  return word + 's';
}

/**
 * Infer age groups from path
 */
function inferAgeGroups(pathSegments) {
  const topic = pathSegments[0];
  return AGE_GROUP_MAPPINGS[topic] || ['Reception', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'];
}

/**
 * Verify image file exists and is readable
 */
async function verifyImage(imagePath) {
  try {
    await fs.access(imagePath, fs.constants.R_OK);
    const stats = await fs.stat(imagePath);
    return stats.size > 100; // File must have content (> 100 bytes)
  } catch {
    return false;
  }
}

/**
 * Recursively scan directory and build catalog structure
 */
async function scanDirectory(dirPath, pathSegments = []) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const result = {};
  let imageCount = 0;

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    // Skip special files
    if (entry.name.startsWith('.') || entry.name.startsWith('_') || entry.name === 'README.md') {
      continue;
    }

    if (entry.isDirectory()) {
      // Recursively scan subdirectories
      const subResult = await scanDirectory(fullPath, [...pathSegments, entry.name]);
      result[entry.name] = subResult.data;
      imageCount += subResult.count;
    } else if (entry.isFile() && entry.name.endsWith('.png')) {
      // Process PNG image file
      const objectName = entry.name.replace('.png', '').replace(/_/g, ' ');
      const verified = await verifyImage(fullPath);
      const relativePath = [...pathSegments, entry.name].join('/');

      result[objectName] = {
        filename: entry.name,
        pluralName: pluralize(objectName),
        path: `/images/WORKSHEET_OBJECTS/${relativePath}`,
        verified,
        verifiedDate: verified ? new Date().toISOString().split('T')[0] : null,
        ageGroups: inferAgeGroups(pathSegments),
        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Default counting range
        usageCount: 0,
        lastUsed: null,
        popularity: 'medium',
        notes: verified ? null : 'VERIFICATION FAILED - File may be corrupt or inaccessible'
      };

      imageCount++;
    }
  }

  return { data: result, count: imageCount };
}

/**
 * Count total objects in catalog
 */
function countObjects(obj) {
  let count = 0;
  for (const key in obj) {
    if (obj[key].filename) {
      count++;
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      count += countObjects(obj[key]);
    }
  }
  return count;
}

/**
 * Extract flat list of all objects for summary
 */
function extractObjectList(categories, prefix = []) {
  const objects = [];

  for (const [key, value] of Object.entries(categories)) {
    if (value.filename) {
      objects.push({
        name: key,
        category: prefix.join(' > '),
        path: value.path,
        verified: value.verified
      });
    } else if (typeof value === 'object' && value !== null) {
      objects.push(...extractObjectList(value, [...prefix, key]));
    }
  }

  return objects;
}

/**
 * Generate catalog summary statistics
 */
function generateSummary(catalog) {
  const objects = extractObjectList(catalog.categories);

  const summary = {
    totalObjects: objects.length,
    verifiedObjects: objects.filter(o => o.verified).length,
    unverifiedObjects: objects.filter(o => !o.verified).length,
    categoriesBreakdown: {}
  };

  // Group by top-level category
  for (const obj of objects) {
    const topCategory = obj.category.split(' > ')[0];
    if (!summary.categoriesBreakdown[topCategory]) {
      summary.categoriesBreakdown[topCategory] = 0;
    }
    summary.categoriesBreakdown[topCategory]++;
  }

  return summary;
}

/**
 * Main catalog generation function
 */
async function generateCatalog() {
  console.log('='.repeat(80));
  console.log('🔍 WORKSHEET_OBJECTS CATALOG GENERATOR');
  console.log('='.repeat(80));
  console.log('');
  console.log(`📁 Scanning: ${WORKSHEET_OBJECTS_ROOT}`);
  console.log('');

  try {
    // Check if directory exists
    await fs.access(WORKSHEET_OBJECTS_ROOT);
  } catch (error) {
    console.error(`❌ ERROR: WORKSHEET_OBJECTS directory not found`);
    console.error(`   Expected: ${WORKSHEET_OBJECTS_ROOT}`);
    console.error('');
    console.error('   Please ensure the directory exists and contains image files.');
    process.exit(1);
  }

  // Scan directory structure
  console.log('📊 Scanning directories and files...\n');
  const { data: categories, count: totalImages } = await scanDirectory(WORKSHEET_OBJECTS_ROOT);

  // Build catalog
  const catalog = {
    version: '2.0.0',
    lastUpdated: new Date().toISOString().split('T')[0],
    basePath: '/images/WORKSHEET_OBJECTS',
    totalObjects: countObjects(categories),
    categories,
    metadata: {
      generatedBy: 'generate-worksheet-objects-catalog.js',
      generatedAt: new Date().toISOString(),
      topicCategories: Object.keys(categories),
      ageGroupMappings: AGE_GROUP_MAPPINGS
    }
  };

  // Generate summary
  const summary = generateSummary(catalog);

  // Save catalog
  const catalogDir = path.dirname(CATALOG_OUTPUT);
  await fs.mkdir(catalogDir, { recursive: true });
  await fs.writeFile(CATALOG_OUTPUT, JSON.stringify(catalog, null, 2));

  // Display results
  console.log('='.repeat(80));
  console.log('✅ CATALOG GENERATED SUCCESSFULLY');
  console.log('='.repeat(80));
  console.log('');
  console.log(`📄 Output: ${CATALOG_OUTPUT}`);
  console.log('');
  console.log('📊 SUMMARY:');
  console.log(`   Total Objects: ${summary.totalObjects}`);
  console.log(`   Verified: ${summary.verifiedObjects} (${(summary.verifiedObjects / summary.totalObjects * 100).toFixed(1)}%)`);
  console.log(`   Unverified: ${summary.unverifiedObjects}`);
  console.log('');
  console.log('📁 CATEGORIES:');

  const sortedCategories = Object.entries(summary.categoriesBreakdown)
    .sort(([, a], [, b]) => b - a);

  for (const [category, count] of sortedCategories) {
    const bar = '█'.repeat(Math.ceil(count / 2));
    console.log(`   ${category.padEnd(20)} ${bar} ${count}`);
  }

  console.log('');

  // Warnings
  if (summary.unverifiedObjects > 0) {
    console.log('⚠️  WARNING:');
    console.log(`   ${summary.unverifiedObjects} object(s) failed verification`);
    console.log(`   Check catalog for objects with "verified": false`);
    console.log('');
  }

  // Next steps
  console.log('🎯 NEXT STEPS:');
  console.log('   1. Review catalog: cat ' + CATALOG_OUTPUT);
  console.log('   2. Update prompts to reference verified objects');
  console.log('   3. Test with: node scripts/autonomous-worksheet-quality-agent.js [config-id]');
  console.log('');

  // Success
  process.exit(0);
}

// Run generator
generateCatalog().catch(error => {
  console.error('\n❌ FATAL ERROR:', error.message);
  console.error(error.stack);
  process.exit(1);
});
