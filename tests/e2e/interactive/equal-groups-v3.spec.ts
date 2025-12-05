import { test, expect } from '@playwright/test';

/**
 * Interactive test for: Equal Groups Challenge (V3 - Hard)
 * Slug: equal-groups-challenge-with-school-counting-standard-layout
 *
 * Answer Key:
 * Q1: 30 (6 groups x 5 = 30 pencils)
 * Q2: a) 3, b) 6, c) 18
 * Q3: a) 25, b) 16, c) 60
 * Q4: 40 books
 * Q5: a) Yes, b) 40, c) 40
 *
 * Total: 11 answers
 */

test.describe('Equal Groups V3 - School Challenge Interactive Test', () => {
  test('should achieve 100% score with correct answers', async ({ page }) => {
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

    // Answers in order
    const answers = [
      '30',   // Q1: total pencils
      '3',    // Q2a: groups
      '6',    // Q2b: in each group
      '18',   // Q2c: total
      '25',   // Q3a: 5 groups of 5
      '16',   // Q3b: 8 groups of 2
      '60',   // Q3c: 6 groups of 10
      '40',   // Q4: books
      'Yes',  // Q5a: Is Sally correct?
      '40',   // Q5b: 4 groups of 10
      '40'    // Q5c: 10 groups of 4
    ];

    // Fill in answers
    for (let i = 0; i < answers.length; i++) {
      const input = inputs.nth(i);
      await input.click();
      await input.fill('');
      await input.pressSequentially(answers[i], { delay: 50 });
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
