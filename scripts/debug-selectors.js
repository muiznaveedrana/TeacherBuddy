#!/usr/bin/env node

/**
 * Debug script to find the correct selectors for year group "Year 2"
 */

const { chromium } = require('playwright');

async function debugSelectors() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto('http://localhost:3000/create', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Handle consent
    try {
      const acceptButton = page.locator('button:has-text("Accept All")').first();
      if (await acceptButton.count() > 0) {
        await acceptButton.click({ timeout: 5000 });
        await page.waitForTimeout(1000);
      }
    } catch (e) {}

    // Check page content before clicking
    console.log('\n=== PAGE STATE BEFORE CLICKING ===');
    const bodyText = await page.locator('body').textContent();
    console.log('Page contains "Year 1":', bodyText.includes('Year 1'));
    console.log('Page contains "Year 2":', bodyText.includes('Year 2'));
    console.log('Page contains "Standard Questions":', bodyText.includes('Standard Questions'));

    // Check for layout/worksheet type selection
    const layoutButtons = await page.locator('button:has-text("Standard Questions"), button:has-text("Printable")').all();
    console.log(`\nLayout/Worksheet type buttons found: ${layoutButtons.length}`);
    if (layoutButtons.length > 0) {
      for (let i = 0; i < layoutButtons.length; i++) {
        const text = await layoutButtons[i].textContent();
        console.log(`  Button ${i + 1}: "${text?.trim()}"`);
      }

      // Click "Standard Questions" if available
      const standardBtn = page.locator('button:has-text("Standard Questions")').first();
      if (await standardBtn.count() > 0) {
        console.log('\nClicking "Standard Questions"...');
        await standardBtn.click();
        await page.waitForTimeout(1000);
      }
    }

    // Click year group trigger
    console.log('\nClicking year group trigger...');
    const yearGroupTrigger = page.locator('[data-testid="year-group-select"]');
    await yearGroupTrigger.click();
    await page.waitForTimeout(2000);

    // Get all options - they might be in a portal/dropdown container
    console.log('\n=== SEARCHING FOR OPTIONS (any location) ===');

    // Try different selectors
    const selectors = [
      '[data-testid^="year-group-option-"]',
      '[role="option"]',
      '[data-radix-collection-item]',
      'div[data-value]',
      '.select-item'
    ];

    for (const selector of selectors) {
      const count = await page.locator(selector).count();
      console.log(`${selector}: ${count} found`);

      if (count > 0 && count < 20) {
        const items = await page.locator(selector).all();
        for (let i = 0; i < Math.min(items.length, 10); i++) {
          const text = await items[i].textContent();
          const testId = await items[i].getAttribute('data-testid');
          const value = await items[i].getAttribute('data-value');
          console.log(`  [${i + 1}] text="${text?.trim()}" testid="${testId}" value="${value}"`);
        }
      }
    }

    console.log('\n=== ALL VISIBLE TEXT ===');
    const allText = await page.locator('body').textContent();
    if (allText.includes('Year 2')) {
      console.log('✓ "Year 2" text is present on page');
    } else {
      console.log('✗ "Year 2" text not found on page');
    }

    // Try to find Year 2
    console.log('\n=== SEARCHING FOR "Year 2" ===');
    const possibleSelectors = [
      '[data-testid="year-group-option-year-2"]',
      '[data-value="Year 2"]',
      'text="Year 2 (Ages 6-7)"'
    ];

    for (const selector of possibleSelectors) {
      const count = await page.locator(selector).count();
      console.log(`${selector}: ${count} found`);
    }

    console.log('\n\nKeeping browser open for inspection...');
    await page.waitForTimeout(60000);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

debugSelectors();
