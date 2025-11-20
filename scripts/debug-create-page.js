#!/usr/bin/env node

/**
 * DEBUG SCRIPT - Inspect /create page structure
 * This helps us understand the actual selectors needed for the model comparison test
 */

const { chromium } = require('playwright');

async function debugCreatePage() {
  console.log('🔍 Inspecting /create page structure...\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Navigate to create page
    await page.goto('http://localhost:3000/create', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('✓ Navigated to /create page');

    // Wait for page to settle
    await page.waitForTimeout(3000);

    // Handle cookie consent if present
    try {
      const acceptButton = page.locator('button:has-text("Accept All"), button:has-text("Accept"), button:has-text("I Accept")').first();
      const count = await acceptButton.count();
      if (count > 0) {
        await acceptButton.click({ timeout: 5000 });
        console.log('✓ Accepted cookie consent\n');
        await page.waitForTimeout(1000);
      }
    } catch (e) {
      console.log('ⓘ No consent banner found\n');
    }

    // Inspect form structure
    console.log('=== FORM STRUCTURE ===\n');

    // Check for year group selector
    const yearGroupSelectors = [
      'select[name="yearGroup"]',
      'select[id*="year"]',
      'select:has-text("Year")',
      '[data-testid*="year"]'
    ];

    for (const selector of yearGroupSelectors) {
      const count = await page.locator(selector).count();
      if (count > 0) {
        console.log(`✓ Found year group: ${selector} (count: ${count})`);
        try {
          const tagName = await page.locator(selector).first().evaluate(el => el.tagName);
          console.log(`  Tag: ${tagName}`);

          if (tagName === 'SELECT') {
            const options = await page.locator(selector).first().evaluate(el => {
              return Array.from(el.options).map(opt => ({
                value: opt.value,
                text: opt.text
              }));
            });
            console.log('  Options:', JSON.stringify(options.slice(0, 3), null, 2));
          } else {
            const attrs = await page.locator(selector).first().evaluate(el => ({
              id: el.id,
              name: el.name,
              type: el.type,
              placeholder: el.placeholder
            }));
            console.log('  Attributes:', attrs);
          }
        } catch (e) {
          console.log(`  Error inspecting: ${e.message}`);
        }
      }
    }

    // Check all select elements
    console.log('\n=== ALL SELECT ELEMENTS ===\n');
    const allSelects = await page.locator('select').all();
    for (let i = 0; i < allSelects.length; i++) {
      const select = allSelects[i];
      const name = await select.getAttribute('name');
      const id = await select.getAttribute('id');
      const label = await select.evaluate(el => {
        const label = el.closest('label')?.textContent ||
                     el.parentElement?.querySelector('label')?.textContent ||
                     el.previousElementSibling?.textContent;
        return label?.trim();
      });

      console.log(`Select #${i + 1}:`);
      console.log(`  name: ${name}`);
      console.log(`  id: ${id}`);
      console.log(`  label: ${label}`);
      console.log('');
    }

    // Check for input fields
    console.log('=== INPUT FIELDS ===\n');
    const allInputs = await page.locator('input[type="number"], input[type="text"]').all();
    for (let i = 0; i < allInputs.length; i++) {
      const input = allInputs[i];
      const name = await input.getAttribute('name');
      const id = await input.getAttribute('id');
      const placeholder = await input.getAttribute('placeholder');
      const label = await input.evaluate(el => {
        const label = el.closest('label')?.textContent ||
                     el.parentElement?.querySelector('label')?.textContent ||
                     el.previousElementSibling?.textContent;
        return label?.trim();
      });

      console.log(`Input #${i + 1}:`);
      console.log(`  name: ${name}`);
      console.log(`  id: ${id}`);
      console.log(`  placeholder: ${placeholder}`);
      console.log(`  label: ${label}`);
      console.log('');
    }

    // Check for generate button
    console.log('=== BUTTONS ===\n');
    const buttons = await page.locator('button').all();
    for (let i = 0; i < buttons.length; i++) {
      const text = await buttons[i].textContent();
      const type = await buttons[i].getAttribute('type');
      console.log(`Button #${i + 1}: "${text?.trim()}" (type: ${type})`);
    }

    console.log('\n✅ Inspection complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

debugCreatePage();
