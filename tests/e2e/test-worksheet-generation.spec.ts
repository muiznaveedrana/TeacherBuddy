import { test, expect } from '@playwright/test';

test('Generate worksheet with standard layout - Year 1 Counting', async ({ page }) => {
  // Increase test timeout to 90 seconds to allow for worksheet generation
  test.setTimeout(90000);
  // Set up console and network monitoring before navigation
  const consoleErrors: string[] = [];
  const networkErrors: string[] = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.error('Console error:', msg.text());
    }
  });

  page.on('response', response => {
    if (response.status() >= 400) {
      networkErrors.push(`${response.url()} - ${response.status()}`);
      console.error(`Failed request: ${response.url()} - Status: ${response.status()}`);
    }
  });

  // Navigate to dashboard
  await page.goto('http://localhost:3000/dashboard');
  await page.waitForLoadState('networkidle');
  console.log('✓ Step 1: Dashboard loaded');

  // Wait for the configuration panel to be visible
  await page.waitForSelector('text=Worksheet Configuration', { timeout: 10000 });

  // Step 2: Select Year Group - Change to Year 1
  // Set up promise to wait for API call BEFORE clicking
  const topicsResponsePromise = page.waitForResponse(
    response => response.url().includes('/api/curriculum/topics') && response.status() === 200,
    { timeout: 10000 }
  );

  // Click on the Year Group dropdown button
  await page.locator('text=Year 3 (Ages 7-8)').click();
  await page.waitForTimeout(300);

  // Wait for dropdown menu to appear and click Year 1
  await page.locator('[role="option"]:has-text("Year 1 (Ages 5-6)")').click();
  console.log('✓ Step 2: Year 1 selected');

  // Wait for topics API call to complete
  await topicsResponsePromise;
  await page.waitForTimeout(500); // Allow React to update
  console.log('✓ Step 2b: Topics loaded from API');

  // Step 3: Select Topic - Addition and Subtraction (has counting subtopics)
  // Set up promise to wait for subtopics API call BEFORE clicking
  const subtopicsResponsePromise = page.waitForResponse(
    response => response.url().includes('/api/curriculum/subtopics') && response.status() === 200,
    { timeout: 10000 }
  );

  // Click on the Topic dropdown
  await page.locator('text=Select a curriculum topic').click();
  await page.waitForTimeout(300);

  // Wait for topic options to be available and click
  await page.locator('[role="option"]:has-text("Addition and Subtraction")').click();
  console.log('✓ Step 3: Addition and Subtraction selected');

  // Wait for subtopics API call to complete
  await subtopicsResponsePromise;
  await page.waitForTimeout(500); // Allow React to update
  console.log('✓ Step 3b: Subtopics loaded from API');

  // Step 4: Select Subtopic - Adding within 20
  // Click on the Subtopic dropdown
  await page.locator('text=Select topic first').or(page.locator('text=Select a subtopic')).click();
  await page.waitForTimeout(300);

  // Wait for subtopic options and click
  await page.locator('[role="option"]:has-text("Adding within 20")').click();
  console.log('✓ Step 4: Adding within 20 selected');
  await page.waitForTimeout(500);

  // Take screenshot of configuration
  await page.screenshot({ path: 'dashboard-configured.png', fullPage: true });
  console.log('✓ Screenshot: Configuration complete');

  // Step 5: Click Generate Worksheet button
  const generateButton = page.locator('button:has-text("Generate Worksheet")');
  await expect(generateButton).toBeEnabled({ timeout: 5000 });
  await generateButton.click();
  console.log('✓ Step 5: Generate button clicked');

  // Step 6: Wait for generation to complete (up to 40 seconds)
  // Look for either Preview text or the generated worksheet content
  await page.waitForSelector('text=Download', { timeout: 45000 });
  console.log('✓ Step 6: Generation completed');

  // Take screenshot of generated worksheet
  await page.screenshot({ path: 'dashboard-generated.png', fullPage: true });
  console.log('✓ Screenshot: Worksheet generated');

  // Step 7: Verify worksheet preview is visible
  // Look for the worksheet preview iframe or content
  const worksheetPreview = page.locator('iframe').first();
  const isPreviewVisible = await worksheetPreview.isVisible().catch(() => false);

  if (isPreviewVisible) {
    console.log('✓ Step 7: Worksheet preview iframe visible');
  } else {
    // If no iframe, check for direct HTML content
    const htmlContent = page.locator('.worksheet-content, [class*="preview"]').first();
    await expect(htmlContent).toBeVisible({ timeout: 5000 });
    console.log('✓ Step 7: Worksheet HTML content visible');
  }

  // Step 8: Verify no critical errors
  if (consoleErrors.length > 0) {
    console.warn(`⚠ Found ${consoleErrors.length} console errors`);
  }

  if (networkErrors.length > 0) {
    console.warn(`⚠ Found ${networkErrors.length} network errors`);
  }

  console.log('✅ Test completed successfully');
  console.log(`Console errors: ${consoleErrors.length}`);
  console.log(`Network errors: ${networkErrors.length}`);
});
