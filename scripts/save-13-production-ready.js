/**
 * Auto-save 13 Production-Ready Reception Printables to Library
 *
 * This script:
 * 1. Logs in as admin
 * 2. Generates each of the 13 production-ready printables
 * 3. Saves each to library as a draft
 *
 * Run: node scripts/save-13-production-ready.js
 */

const { chromium } = require('playwright');

const PRODUCTION_READY_CONFIGS = [
  {
    id: 1,
    name: 'Counting to 10',
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topic: 'Number and Counting',
    topicValue: 'number-counting',
    subtopic: 'Counting to 10',
    subtopicValue: 'counting-to-10',
    difficulty: 'average',
    questionCount: 5,
    score: 98
  },
  {
    id: 2,
    name: 'Number Recognition',
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topic: 'Number and Counting',
    topicValue: 'number-counting',
    subtopic: 'Number Recognition',
    subtopicValue: 'number-recognition',
    difficulty: 'average',
    questionCount: 5,
    score: 97
  },
  {
    id: 3,
    name: 'More or Less',
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topic: 'Number and Counting',
    topicValue: 'number-counting',
    subtopic: 'More or Less',
    subtopicValue: 'more-or-less',
    difficulty: 'average',
    questionCount: 5,
    score: 98
  },
  {
    id: 4,
    name: 'Early Addition',
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topic: 'Number and Counting',
    topicValue: 'number-counting',
    subtopic: 'Early Addition',
    subtopicValue: 'early-addition',
    difficulty: 'average',
    questionCount: 5,
    score: 97
  },
  {
    id: 5,
    name: 'Early Subtraction',
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topic: 'Number and Counting',
    topicValue: 'number-counting',
    subtopic: 'Early Subtraction',
    subtopicValue: 'early-subtraction',
    difficulty: 'average',
    questionCount: 5,
    score: 95
  },
  {
    id: 6,
    name: 'Number Bonds',
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topic: 'Number and Counting',
    topicValue: 'number-counting',
    subtopic: 'Number Bonds',
    subtopicValue: 'number-bonds',
    difficulty: 'average',
    questionCount: 5,
    score: 97
  },
  {
    id: 7,
    name: 'Subitising',
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topic: 'Number and Counting',
    topicValue: 'number-counting',
    subtopic: 'Subitising',
    subtopicValue: 'subitising',
    difficulty: 'average',
    questionCount: 5,
    score: 98
  },
  {
    id: 8,
    name: 'Size Comparison',
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topic: 'Shape and Space',
    topicValue: 'shape-space',
    subtopic: 'Size Comparison',
    subtopicValue: 'size-comparison',
    difficulty: 'average',
    questionCount: 5,
    score: 99
  },
  {
    id: 9,
    name: 'Basic Shapes (Fixed)',
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topic: 'Shape and Space',
    topicValue: 'shape-space',
    subtopic: 'Basic Shapes',
    subtopicValue: 'basic-shapes',
    difficulty: 'average',
    questionCount: 5,
    score: 98
  },
  {
    id: 10,
    name: 'Simple Patterns',
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topic: 'Shape and Space',
    topicValue: 'shape-space',
    subtopic: 'Simple Patterns',
    subtopicValue: 'patterns',
    difficulty: 'average',
    questionCount: 5,
    score: 96
  },
  {
    id: 11,
    name: 'Position and Direction',
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topic: 'Shape and Space',
    topicValue: 'shape-space',
    subtopic: 'Position and Direction',
    subtopicValue: 'position-direction',
    difficulty: 'average',
    questionCount: 5,
    score: 96
  },
  {
    id: 13,
    name: 'Length Comparison',
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topic: 'Measurement',
    topicValue: 'measurement',
    subtopic: 'Length Comparison',
    subtopicValue: 'length-comparison',
    difficulty: 'average',
    questionCount: 5,
    score: 97
  },
  {
    id: 14,
    name: 'Weight Comparison',
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topic: 'Measurement',
    topicValue: 'measurement',
    subtopic: 'Weight Comparison',
    subtopicValue: 'weight-comparison',
    difficulty: 'average',
    questionCount: 5,
    score: 96
  },
  {
    id: 15,
    name: 'Time Concepts',
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topic: 'Measurement',
    topicValue: 'measurement',
    subtopic: 'Time Concepts',
    subtopicValue: 'time-concepts',
    difficulty: 'average',
    questionCount: 5,
    score: 97
  }
];

const BASE_URL = 'http://localhost:3000';
const ADMIN_EMAIL = 'naveed.idrees@gmail.com';
const ADMIN_PASSWORD = 'mysupabase';

async function acceptCookies(page) {
  const acceptButton = page.locator('button:has-text("Accept All Cookies")');
  const visible = await acceptButton.isVisible().catch(() => false);
  if (visible) {
    await acceptButton.click();
    await page.waitForTimeout(500);
  }
}

async function loginAsAdmin(page) {
  console.log('\n🔐 Logging in as admin...');
  await page.goto(`${BASE_URL}/login`);
  await page.waitForLoadState('networkidle');

  await acceptCookies(page);

  const emailInput = page.locator('input[type="email"]').first();
  await emailInput.fill(ADMIN_EMAIL);

  const passwordInput = page.locator('input[type="password"]').first();
  await passwordInput.fill(ADMIN_PASSWORD);

  const loginButton = page.locator('button[type="submit"]').first();
  await loginButton.click();

  await page.waitForURL(/\/(create|$)/, { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(1000);

  // Verify admin access by visiting admin library page
  await page.goto(`${BASE_URL}/admin/library`);
  await page.waitForLoadState('networkidle');

  // Check if we're still on admin page (not redirected)
  const currentUrl = page.url();
  if (!currentUrl.includes('/admin')) {
    throw new Error('User does not have admin access - redirected from /admin/library');
  }

  console.log('✅ Admin logged in and verified');
}

async function generateAndSavePrintable(page, config) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📋 ${config.id}. ${config.name} (Score: ${config.score})`);
  console.log(`${'='.repeat(80)}`);

  try {
    // Navigate to create page
    await page.goto(`${BASE_URL}/create`, { waitUntil: 'networkidle' });
    await acceptCookies(page);

    // Wait for admin status check to complete (runs in useEffect on page load)
    await page.waitForTimeout(2000);

    // Select Year Group
    console.log(`   1️⃣ Selecting year group: ${config.yearGroupSelect}`);
    const yearGroupButton = page.locator('button[role="combobox"]').filter({ hasText: /Year|Reception/ }).first();
    await yearGroupButton.click();
    await page.waitForTimeout(300);
    await page.locator(`[role="option"]:has-text("${config.yearGroupSelect}")`).click();
    await page.waitForTimeout(1000);

    // Select Topic
    console.log(`   2️⃣ Selecting topic: ${config.topic}`);
    const topicButton = page.locator('button[role="combobox"]').filter({ hasText: /Topic|Select/ }).first();
    await topicButton.click();
    await page.waitForTimeout(300);
    await page.locator(`[role="option"]:has-text("${config.topic}")`).click();
    await page.waitForTimeout(1000);

    // Select Subtopic
    console.log(`   3️⃣ Selecting subtopic: ${config.subtopic}`);
    const subtopicButton = page.locator('button[role="combobox"]').filter({ hasText: /Subtopic|Select/ }).first();
    await subtopicButton.click();
    await page.waitForTimeout(300);
    await page.locator(`[role="option"]:has-text("${config.subtopic}")`).click();
    await page.waitForTimeout(1000);

    // Click Generate Printable
    console.log(`   4️⃣ Generating printable...`);
    const generateButton = page.locator('button:has-text("Generate Printable")');
    await generateButton.waitFor({ state: 'visible', timeout: 5000 });
    await generateButton.click();

    // Wait for generation to complete
    await page.waitForResponse(
      response => response.url().includes('/api/generate-stream') && response.status() === 200,
      { timeout: 90000 }
    );

    // Wait for Download button (indicates generation complete)
    await page.locator('button:has-text("Download")').waitFor({ state: 'visible', timeout: 20000 });
    console.log(`   ✅ Printable generated`);

    // Click Save to Library
    console.log(`   5️⃣ Saving to library...`);
    // Note: Button text is just "Save to Library", emoji is rendered as separate icon
    const saveButton = page.locator('button:has-text("Save to Library")').first();
    await saveButton.waitFor({ state: 'visible', timeout: 15000 });
    await saveButton.click();

    // Wait for modal
    await page.locator('text=Save to Library').first().waitFor({ state: 'visible', timeout: 5000 });

    // Wait for modal to fully load and metadata to auto-populate
    await page.waitForTimeout(3000);

    // Metadata should be auto-filled by the component - just submit directly
    console.log(`   💾 Submitting to library...`);
    // Get the submit button inside the modal (the second "Save to Library" button)
    const submitButton = page.locator('button:has-text("Save to Library")').nth(1);
    await submitButton.click();

    // Wait for success or error
    const result = await Promise.race([
      page.locator('text=Saved to Library').waitFor({ state: 'visible', timeout: 15000 }).then(() => 'success'),
      page.locator('text=Error').waitFor({ state: 'visible', timeout: 15000 }).then(() => 'error'),
    ]).catch(() => 'timeout');

    if (result === 'success') {
      console.log(`   ✅ SAVED: ${config.name}`);
      return { success: true, config: config.name };
    } else {
      console.log(`   ⚠️  PARTIAL: ${config.name} (may need manual check)`);
      return { success: false, config: config.name, reason: result };
    }

  } catch (error) {
    console.error(`   ❌ FAILED: ${config.name} - ${error.message}`);
    return { success: false, config: config.name, reason: error.message };
  }
}

async function main() {
  console.log('\n' + '='.repeat(80));
  console.log('🎯 AUTO-SAVE 13 PRODUCTION-READY RECEPTION PRINTABLES');
  console.log('='.repeat(80));
  console.log(`\n📦 Total Printables: ${PRODUCTION_READY_CONFIGS.length}`);
  console.log(`🎯 Base URL: ${BASE_URL}`);
  console.log(`👤 Admin: ${ADMIN_EMAIL}\n`);

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Login
  await loginAsAdmin(page);

  // Process each config
  const results = [];
  for (const config of PRODUCTION_READY_CONFIGS) {
    const result = await generateAndSavePrintable(page, config);
    results.push(result);
    await page.waitForTimeout(2000); // Pause between saves
  }

  await browser.close();

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('📊 FINAL SUMMARY');
  console.log('='.repeat(80));

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`\n✅ Successful: ${successful}/${PRODUCTION_READY_CONFIGS.length}`);
  console.log(`❌ Failed: ${failed}/${PRODUCTION_READY_CONFIGS.length}`);

  if (failed > 0) {
    console.log('\n⚠️  Failed Printables:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.config}: ${r.reason}`);
    });
  }

  console.log('\n✅ SCRIPT COMPLETE!\n');
}

main().catch(console.error);
