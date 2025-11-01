#!/usr/bin/env node

/**
 * BATCH PARALLEL WORKSHEET QUALITY AGENT v2.1 (MULTI-CONFIG + CLAUDE CODE VISION)
 *
 * Efficient agent that generates multiple worksheets across multiple configs in parallel,
 * then hands off to Claude Code for vision assessment and report generation.
 *
 * COMPLETE WORKFLOW (CLAUDE CODE INTEGRATION):
 * 1. Agent: Generate worksheets for all configs in parallel (no intermediate HTML reports)
 * 2. Agent: Save screenshot metadata and exit cleanly
 * 3. Claude Code: Assess all worksheets using Read tool (expert teacher criteria)
 * 4. Claude Code: Generate comprehensive HTML report with vision results ONLY at the end
 *
 * NEW in v2.1:
 * - NO intermediate HTML report generation (clean workflow)
 * - NO API keys required (uses Claude Code's native vision capabilities)
 * - Agent exits after generation, Claude Code completes the workflow
 * - HTML report generated ONLY after all assessments complete
 * - Streamlined for development and test pipelines
 *
 * Features from v2.0:
 * - Multi-config support: Run multiple configs in parallel (e.g., all-reception)
 * - Config-level parallelism: Process N configs at a time (default: 2)
 * - Batch vision support: Prepare ALL worksheets for Claude Code assessment
 * - Consolidated HTML report: Single report covering all configs and worksheets
 *
 * Performance improvements over sequential agent:
 * - Multi-browser context architecture (parallel generations per config)
 * - Multi-config parallelism (2+ configs running simultaneously)
 * - Shared browser instance (reduced startup overhead)
 *
 * Expected performance:
 * - Generation: 6 configs × 2 worksheets in ~3-4 minutes (parallel mode)
 * - Vision assessment: ~5-10s per worksheet via Claude Code
 *
 * Usage:
 *   node scripts/batch-parallel-agent.js <config-id-or-group> [options]
 *
 * Config Groups:
 *   all-reception               All 6 Reception configs
 *   <specific-config-id>        Single config (legacy mode)
 *
 * Options:
 *   --batch-size=N              Worksheets per config (default: 2)
 *   --max-concurrent=N          Max concurrent browser contexts per config (default: 2)
 *   --configs-parallel=N        Max configs to run in parallel (default: 2)
 *   --enable-vision=true        Prepare for vision assessment (default: true)
 *   --headless=true             Run in headless mode (default: false)
 *
 * Examples:
 *   node scripts/batch-parallel-agent.js all-reception --batch-size=2 --configs-parallel=2
 *   node scripts/batch-parallel-agent.js reception-number-counting-counting-to-10 --batch-size=5
 *
 * No API Keys Required:
 *   - Uses Claude Code's native vision capabilities (Read tool)
 *   - Perfect for development and testing workflows
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

// ============================================================================
// CONFIG REGISTRY (All 6 Reception Configs)
// ============================================================================

const CONFIG_REGISTRY = {
  'reception-number-counting-counting-to-10': {
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topicValue: 'number-counting',
    topic: 'Number and Counting',
    subtopicValue: 'counting-to-10',
    subtopic: 'Counting to 10',
    difficulty: 'average',
    numQuestions: 5
  },
  'reception-number-counting-number-recognition': {
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topicValue: 'number-counting',
    topic: 'Number and Counting',
    subtopicValue: 'number-recognition',
    subtopic: 'Number Recognition',
    difficulty: 'average',
    numQuestions: 5
  },
  'reception-number-counting-more-or-less': {
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topicValue: 'number-counting',
    topic: 'Number and Counting',
    subtopicValue: 'more-or-less',
    subtopic: 'More or Less',
    difficulty: 'average',
    numQuestions: 5
  },
  'reception-shape-space-size-comparison': {
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topicValue: 'shape-space',
    topic: 'Shape and Space',
    subtopicValue: 'size-comparison',
    subtopic: 'Size Comparison',
    difficulty: 'average',
    numQuestions: 5
  },
  'reception-shape-space-basic-shapes': {
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topicValue: 'shape-space',
    topic: 'Shape and Space',
    subtopicValue: 'basic-shapes',
    subtopic: 'Basic Shapes',
    difficulty: 'average',
    numQuestions: 5
  },
  'reception-shape-space-patterns': {
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topicValue: 'shape-space',
    topic: 'Shape and Space',
    subtopicValue: 'patterns',
    subtopic: 'Patterns',
    difficulty: 'average',
    numQuestions: 5
  },
  'year1-number-place-value-numbers-to-20': {
      "yearGroup": "Year 1",
      "yearGroupSelect": "Year 1 (Ages 5-6)",
      "topicValue": "number-place-value",
      "topic": "Number and Place Value",
      "subtopicValue": "numbers-to-20",
      "subtopic": "Numbers to 20",
      "difficulty": "average",
      "numQuestions": 5
  },
  'year1-number-place-value-counting-forwards-backwards': {
      "yearGroup": "Year 1",
      "yearGroupSelect": "Year 1 (Ages 5-6)",
      "topicValue": "number-place-value",
      "topic": "Number and Place Value",
      "subtopicValue": "counting-forwards-backwards",
      "subtopic": "Counting Forwards and Backwards",
      "difficulty": "average",
      "numQuestions": 5
  },
  'year1-number-place-value-number-bonds-10': {
      "yearGroup": "Year 1",
      "yearGroupSelect": "Year 1 (Ages 5-6)",
      "topicValue": "number-place-value",
      "topic": "Number and Place Value",
      "subtopicValue": "number-bonds-10",
      "subtopic": "Number Bonds to 10",
      "difficulty": "average",
      "numQuestions": 5
  },
  'year1-addition-subtraction-adding-to-20': {
      "yearGroup": "Year 1",
      "yearGroupSelect": "Year 1 (Ages 5-6)",
      "topicValue": "addition-subtraction",
      "topic": "Addition and Subtraction",
      "subtopicValue": "adding-to-20",
      "subtopic": "Adding within 20",
      "difficulty": "average",
      "numQuestions": 5
  },
  'year1-addition-subtraction-subtracting-within-20': {
      "yearGroup": "Year 1",
      "yearGroupSelect": "Year 1 (Ages 5-6)",
      "topicValue": "addition-subtraction",
      "topic": "Addition and Subtraction",
      "subtopicValue": "subtracting-within-20",
      "subtopic": "Subtracting within 20",
      "difficulty": "average",
      "numQuestions": 5
  },
  'year1-addition-subtraction-word-problems-simple': {
      "yearGroup": "Year 1",
      "yearGroupSelect": "Year 1 (Ages 5-6)",
      "topicValue": "addition-subtraction",
      "topic": "Addition and Subtraction",
      "subtopicValue": "word-problems-simple",
      "subtopic": "Simple Word Problems",
      "difficulty": "average",
      "numQuestions": 5
  },
  'year1-measurement-length-height': {
      "yearGroup": "Year 1",
      "yearGroupSelect": "Year 1 (Ages 5-6)",
      "topicValue": "measurement",
      "topic": "Measurement",
      "subtopicValue": "length-height",
      "subtopic": "Length and Height",
      "difficulty": "average",
      "numQuestions": 5
  },
  'year1-measurement-weight-capacity': {
      "yearGroup": "Year 1",
      "yearGroupSelect": "Year 1 (Ages 5-6)",
      "topicValue": "measurement",
      "topic": "Measurement",
      "subtopicValue": "weight-capacity",
      "subtopic": "Weight and Capacity",
      "difficulty": "average",
      "numQuestions": 5
  },
  'year1-measurement-time-days-months': {
      "yearGroup": "Year 1",
      "yearGroupSelect": "Year 1 (Ages 5-6)",
      "topicValue": "measurement",
      "topic": "Measurement",
      "subtopicValue": "time-days-months",
      "subtopic": "Time - Days and Months",
      "difficulty": "average",
      "numQuestions": 5
  },
  // Year 2 configs (24 subtopics)
  'year2-number-place-value-numbers-to-100': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "number-place-value",
    "topic": "Number and Place Value",
    "subtopicValue": "numbers-to-100",
    "subtopic": "Numbers to 100",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-number-place-value-comparing-numbers': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "number-place-value",
    "topic": "Number and Place Value",
    "subtopicValue": "comparing-numbers",
    "subtopic": "Comparing Numbers",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-number-place-value-rounding-nearest-10': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "number-place-value",
    "topic": "Number and Place Value",
    "subtopicValue": "rounding-nearest-10",
    "subtopic": "Rounding to Nearest 10",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-addition-subtraction-two-digit-numbers': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "addition-subtraction",
    "topic": "Addition and Subtraction",
    "subtopicValue": "two-digit-numbers",
    "subtopic": "Two-digit Number Operations",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-addition-subtraction-mental-strategies': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "addition-subtraction",
    "topic": "Addition and Subtraction",
    "subtopicValue": "mental-strategies",
    "subtopic": "Mental Calculation Strategies",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-addition-subtraction-word-problems': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "addition-subtraction",
    "topic": "Addition and Subtraction",
    "subtopicValue": "word-problems",
    "subtopic": "Word Problems",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-multiplication-division-times-tables-2-5-10': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "multiplication-division",
    "topic": "Multiplication and Division",
    "subtopicValue": "times-tables-2-5-10",
    "subtopic": "Times Tables 2, 5, 10",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-multiplication-division-equal-groups': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "multiplication-division",
    "topic": "Multiplication and Division",
    "subtopicValue": "equal-groups",
    "subtopic": "Equal Groups",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-multiplication-division-sharing-grouping': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "multiplication-division",
    "topic": "Multiplication and Division",
    "subtopicValue": "sharing-grouping",
    "subtopic": "Sharing and Grouping",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-fractions-recognising-fractions': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "fractions",
    "topic": "Fractions",
    "subtopicValue": "recognising-fractions",
    "subtopic": "Recognising Fractions",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-fractions-finding-fractions': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "fractions",
    "topic": "Fractions",
    "subtopicValue": "finding-fractions",
    "subtopic": "Finding Fractions",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-fractions-equivalent-fractions-simple': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "fractions",
    "topic": "Fractions",
    "subtopicValue": "equivalent-fractions-simple",
    "subtopic": "Simple Equivalent Fractions",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-measurement-length-and-height': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "measurement",
    "topic": "Measurement",
    "subtopicValue": "length-and-height",
    "subtopic": "Length and Height (cm, m)",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-measurement-mass-and-weight': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "measurement",
    "topic": "Measurement",
    "subtopicValue": "mass-and-weight",
    "subtopic": "Mass and Weight (g, kg)",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-measurement-capacity-and-volume': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "measurement",
    "topic": "Measurement",
    "subtopicValue": "capacity-and-volume",
    "subtopic": "Capacity and Volume (ml, l)",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-measurement-money': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "measurement",
    "topic": "Measurement",
    "subtopicValue": "money",
    "subtopic": "Money (pence and pounds)",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-measurement-time': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "measurement",
    "topic": "Measurement",
    "subtopicValue": "time",
    "subtopic": "Time (o'clock, half past, quarter to/past)",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-statistics-pictograms': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "statistics",
    "topic": "Statistics",
    "subtopicValue": "pictograms",
    "subtopic": "Pictograms",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-statistics-tally-charts': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "statistics",
    "topic": "Statistics",
    "subtopicValue": "tally-charts",
    "subtopic": "Tally Charts",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-statistics-block-diagrams-tables': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "statistics",
    "topic": "Statistics",
    "subtopicValue": "block-diagrams-tables",
    "subtopic": "Block Diagrams and Tables",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-geometry-shapes-2d-shapes-properties': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "geometry-shapes",
    "topic": "Geometry: Properties of Shapes",
    "subtopicValue": "2d-shapes-properties",
    "subtopic": "2D Shapes and Properties",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-geometry-shapes-3d-shapes-properties': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "geometry-shapes",
    "topic": "Geometry: Properties of Shapes",
    "subtopicValue": "3d-shapes-properties",
    "subtopic": "3D Shapes and Properties",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-geometry-shapes-sorting-shapes': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "geometry-shapes",
    "topic": "Geometry: Properties of Shapes",
    "subtopicValue": "sorting-shapes",
    "subtopic": "Sorting and Classifying Shapes",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year2-geometry-position-position-direction': {
    "yearGroup": "Year 2",
    "yearGroupSelect": "Year 2 (Ages 6-7)",
    "topicValue": "geometry-position",
    "topic": "Geometry: Position and Direction",
    "subtopicValue": "position-direction",
    "subtopic": "Position and Direction",
    "difficulty": "average",
    "numQuestions": 5
  },
  // Year 3 configs (12 subtopics)
  'year3-number-place-value-numbers-to-1000': {
    "yearGroup": "Year 3",
    "yearGroupSelect": "Year 3 (Ages 7-8)",
    "topicValue": "number-place-value",
    "topic": "Number and Place Value",
    "subtopicValue": "numbers-to-1000",
    "subtopic": "Numbers to 1000",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year3-number-place-value-comparing-ordering': {
    "yearGroup": "Year 3",
    "yearGroupSelect": "Year 3 (Ages 7-8)",
    "topicValue": "number-place-value",
    "topic": "Number and Place Value",
    "subtopicValue": "comparing-ordering",
    "subtopic": "Comparing and Ordering",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year3-number-place-value-rounding-nearest-100': {
    "yearGroup": "Year 3",
    "yearGroupSelect": "Year 3 (Ages 7-8)",
    "topicValue": "number-place-value",
    "topic": "Number and Place Value",
    "subtopicValue": "rounding-nearest-100",
    "subtopic": "Rounding to Nearest 100",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year3-addition-subtraction-three-digit-numbers': {
    "yearGroup": "Year 3",
    "yearGroupSelect": "Year 3 (Ages 7-8)",
    "topicValue": "addition-subtraction",
    "topic": "Addition and Subtraction",
    "subtopicValue": "three-digit-numbers",
    "subtopic": "Three-digit Calculations",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year3-addition-subtraction-written-methods': {
    "yearGroup": "Year 3",
    "yearGroupSelect": "Year 3 (Ages 7-8)",
    "topicValue": "addition-subtraction",
    "topic": "Addition and Subtraction",
    "subtopicValue": "written-methods",
    "subtopic": "Written Methods",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year3-addition-subtraction-problem-solving': {
    "yearGroup": "Year 3",
    "yearGroupSelect": "Year 3 (Ages 7-8)",
    "topicValue": "addition-subtraction",
    "topic": "Addition and Subtraction",
    "subtopicValue": "problem-solving",
    "subtopic": "Problem Solving",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year3-multiplication-division-times-tables-3-4-8': {
    "yearGroup": "Year 3",
    "yearGroupSelect": "Year 3 (Ages 7-8)",
    "topicValue": "multiplication-division",
    "topic": "Multiplication and Division",
    "subtopicValue": "times-tables-3-4-8",
    "subtopic": "Times Tables 3, 4, 8",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year3-multiplication-division-written-methods-multiply': {
    "yearGroup": "Year 3",
    "yearGroupSelect": "Year 3 (Ages 7-8)",
    "topicValue": "multiplication-division",
    "topic": "Multiplication and Division",
    "subtopicValue": "written-methods-multiply",
    "subtopic": "Written Methods for Multiplication",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year3-multiplication-division-division-remainders': {
    "yearGroup": "Year 3",
    "yearGroupSelect": "Year 3 (Ages 7-8)",
    "topicValue": "multiplication-division",
    "topic": "Multiplication and Division",
    "subtopicValue": "division-remainders",
    "subtopic": "Division with Remainders",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year3-fractions-unit-fractions': {
    "yearGroup": "Year 3",
    "yearGroupSelect": "Year 3 (Ages 7-8)",
    "topicValue": "fractions",
    "topic": "Fractions",
    "subtopicValue": "unit-fractions",
    "subtopic": "Unit Fractions",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year3-fractions-equivalent-fractions-simple': {
    "yearGroup": "Year 3",
    "yearGroupSelect": "Year 3 (Ages 7-8)",
    "topicValue": "fractions",
    "topic": "Fractions",
    "subtopicValue": "equivalent-fractions-simple",
    "subtopic": "Simple Equivalent Fractions",
    "difficulty": "average",
    "numQuestions": 5
  },
  'year3-fractions-comparing-fractions': {
    "yearGroup": "Year 3",
    "yearGroupSelect": "Year 3 (Ages 7-8)",
    "topicValue": "fractions",
    "topic": "Fractions",
    "subtopicValue": "comparing-fractions",
    "subtopic": "Comparing Fractions",
    "difficulty": "average",
    "numQuestions": 5
  }
};

// Config groups for batch processing
const CONFIG_GROUPS = {
  'all-reception': [
    'reception-number-counting-counting-to-10',
    'reception-number-counting-number-recognition',
    'reception-number-counting-more-or-less',
    'reception-shape-space-size-comparison',
    'reception-shape-space-basic-shapes',
    'reception-shape-space-patterns'
  ]
,
  'all-year1': [
    'year1-number-place-value-numbers-to-20',
    'year1-number-place-value-counting-forwards-backwards',
    'year1-number-place-value-number-bonds-10',
    'year1-addition-subtraction-adding-to-20',
    'year1-addition-subtraction-subtracting-within-20',
    'year1-addition-subtraction-word-problems-simple',
    'year1-measurement-length-height',
    'year1-measurement-weight-capacity',
    'year1-measurement-time-days-months'
  ],
  'all-year2': [
    'year2-number-place-value-numbers-to-100',
    'year2-number-place-value-comparing-numbers',
    'year2-number-place-value-rounding-nearest-10',
    'year2-addition-subtraction-two-digit-numbers',
    'year2-addition-subtraction-mental-strategies',
    'year2-addition-subtraction-word-problems',
    'year2-multiplication-division-times-tables-2-5-10',
    'year2-multiplication-division-equal-groups',
    'year2-multiplication-division-sharing-grouping',
    'year2-fractions-recognising-fractions',
    'year2-fractions-finding-fractions',
    'year2-fractions-equivalent-fractions-simple',
    'year2-measurement-length-and-height',
    'year2-measurement-mass-and-weight',
    'year2-measurement-capacity-and-volume',
    'year2-measurement-money',
    'year2-measurement-time',
    'year2-statistics-pictograms',
    'year2-statistics-tally-charts',
    'year2-statistics-block-diagrams-tables',
    'year2-geometry-shapes-2d-shapes-properties',
    'year2-geometry-shapes-3d-shapes-properties',
    'year2-geometry-shapes-sorting-shapes',
    'year2-geometry-position-position-direction'
  ],
  'all-year3': [
    'year3-number-place-value-numbers-to-1000',
    'year3-number-place-value-comparing-ordering',
    'year3-number-place-value-rounding-nearest-100',
    'year3-addition-subtraction-three-digit-numbers',
    'year3-addition-subtraction-written-methods',
    'year3-addition-subtraction-problem-solving',
    'year3-multiplication-division-times-tables-3-4-8',
    'year3-multiplication-division-written-methods-multiply',
    'year3-multiplication-division-division-remainders',
    'year3-fractions-unit-fractions',
    'year3-fractions-equivalent-fractions-simple',
    'year3-fractions-comparing-fractions'
  ]
};

// ============================================================================
// CLI ARGUMENT PARSING
// ============================================================================

function parseArgs() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0].startsWith('--')) {
    console.error('\n❌ Error: Configuration ID or group is required\n');
    console.log('Usage: node scripts/batch-parallel-agent.js <config-id-or-group> [options]\n');
    console.log('Config Groups:');
    Object.keys(CONFIG_GROUPS).forEach(key => {
      console.log(`  - ${key} (${CONFIG_GROUPS[key].length} configs)`);
    });
    console.log('\nIndividual Configs:');
    Object.keys(CONFIG_REGISTRY).forEach(key => {
      console.log(`  - ${key}`);
    });
    console.log('\nOptions:');
    console.log('  --batch-size=N          Worksheets per config (default: 2)');
    console.log('  --max-concurrent=N      Max concurrent browser contexts per config (default: 2)');
    console.log('  --configs-parallel=N    Max configs to run in parallel (default: 2)');
    console.log('  --enable-vision=true    Enable vision assessment (default: true)');
    console.log('  --headless=true         Run in headless mode (default: false)');
    console.log('');
    process.exit(1);
  }

  const configInput = args[0];
  const options = {
    batchSize: 2,
    maxConcurrent: 2,
    configsParallel: 2,
    enableVision: true,
    headless: false
  };

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const [key, value] = arg.substring(2).split('=');
      switch (key) {
        case 'batch-size':
          options.batchSize = parseInt(value) || 2;
          break;
        case 'max-concurrent':
          options.maxConcurrent = parseInt(value) || 2;
          break;
        case 'configs-parallel':
          options.configsParallel = parseInt(value) || 2;
          break;
        case 'enable-vision':
          options.enableVision = value !== 'false';
          break;
        case 'headless':
          options.headless = value === 'true';
          break;
      }
    }
  }

  return { configInput, options };
}

const { configInput, options } = parseArgs();

// Resolve config IDs (support both groups and individual configs)
let configIds = [];
if (CONFIG_GROUPS[configInput]) {
  configIds = CONFIG_GROUPS[configInput];
  console.log(`\n📦 Config Group: ${configInput} (${configIds.length} configs)\n`);
} else if (CONFIG_REGISTRY[configInput]) {
  configIds = [configInput];
  console.log(`\n📦 Single Config: ${configInput}\n`);
} else {
  console.error(`\n❌ Error: Unknown configuration or group "${configInput}"\n`);
  console.log('Available groups:');
  Object.keys(CONFIG_GROUPS).forEach(key => {
    console.log(`  - ${key}`);
  });
  console.log('\nAvailable configs:');
  Object.keys(CONFIG_REGISTRY).forEach(key => {
    console.log(`  - ${key}`);
  });
  console.log('');
  process.exit(1);
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const AGENT_CONFIG = {
  BASE_URL: 'http://localhost:3000',
  BATCH_SIZE: options.batchSize,
  MAX_CONCURRENT: options.maxConcurrent,
  CONFIGS_PARALLEL: options.configsParallel,
  ENABLE_VISION: options.enableVision,
  HEADLESS: options.headless,
  TIMEOUT: 120000
};

// Session setup
const SESSION_ID = `multi-batch-${configInput}-${new Date().toISOString().replace(/[:.]/g, '-')}`;
const SESSION_DIR = path.join(process.cwd(), 'worksheet-quality-reports', 'multi-batch-sessions', SESSION_ID);
fs.mkdirSync(SESSION_DIR, { recursive: true });

// Performance tracking
const performanceData = {
  startTime: performance.now(),
  configs: [],
  totalWorksheets: 0,
  totalTime: 0
};

console.log('='.repeat(80));
console.log('🚀 BATCH PARALLEL WORKSHEET QUALITY AGENT v2.1 (CLAUDE CODE INTEGRATION)');
console.log('='.repeat(80));
console.log('');
console.log('📋 WORKFLOW:');
console.log('   1. Agent: Generate worksheets for all configs (parallel)');
console.log('   2. Agent: Save metadata and exit');
console.log('   3. Claude Code: Assess worksheets (Read tool + expert criteria)');
console.log('   4. Claude Code: Generate HTML report (only at the end)');
console.log('');
console.log(`📋 Configs: ${configIds.length} total`);
configIds.forEach(id => {
  const cfg = CONFIG_REGISTRY[id];
  console.log(`   - ${cfg.subtopic} (${cfg.topic})`);
});
console.log('');
console.log(`📦 Worksheets per Config: ${AGENT_CONFIG.BATCH_SIZE}`);
console.log(`⚡ Max Concurrent per Config: ${AGENT_CONFIG.MAX_CONCURRENT} contexts`);
console.log(`🔄 Configs in Parallel: ${AGENT_CONFIG.CONFIGS_PARALLEL}`);
console.log(`👁️  Vision Assessment: ${AGENT_CONFIG.ENABLE_VISION ? 'ENABLED (via Claude Code)' : 'DISABLED'}`);
console.log(`🎭 Browser Mode: ${AGENT_CONFIG.HEADLESS ? 'Headless' : 'Headed'}`);
console.log(`📁 Session Directory: ${SESSION_DIR}`);
console.log('');

// ============================================================================
// MULTI-CONTEXT BROWSER MANAGER
// ============================================================================

class BrowserContextManager {
  constructor(browser, maxConcurrent) {
    this.browser = browser;
    this.maxConcurrent = maxConcurrent;
    this.activeContexts = new Map();
    this.availableSlots = maxConcurrent;
  }

  async createContext(contextId) {
    if (this.availableSlots <= 0) {
      throw new Error('No available context slots');
    }

    const context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    const page = await context.newPage();

    this.activeContexts.set(contextId, { context, page });
    this.availableSlots--;

    console.log(`   🌐 Context ${contextId} created (${this.activeContexts.size}/${this.maxConcurrent} active)`);

    return { context, page };
  }

  async closeContext(contextId) {
    const ctx = this.activeContexts.get(contextId);
    if (ctx) {
      await ctx.page.close();
      await ctx.context.close();
      this.activeContexts.delete(contextId);
      this.availableSlots++;

      console.log(`   ✅ Context ${contextId} closed (${this.activeContexts.size}/${this.maxConcurrent} active)`);
    }
  }

  async closeAll() {
    const closePromises = Array.from(this.activeContexts.keys()).map(id =>
      this.closeContext(id)
    );
    await Promise.all(closePromises);
  }

  getAvailableSlots() {
    return this.availableSlots;
  }
}

// ============================================================================
// ASSESSMENT QUEUE MANAGEMENT
// ============================================================================

function addToAssessmentQueue(screenshotData, sessionDir) {
  const queuePath = path.join(sessionDir, 'pending-queue.json');
  let queue = [];
  if (fs.existsSync(queuePath)) {
    queue = JSON.parse(fs.readFileSync(queuePath));
  }
  queue.push({
    screenshotPath: screenshotData.screenshotPath,
    configId: screenshotData.configId,
    config: screenshotData.config,
    worksheetId: screenshotData.worksheetId,
    status: 'pending',
    queuedAt: Date.now()
  });
  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
  console.log(`      📋 [WS-${screenshotData.worksheetId}] Added to assessment queue`);
}

// ============================================================================
// PARALLEL WORKSHEET GENERATOR
// ============================================================================

async function generateWorksheetInContext(page, worksheetId, config, screenshotDir, configId, isRegenerate = false) {
  const startTime = performance.now();

  try {
    console.log(`      📄 [WS-${worksheetId}] Starting generation...`);

    if (isRegenerate) {
      // FRESHNESS FIX: For subsequent worksheets, click Regenerate instead of reloading
      console.log(`      🔄 [WS-${worksheetId}] Clicking Regenerate to preserve React state...`);

      // Click the Regenerate button
      const regenerateButton = page.getByRole('button', { name: 'Regenerate' });
      await regenerateButton.waitFor({ state: 'visible', timeout: 5000 });
      await regenerateButton.click();
    } else {
      // First worksheet: Navigate to dashboard and configure
      await page.goto(`${AGENT_CONFIG.BASE_URL}/dashboard`, {
        waitUntil: 'networkidle',
        timeout: AGENT_CONFIG.TIMEOUT
      });

      // Wait for year-group select
      await page.waitForSelector('[data-testid="year-group-select"]', { timeout: 10000 });

      // Select Year Group
      const yearGroupValue = config.yearGroup.toLowerCase().replace(/\s+/g, '-');
      await page.getByTestId('year-group-select').click();
      await page.waitForTimeout(300); // Small delay for dropdown animation
      await page.getByTestId(`year-group-option-${yearGroupValue}`).click();

      // Wait for topic dropdown
      await page.waitForSelector('[data-testid="topic-select"]:not([disabled])', { timeout: 10000 });

      // Select Topic
      const topicValue = config.topicValue || config.topic.toLowerCase().replace(/\s+/g, '-');
      await page.getByTestId('topic-select').click();
      await page.waitForTimeout(300); // Small delay for dropdown animation
      await page.waitForSelector(`[data-testid="topic-option-${topicValue}"]`, { timeout: 10000, state: 'visible' });
      await page.getByTestId(`topic-option-${topicValue}`).click();

      // Wait for subtopic dropdown
      await page.waitForSelector('[data-testid="subtopic-select"]:not([disabled])', { timeout: 10000 });

      // Select Subtopic
      const subtopicValue = config.subtopicValue || config.subtopic.toLowerCase().replace(/\s+/g, '-');
      console.log(`      🔍 [WS-${worksheetId}] Selecting subtopic: ${subtopicValue}`);
      await page.getByTestId('subtopic-select').click();
      await page.waitForTimeout(500); // Longer delay for dropdown animation and state update
      await page.waitForSelector(`[data-testid="subtopic-option-${subtopicValue}"]`, { timeout: 10000, state: 'visible' });
      await page.getByTestId(`subtopic-option-${subtopicValue}`).click();
      await page.waitForTimeout(500); // Wait for state to update after click

      // Verify subtopic was selected correctly
      const selectedSubtopic = await page.getByTestId('subtopic-select').textContent();
      console.log(`      ✅ [WS-${worksheetId}] Subtopic selected: ${selectedSubtopic}`);

      // Wait for form state update
      await page.waitForLoadState('domcontentloaded');

      // SKIP: Difficulty Selection - HIDDEN in UI (not implemented in backend)
      // The difficulty field is hidden via CSS in dashboard/page.tsx line 672
      // if (config.difficulty) {
      //   await page.click(`#difficulty-${config.difficulty}`);
      //   await page.waitForLoadState('domcontentloaded');
      // }

      // Click Generate
      const generateButton = page.getByRole('button', { name: 'Generate Worksheet' });
      const isEnabled = await generateButton.isEnabled();
      if (!isEnabled) {
        throw new Error('Generate button is disabled');
      }
      await generateButton.click();
    }

    console.log(`      ⏳ [WS-${worksheetId}] Waiting for generation...`);

    // Wait for completion - Download button appears
    await page.waitForSelector('text=Download', { timeout: AGENT_CONFIG.TIMEOUT });

    // FRESHNESS FIX: Give React time to complete state updates
    // The frontend extracts worksheet data and updates previousWorksheets state
    // BEFORE showing the Download button, but React state updates are async.
    // Wait 500ms to ensure state update completes before next Regenerate click.
    await page.waitForTimeout(500);

    // CRITICAL: Wait for worksheet content to actually render (not just config screen)
    // With streaming enabled, we wait for the preview to be visible
    console.log(`      ⏳ [WS-${worksheetId}] Waiting for worksheet preview...`);

    // Wait for preview to be visible (streaming will populate it)
    await page.waitForSelector('.worksheet-preview, .worksheet', {
      timeout: 10000,
      state: 'visible'
    });

    console.log(`      ✅ [WS-${worksheetId}] Worksheet preview visible, waiting before screenshot...`);

    // CRITICAL: Enhanced waiting strategy to fix broken images and truncated answer keys
    // Problem 1: Large farm animal images (1.6MB cow.png, 1.2MB sheep.png) need time to load
    // Problem 2: Answer keys can be cut off if page hasn't fully rendered

    // Step 1: Wait for network to be idle (all images loaded)
    console.log(`      ⏳ [WS-${worksheetId}] Waiting for all images to load (network idle)...`);
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {
      console.log(`      ⚠️  [WS-${worksheetId}] Network idle timeout - continuing anyway`);
    });

    // Step 2: Wait for images to be visible and loaded
    await page.waitForFunction(() => {
      const images = document.querySelectorAll('img');
      return Array.from(images).every(img => img.complete && img.naturalHeight > 0);
    }, { timeout: 15000 }).catch(() => {
      console.log(`      ⚠️  [WS-${worksheetId}] Some images may not be loaded - continuing anyway`);
    });

    // Step 3: Scroll to bottom to ensure answer key is in viewport and rendered
    console.log(`      ⏳ [WS-${worksheetId}] Scrolling to ensure answer key is visible...`);
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(2000); // Let answer key render

    // Step 4: Scroll back to top for full screenshot
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });

    // Step 5: Streaming-aware wait for complete rendering
    // Handles progressive rendering from streaming responses
    console.log(`      ⏳ [WS-${worksheetId}] Waiting for streaming to complete...`);

    const streamingComplete = await page.evaluate(async () => {
      return new Promise((resolve) => {
        let checkCount = 0;
        const maxChecks = 15; // 15 seconds max
        let lastContentLength = 0;
        let stableChecks = 0;

        const checkInterval = setInterval(() => {
          checkCount++;

          const worksheet = document.querySelector('.worksheet-preview') || document.querySelector('.worksheet');
          if (!worksheet) {
            if (checkCount >= maxChecks) {
              clearInterval(checkInterval);
              resolve(false);
            }
            return;
          }

          // Check 1: Content length stability (detects when streaming stops)
          const currentLength = worksheet.textContent.length;
          if (currentLength === lastContentLength && currentLength > 100) {
            stableChecks++;
          } else {
            stableChecks = 0;
          }
          lastContentLength = currentLength;

          // Check 2: Answer key has actual content (not just element exists)
          const answerKey = worksheet.querySelector('.answer-key, [class*="answer"], [id*="answer"]');
          const hasAnswerContent = answerKey && answerKey.textContent.trim().length > 20;

          // Check 3: All images loaded and visible
          const images = Array.from(worksheet.querySelectorAll('img'));
          const allImagesLoaded = images.length > 0 && images.every(img => img.complete && img.naturalHeight > 0);

          // Success: Content stable for 2 consecutive checks AND answer key has content AND images loaded
          if (stableChecks >= 2 && hasAnswerContent && allImagesLoaded) {
            clearInterval(checkInterval);
            resolve(true);
          }

          // Timeout - return false to trigger fallback
          if (checkCount >= maxChecks) {
            clearInterval(checkInterval);
            resolve(false);
          }
        }, 1000); // Check every second
      });
    });

    if (streamingComplete) {
      console.log(`      ✅ [WS-${worksheetId}] Streaming complete - worksheet fully rendered`);
      await page.waitForTimeout(1000); // Small final buffer
    } else {
      console.log(`      ⚠️  [WS-${worksheetId}] Streaming check timeout - using fallback wait`);
      await page.waitForTimeout(8000); // Conservative fallback for safety
    }

    console.log(`      📸 [WS-${worksheetId}] Capturing screenshot...`);

    // Take screenshot
    const screenshotPath = path.join(screenshotDir, `ws-${worksheetId}-worksheet.png`);
    await page.screenshot({
      path: screenshotPath,
      fullPage: true
    });

    // Add to assessment queue immediately (for parallel processing)
    if (AGENT_CONFIG.ENABLE_VISION) {
      addToAssessmentQueue({
        screenshotPath,
        configId,
        config,
        worksheetId
      }, SESSION_DIR);
    }

    // Extract content (use .last() to handle cases where multiple worksheet elements exist)
    const text = await page.locator('.worksheet-preview, .worksheet').last().textContent();
    const questions = (text.match(/\d+[\.\)]\s*.+/g) || []);
    const imageElements = await page.locator('.worksheet-preview img, .worksheet img').all();
    const images = await Promise.all(
      imageElements.map(async img => ({
        src: await img.getAttribute('src') || '',
        alt: await img.getAttribute('alt') || '',
        visible: await img.isVisible()
      }))
    );
    const html = await page.locator('.worksheet-preview, .worksheet').last().innerHTML();

    const endTime = performance.now();
    const generationTime = (endTime - startTime) / 1000;

    console.log(`      ✅ [WS-${worksheetId}] Generated in ${generationTime.toFixed(2)}s`);

    return {
      success: true,
      worksheetId,
      generationTime,
      screenshotPath,
      content: {
        text,
        questions,
        images,
        html
      }
    };

  } catch (error) {
    const endTime = performance.now();
    const generationTime = (endTime - startTime) / 1000;

    console.log(`      ❌ [WS-${worksheetId}] Failed in ${generationTime.toFixed(2)}s: ${error.message}`);
    console.log(`      💬 User message: Sorry for the inconvenience, please regenerate. Thanks!`);

    return {
      success: false,
      worksheetId,
      error: error.message,
      userMessage: 'Sorry for the inconvenience, please regenerate. Thanks!',
      generationTime
    };
  }
}

// ============================================================================
// BATCH PROCESSOR (SEQUENTIAL - One worksheet at a time)
// ============================================================================

async function processBatchSequential(browser, batchNum, config) {
  console.log('\n' + '━'.repeat(80));
  console.log(`📦 BATCH ${batchNum} - Generating ${AGENT_CONFIG.BATCH_SIZE} worksheets sequentially`);
  console.log('━'.repeat(80) + '\n');

  const batchStartTime = performance.now();
  const screenshotDir = path.join(SESSION_DIR, `batch-${batchNum}-screenshots`);
  fs.mkdirSync(screenshotDir, { recursive: true });

  // Create context manager
  const contextManager = new BrowserContextManager(browser, 1); // Only 1 context at a time

  // Generate worksheets one at a time
  const results = [];
  const worksheetIds = Array.from({ length: AGENT_CONFIG.BATCH_SIZE }, (_, i) => i + 1);

  console.log(`   🚀 Starting sequential generation (reusing context for freshness)...\n`);

  // FRESHNESS FIX: Create ONE context and reuse it for all worksheets
  const contextId = `batch${batchNum}-shared`;
  const { page } = await contextManager.createContext(contextId);

  try {
    for (const worksheetId of worksheetIds) {
      try {
        const result = await generateWorksheetInContext(page, worksheetId, config, screenshotDir, config.configId, worksheetId > 1);
        results.push(result);
      } catch (error) {
        results.push({
          success: false,
          worksheetId,
          error: error.message,
          userMessage: 'Sorry for the inconvenience, please regenerate. Thanks!',
          generationTime: 0
        });
      }
    }
  } finally {
    // Close the shared context after all worksheets are done
    await contextManager.closeContext(contextId);
  }

  // Close all contexts
  await contextManager.closeAll();

  const batchEndTime = performance.now();
  const batchTime = (batchEndTime - batchStartTime) / 1000;

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const avgTime = successful > 0
    ? results.filter(r => r.success).reduce((sum, r) => sum + r.generationTime, 0) / successful
    : 0;

  console.log('\n' + '━'.repeat(80));
  console.log(`📊 BATCH ${batchNum} COMPLETE`);
  console.log('━'.repeat(80));
  console.log(`   Total Time: ${batchTime.toFixed(2)}s`);
  console.log(`   Successful: ${successful}/${AGENT_CONFIG.BATCH_SIZE}`);
  console.log(`   Failed: ${failed}/${AGENT_CONFIG.BATCH_SIZE}`);
  console.log(`   Avg Generation Time: ${avgTime.toFixed(2)}s`);
  console.log('━'.repeat(80) + '\n');

  return {
    batchNum,
    batchTime,
    results,
    successful,
    failed,
    avgTime,
    timePerWorksheet: batchTime / AGENT_CONFIG.BATCH_SIZE
  };
}

// ============================================================================
// BATCH PROCESSOR (ORIGINAL - PARALLEL - NOT USED IN MULTI-CONFIG MODE)
// ============================================================================

async function processBatch(browser, batchNum, config) {
  console.log('\n' + '━'.repeat(80));
  console.log(`📦 BATCH ${batchNum} - Generating ${AGENT_CONFIG.BATCH_SIZE} worksheets in parallel`);
  console.log('━'.repeat(80) + '\n');

  const batchStartTime = performance.now();
  const screenshotDir = path.join(SESSION_DIR, `batch-${batchNum}-screenshots`);
  fs.mkdirSync(screenshotDir, { recursive: true });

  // Create context manager
  const contextManager = new BrowserContextManager(browser, AGENT_CONFIG.MAX_CONCURRENT);

  // Generate worksheets in parallel batches (respecting maxConcurrent limit)
  const results = [];
  const worksheetIds = Array.from({ length: AGENT_CONFIG.BATCH_SIZE }, (_, i) => i + 1);

  console.log(`   🚀 Starting parallel generation (max ${AGENT_CONFIG.MAX_CONCURRENT} concurrent)...\n`);

  // Process in chunks to respect maxConcurrent limit
  for (let i = 0; i < worksheetIds.length; i += AGENT_CONFIG.MAX_CONCURRENT) {
    const chunk = worksheetIds.slice(i, i + AGENT_CONFIG.MAX_CONCURRENT);
    const chunkNum = Math.floor(i / AGENT_CONFIG.MAX_CONCURRENT) + 1;

    console.log(`   📋 Chunk ${chunkNum}: Processing worksheets ${chunk.join(', ')}...\n`);

    const chunkPromises = chunk.map(async (worksheetId) => {
      const contextId = `batch${batchNum}-ws${worksheetId}`;
      const { page } = await contextManager.createContext(contextId);

      try {
        const result = await generateWorksheetInContext(page, worksheetId, config, screenshotDir, config.configId);
        return result;
      } finally {
        await contextManager.closeContext(contextId);
      }
    });

    const chunkResults = await Promise.all(chunkPromises);
    results.push(...chunkResults);

    console.log(`\n   ✅ Chunk ${chunkNum} complete: ${chunkResults.filter(r => r.success).length}/${chunkResults.length} successful\n`);
  }

  // Close all contexts
  await contextManager.closeAll();

  const batchEndTime = performance.now();
  const batchTime = (batchEndTime - batchStartTime) / 1000;

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const avgTime = successful > 0
    ? results.filter(r => r.success).reduce((sum, r) => sum + r.generationTime, 0) / successful
    : 0;

  console.log('\n' + '━'.repeat(80));
  console.log(`📊 BATCH ${batchNum} COMPLETE`);
  console.log('━'.repeat(80));
  console.log(`   Total Time: ${batchTime.toFixed(2)}s`);
  console.log(`   Successful: ${successful}/${AGENT_CONFIG.BATCH_SIZE}`);
  console.log(`   Failed: ${failed}/${AGENT_CONFIG.BATCH_SIZE}`);
  console.log(`   Avg Generation Time: ${avgTime.toFixed(2)}s`);
  console.log(`   Time per Worksheet (amortized): ${(batchTime / AGENT_CONFIG.BATCH_SIZE).toFixed(2)}s`);
  console.log(`   Speedup vs Sequential: ${(avgTime / (batchTime / AGENT_CONFIG.BATCH_SIZE)).toFixed(2)}x`);
  console.log('━'.repeat(80) + '\n');

  return {
    batchNum,
    batchTime,
    results,
    successful,
    failed,
    avgTime,
    timePerWorksheet: batchTime / AGENT_CONFIG.BATCH_SIZE
  };
}

// ============================================================================
// MULTI-CONFIG PROCESSOR
// ============================================================================

async function processConfigBatch(browser, configId, configIndex, totalConfigs, delayBeforeStart = 0) {
  const config = { ...CONFIG_REGISTRY[configId], configId };

  // Delay before starting this config (for staggered browser launches)
  if (delayBeforeStart > 0) {
    console.log(`   ⏳ Waiting ${delayBeforeStart}s before starting ${config.subtopic}...`);
    await new Promise(resolve => setTimeout(resolve, delayBeforeStart * 1000));
  }

  console.log('\n' + '='.repeat(80));
  console.log(`📋 CONFIG ${configIndex + 1}/${totalConfigs}: ${config.subtopic} (${config.topic})`);
  console.log('='.repeat(80));

  const configStartTime = performance.now();
  const configDir = path.join(SESSION_DIR, configId);
  fs.mkdirSync(configDir, { recursive: true });

  // Process the batch for this config (sequentially, one worksheet at a time)
  const batchResult = await processBatchSequential(browser, configIndex + 1, config);

  // Add config metadata
  batchResult.configId = configId;
  batchResult.config = config;
  batchResult.configDir = configDir;

  const configEndTime = performance.now();
  batchResult.configTime = (configEndTime - configStartTime) / 1000;

  console.log(`\n✅ Config ${configIndex + 1}/${totalConfigs} complete: ${config.subtopic}`);
  console.log(`   Worksheets: ${batchResult.successful}/${AGENT_CONFIG.BATCH_SIZE}`);
  console.log(`   Time: ${batchResult.configTime.toFixed(2)}s\n`);

  return batchResult;
}

async function processAllConfigs(browser) {
  console.log('\n' + '='.repeat(80));
  console.log('📦 PROCESSING ALL CONFIGS');
  console.log('='.repeat(80) + '\n');

  const allConfigResults = [];

  // Process configs in parallel (N at a time) with staggered launches
  for (let i = 0; i < configIds.length; i += AGENT_CONFIG.CONFIGS_PARALLEL) {
    const configChunk = configIds.slice(i, i + AGENT_CONFIG.CONFIGS_PARALLEL);
    const chunkNum = Math.floor(i / AGENT_CONFIG.CONFIGS_PARALLEL) + 1;

    console.log(`\n🔄 Processing Config Chunk ${chunkNum}: ${configChunk.length} configs in parallel\n`);
    console.log(`   All configs will start immediately (no artificial delay)
`);

    // Launch configs in parallel (no stagger delay - browsers can handle it)
    const chunkPromises = configChunk.map((configId, idx) =>
      processConfigBatch(browser, configId, i + idx, configIds.length, 0)
    );

    const chunkResults = await Promise.all(chunkPromises);
    allConfigResults.push(...chunkResults);

    console.log(`\n✅ Config Chunk ${chunkNum} complete\n`);
  }

  return allConfigResults;
}

// ============================================================================
// PREPARE FOR CLAUDE CODE VISION ASSESSMENT (No API, No Auto-Assessment)
// ============================================================================

async function prepareForVisionAssessment(allConfigResults) {
  if (!AGENT_CONFIG.ENABLE_VISION) {
    console.log('\n👁️  Vision assessment disabled (--enable-vision=false)\n');
    return [];
  }

  console.log('\n' + '='.repeat(80));
  console.log('👁️  WORKSHEETS READY FOR CLAUDE CODE VISION ASSESSMENT');
  console.log('='.repeat(80) + '\n');

  // Collect all screenshots from all configs
  const allScreenshots = [];
  for (const configResult of allConfigResults) {
    for (const worksheetResult of configResult.results.filter(r => r.success)) {
      allScreenshots.push({
        configId: configResult.configId,
        config: configResult.config,
        worksheetId: worksheetResult.worksheetId,
        screenshotPath: worksheetResult.screenshotPath,
        visionResult: null
      });
    }
  }

  console.log(`📸 Total Screenshots: ${allScreenshots.length}`);
  console.log(`📋 From ${allConfigResults.length} configs\n`);

  // Display screenshot listing
  console.log('📋 Screenshot Paths:\n');
  allConfigResults.forEach((configResult, idx) => {
    const worksheetCount = configResult.results.filter(r => r.success).length;
    console.log(`   ${idx + 1}. ${configResult.config.subtopic}: ${worksheetCount} worksheets`);

    configResult.results.filter(r => r.success).forEach(ws => {
      console.log(`      - Worksheet ${ws.worksheetId}: ${ws.screenshotPath}`);
    });
  });
  console.log('');

  // Save screenshot metadata
  const assessmentTasksPath = path.join(SESSION_DIR, 'vision-assessment-tasks.json');
  fs.writeFileSync(assessmentTasksPath, JSON.stringify(allScreenshots, null, 2));
  console.log(`📁 Assessment Tasks Saved: ${assessmentTasksPath}\n`);

  // ========================================================================
  // INSTRUCTIONS FOR CLAUDE CODE VISION ASSESSMENT
  // ========================================================================
  console.log('═'.repeat(80));
  console.log('📝 NEXT STEP: CLAUDE CODE VISION ASSESSMENT');
  console.log('═'.repeat(80));
  console.log('');
  console.log('The agent has completed worksheet generation. Now use Claude Code to assess:');
  console.log('');
  console.log('1. Tell Claude Code: "Assess all worksheets in the session directory"');
  console.log(`   Session: ${SESSION_DIR}`);
  console.log('');
  console.log('2. Claude Code will:');
  console.log('   - Use Read tool to view each screenshot');
  console.log('   - Apply STRICT criteria (scripts/STRICT-VISION-ASSESSMENT-CRITERIA.md)');
  console.log('   - Zero-tolerance: ANY broken images/identical comparisons = FAIL');
  console.log('   - Save results to vision-assessment-results.json');
  console.log('');
  console.log('3. After assessments complete, Claude Code will:');
  console.log('   - Automatically generate comprehensive HTML report');
  console.log('   - Include all vision assessment results');
  console.log('   - Open report in browser');
  console.log('');
  console.log('═'.repeat(80));
  console.log('');
  console.log('⏸️  Agent paused - waiting for Claude Code vision assessment');
  console.log('💡 TIP: Copy the session directory path and tell Claude Code to assess\n');

  return allScreenshots;
}

// ============================================================================
// CONSOLIDATED HTML REPORT GENERATION
// ============================================================================

function generateConsolidatedHTMLReport(allConfigResults, allScreenshots) {
  const totalWorksheets = allConfigResults.reduce((sum, r) => sum + r.successful, 0);
  const totalFailed = allConfigResults.reduce((sum, r) => sum + r.failed, 0);
  const totalTime = performanceData.totalTime;

  // Calculate vision assessment stats
  const visionAssessed = allScreenshots.filter(s => s.visionResult?.success).length;
  const productionReady = allScreenshots.filter(s =>
    s.visionResult?.success && s.visionResult.overallAssessment?.productionReady
  ).length;
  const avgVisionScore = visionAssessed > 0
    ? allScreenshots
        .filter(s => s.visionResult?.success)
        .reduce((sum, s) => sum + (s.visionResult.overallAssessment?.score || 0), 0) / visionAssessed
    : 0;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Multi-Config Batch Report - ${configInput}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
    h1 { color: #333; }
    .summary { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .config-section { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .config-header { font-size: 1.2em; font-weight: bold; color: #2563eb; margin-bottom: 10px; }
    .vision-section { background: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; margin: 15px 0; border-radius: 4px; }
    .vision-warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 15px 0; border-radius: 4px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #f1f5f9; font-weight: bold; }
    .screenshot { max-width: 400px; border: 1px solid #ddd; margin: 10px 0; }
    .success { color: green; font-weight: bold; }
    .failed { color: red; font-weight: bold; }
    .warning { color: orange; font-weight: bold; }
    .badge { padding: 4px 8px; border-radius: 4px; font-size: 0.85em; font-weight: bold; }
    .badge-success { background: #10b981; color: white; }
    .badge-warning { background: #f59e0b; color: white; }
    .badge-danger { background: #ef4444; color: white; }
  </style>
</head>
<body>
  <h1>📊 Multi-Config Batch Report: ${configInput}</h1>

  <div class="summary">
    <h2>Summary</h2>
    <p><strong>Session ID:</strong> ${SESSION_ID}</p>
    <p><strong>Configs Processed:</strong> ${allConfigResults.length}</p>
    <p><strong>Total Worksheets:</strong> <span class="success">${totalWorksheets} successful</span>, <span class="failed">${totalFailed} failed</span></p>
    <p><strong>Total Time:</strong> ${totalTime.toFixed(2)}s (${(totalTime / 60).toFixed(2)} minutes)</p>
    <p><strong>Worksheets per Config:</strong> ${AGENT_CONFIG.BATCH_SIZE}</p>
    <p><strong>Configs in Parallel:</strong> ${AGENT_CONFIG.CONFIGS_PARALLEL}</p>
    <p><strong>Vision Assessment:</strong> ${AGENT_CONFIG.ENABLE_VISION ? 'Enabled (Expert Teacher Persona)' : 'Disabled'}</p>
    ${AGENT_CONFIG.ENABLE_VISION ? `
      <p><strong>Vision Assessed:</strong> ${visionAssessed}/${allScreenshots.length}</p>
      <p><strong>Production Ready:</strong> <span class="${productionReady > 0 ? 'success' : 'warning'}">${productionReady}/${visionAssessed}</span> (${visionAssessed > 0 ? ((productionReady/visionAssessed)*100).toFixed(1) : 0}%)</p>
      <p><strong>Average Vision Score:</strong> ${avgVisionScore.toFixed(1)}/100</p>
    ` : ''}
  </div>

  ${AGENT_CONFIG.ENABLE_VISION && visionAssessed > 0 ? `
    <div class="summary">
      <h2>👁️ Vision Assessment Summary (Expert Primary School Teacher)</h2>
      <table>
        <tr>
          <th>#</th>
          <th>Config</th>
          <th>Worksheet</th>
          <th>Status</th>
          <th>Score</th>
          <th>Teacher Would Use?</th>
          <th>Critical Issues</th>
        </tr>
        ${allScreenshots.filter(s => s.visionResult?.success).map((ss, idx) => {
          const v = ss.visionResult.overallAssessment;
          const status = v.productionReady ?
            '<span class="badge badge-success">✅ READY</span>' :
            '<span class="badge badge-warning">⚠️ NEEDS WORK</span>';
          const teacherUse = v.teacherWouldUse ? '👍 Yes' : '👎 No';
          const issues = v.criticalIssues && v.criticalIssues.length > 0
            ? v.criticalIssues.join(', ')
            : 'None';
          return `
            <tr>
              <td>${idx + 1}</td>
              <td>${ss.config.subtopic}</td>
              <td>${ss.worksheetId}</td>
              <td>${status}</td>
              <td>${v.score || 0}/100</td>
              <td>${teacherUse}</td>
              <td>${issues}</td>
            </tr>
          `;
        }).join('')}
      </table>
    </div>
  ` : ''}

  ${allConfigResults.map((configResult, idx) => `
    <div class="config-section">
      <div class="config-header">${idx + 1}. ${configResult.config.subtopic} (${configResult.config.topic})</div>
      <p><strong>Config ID:</strong> ${configResult.configId}</p>
      <p><strong>Worksheets:</strong> <span class="success">${configResult.successful}</span> / ${AGENT_CONFIG.BATCH_SIZE}</p>
      <p><strong>Time:</strong> ${configResult.configTime.toFixed(2)}s</p>

      <h3>Worksheets</h3>
      ${configResult.results.filter(r => r.success).map(ws => {
        const screenshot = allScreenshots.find(s =>
          s.configId === configResult.configId && s.worksheetId === ws.worksheetId
        );
        const vision = screenshot?.visionResult?.success ? screenshot.visionResult : null;

        return `
          <div style="margin-bottom: 30px; border: 1px solid #ddd; padding: 15px; border-radius: 8px;">
            <p><strong>Worksheet ${ws.worksheetId}</strong> (Generated in ${ws.generationTime.toFixed(2)}s)</p>

            ${vision ? `
              <div class="${vision.overallAssessment.productionReady ? 'vision-section' : 'vision-warning'}">
                <h4>👁️ Expert Teacher Assessment</h4>
                <p><strong>Status:</strong> ${vision.overallAssessment.productionReady ? '✅ Production Ready' : '⚠️ Needs Improvement'}</p>
                <p><strong>Overall Score:</strong> ${vision.overallAssessment.score}/100</p>
                <p><strong>Teacher Would Use:</strong> ${vision.overallAssessment.teacherWouldUse ? '👍 Yes' : '👎 No'}</p>
                ${vision.overallAssessment.criticalIssues?.length > 0 ? `
                  <p><strong>Critical Issues:</strong></p>
                  <ul>
                    ${vision.overallAssessment.criticalIssues.map(issue => `<li>${issue}</li>`).join('')}
                  </ul>
                ` : ''}
                ${vision.overallAssessment.recommendations?.length > 0 ? `
                  <p><strong>Recommendations:</strong></p>
                  <ul>
                    ${vision.overallAssessment.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                  </ul>
                ` : ''}
                <details>
                  <summary><strong>Detailed Assessment</strong></summary>
                  <p><strong>Visual Question Count:</strong> ${vision.visualQuestionCount} (Expected: ${vision.expectedQuestionCount})</p>
                  <p><strong>Images Working:</strong> ${vision.totalImagesWorking}/${vision.totalImagesExpected}</p>
                  ${vision.numberRangeViolations?.length > 0 ? `
                    <p><strong>Number Range Violations:</strong> ${vision.numberRangeViolations.map(v => v.number).join(', ')}</p>
                  ` : ''}
                </details>
              </div>
            ` : ''}

            <img src="file:///${ws.screenshotPath.replace(/\\/g, '/')}" class="screenshot" alt="Worksheet ${ws.worksheetId}" />
          </div>
        `;
      }).join('')}
    </div>
  `).join('')}

</body>
</html>
  `;

  const htmlPath = path.join(SESSION_DIR, 'multi-config-report.html');
  fs.writeFileSync(htmlPath, html);
  return htmlPath;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  try {
    // Wait for server
    console.log(`⏳ Waiting for server at ${AGENT_CONFIG.BASE_URL}...`);
    for (let i = 0; i < 30; i++) {
      try {
        const response = await fetch(AGENT_CONFIG.BASE_URL);
        if (response.ok) {
          console.log(`✅ Server is ready!\n`);
          break;
        }
      } catch (error) {
        // Server not ready
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Launch browser (single instance for all contexts)
    console.log('🌐 Launching browser...\n');
    const browser = await chromium.launch({
      headless: AGENT_CONFIG.HEADLESS,
      args: ['--window-size=1920,1080']
    });

    // Process all configs (with config-level parallelism)
    const allConfigResults = await processAllConfigs(browser);
    performanceData.configs = allConfigResults;
    performanceData.totalWorksheets = allConfigResults.reduce((sum, r) => sum + r.successful, 0);

    // Close browser
    await browser.close();
    console.log('🌐 Browser closed\n');

    // Prepare for Claude Code vision assessment (no HTML report yet)
    let allScreenshots = [];
    if (AGENT_CONFIG.ENABLE_VISION) {
      allScreenshots = await prepareForVisionAssessment(allConfigResults);
    }

    // Calculate final metrics
    performanceData.endTime = performance.now();
    performanceData.totalTime = (performanceData.endTime - performanceData.startTime) / 1000;

    const totalSuccessful = allConfigResults.reduce((sum, r) => sum + r.successful, 0);
    const totalFailed = allConfigResults.reduce((sum, r) => sum + r.failed, 0);
    const totalTime = performanceData.totalTime;

    console.log('📈 Worksheet Generation Summary:');
    console.log(`   Configs Processed: ${allConfigResults.length}`);
    console.log(`   Total Worksheets: ${totalSuccessful} successful, ${totalFailed} failed`);
    console.log(`   Total Time: ${totalTime.toFixed(2)}s (${(totalTime / 60).toFixed(2)} minutes)`);
    console.log(`   Avg Time per Config: ${(totalTime / allConfigResults.length).toFixed(2)}s`);
    console.log(`   Avg Time per Worksheet: ${totalTime > 0 && totalSuccessful > 0 ? (totalTime / totalSuccessful).toFixed(2) : '0'}s`);
    console.log('');

    console.log(`📋 Config Breakdown:`);
    allConfigResults.forEach((configResult, idx) => {
      console.log(`   ${idx + 1}. ${configResult.config.subtopic}: ${configResult.successful}/${AGENT_CONFIG.BATCH_SIZE} (${configResult.configTime.toFixed(2)}s)`);
    });
    console.log('');

    // Save JSON metadata (no HTML report yet)
    const jsonReportPath = path.join(SESSION_DIR, 'generation-metadata.json');
    fs.writeFileSync(jsonReportPath, JSON.stringify(performanceData, null, 2));
    console.log(`📁 Generation Metadata Saved: ${jsonReportPath}\n`);

    // Mark generation as complete (for live-vision-worker)
    const completionMarkerPath = path.join(SESSION_DIR, 'generation-complete.json');
    fs.writeFileSync(completionMarkerPath, JSON.stringify({
      completed: true,
      timestamp: Date.now(),
      totalWorksheets: totalSuccessful,
      totalConfigs: allConfigResults.length
    }, null, 2));
    console.log(`✅ Generation marked as complete for live workers\n`);

    console.log('✅ WORKSHEET GENERATION COMPLETE!\n');
    console.log('📋 Next Steps:');
    console.log(`   1. ✅ Generated ${totalSuccessful} worksheets across ${allConfigResults.length} configs`);
    console.log(`   2. ⏭️  Use Claude Code to assess worksheets (see instructions above)`);
    console.log(`   3. ⏭️  Comprehensive HTML report will be generated after assessment\n`);

    // Exit and wait for Claude Code assessment
    console.log('🎯 Agent completed successfully. Waiting for Claude Code vision assessment...\n');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run multi-config batch processor
main();
