import { test, expect } from '@playwright/test';

test.describe('Shape Space - Patterns', () => {
  test('should complete interactive worksheet with 100% score', async ({ page }) => {
    // Navigate to the shape-space-patterns interactive worksheet
    await page.goto('http://localhost:3000/library/shape-space-patterns/interactive');

    // Wait for the interactive worksheet to load completely
    await page.getByText("Loading interactive worksheet...").first().waitFor({ state: 'hidden' });

    // Dismiss cookie consent banner if present
    const cookieButton = page.getByRole('button', { name: /accept.*cookies/i });
    if (await cookieButton.isVisible().catch(() => false)) {
      await cookieButton.click();
      await page.waitForLoadState('domcontentloaded');
      await page.getByText("Loading interactive worksheet...").first().waitFor({ state: 'hidden' });
    }

    // Wait for questions to be fully rendered
    await page.waitForSelector('text=What comes next in this pattern?', { state: 'visible' });

    // Get all textbox inputs (there are 5 questions with 1 input each)
    const inputs = await page.getByRole('textbox', { name: '?' }).all();

    // Answer key: A, B, A, B, A
    const answers = ['A', 'B', 'A', 'B', 'A'];

    // Fill in all answers
    for (let i = 0; i < answers.length; i++) {
      await inputs[i].click();
      await inputs[i].fill(answers[i]);
      await page.waitForTimeout(100);
    }

    // Wait for the submit button to be enabled and click it
    await page.getByRole('button', { name: /submit answers/i }).waitFor({ state: 'visible' });
    await page.getByRole('button', { name: /submit answers/i }).click();

    // Verify 100% score is achieved
    await expect(page.getByText('100%')).toBeVisible({ timeout: 10000 });
  });
});
