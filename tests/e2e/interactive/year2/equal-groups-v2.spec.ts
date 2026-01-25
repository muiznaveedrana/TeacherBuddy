import { test, expect } from '@playwright/test';

/**
 * Interactive test for: Equal Groups: Animal Fun! (V2 - Average)
 * Slug: equal-groups-animal-fun-with-animals-counting-standard-layout
 *
 * Answer Key:
 * Q1: 15 (5 groups x 3 = 15 chickens)
 * Q2: a) 4, b) 3, c) 12
 * Q3: a) 20, b) 15, c) 35
 * Q4: 30 sheep
 * Q5: a) Yes, b) 18, c) 18
 *
 * Total: 11 answers
 */

test.describe('Equal Groups V2 - Animal Fun Interactive Test', () => {
  test('should achieve 100% score with correct answers', async ({ page }) => {
    test.setTimeout(30000);
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
    const answers = ["15","4","3","12","20","15","35","30","Yes","18","18"];

    // Fill in answers
    for (let i = 0; i < answers.length; i++) {
      const input = inputs.nth(i);
      await input.scrollIntoViewIfNeeded();
      await input.click();
      await input.fill(answers[i]);
      await page.waitForTimeout(100);
    }

    // Submit answers
    const submitBtn = page.locator('button:has-text("Submit Answers")');
    await submitBtn.waitFor({ state: 'visible', timeout: 5000 });
    await submitBtn.click();

    // Wait for results and celebration overlay
    await page.waitForTimeout(3000);

    // Verify 100% score in celebration overlay
    const celebrationOverlay = page.locator('.fixed.inset-0.z-50');
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 });

    const scoreText = await page.locator('text=/\\d+%/').first().textContent();
    console.log(`Score: ${scoreText}`);

    expect(scoreText).toBe('100%');

    console.log('V2 (Animal Fun): 100% score achieved!');
  });
});
