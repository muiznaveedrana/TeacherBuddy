/**
 * Debug script to check worksheet rendering
 */

const { chromium } = require('@playwright/test');

async function debugWorksheet() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('🔍 Navigating to worksheet...');
  await page.goto('http://localhost:3000/worksheets/addition-subtraction-word-problems');
  await page.waitForLoadState('networkidle');

  // Remove cookie consent
  const cookieConsent = page.locator('.cookie-consent-container');
  if (await cookieConsent.isVisible()) {
    await cookieConsent.evaluate(el => el.remove());
  }

  // Check for Start Worksheet button
  const startButton = page.locator('button:has-text("Start Worksheet")');
  console.log('Start button visible:', await startButton.isVisible());

  if (await startButton.isVisible()) {
    await startButton.click();
    await page.waitForTimeout(1000);
  }

  // Check what's on the page
  const bodyText = await page.locator('body').textContent();
  console.log('\n📄 Page content (first 500 chars):');
  console.log(bodyText?.substring(0, 500));

  // Check for answer lines
  const answerLines = page.locator('.answer-line');
  const count = await answerLines.count();
  console.log(`\n📝 Found ${count} .answer-line elements`);

  // Check for question divs
  const questions = page.locator('.question');
  const qCount = await questions.count();
  console.log(`📋 Found ${qCount} .question elements`);

  // Check for input fields
  const inputs = page.locator('input[type="text"]');
  const inputCount = await inputs.count();
  console.log(`✏️  Found ${inputCount} input fields`);

  // Check for textarea
  const textareas = page.locator('textarea');
  const textareaCount = await textareas.count();
  console.log(`📝 Found ${textareaCount} textarea fields`);

  // Take screenshot
  await page.screenshot({ path: 'debug-worksheet.png', fullPage: true });
  console.log('\n📸 Screenshot saved to debug-worksheet.png');

  console.log('\n⏸️  Pausing for manual inspection (press Ctrl+C to exit)...');
  await page.waitForTimeout(60000);

  await browser.close();
}

debugWorksheet().catch(console.error);
