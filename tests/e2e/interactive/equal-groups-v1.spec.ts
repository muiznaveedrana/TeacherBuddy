import { test, expect } from '@playwright/test';

/**
 * Interactive test for: Equal Groups: Baking Fun! (V1 - Easy)
 * Slug: equal-groups-baking-fun-with-baking-counting-standard-layout
 *
 * Answer Key:
 * Q1: 12 (4 groups x 3 = 12 cookies)
 * Q2: a) 5, b) 2, c) 10
 * Q3: a) 15, b) 12, c) 40
 * Q4: 24 cupcakes
 * Q5: a) Yes, b) 15, c) 15
 *
 * Total: 11 answers
 */

test.describe('Equal Groups V1 - Baking Fun Interactive Test', () => {
  test('should achieve 100% score with correct answers', async ({ page }) => {
    // Navigate directly to interactive page
    await page.goto('/library/equal-groups-baking-fun-with-baking-counting-standard-layout/interactive');

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
      '12',   // Q1: total cookies
      '5',    // Q2a: groups
      '2',    // Q2b: in each group
      '10',   // Q2c: total
      '15',   // Q3a: 3 groups of 5
      '12',   // Q3b: 6 groups of 2
      '40',   // Q3c: 4 groups of 10
      '24',   // Q4: cupcakes
      'Yes',  // Q5a: Is Chef Charlie correct?
      '15',   // Q5b: 5 groups of 3
      '15'    // Q5c: 3 groups of 5
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

    console.log('V1 (Baking Fun): 100% score achieved!');
  });
});
