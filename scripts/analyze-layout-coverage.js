#!/usr/bin/env node
/**
 * Analyze Worksheet Library Coverage
 * Shows which subtopics have standard vs mixed layout coverage
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Complete subtopic list from docs/populate-worksheet-from-scratch.md
const SUBTOPIC_DEFINITIONS = {
  Reception: {
    'Number and Counting': [
      'counting-to-10',
      'number-recognition',
      'more-or-less',
      'early-addition',
      'early-subtraction',
      'number-bonds',
      'subitising'
    ],
    'Shape and Space': [
      'basic-shapes',
      'patterns',
      'size-comparison',
      'position-direction'
    ],
    'Measurement': [
      'length-comparison',
      'weight-comparison',
      'capacity',
      'time-concepts'
    ]
  },
  'Year 1': {
    'Number and Place Value': [
      'numbers-to-20',
      'counting-forwards-backwards',
      'number-bonds-10'
    ],
    'Addition and Subtraction': [
      'adding-to-20',
      'subtracting-within-20',
      'word-problems-simple'
    ],
    'Measurement': [
      'length-height',
      'weight-capacity',
      'time-days-months',
      'coins-recognition'
    ],
    'Geometry: Shapes': [
      '2d-shapes-basic',
      '3d-shapes-basic'
    ],
    'Fractions': [
      'halves-and-quarters'
    ]
  },
  'Year 2': {
    'Number and Place Value': [
      'numbers-to-100',
      'comparing-numbers',
      'rounding-nearest-10'
    ],
    'Addition and Subtraction': [
      'two-digit-numbers',
      'mental-strategies',
      'word-problems'
    ],
    'Multiplication and Division': [
      'times-tables-2-5-10',
      'equal-groups',
      'sharing-grouping'
    ],
    'Fractions': [
      'recognising-fractions',
      'finding-fractions',
      'equivalent-fractions-simple'
    ],
    'Measurement': [
      'length-and-height',
      'mass-and-weight',
      'capacity-and-volume',
      'money',
      'time'
    ],
    'Statistics': [
      'pictograms',
      'tally-charts',
      'block-diagrams-tables'
    ],
    'Geometry: Properties of Shapes': [
      '2d-shapes-properties',
      '3d-shapes-properties',
      'sorting-shapes'
    ],
    'Geometry: Position and Direction': [
      'position-direction',
      'movement',
      'turns'
    ]
  }
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function analyze() {
  console.log('='.repeat(80));
  console.log('WORKSHEET LIBRARY COVERAGE ANALYSIS');
  console.log('Standard vs Mixed Layout by Subtopic');
  console.log('='.repeat(80));
  console.log();

  // Query all published worksheets
  const { data: worksheets, error } = await supabase
    .from('library_worksheets')
    .select('year_group, topic, subtopic, layout_type, slug')
    .eq('status', 'published')
    .order('year_group')
    .order('topic')
    .order('subtopic');

  if (error) {
    console.error('Error querying database:', error);
    process.exit(1);
  }

  // Group by year_group, topic, subtopic, and layout_type
  const coverage = {};

  worksheets.forEach(ws => {
    const key = `${ws.year_group}|${ws.topic}|${ws.subtopic}`;
    if (!coverage[key]) {
      coverage[key] = {
        year_group: ws.year_group,
        topic: ws.topic,
        subtopic: ws.subtopic,
        standard: [],
        mixed: []
      };
    }

    if (ws.layout_type === 'standard') {
      coverage[key].standard.push(ws.slug);
    } else if (ws.layout_type === 'mixed') {
      coverage[key].mixed.push(ws.slug);
    }
  });

  // Analyze each year group
  let totalSubtopics = 0;
  let noWorksheets = 0;
  let onlyStandard = 0;
  let onlyMixed = 0;
  let both = 0;

  for (const [yearGroup, topics] of Object.entries(SUBTOPIC_DEFINITIONS)) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`${yearGroup.toUpperCase()}`);
    console.log('='.repeat(80));

    for (const [topic, subtopics] of Object.entries(topics)) {
      console.log(`\n${topic}:`);
      console.log('-'.repeat(80));
      console.log('Subtopic                        | Standard | Mixed | Status');
      console.log('-'.repeat(80));

      subtopics.forEach(subtopic => {
        totalSubtopics++;
        const key = `${yearGroup}|${topic}|${subtopic}`;
        const data = coverage[key] || { standard: [], mixed: [] };

        const stdCount = data.standard.length;
        const mixedCount = data.mixed.length;

        let status = '';
        if (stdCount === 0 && mixedCount === 0) {
          status = '⬜ NO WORKSHEETS';
          noWorksheets++;
        } else if (stdCount > 0 && mixedCount === 0) {
          status = '🔷 STANDARD ONLY (need mixed)';
          onlyStandard++;
        } else if (stdCount === 0 && mixedCount > 0) {
          status = '🟣 MIXED ONLY (need standard)';
          onlyMixed++;
        } else {
          status = '✅ COMPLETE (both layouts)';
          both++;
        }

        const subtopicPadded = subtopic.padEnd(30);
        const stdPadded = String(stdCount).padEnd(8);
        const mixedPadded = String(mixedCount).padEnd(5);

        console.log(`${subtopicPadded} | ${stdPadded} | ${mixedPadded} | ${status}`);
      });
    }
  }

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total Subtopics:           ${totalSubtopics}`);
  console.log(`⬜ No Worksheets:          ${noWorksheets} (${((noWorksheets/totalSubtopics)*100).toFixed(1)}%)`);
  console.log(`🔷 Standard Only:          ${onlyStandard} (${((onlyStandard/totalSubtopics)*100).toFixed(1)}%)`);
  console.log(`🟣 Mixed Only:             ${onlyMixed} (${((onlyMixed/totalSubtopics)*100).toFixed(1)}%)`);
  console.log(`✅ Complete (Both):        ${both} (${((both/totalSubtopics)*100).toFixed(1)}%)`);
  console.log('='.repeat(80));

  // Total worksheet count
  const totalStandard = worksheets.filter(w => w.layout_type === 'standard').length;
  const totalMixed = worksheets.filter(w => w.layout_type === 'mixed').length;
  console.log(`\nTotal Worksheets: ${worksheets.length}`);
  console.log(`  Standard: ${totalStandard}`);
  console.log(`  Mixed: ${totalMixed}`);
  console.log('='.repeat(80));
}

analyze().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
