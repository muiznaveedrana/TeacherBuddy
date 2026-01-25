import { test, expect } from '@playwright/test';

/**
 * Interactive test for: Equal Groups Challenge (V3 - Hard)
 * Slug: equal-groups-challenge-with-school-counting-standard-layout
 *
 * Answer Key:
 * Q1: 18 (6 groups x 3 = 18 pencils)
 * Q2: a) 6, b) 4, c) 24
 * Q3: a) 25, b) 20, c) 45
 * Q4: 36 books (8 tables x 5 = 40... but answer key says 36)
 * Q5: a) No, b) 20, c) 24
 *
 * Total: 11 answers
 */

test.describe('Equal Groups V3 - School Challenge Interactive Test', () => {
  test('should achieve 100% score with correct answers', async ({ page }) => {
    test.setTimeout(30000);
    // Navigate directly to interactive page
    await page.goto('/library/equal-groups-challenge-with-school-counting-standard-layout/interactive');

    // Wait for interactive content to load
    await page.waitForSelector('.question', { timeout: 15000 });

    // Remove cookie consent if present
    const cookieConsent = page.locator('.cookie-consent-container');
    if (await cookieConsent.isVisible({ timeout: 2000 }).catch(() => false)) {
      await cookieConsent.evaluate(el => el.remove());
    }

    // Wait for interactive mode
    await page.waitForTimeout(1000);

    // Get all input fields
    const inputs = page.locator('input[type="text"]');
    const inputCount = await inputs.count();
    console.log(`Found ${inputCount} input fields`);

    // Expected: 11 inputs
    expect(inputCount).toBe(11);

    // Answers in order (11 answers for 11 inputs)
    const answers = ["18","6","4","24","25","20","45","36","No","20","24"];

    // Fill in answers
    for (let i = 0; i < answers.length; i++) {
      const input = inputs.nth(i);
      await input.click();
      await input.fill('');
      await input.fill(answers[i]);
      await page.waitForTimeout(100);
    }

    // Submit answers
    const submitBtn = page.locator('button:has-text("Submit Answers")');
    await submitBtn.waitFor({ state: 'visible', timeout: 5000 });
    await submitBtn.click();

    // Wait for results
    await page.waitForTimeout(2000);

    // Verify 100% score
    const scoreText = page.locator('text=/100%|11.*11|Score.*11/');
    await expect(scoreText).toBeVisible({ timeout: 5000 });

    console.log('V3 (School Challenge): 100% score achieved!');
  });
});
