import { test, expect } from '@playwright/test';

test('visual landing page test', async ({ page }) => {
  // Navigate to the page
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  // Take a full page screenshot
  await page.screenshot({ path: 'landing-page-full.png', fullPage: true });
  
  // Take screenshot of hero section
  await page.locator('section').first().screenshot({ path: 'hero-section.png' });
  
  // Log some debug info
  console.log('Page title:', await page.title());
  console.log('Page URL:', page.url());
  
  // Basic visibility checks
  await expect(page.locator('body')).toBeVisible();
});