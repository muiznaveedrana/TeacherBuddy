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
  // FIXME: This test achieves 80% score (4/5 questions correct)
  // Q5a answer validation is failing even with correct answer "Yes"
  // Issue: The database answer key for Q5a appears to have incorrect data
  // Expected: "Yes" - Student enters "Yes" - Still marked incorrect
  // This is a worksheet data issue, not a test issue
  test('should achieve 100% score with correct answers', async ({ page }) => {
    test.setTimeout(60000);
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

    // Answers in order (based on configuration spec)
    const answers = ["12","5","2","10","15","12","40","24","Yes","15","15"];

    // Fill in answers using pressSequentially for React controlled inputs
    for (let i = 0; i < answers.length; i++) {
      const input = inputs.nth(i);
      await input.scrollIntoViewIfNeeded();
      await input.click();
      await input.fill('');
      await input.pressSequentially(answers[i], { delay: 50 });
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

    console.log('V1 (Baking Fun): 100% score achieved!');
  });
});
