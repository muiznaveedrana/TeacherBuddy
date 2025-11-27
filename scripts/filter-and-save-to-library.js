#!/usr/bin/env node

/**
 * FILTER AND SAVE TO LIBRARY AUTOMATION
 *
 * Reads vision assessment results and automatically saves quality worksheets
 * (score ≥95, production-ready) to the library as drafts.
 *
 * Usage:
 *   node scripts/filter-and-save-to-library.js <session-directory> [--headless]
 *
 * Example:
 *   node scripts/filter-and-save-to-library.js ./worksheet-quality-reports/multi-batch-sessions/multi-batch-all-reception-2025-11-22T10-30-45-123Z
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Admin credentials
const ADMIN_EMAIL = 'naveed.idrees@gmail.com';
const ADMIN_PASSWORD = 'mysupabase';

// Configuration
const BASE_URL = 'http://localhost:3000';
const HEADLESS = process.argv.includes('--headless');
const MAX_RETRIES = 2;

/**
 * Parse config ID into components
 * Format: {yearGroup}-{topic}-{subtopic}
 * Examples:
 *   reception-number-counting-counting-to-10
 *   year1-number-place-value-numbers-to-20
 *   year2-addition-subtraction-two-digit-numbers
 */
function parseConfigId(configId) {
  const parts = configId.split('-');

  // Extract year group (first part)
  let yearGroup = parts[0];

  // Handle year groups with numbers (year1, year2, etc.)
  if (yearGroup.startsWith('year')) {
    const yearNum = yearGroup.replace('year', '');
    yearGroup = `year-${yearNum}`;
  }

  // Find where topic starts (after year group)
  let topicStartIndex = 1;

  // Topic and subtopic are the remaining parts
  // We need to find the split point - this is tricky because both can have multiple words
  // Strategy: Use known topic patterns from CONFIG_REGISTRY

  const knownTopics = [
    'number-counting',
    'shape-space',
    'measurement',
    'number-place-value',
    'addition-subtraction',
    'geometry-shapes',
    'fractions',
    'multiplication-division',
    'statistics',
    'geometry-position'
  ];

  let topic = '';
  let subtopic = '';

  // Try to match known topics
  const remainingParts = parts.slice(topicStartIndex).join('-');

  for (const knownTopic of knownTopics) {
    if (remainingParts.startsWith(knownTopic)) {
      topic = knownTopic;
      subtopic = remainingParts.substring(knownTopic.length + 1); // +1 for the dash
      break;
    }
  }

  // If no match found, assume first 2 parts after year are topic, rest is subtopic
  if (!topic) {
    topic = parts.slice(topicStartIndex, topicStartIndex + 2).join('-');
    subtopic = parts.slice(topicStartIndex + 2).join('-');
  }

  // Format year group for display
  const yearGroupDisplay = formatYearGroup(yearGroup);

  return {
    yearGroup: yearGroupDisplay,
    yearGroupValue: yearGroup,
    topic,
    subtopic
  };
}

/**
 * Format year group for display
 */
function formatYearGroup(yearGroup) {
  if (yearGroup === 'reception') return 'Reception';
  if (yearGroup === 'year-1') return 'Year 1';
  if (yearGroup === 'year-2') return 'Year 2';
  if (yearGroup === 'year-3') return 'Year 3';
  if (yearGroup === 'year-4') return 'Year 4';
  if (yearGroup === 'year-5') return 'Year 5';
  if (yearGroup === 'year-6') return 'Year 6';
  return yearGroup;
}

/**
 * Accept cookie consent banner if present
 */
async function acceptCookies(page) {
  try {
    const acceptButton = page.locator('button:has-text("Accept All Cookies")');
    const isVisible = await acceptButton.isVisible().catch(() => false);
    if (isVisible) {
      await acceptButton.click();
      await page.waitForTimeout(500);
      console.log('   ✓ Accepted cookies');
    }
  } catch (error) {
    // Ignore if cookie banner not found
  }
}

/**
 * Login as admin
 */
async function loginAsAdmin(page) {
  console.log('\n🔐 Logging in as admin...');

  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle' });
  await acceptCookies(page);

  // Fill credentials
  const emailInput = page.locator('input[type="email"], input[name="email"]').first();
  await emailInput.fill(ADMIN_EMAIL);

  const passwordInput = page.locator('input[type="password"], input[name="password"]').first();
  await passwordInput.fill(ADMIN_PASSWORD);

  // Submit
  const loginButton = page.locator('button[type="submit"]')
    .or(page.locator('button:has-text("Sign In")'))
    .or(page.locator('button:has-text("Log In")'))
    .first();

  await loginButton.click();

  // Wait for redirect
  await page.waitForURL(/\/(create|$)/, { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(1000);

  console.log('✅ Logged in successfully\n');
}

/**
 * Save a single config to library
 */
async function saveConfigToLibrary(page, configId, attempt = 1) {
  if (attempt > MAX_RETRIES) {
    throw new Error(`Failed after ${MAX_RETRIES} retries`);
  }

  console.log(`📝 Processing: ${configId} (attempt ${attempt}/${MAX_RETRIES})`);

  try {
    // Parse config
    const { yearGroup, yearGroupValue, topic, subtopic } = parseConfigId(configId);
    console.log(`   Year Group: ${yearGroup}`);
    console.log(`   Topic: ${topic}`);
    console.log(`   Subtopic: ${subtopic}`);

    // Navigate to create page
    await page.goto(`${BASE_URL}/create`, { waitUntil: 'networkidle' });
    await acceptCookies(page);

    // Wait for form to load
    await page.waitForSelector('[data-testid="year-group-select"]', { timeout: 10000 });

    // 1. Select Year Group
    console.log('   1️⃣ Selecting year group...');
    await page.getByTestId('year-group-select').click();
    await page.waitForTimeout(300);
    await page.getByTestId(`year-group-option-${yearGroupValue}`).click();
    await page.waitForTimeout(500);
    console.log(`   ✓ Selected: ${yearGroup}`);

    // Wait for topics to load
    await page.waitForSelector('[data-testid="topic-select"]:not([disabled])', { timeout: 10000 });
    await page.waitForTimeout(1000);

    // 2. Select Topic
    console.log('   2️⃣ Selecting topic...');
    await page.getByTestId('topic-select').click();
    await page.waitForTimeout(500);
    await page.waitForSelector(`[data-testid="topic-option-${topic}"]`, { timeout: 15000, state: 'visible' });
    await page.getByTestId(`topic-option-${topic}`).click();
    await page.waitForTimeout(500);
    console.log(`   ✓ Selected: ${topic}`);

    // Wait for subtopics to load
    await page.waitForSelector('[data-testid="subtopic-select"]:not([disabled])', { timeout: 15000 });
    await page.waitForTimeout(1000);

    // 3. Select Subtopic
    console.log('   3️⃣ Selecting subtopic...');
    await page.getByTestId('subtopic-select').click();
    await page.waitForTimeout(500);
    await page.waitForSelector(`[data-testid="subtopic-option-${subtopic}"]`, { timeout: 10000, state: 'visible' });
    await page.getByTestId(`subtopic-option-${subtopic}`).click();
    await page.waitForTimeout(500);
    console.log(`   ✓ Selected: ${subtopic}`);

    // 4. Generate Printable
    console.log('   4️⃣ Generating printable...');
    const generateButton = page.getByRole('button', { name: 'Generate Printable' });
    await generateButton.waitFor({ state: 'visible', timeout: 5000 });

    const isEnabled = await generateButton.isEnabled();
    if (!isEnabled) {
      throw new Error('Generate button is disabled');
    }

    await generateButton.click();
    console.log('   ⏳ Waiting for worksheet generation...');

    // Wait for Download button to appear (indicates generation complete)
    await page.waitForSelector('text=Download', { timeout: 90000 });
    await page.waitForTimeout(2000); // Allow React state to settle

    // Wait for worksheet preview to be visible
    await page.waitForSelector('.worksheet-preview, .worksheet', { timeout: 10000, state: 'visible' });
    console.log('   ✓ Worksheet generated');

    // 5. Click Save to Library
    console.log('   5️⃣ Saving to library...');
    const saveButton = page.locator('button:has-text("Save to Library")');
    await saveButton.waitFor({ state: 'visible', timeout: 5000 });
    await saveButton.click();

    // Wait for modal
    await page.getByRole('heading', { name: 'Save to Library' }).waitFor({ state: 'visible', timeout: 5000 });

    // 6. Fill Form
    console.log('   6️⃣ Filling save form...');
    const titleInput = page.getByRole('textbox', { name: 'Title *' });
    const titleValue = await titleInput.inputValue();

    if (!titleValue || titleValue === 'Generating...') {
      throw new Error('Title not generated properly');
    }

    console.log(`   ✓ Title: ${titleValue}`);

    // 7. Submit
    console.log('   7️⃣ Submitting form...');
    const submitButton = page.locator('button:has-text("Save to Library")').last();
    await submitButton.click();

    // Wait for success message
    const successMessage = page.locator('text=Saved to Library')
      .or(page.locator('text=Published to Library'))
      .or(page.locator('text=✅'));

    const errorMessage = page.locator('text=Error').or(page.locator('text=Failed'));

    const result = await Promise.race([
      successMessage.waitFor({ state: 'visible', timeout: 60000 }).then(() => 'success'),
      errorMessage.waitFor({ state: 'visible', timeout: 60000 }).then(() => 'error'),
    ]).catch(() => 'timeout');

    if (result === 'success') {
      console.log('   ✅ Successfully saved to library!\n');
      return { success: true, configId, error: null };
    } else if (result === 'error') {
      const errorText = await errorMessage.textContent().catch(() => 'Unknown error');
      throw new Error(`Save failed: ${errorText}`);
    } else {
      throw new Error('Save request timed out');
    }

  } catch (error) {
    console.log(`   ❌ Error: ${error.message}\n`);

    // Retry if not max attempts
    if (attempt < MAX_RETRIES) {
      console.log(`   🔄 Retrying... (attempt ${attempt + 1}/${MAX_RETRIES})\n`);
      await page.waitForTimeout(2000);
      return saveConfigToLibrary(page, configId, attempt + 1);
    }

    return { success: false, configId, error: error.message };
  }
}

/**
 * Main function
 */
async function main() {
  console.log('\n🚀 FILTER AND SAVE TO LIBRARY AUTOMATION v1.0\n');
  console.log('=' .repeat(60));

  // Get session directory from args
  const sessionDir = process.argv[2];

  if (!sessionDir) {
    console.error('❌ Error: Session directory required');
    console.log('\nUsage:');
    console.log('  node scripts/filter-and-save-to-library.js <session-directory> [--headless]\n');
    console.log('Example:');
    console.log('  node scripts/filter-and-save-to-library.js ./worksheet-quality-reports/multi-batch-sessions/multi-batch-all-reception-2025-11-22T10-30-45-123Z\n');
    process.exit(1);
  }

  // Read vision assessment results
  const resultsPath = path.join(sessionDir, 'vision-assessment-results.json');

  if (!fs.existsSync(resultsPath)) {
    console.error(`❌ Error: Vision results not found at ${resultsPath}`);
    console.log('\nPlease run vision assessment first using Claude Code:\n');
    console.log(`  "Assess all worksheets in ${sessionDir}"`);
    console.log('  "Use STRICT criteria from scripts/STRICT-VISION-ASSESSMENT-CRITERIA.md"\n');
    process.exit(1);
  }

  console.log(`📂 Reading results from: ${resultsPath}\n`);

  const results = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));

  // Filter quality worksheets
  const qualityWorksheets = results.assessments.filter(a =>
    a.score >= 95 &&
    a.productionReady === true &&
    a.criticalIssues.length === 0
  );

  console.log('📊 Assessment Summary:');
  console.log(`   Total worksheets: ${results.assessments.length}`);
  console.log(`   Quality worksheets (≥95 score, production-ready): ${qualityWorksheets.length}`);
  console.log(`   Worksheets to save: ${qualityWorksheets.length}\n`);

  if (qualityWorksheets.length === 0) {
    console.log('⚠️  No quality worksheets to save. Exiting.\n');
    process.exit(0);
  }

  // Get unique config IDs (one worksheet per config)
  const uniqueConfigs = [...new Set(qualityWorksheets.map(w => w.configId))];

  console.log(`🎯 Unique configs to process: ${uniqueConfigs.length}`);
  console.log(`   Configs: ${uniqueConfigs.join(', ')}\n`);
  console.log('=' .repeat(60));

  // Launch browser
  console.log(`\n🌐 Launching browser (headless: ${HEADLESS})...\n`);
  const browser = await chromium.launch({ headless: HEADLESS });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Login once
  await loginAsAdmin(page);

  // Process each config
  const saveResults = [];

  for (let i = 0; i < uniqueConfigs.length; i++) {
    const configId = uniqueConfigs[i];
    console.log(`[${i + 1}/${uniqueConfigs.length}] Processing config: ${configId}\n`);

    const result = await saveConfigToLibrary(page, configId);
    saveResults.push(result);

    // Small delay between saves
    if (i < uniqueConfigs.length - 1) {
      await page.waitForTimeout(1000);
    }
  }

  // Close browser
  await browser.close();

  // Generate report
  console.log('\n' + '='.repeat(60));
  console.log('📊 FINAL REPORT\n');
  console.log('='.repeat(60));

  const successCount = saveResults.filter(r => r.success).length;
  const failureCount = saveResults.filter(r => !r.success).length;

  console.log(`✅ Successful saves: ${successCount}/${uniqueConfigs.length}`);
  console.log(`❌ Failed saves: ${failureCount}/${uniqueConfigs.length}\n`);

  if (failureCount > 0) {
    console.log('⚠️  Failed configs:');
    saveResults.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.configId}: ${r.error}`);
    });
    console.log('');
  }

  // Save JSON report
  const report = {
    timestamp: new Date().toISOString(),
    sessionDir,
    totalWorksheets: results.assessments.length,
    qualityWorksheets: qualityWorksheets.length,
    uniqueConfigs: uniqueConfigs.length,
    successCount,
    failureCount,
    results: saveResults
  };

  const reportPath = path.join(sessionDir, 'library-save-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`💾 Report saved: ${reportPath}\n`);
  console.log('='.repeat(60));
  console.log('🎉 Automation complete!\n');

  process.exit(failureCount > 0 ? 1 : 0);
}

// Run main function
main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
