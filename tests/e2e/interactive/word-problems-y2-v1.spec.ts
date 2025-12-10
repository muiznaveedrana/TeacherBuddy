/**
 * Interactive Test: Year 2 Word Problems v1 (School & Playground Theme)
 * Worksheet Slug: addition-subtraction-word-problems
 *
 * Answers extracted from HTML:
 * 1. 20 pencils (12 + 8 = 20)
 * 2. 12 books (25 - 13 = 12)
 * 3. 9 cars (27 - 18 = 9)
 * 4. 17 erasers (30 - 8 - 5 = 17)
 * 5. 39 children (32 + 7 = 39)
 */

import { test, expect } from '@playwright/test';

const WORKSHEET_SLUG = 'addition-subtraction-word-problems';
const ANSWERS = ['20', '12', '9', '17', '39'];

test.describe('Word Problems Y2 v1 - Interactive Test', () => {
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

    // Fill only the primary answer fields (first 5 inputs for 5 questions)
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
    await expect(page.locator('text=/Miss Smith.*pencils/i')).toBeVisible();
    await expect(page.locator('text=/books on the shelf/i')).toBeVisible();
    await expect(page.locator('text=/Tom.*toy cars/i')).toBeVisible();
    await expect(page.locator('text=/Lucy.*erasers/i')).toBeVisible();
    await expect(page.locator('text=/playground.*children/i')).toBeVisible();
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
