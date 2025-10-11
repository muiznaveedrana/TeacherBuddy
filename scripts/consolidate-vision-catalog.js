#!/usr/bin/env node

/**
 * Vision Catalog Consolidation Script
 *
 * Merges all batch catalog files into a single master catalog
 */

const fs = require('fs');
const path = require('path');

const BATCH_RESULTS_DIR = './scripts/catalogs/batch-results';
const OUTPUT_FILE = './scripts/catalogs/master-vision-catalog.json';

console.log('🔄 Consolidating Vision Catalogs...\n');

// Read all batch catalog files
const batchFiles = fs.readdirSync(BATCH_RESULTS_DIR)
  .filter(f => f.startsWith('batch-') && f.endsWith('-catalog.json'))
  .sort();

console.log(`📦 Found ${batchFiles.length} batch files to consolidate\n`);

// Merge all catalogs
const masterCatalog = {};
let totalCollections = 0;
let totalImages = 0;
let emptyCollections = 0;

batchFiles.forEach(file => {
  const filePath = path.join(BATCH_RESULTS_DIR, file);
  const batchData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const collectionCount = Object.keys(batchData).length;
  totalCollections += collectionCount;

  // Track statistics
  Object.values(batchData).forEach(collection => {
    totalImages += collection.totalImages || 0;
    if (collection.totalImages === 0) {
      emptyCollections++;
    }
  });

  Object.assign(masterCatalog, batchData);
  console.log(`✅ ${file}: ${collectionCount} collections`);
});

// Save master catalog
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(masterCatalog, null, 2));

console.log(`\n${'='.repeat(60)}`);
console.log('✨ Consolidation Complete!\n');
console.log(`📊 Statistics:`);
console.log(`   • Total collections: ${totalCollections}`);
console.log(`   • Collections with images: ${totalCollections - emptyCollections}`);
console.log(`   • Empty collections: ${emptyCollections}`);
console.log(`   • Total images cataloged: ${totalImages}`);
console.log(`   • Batch files processed: ${batchFiles.length}`);
console.log(`\n📁 Master catalog saved to: ${OUTPUT_FILE}`);
console.log(`${'='.repeat(60)}\n`);
