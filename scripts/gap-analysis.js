#!/usr/bin/env node
/**
 * Gap Analysis: Find subtopics missing mixed layout worksheets
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Master list from populate-worksheet-from-scratch.md
const SUBTOPICS = {
  'Reception': {
    'Number and Counting': ['counting-to-10', 'number-recognition', 'more-or-less', 'early-addition', 'early-subtraction', 'number-bonds', 'subitising'],
    'Shape and Space': ['basic-shapes', 'patterns', 'size-comparison', 'position-direction'],
    'Measurement': ['length-comparison', 'weight-comparison', 'capacity', 'time-concepts']
  },
  'Year 1': {
    'Number and Place Value': ['numbers-to-20', 'counting-forwards-backwards', 'number-bonds-10'],
    'Addition and Subtraction': ['adding-to-20', 'subtracting-within-20', 'word-problems-simple'],
    'Measurement': ['length-height', 'weight-capacity', 'time-days-months', 'coins-recognition'],
    'Geometry: Shapes': ['2d-shapes-basic', '3d-shapes-basic'],
    'Fractions': ['halves-and-quarters']
  },
  'Year 2': {
    'Number and Place Value': ['numbers-to-100', 'comparing-numbers', 'rounding-nearest-10'],
    'Addition and Subtraction': ['two-digit-numbers', 'mental-strategies', 'word-problems'],
    'Multiplication and Division': ['times-tables-2-5-10', 'equal-groups', 'sharing-grouping'],
    'Fractions': ['recognising-fractions', 'finding-fractions', 'equivalent-fractions-simple'],
    'Measurement': ['length-and-height', 'mass-and-weight', 'capacity-and-volume', 'money', 'time'],
    'Statistics': ['pictograms', 'tally-charts', 'block-diagrams-tables'],
    'Geometry: Properties of Shapes': ['2d-shapes-properties', '3d-shapes-properties', 'sorting-shapes'],
    'Geometry: Position and Direction': ['position-direction', 'movement', 'turns']
  }
};

// Extract all worksheet slugs from test files
function extractTestSlugs() {
  const testDir = path.join(__dirname, '..', 'tests', 'e2e', 'interactive');
  const slugs = [];

  if (!fs.existsSync(testDir)) {
    console.error('Test directory not found:', testDir);
    return [];
  }

  const files = fs.readdirSync(testDir).filter(f => f.endsWith('.spec.ts'));

  files.forEach(file => {
    const content = fs.readFileSync(path.join(testDir, file), 'utf-8');

    // Extract WORKSHEET_SLUG constants
    const slugMatches = content.match(/WORKSHEET_SLUG\s*=\s*['"]([^'"]+)['"]/g);
    if (slugMatches) {
      slugMatches.forEach(match => {
        const slug = match.match(/['"]([^'"]+)['"]/)[1];
        slugs.push(slug);
      });
    }

    // Extract slugs from page.goto calls
    const gotoMatches = content.match(/page\.goto\([`'"]\/library\/([^\/`'"]+)\/interactive/g);
    if (gotoMatches) {
      gotoMatches.forEach(match => {
        const slug = match.match(/\/library\/([^\/`'"]+)/)[1];
        if (!slug.includes('${')) { // Skip template literals with variables
          slugs.push(slug);
        }
      });
    }
  });

  return [...new Set(slugs)]; // Remove duplicates
}

// Helper to detect mixed layout from slug
function isMixed(slug) {
  return slug.includes('mixed') ||
         slug.includes('-vfoundation') ||
         slug.includes('-vvaried') ||
         slug.includes('-vchallenge') ||
         slug.includes('foundation-v') ||
         slug.includes('varied-v') ||
         slug.includes('challenge-v');
}

// Map slugs to subtopics
function getSubtopic(slug) {
  const mappings = {
    'counting-to-10': ['number-counting-counting-to-10', 'counting-to-10-'],
    'number-recognition': ['number-counting-number-recognition'],
    'more-or-less': ['number-counting-more-or-less'],
    'early-addition': ['number-counting-early-addition'],
    'early-subtraction': ['number-counting-early-subtraction'],
    'number-bonds': ['number-counting-number-bonds'],
    'subitising': ['number-counting-subitising'],
    'basic-shapes': ['shape-space-basic-shapes', 'basic-shapes-foundation', 'basic-shapes-varied', 'basic-shapes-challenge'],
    'patterns': ['patterns-'],
    'size-comparison': ['size-comparison-', 'shape-space-size-comparison'],
    'position-direction': ['position-direction'],
    'length-comparison': ['length-comparison'],
    'weight-comparison': ['weight-comparison-'],
    'capacity': ['capacity-', 'measurement-capacity'],
    'time-concepts': ['time-concepts'],
    'numbers-to-20': ['number-place-value-numbers-to-20'],
    'counting-forwards-backwards': ['number-place-value-counting-forwards-backwards'],
    'number-bonds-10': ['number-place-value-number-bonds-10', 'number-bonds-to-10-'],
    'adding-to-20': ['addition-subtraction-adding-to-20', 'adding-to-20-'],
    'subtracting-within-20': ['addition-subtraction-subtracting-within-20', 'subtracting-within-20-'],
    'word-problems-simple': ['addition-subtraction-word-problems-simple', 'word-problems-foundation', 'word-problems-varied', 'word-problems-challenge'],
    'length-height': ['length-height-'],
    'weight-capacity': ['weight-capacity'],
    'time-days-months': ['measurement-time-days-months', 'time-days-and-months-'],
    'coins-recognition': ['measurement-coins-recognition'],
    '2d-shapes-basic': ['2d-shapes-basic-', '2d-shapes-name', '2d-shapes-shape', 'geometry-2d-shapes-basic'],
    '3d-shapes-basic': ['geometry-3d-shapes-basic', '3d-shapes-basic-'],
    'halves-and-quarters': ['halves-quarters-'],
    'numbers-to-100': ['number-place-value-numbers-to-100'],
    'comparing-numbers': ['number-place-value-comparing-numbers'],
    'rounding-nearest-10': ['number-place-value-rounding-nearest-10'],
    'two-digit-numbers': ['two-digit-addition'],
    'mental-strategies': ['mental-maths-', 'mental-strategies-'],
    'word-problems': ['addition-subtraction-word-problems-v'],
    'times-tables-2-5-10': ['multiplication-division-times-tables', 'times-tables-2-5-10-'],
    'equal-groups': ['equal-groups-'],
    'sharing-grouping': ['multiplication-division-sharing-grouping'],
    'recognising-fractions': ['fractions-recognising-fractions', 'recognising-fractions-'],
    'finding-fractions': ['finding-fractions'],
    'equivalent-fractions-simple': ['equivalent-fractions'],
    'length-and-height': ['length-and-height'],
    'mass-and-weight': ['mass-and-weight'],
    'capacity-and-volume': ['capacity-and-volume'],
    'money': ['measurement-money'],
    'time': ['measurement-time-v', 'measurement-time-sports', 'measurement-time-test', 'measurement-time-weekend'],
    'pictograms': ['pictograms'],
    'tally-charts': ['tally-charts'],
    'block-diagrams-tables': ['block-diagrams'],
    '2d-shapes-properties': ['2d-shapes-properties'],
    '3d-shapes-properties': ['3d-shapes-properties'],
    'sorting-shapes': ['sorting-shapes'],
    'movement': ['movement'],
    'turns': ['turns'],
  };

  for (const [subtopic, patterns] of Object.entries(mappings)) {
    for (const pattern of patterns) {
      if (slug.includes(pattern) || slug.startsWith(pattern)) {
        return subtopic;
      }
    }
  }
  return null;
}

// Main analysis
function analyze() {
  const testSlugs = extractTestSlugs();
  console.log(`Found ${testSlugs.length} worksheet slugs in test files\n`);

  // Count worksheets per subtopic
  const coverage = {};

  testSlugs.forEach(slug => {
    const subtopic = getSubtopic(slug);
    if (subtopic) {
      if (!coverage[subtopic]) coverage[subtopic] = { standard: [], mixed: [] };
      if (isMixed(slug)) {
        coverage[subtopic].mixed.push(slug);
      } else {
        coverage[subtopic].standard.push(slug);
      }
    }
  });

  console.log('='.repeat(100));
  console.log('WORKSHEET COVERAGE GAP ANALYSIS');
  console.log('='.repeat(100));

  const needsMixed = { 'Reception': [], 'Year 1': [], 'Year 2': [] };
  const noWorksheets = { 'Reception': [], 'Year 1': [], 'Year 2': [] };

  for (const [yearGroup, topics] of Object.entries(SUBTOPICS)) {
    console.log('\n' + '='.repeat(100));
    console.log(`${yearGroup.toUpperCase()}`);
    console.log('='.repeat(100));

    for (const [topic, subtopics] of Object.entries(topics)) {
      console.log(`\n${topic}:`);
      console.log('-'.repeat(100));
      console.log('Subtopic'.padEnd(32) + '| Standard | Mixed  | Status');
      console.log('-'.repeat(100));

      subtopics.forEach(subtopic => {
        const data = coverage[subtopic] || { standard: [], mixed: [] };
        const std = data.standard.length;
        const mix = data.mixed.length;

        let status = '';
        if (std === 0 && mix === 0) {
          status = '⬜ NO WORKSHEETS';
          noWorksheets[yearGroup].push({ topic, subtopic });
        } else if (std > 0 && mix === 0) {
          status = '🔷 NEED MIXED LAYOUT';
          needsMixed[yearGroup].push({ topic, subtopic, standardCount: std });
        } else if (std === 0 && mix > 0) {
          status = '🟣 MIXED ONLY';
        } else {
          status = '✅ COMPLETE';
        }

        console.log(`${subtopic.padEnd(32)}| ${String(std).padEnd(8)} | ${String(mix).padEnd(6)} | ${status}`);
      });
    }
  }

  // Summary: Subtopics needing mixed layout
  console.log('\n' + '='.repeat(100));
  console.log('📋 SUBTOPICS THAT NEED MIXED LAYOUT WORKSHEETS');
  console.log('='.repeat(100));

  let totalNeedMixed = 0;
  for (const [yearGroup, items] of Object.entries(needsMixed)) {
    if (items.length > 0) {
      console.log(`\n${yearGroup} (${items.length} subtopics need mixed):`);
      items.forEach((item, i) => {
        console.log(`  ${i + 1}. ${item.subtopic} (${item.topic}) - has ${item.standardCount} standard`);
      });
      totalNeedMixed += items.length;
    }
  }

  // Summary: Subtopics with no worksheets
  console.log('\n' + '='.repeat(100));
  console.log('🚫 SUBTOPICS WITH NO WORKSHEETS AT ALL');
  console.log('='.repeat(100));

  let totalNoWs = 0;
  for (const [yearGroup, items] of Object.entries(noWorksheets)) {
    if (items.length > 0) {
      console.log(`\n${yearGroup} (${items.length} subtopics missing):`);
      items.forEach((item, i) => {
        console.log(`  ${i + 1}. ${item.subtopic} (${item.topic})`);
      });
      totalNoWs += items.length;
    }
  }

  // Final Summary
  console.log('\n' + '='.repeat(100));
  console.log('📊 FINAL SUMMARY');
  console.log('='.repeat(100));
  console.log(`Total subtopics in curriculum: 54`);
  console.log(`Subtopics with NO worksheets: ${totalNoWs}`);
  console.log(`Subtopics needing MIXED layout: ${totalNeedMixed}`);
  console.log(`Total gaps to fill: ${totalNoWs + totalNeedMixed}`);
  console.log('='.repeat(100));
}

analyze();
