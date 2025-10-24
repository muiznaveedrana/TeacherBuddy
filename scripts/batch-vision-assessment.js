#!/usr/bin/env node

/**
 * Batch Vision Assessment Script
 * Performs vision assessments on multiple worksheet sessions in parallel
 */

const fs = require('fs').promises;
const path = require('path');

const sessions = [
  'reception-eco-reception-shape-space-size-comparison-2025-10-18T15-20-20-046Z',
  'reception-eco-reception-number-counting-counting-to-10-2025-10-18T15-21-20-531Z',
  'reception-eco-reception-number-counting-number-recognition-2025-10-18T15-22-12-544Z',
  'reception-eco-reception-number-counting-more-or-less-2025-10-18T15-23-10-129Z'
];

const baseDir = 'M:\\ClaudeCodeProjects\\worksheetgenerator-ai\\worksheet-quality-reports\\reception-eco-assessment';

async function main() {
  console.log('================================================================================');
  console.log('📊 BATCH VISION ASSESSMENT - All 4 Configs (8 Worksheets)');
  console.log('================================================================================\n');

  for (const session of sessions) {
    const sessionDir = path.join(baseDir, session);
    const screenshotsDir = path.join(sessionDir, 'screenshots');
    const visionTasksDir = path.join(sessionDir, 'vision-tasks');

    console.log(`\n📁 Session: ${session}`);
    console.log(`   Screenshots: ${screenshotsDir}`);
    console.log(`   Vision Tasks: ${visionTasksDir}`);

    // List screenshots
    const screenshots = await fs.readdir(screenshotsDir);
    console.log(`   Found ${screenshots.length} screenshots`);

    for (const screenshot of screenshots) {
      console.log(`      - ${screenshot}`);
    }
  }

  console.log('\n================================================================================');
  console.log('✅ Ready for Vision Assessment');
  console.log('================================================================================');
  console.log('\nNext: Use Claude Code vision to assess each screenshot');
  console.log('Files to assess:');

  let count = 1;
  for (const session of sessions) {
    const sessionDir = path.join(baseDir, session);
    console.log(`\n${count}. ${session}:`);
    console.log(`   Iteration 1: ${path.join(sessionDir, 'screenshots', 'iteration-1-worksheet.png')}`);
    console.log(`   Iteration 2: ${path.join(sessionDir, 'screenshots', 'iteration-2-worksheet.png')}`);
    count++;
  }
}

main().catch(console.error);
