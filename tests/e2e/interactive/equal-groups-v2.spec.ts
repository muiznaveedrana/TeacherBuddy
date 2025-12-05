import { test, expect } from '@playwright/test';

/**
 * Interactive test for: Equal Groups: Animal Fun! (V2 - Average)
 * Slug: equal-groups-animal-fun-with-animals-counting-standard-layout
 *
 * Answer Key:
 * Q1: 20 (5 groups x 4 = 20 chickens)
 * Q2: a) 4, b) 5, c) 20
 * Q3: a) 20, b) 14, c) 30
 * Q4: 30 sheep
 * Q5: a) Yes, b) 12, c) 12
 *
 * Total: 11 answers
 */

test.describe('Equal Groups V2 - Animal Fun Interactive Test', () => {
  test('should achieve 100% score with correct answers', async ({ page }) => {
    // Navigate directly to interactive page
    await page.goto('/library/equal-groups-animal-fun-with-animals-counting-standard-layout/interactive');

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
      '20',   // Q1: total chickens
      '4',    // Q2a: groups
      '5',    // Q2b: in each group
      '20',   // Q2c: total
      '20',   // Q3a: 4 groups of 5
      '14',   // Q3b: 7 groups of 2
      '30',   // Q3c: 3 groups of 10
      '30',   // Q4: sheep
      'Yes',  // Q5a: Is Zara correct?
      '12',   // Q5b: 6 groups of 2
      '12'    // Q5c: 2 groups of 6
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

    console.log('V2 (Animal Fun): 100% score achieved!');
  });
});
