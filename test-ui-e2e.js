#!/usr/bin/env node

/**
 * End-to-End UI Test
 * Tests worksheet generation through the web UI
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function testUI() {
  console.log('🚀 Starting E2E UI test...\n');

  const browser = await chromium.launch({ headless: false }); // Show browser
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate directly to dashboard
    console.log('📂 Navigating to http://localhost:3000/dashboard...');
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');

    console.log('✅ Dashboard loaded successfully\n');

    // Take screenshot
    await page.screenshot({ path: 'test-screenshots/01-dashboard.png', fullPage: true });
    console.log('📸 Screenshot: 01-dashboard.png');

    // Configure worksheet settings
    console.log('\n🔍 Configuring worksheet settings...');

    // Step 1: Select Year Group: Reception
    console.log('📝 Step 1: Selecting Year Group: Reception...');
    const yearGroupButton = page.locator('button[role="combobox"]').filter({ hasText: 'Year 3' });
    await yearGroupButton.click();
    await page.waitForTimeout(500);
    await page.keyboard.press('Home'); // Go to first option (Reception)
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);

    // Step 2: Select Topic: Number and Counting
    console.log('📝 Step 2: Selecting Topic: Number and Counting...');
    await page.waitForTimeout(1000); // Wait for topics to load
    const topicButton = page.locator('button[role="combobox"]').filter({ hasText: /Select a curriculum topic|Addition and Subtraction/i });
    await topicButton.click();
    await page.waitForTimeout(500);

    // Click on "Number and Counting" option directly
    await page.locator('[role="option"]').filter({ hasText: 'Number and Counting' }).click();
    await page.waitForTimeout(1500);

    // Step 3: Select Subtopic: Counting to 10
    console.log('📝 Step 3: Selecting Subtopic: Counting to 10...');
    await page.waitForTimeout(1000); // Wait for subtopics to load
    const subtopicButton = page.locator('button[role="combobox"]').filter({ hasText: /Select a subtopic/i });
    await subtopicButton.click();
    await page.waitForTimeout(500);

    // Click on "Counting to 10" option directly
    await page.locator('[role="option"]').filter({ hasText: 'Counting to 10' }).click();
    await page.waitForTimeout(1500);

    await page.screenshot({ path: 'test-screenshots/02-form-filled.png', fullPage: true });
    console.log('📸 Screenshot: 02-form-filled.png');

    // Step 4: Click Generate button
    console.log('\n🎯 Step 4: Clicking Generate button...');
    const generateButton = page.locator('button').filter({ hasText: /generate/i }).first();

    if (await generateButton.isEnabled()) {
      console.log('✅ Generate button is enabled, clicking...');
      await generateButton.click();

      // Wait for generation (could take 10-30 seconds)
      console.log('⏳ Waiting for worksheet generation (up to 120 seconds)...');

      // Wait for worksheet content to appear - checking for button state change
      try {
        // Wait for the button to change from "Generating..." to "Regenerate"
        await page.waitForSelector('button:has-text("Regenerate")', {
          timeout: 120000
        });

        console.log('✅ Worksheet generated!\n');

        // Wait a bit more for images to load
        await page.waitForTimeout(3000);

        await page.screenshot({ path: 'test-screenshots/03-worksheet-generated.png', fullPage: true });
        console.log('📸 Screenshot: 03-worksheet-generated.png');

        // Check for worksheet-preview div
        const previewDiv = await page.locator('.worksheet-preview').count();
        console.log(`\n📄 Found ${previewDiv} worksheet preview div(s)`);

        // Check for images in the worksheet
        const images = await page.locator('.worksheet-preview img').count();
        console.log(`🖼️  Found ${images} worksheet images`);

        // Check if images are actually loading (not broken)
        if (images > 0) {
          const firstImage = page.locator('.worksheet-preview img').first();
          const isVisible = await firstImage.isVisible();
          const src = await firstImage.getAttribute('src');
          console.log(`📍 First image src: ${src}`);
          console.log(`✅ Images ${isVisible ? 'ARE' : 'ARE NOT'} visible`);
        }

        console.log('\n✅ E2E Test PASSED!');
        console.log('📂 Screenshots saved in test-screenshots/');

      } catch (waitError) {
        console.log('⚠️  Worksheet generation timed out or failed');
        await page.screenshot({ path: 'test-screenshots/03-generation-timeout.png', fullPage: true });
        throw waitError;
      }

    } else {
      console.log('⚠️  Generate button not enabled');
      console.log('Button state:', await generateButton.isEnabled());
    }

    // Keep browser open for 10 seconds to see the result
    console.log('\n👀 Keeping browser open for 10 seconds...');
    await page.waitForTimeout(10000);

  } catch (error) {
    console.error('\n❌ E2E Test FAILED:', error.message);
    await page.screenshot({ path: 'test-screenshots/error.png', fullPage: true });
    console.log('📸 Error screenshot saved: error.png');
  } finally {
    await browser.close();
    console.log('\n🔚 Test complete');
  }
}

// Create screenshots directory
const screenshotsDir = 'test-screenshots';
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

testUI();
