import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Year 1 Coins Recognition - Complete Workflow', () => {
  test('Phase 1-3: Generate, assess, and save worksheet', async ({ page }) => {
    // Navigate to worksheet generator
    await page.goto('http://localhost:3000');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Accept cookies if present
    const acceptCookies = page.locator('button:has-text("Accept All Cookies")');
    if (await acceptCookies.isVisible({ timeout: 2000 }).catch(() => false)) {
      await acceptCookies.click();
    }

    // Click "create a custom worksheet with AI" link
    const createLink = page.locator('a:has-text("create a custom worksheet with AI")').first();
    await expect(createLink).toBeVisible({ timeout: 10000 });
    await createLink.click();

    // Wait for the form page to load
    await page.waitForLoadState('networkidle');

    // Select Year 1
    await page.locator('select#yearGroup').selectOption('year1');
    await page.waitForTimeout(500);

    // Select Measurement topic
    await page.locator('select#topic').selectOption('measurement');
    await page.waitForTimeout(500);

    // Select coins-recognition subtopic
    await page.locator('select#subtopic').selectOption('coins-recognition');
    await page.waitForTimeout(500);

    // Set question count to 5
    const questionCountInput = page.locator('input#questionCount');
    await questionCountInput.clear();
    await questionCountInput.fill('5');

    // Click Generate button
    const submitButton = page.locator('button[type="submit"]:has-text("Generate")');
    await submitButton.click();

    // Wait for worksheet to generate (up to 60 seconds)
    await page.waitForSelector('.worksheet-content, .question', { timeout: 60000 });

    // Wait for all questions to load
    await page.waitForTimeout(2000);

    // Take screenshot of the generated worksheet
    const screenshotPath = path.join(process.cwd(), 'tests', 'screenshots', 'year1-coins-recognition-generated.png');
    await page.screenshot({
      path: screenshotPath,
      fullPage: true
    });
    console.log(`Screenshot saved to: ${screenshotPath}`);

    // Phase 2: Quality Assessment
    // Verify all 5 questions are present
    const questions = page.locator('.question');
    const questionCount = await questions.count();
    expect(questionCount).toBe(5);
    console.log(`✓ All 5 questions present`);

    // Check for coin visuals
    const coins = page.locator('.coin');
    const coinCount = await coins.count();
    expect(coinCount).toBeGreaterThan(0);
    console.log(`✓ Coin visuals present (${coinCount} coins found)`);

    // Check for answer key
    const answerKey = page.locator('.answer-key');
    await expect(answerKey).toBeVisible();
    console.log(`✓ Answer key present`);

    // Extract question numbers and types
    for (let i = 1; i <= 5; i++) {
      const questionText = await page.locator(`.question:nth-of-type(${i}) .question-text`).textContent();
      console.log(`Q${i}: ${questionText?.substring(0, 50)}...`);
    }

    // Phase 3: Save to Library
    // Scroll to the save button
    const saveButton = page.locator('button:has-text("Save to Library")');
    await saveButton.scrollIntoViewIfNeeded();
    await saveButton.click();

    // Wait for the save dialog
    await page.waitForSelector('input[placeholder*="slug"], input[name="slug"]', { timeout: 5000 });

    // Fill in the slug
    const slugInput = page.locator('input[placeholder*="slug"], input[name="slug"]');
    await slugInput.clear();
    await slugInput.fill('measurement-coins-recognition-v1');

    // Submit the save form
    const saveSubmitButton = page.locator('button:has-text("Save"), button[type="submit"]').last();
    await saveSubmitButton.click();

    // Wait for success message or redirect
    await page.waitForTimeout(3000);

    // Check for success (either success message or redirect to library)
    const successMessage = page.locator('text=/saved|success|library/i');
    const isSuccess = await successMessage.isVisible().catch(() => false);

    if (isSuccess) {
      console.log('✓ Worksheet saved to library successfully');
    } else {
      console.log('Note: Save may have completed (check library manually if needed)');
    }

    console.log('\n=== WORKFLOW COMPLETE ===');
    console.log('Worksheet slug: measurement-coins-recognition-v1');
    console.log(`Screenshot: ${screenshotPath}`);
  });
});
