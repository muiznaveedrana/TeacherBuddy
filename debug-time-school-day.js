const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/library/time-school-day/interactive');

  // Remove cookie consent
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove();
  });

  // Wait for worksheet to load
  await page.waitForSelector('.interactive-worksheet-container', { timeout: 10000 });

  // Get all input fields
  const inputs = await page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])').all();

  console.log(`\nFound ${inputs.length} input fields\n`);

  // Get the HTML content to see question structure
  const questionElements = await page.locator('.interactive-worksheet-container [class*="question"]').all();

  for (let i = 0; i < Math.min(10, inputs.length); i++) {
    const input = inputs[i];

    // Get surrounding context
    const parent = page.locator('.interactive-worksheet-container').locator(`input[type="text"]:not([disabled])`).nth(i).locator('xpath=ancestor::*[contains(@class, "question") or contains(@class, "grid") or contains(@class, "flex")][1]');
    const context = await parent.textContent().catch(() => 'N/A');

    console.log(`Input ${i + 1}:`);
    console.log(`  Context: ${context?.substring(0, 150)}...`);
    console.log('');
  }

  console.log('\nPress Ctrl+C to exit...');

  // Keep browser open
  await page.waitForTimeout(300000);

  await browser.close();
})();
