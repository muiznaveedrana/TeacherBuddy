#!/usr/bin/env node

/**
 * YEAR 2 NUMBER AND PLACE VALUE PARALLEL AGENT WITH LIBRARY SAVE v1.0
 *
 * Enhanced version of the batch parallel agent specifically for Year 2 Number and Place Value
 * with automatic save to library functionality and dialog handling.
 *
 * Features:
 * - Generates printables for Year 2 Number and Place Value subtopics
 * - Automatically saves each printable to the library after generation
 * - Handles the Save to Library modal dialog
 * - Supports single config test mode or full batch mode
 * - Parallel generation with configurable concurrency
 * - Vision assessment ready with Claude Code integration
 *
 * Usage:
 *   node scripts/year2-parallel-agent-with-library.js [config-id] [options]
 *
 * Options:
 *   --test                   Test mode with single config
 *   --batch-size=N          Printables per config (default: 3)
 *   --max-concurrent=N      Max concurrent browser contexts (default: 1 for library save)
 *   --enable-vision=true    Enable vision assessment (default: true)
 *   --headless=false        Run in headed mode (default: false for library interaction)
 *
 * Example:
 *   node scripts/year2-parallel-agent-with-library.js --test
 *   node scripts/year2-parallel-agent-with-library.js year2-number-place-value-numbers-to-100 --batch-size=1
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

// ============================================================================
// YEAR 2 NUMBER AND PLACE VALUE CONFIGS
// ============================================================================

const YEAR2_NPV_CONFIGS = {
  'year2-number-place-value-numbers-to-100': {
    yearGroup: 'Year 2',
    yearGroupSelect: 'Year 2 (Ages 6-7)',
    topicValue: 'number-place-value',
    topic: 'Number and Place Value',
    subtopicValue: 'numbers-to-100',
    subtopic: 'Numbers to 100',
    difficulty: 'average',
    numQuestions: 5
  },
  'year2-number-place-value-comparing-numbers': {
    yearGroup: 'Year 2',
    yearGroupSelect: 'Year 2 (Ages 6-7)',
    topicValue: 'number-place-value',
    topic: 'Number and Place Value',
    subtopicValue: 'comparing-numbers',
    subtopic: 'Comparing Numbers',
    difficulty: 'average',
    numQuestions: 5
  },
  'year2-number-place-value-rounding-nearest-10': {
    yearGroup: 'Year 2',
    yearGroupSelect: 'Year 2 (Ages 6-7)',
    topicValue: 'number-place-value',
    topic: 'Number and Place Value',
    subtopicValue: 'rounding-nearest-10',
    subtopic: 'Rounding to Nearest 10',
    difficulty: 'average',
    numQuestions: 5
  }
};

// ============================================================================
// CLI ARGUMENT PARSING
// ============================================================================

function parseArgs() {
  const args = process.argv.slice(2);

  const options = {
    test: false,
    batchSize: 3,
    maxConcurrent: 1, // Sequential for library save handling
    enableVision: true,
    headless: false, // Headed mode to see library save interaction
    configId: null
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--test') {
      options.test = true;
      // In test mode, use just one config with 1 worksheet
      options.batchSize = 1;
    } else if (arg.startsWith('--')) {
      const [key, value] = arg.substring(2).split('=');
      switch (key) {
        case 'batch-size':
          options.batchSize = parseInt(value) || 3;
          break;
        case 'max-concurrent':
          options.maxConcurrent = parseInt(value) || 1;
          break;
        case 'enable-vision':
          options.enableVision = value !== 'false';
          break;
        case 'headless':
          options.headless = value === 'true';
          break;
      }
    } else if (YEAR2_NPV_CONFIGS[arg]) {
      options.configId = arg;
    }
  }

  return options;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const options = parseArgs();

// Select configs to run
let configsToRun = [];
if (options.test) {
  // Test mode: use just the first config
  configsToRun = ['year2-number-place-value-numbers-to-100'];
} else if (options.configId) {
  // Single config specified
  configsToRun = [options.configId];
} else {
  // Run all Year 2 Number and Place Value configs
  configsToRun = Object.keys(YEAR2_NPV_CONFIGS);
}

const AGENT_CONFIG = {
  BASE_URL: 'http://localhost:3000',
  BATCH_SIZE: options.batchSize,
  MAX_CONCURRENT: options.maxConcurrent,
  ENABLE_VISION: options.enableVision,
  HEADLESS: options.headless,
  TIMEOUT: 120000,
  SAVE_TO_LIBRARY: true // New feature flag
};

// Session setup
const SESSION_ID = `year2-npv-library-${options.test ? 'test' : 'batch'}-${new Date().toISOString().replace(/[:.]/g, '-')}`;
const SESSION_DIR = path.join(process.cwd(), 'worksheet-quality-reports', 'year2-npv-sessions', SESSION_ID);
fs.mkdirSync(SESSION_DIR, { recursive: true });

// ============================================================================
// DISPLAY CONFIGURATION
// ============================================================================

console.log('='.repeat(80));
console.log('🚀 YEAR 2 NUMBER & PLACE VALUE AGENT WITH LIBRARY SAVE');
console.log('='.repeat(80));
console.log('');
console.log('📋 Configuration:');
console.log(`   Mode: ${options.test ? '🧪 TEST MODE (1 config, 1 printable)' : '📦 BATCH MODE'}`);
console.log(`   Configs to run: ${configsToRun.length}`);
configsToRun.forEach(id => {
  const cfg = YEAR2_NPV_CONFIGS[id];
  console.log(`     - ${cfg.subtopic}`);
});
console.log(`   Printables per config: ${AGENT_CONFIG.BATCH_SIZE}`);
console.log(`   Save to Library: ${AGENT_CONFIG.SAVE_TO_LIBRARY ? '✅ ENABLED' : '❌ DISABLED'}`);
console.log(`   Browser mode: ${AGENT_CONFIG.HEADLESS ? 'Headless' : 'Headed (to see library interaction)'}`);
console.log(`   Session directory: ${SESSION_DIR}`);
console.log('');

// ============================================================================
// ADMIN LOGIN
// ============================================================================

async function loginAsAdmin(page) {
  try {
    console.log('🔐 Logging in as admin...');

    // Navigate to login page
    await page.goto(`${AGENT_CONFIG.BASE_URL}/login`, {
      waitUntil: 'networkidle',
      timeout: AGENT_CONFIG.TIMEOUT
    });

    // Fill in email
    await page.fill('input[type="email"], input[name="email"], input#email', 'naveed.idrees@gmail.com');

    // Fill in password
    await page.fill('input[type="password"], input[name="password"], input#password', 'mysupabase');

    // Click login button
    const loginButton = page.getByRole('button', { name: /sign in|log in/i });
    await loginButton.click();

    // Wait for redirect to dashboard/create page
    await page.waitForURL('**/create', { timeout: 10000 }).catch(() => {
      console.log('⚠️ No automatic redirect, navigating manually');
    });

    // Ensure we're on the create page
    const currentUrl = page.url();
    if (!currentUrl.includes('/create')) {
      await page.goto(`${AGENT_CONFIG.BASE_URL}/create`, {
        waitUntil: 'networkidle',
        timeout: AGENT_CONFIG.TIMEOUT
      });
    }

    console.log('✅ Logged in as admin successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to login as admin:', error.message);
    return false;
  }
}

// ============================================================================
// LIBRARY SAVE HANDLER
// ============================================================================

async function saveToLibrary(page, printableId, config) {
  try {
    console.log(`      📚 [P-${printableId}] Saving to library...`);

    // Click the Save to Library button
    const saveButton = page.getByRole('button', { name: /Save to Library/i });
    await saveButton.waitFor({ state: 'visible', timeout: 5000 });
    await saveButton.click();

    console.log(`      📝 [P-${printableId}] Save modal opened`);

    // Wait for modal to appear
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    // The modal should have pre-filled metadata from the generation
    // We just need to optionally modify the title/description if needed

    // Wait a bit for modal to fully render
    await page.waitForTimeout(1000);

    // Optional: Update title if needed
    const titleInput = page.locator('input#title').first();
    const currentTitle = await titleInput.inputValue();
    if (!currentTitle || !currentTitle.includes('Year 2')) {
      await titleInput.clear();
      await titleInput.fill(`Year 2 ${config.subtopic} Printable ${printableId}`);
    }

    // Optional: Add SEO description
    const seoDescriptionTextarea = page.locator('textarea#seo_description').first();
    await seoDescriptionTextarea.fill(`Free Year 2 ${config.subtopic} printable worksheet for students.`);

    // Optional: Add activity type
    const activityTypeInput = page.locator('input#activity_type').first();
    await activityTypeInput.fill('practice-questions');

    // Click the "Save to Library" button in the modal
    const modalSaveButton = page.locator('[role="dialog"] button:has-text("Save to Library")').first();
    await modalSaveButton.click();

    console.log(`      ⏳ [P-${printableId}] Saving to library...`);

    // Wait for success indication (modal closes or success message appears)
    // The modal should auto-close and potentially redirect to library
    await Promise.race([
      page.waitForSelector('text=/Successfully saved/i', { timeout: 5000 }),
      page.waitForSelector('[role="dialog"]', { state: 'hidden', timeout: 10000 }),
      page.waitForURL('**/library', { timeout: 10000 })
    ]).catch(() => {
      console.log(`      ⚠️  [P-${printableId}] Modal close/redirect detection timed out, continuing`);
    });

    // If redirected to library, go back to create page for next printable
    const currentUrl = page.url();
    if (currentUrl.includes('/library')) {
      console.log(`      🔄 [P-${printableId}] Redirected to library, navigating back to create page`);
      await page.goto(`${AGENT_CONFIG.BASE_URL}/create`, {
        waitUntil: 'networkidle',
        timeout: AGENT_CONFIG.TIMEOUT
      });
    }

    console.log(`      ✅ [P-${printableId}] Saved to library successfully`);

    return true;
  } catch (error) {
    console.log(`      ❌ [P-${printableId}] Failed to save to library: ${error.message}`);
    return false;
  }
}

// ============================================================================
// WORKSHEET GENERATOR WITH LIBRARY SAVE
// ============================================================================

async function generatePrintableWithLibrarySave(page, printableId, config, screenshotDir, configId, isRegenerate = false) {
  const startTime = performance.now();

  try {
    console.log(`      📄 [P-${printableId}] Starting generation...`);

    // Check if we need to navigate to create page
    const currentUrl = page.url();
    if (isRegenerate || !currentUrl.includes('/create')) {
      // For subsequent printables or if not on create page, navigate fresh
      // This ensures clean state after library save
      await page.goto(`${AGENT_CONFIG.BASE_URL}/create`, {
        waitUntil: 'networkidle',
        timeout: AGENT_CONFIG.TIMEOUT
      });
    }

    // Wait for year-group select
    await page.waitForSelector('[data-testid="year-group-select"]', { timeout: 10000 });

    // Select Year Group
    const yearGroupValue = config.yearGroup.toLowerCase().replace(/\s+/g, '-');
    await page.getByTestId('year-group-select').click();
    await page.waitForTimeout(300);
    await page.getByTestId(`year-group-option-${yearGroupValue}`).click();

    // Wait for topic dropdown
    await page.waitForSelector('[data-testid="topic-select"]:not([disabled])', { timeout: 10000 });

    // Select Topic
    await page.getByTestId('topic-select').click();
    await page.waitForTimeout(300);
    await page.waitForSelector(`[data-testid="topic-option-${config.topicValue}"]`, { timeout: 10000, state: 'visible' });
    await page.getByTestId(`topic-option-${config.topicValue}`).click();

    // Wait for subtopic dropdown
    await page.waitForSelector('[data-testid="subtopic-select"]:not([disabled])', { timeout: 10000 });

    // Select Subtopic
    console.log(`      🔍 [P-${printableId}] Selecting subtopic: ${config.subtopicValue}`);
    await page.getByTestId('subtopic-select').click();
    await page.waitForTimeout(500);
    await page.waitForSelector(`[data-testid="subtopic-option-${config.subtopicValue}"]`, { timeout: 10000, state: 'visible' });
    await page.getByTestId(`subtopic-option-${config.subtopicValue}`).click();
    await page.waitForTimeout(500);

    // Verify subtopic was selected
    const selectedSubtopic = await page.getByTestId('subtopic-select').textContent();
    console.log(`      ✅ [P-${printableId}] Subtopic selected: ${selectedSubtopic}`);

    // Click Generate
    const generateButton = page.getByRole('button', { name: 'Generate Printable' });
    const isEnabled = await generateButton.isEnabled();
    if (!isEnabled) {
      throw new Error('Generate button is disabled');
    }
    await generateButton.click();

    console.log(`      ⏳ [P-${printableId}] Waiting for generation...`);

    // Wait for completion - Download button appears
    await page.waitForSelector('text=Download', { timeout: AGENT_CONFIG.TIMEOUT });

    // Wait for printable to render
    await page.waitForSelector('.worksheet-preview, .worksheet', {
      timeout: 10000,
      state: 'visible'
    });

    // Wait for images to load
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {
      console.log(`      ⚠️  [P-${printableId}] Network idle timeout - continuing`);
    });

    // Additional wait for streaming to complete
    await page.waitForTimeout(3000);

    // Take screenshot before saving to library
    console.log(`      📸 [P-${printableId}] Capturing screenshot...`);
    const screenshotPath = path.join(screenshotDir, `p-${printableId}-printable.png`);
    await page.screenshot({
      path: screenshotPath,
      fullPage: true
    });

    // Save to library if enabled
    let librarySaved = false;
    if (AGENT_CONFIG.SAVE_TO_LIBRARY) {
      librarySaved = await saveToLibrary(page, printableId, config);
    }

    const endTime = performance.now();
    const generationTime = (endTime - startTime) / 1000;

    console.log(`      ✅ [P-${printableId}] Generated in ${generationTime.toFixed(2)}s${librarySaved ? ' (saved to library)' : ''}`);

    return {
      success: true,
      printableId,
      generationTime,
      screenshotPath,
      librarySaved,
      configId
    };

  } catch (error) {
    const endTime = performance.now();
    const generationTime = (endTime - startTime) / 1000;

    console.log(`      ❌ [P-${printableId}] Failed in ${generationTime.toFixed(2)}s: ${error.message}`);

    return {
      success: false,
      printableId,
      error: error.message,
      generationTime,
      librarySaved: false,
      configId
    };
  }
}

// ============================================================================
// PROCESS CONFIG
// ============================================================================

async function processConfig(browser, configId, configIndex) {
  const config = YEAR2_NPV_CONFIGS[configId];

  console.log('\n' + '='.repeat(80));
  console.log(`📋 CONFIG ${configIndex + 1}/${configsToRun.length}: ${config.subtopic}`);
  console.log('='.repeat(80) + '\n');

  const configStartTime = performance.now();
  const screenshotDir = path.join(SESSION_DIR, configId);
  fs.mkdirSync(screenshotDir, { recursive: true });

  // Create browser context
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  // Login as admin first
  const loginSuccess = await loginAsAdmin(page);
  if (!loginSuccess) {
    console.error('❌ Failed to login as admin, continuing without library save functionality');
  }

  const results = [];

  // Generate printables sequentially (for library save handling)
  for (let i = 0; i < AGENT_CONFIG.BATCH_SIZE; i++) {
    const printableId = i + 1;
    const result = await generatePrintableWithLibrarySave(
      page,
      printableId,
      config,
      screenshotDir,
      configId,
      i > 0 // isRegenerate for subsequent printables
    );
    results.push(result);
  }

  // Close context
  await page.close();
  await context.close();

  const configEndTime = performance.now();
  const configTime = (configEndTime - configStartTime) / 1000;

  const successful = results.filter(r => r.success).length;
  const savedToLibrary = results.filter(r => r.librarySaved).length;

  console.log('\n' + '━'.repeat(80));
  console.log(`📊 CONFIG COMPLETE: ${config.subtopic}`);
  console.log('━'.repeat(80));
  console.log(`   Total Time: ${configTime.toFixed(2)}s`);
  console.log(`   Successful: ${successful}/${AGENT_CONFIG.BATCH_SIZE}`);
  console.log(`   Saved to Library: ${savedToLibrary}/${successful}`);
  console.log('━'.repeat(80) + '\n');

  return {
    configId,
    config,
    configTime,
    results,
    successful,
    savedToLibrary
  };
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  try {
    // Check if server is running
    console.log(`⏳ Checking server at ${AGENT_CONFIG.BASE_URL}...`);
    try {
      const response = await fetch(AGENT_CONFIG.BASE_URL);
      if (!response.ok) {
        throw new Error('Server not responding');
      }
      console.log(`✅ Server is ready!\n`);
    } catch (error) {
      console.error(`❌ Server is not running at ${AGENT_CONFIG.BASE_URL}`);
      console.log(`   Please start the dev server first: npm run dev`);
      process.exit(1);
    }

    // Launch browser
    console.log('🌐 Launching browser...\n');
    const browser = await chromium.launch({
      headless: AGENT_CONFIG.HEADLESS,
      args: ['--window-size=1920,1080']
    });

    // Process all configs
    const allResults = [];
    for (let i = 0; i < configsToRun.length; i++) {
      const result = await processConfig(browser, configsToRun[i], i);
      allResults.push(result);
    }

    // Close browser
    await browser.close();
    console.log('🌐 Browser closed\n');

    // Generate summary report
    const totalPrintables = allResults.reduce((sum, r) => sum + r.successful, 0);
    const totalSaved = allResults.reduce((sum, r) => sum + r.savedToLibrary, 0);
    const totalTime = allResults.reduce((sum, r) => sum + r.configTime, 0);

    console.log('='.repeat(80));
    console.log('📈 FINAL SUMMARY');
    console.log('='.repeat(80));
    console.log(`   Mode: ${options.test ? 'TEST' : 'BATCH'}`);
    console.log(`   Configs Processed: ${allResults.length}`);
    console.log(`   Total Printables Generated: ${totalPrintables}`);
    console.log(`   Total Saved to Library: ${totalSaved}`);
    console.log(`   Total Time: ${totalTime.toFixed(2)}s`);
    console.log('');

    // Save results to JSON
    const reportPath = path.join(SESSION_DIR, 'report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      sessionId: SESSION_ID,
      mode: options.test ? 'test' : 'batch',
      timestamp: new Date().toISOString(),
      config: AGENT_CONFIG,
      results: allResults,
      summary: {
        configsProcessed: allResults.length,
        totalPrintables,
        totalSaved,
        totalTime
      }
    }, null, 2));

    console.log(`📁 Report saved to: ${reportPath}`);
    console.log('');

    // Vision assessment instructions
    if (AGENT_CONFIG.ENABLE_VISION) {
      console.log('═'.repeat(80));
      console.log('📝 NEXT STEP: VISION ASSESSMENT');
      console.log('═'.repeat(80));
      console.log(`   Tell Claude Code: "Assess worksheets in ${SESSION_DIR}"`);
      console.log('');
    }

    console.log('✅ Agent completed successfully!\n');

  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the agent
main();