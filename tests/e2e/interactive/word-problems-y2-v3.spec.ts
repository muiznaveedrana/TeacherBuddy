/**
 * Interactive Test: Year 2 Word Problems v3 (Bakery & Money Theme)
 * Worksheet Slug: addition-subtraction-word-problems-v3
 *
 * Answers extracted from HTML:
 * 1. 35p (20p + 15p = 35p)
 * 2. 27p (50p - 23p = 27p)
 * 3. 21p (45p - 24p = 21p)
 * 4. 17p (60p - 18p - 25p = 17p)
 * 5. 9 more cupcakes and 59 treats (27 - 18 = 9, 18 + 14 = 32, 32 + 27 = 59)
 */

import { test, expect } from '@playwright/test';

const WORKSHEET_SLUG = 'addition-subtraction-word-problems-v3';
const ANSWERS = ['35', '27', '21', '17', '9', '59'];

test.describe('Word Problems Y2 v3 - Interactive Test', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to interactive worksheet
    await page.goto(`http://localhost:3000/library/${WORKSHEET_SLUG}/interactive`);
    await page.waitForLoadState('networkidle');

    // Remove cookie consent if present
    const cookieConsent = page.locator('.cookie-consent-container');
    if (await cookieConsent.isVisible()) {
      await cookieConsent.evaluate(el => el.remove());
    }

    // Wait for page to be ready
    await page.waitForTimeout(1000);
  });

  test('should complete worksheet and achieve 100% score', async ({ page }) => {
    // Fill in all input fields
    const inputs = page.locator('input[type="text"]');
    const count = await inputs.count();

    console.log(`Found ${count} input fields`);

    // Fill the answer fields
    for (let i = 0; i < ANSWERS.length && i < count; i++) {
      const input = inputs.nth(i);
      await input.click();
      await input.fill('');
      await input.pressSequentially(ANSWERS[i], { delay: 50 });
      console.log(`Filled answer ${i + 1}: ${ANSWERS[i]}`);
    }

    // Wait for completion
    await page.waitForTimeout(1000);

    // Click "Check Answers" button
    const checkButton = page.locator('button:has-text("Check Answers")');
    await expect(checkButton).toBeVisible();
    await checkButton.click();

    // Wait for results
    await page.waitForTimeout(2000);

    // Verify 100% score
    const scoreElement = page.locator('text=/100%|5\\s*\\/\\s*5|5 out of 5/i').first();
    await expect(scoreElement).toBeVisible({ timeout: 5000 });

    console.log('✅ Test completed with 100% score');
  });

  test('should display all 5 questions correctly', async ({ page }) => {
    // Verify all question numbers are visible
    for (let i = 1; i <= 5; i++) {
      const questionNumber = page.locator('.question-number', { hasText: String(i) });
      await expect(questionNumber).toBeVisible();
    }

    // Verify question texts with money context
    await expect(page.locator('text=/bakery.*cupcake.*cookie/i')).toBeVisible();
    await expect(page.locator('text=/50p.*pocket/i')).toBeVisible();
    await expect(page.locator('text=/Emma.*cupcakes.*24p/i')).toBeVisible();
    await expect(page.locator('text=/Jack.*60p/i')).toBeVisible();
    await expect(page.locator('text=/bakery.*18 cookies.*27 cupcakes/i')).toBeVisible();
  });

  test('should display coin images correctly', async ({ page }) => {
    // Verify money visuals are present
    const coinImages = page.locator('.coin-group img');
    const coinCount = await coinImages.count();

    expect(coinCount).toBeGreaterThan(0);
    console.log(`Found ${coinCount} coin images`);

    // Verify at least some coin images are visible
    const firstCoin = coinImages.first();
    await expect(firstCoin).toBeVisible();
  });

  test('should have working interactive elements', async ({ page }) => {
    // Verify input fields are editable
    const inputs = page.locator('input[type="text"]');
    const firstInput = inputs.first();

    await expect(firstInput).toBeEditable();

    // Test input functionality
    await firstInput.click();
    await firstInput.fill('test');
    await expect(firstInput).toHaveValue('test');
  });
});
