/**
 * Interactive Test: Year 2 Word Problems v2 (Farm Animals Theme)
 * Worksheet Slug: addition-subtraction-word-problems-v2
 *
 * Answers extracted from HTML:
 * 1. 28 chickens (16 + 12 = 28)
 * 2. 16 sheep (34 - 18 = 16)
 * 3. 13 apples (35 - 22 = 13)
 * 4. 16 bananas (40 - 15 - 9 = 16)
 * 5. 5 more pigs and 20 cows (19 - 14 = 5, 14 + 6 = 20)
 */

import { test, expect } from '@playwright/test';

const WORKSHEET_SLUG = 'addition-subtraction-word-problems-v2';
const ANSWERS = ['28', '16', '13', '16', '5', '20'];

test.describe('Word Problems Y2 v2 - Interactive Test', () => {
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

    // Verify question texts
    await expect(page.locator('text=/Farmer Brown.*chickens/i')).toBeVisible();
    await expect(page.locator('text=/sheep in the field/i')).toBeVisible();
    await expect(page.locator('text=/Sarah.*apples/i')).toBeVisible();
    await expect(page.locator('text=/bananas in the basket/i')).toBeVisible();
    await expect(page.locator('text=/farm shop.*cows.*pigs/i')).toBeVisible();
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
