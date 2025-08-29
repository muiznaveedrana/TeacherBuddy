const { chromium } = require('playwright');

(async () => {
  console.log('Starting visual testing of worksheet generation interface...');
  
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    console.log('1. Testing initial state...');
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'dashboard-initial-state.png', fullPage: true });

    console.log('2. Testing topic selection...');
    await page.click('[placeholder="Select a curriculum topic"]');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'dashboard-topic-dropdown.png', fullPage: true });
    
    await page.click('text=Number and Operations');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'dashboard-topic-selected.png', fullPage: true });

    console.log('3. Testing subtopic selection...');
    await page.click('[placeholder="Select a subtopic"]');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'dashboard-subtopic-dropdown.png', fullPage: true });
    
    await page.click('text=Addition and Subtraction');
    await page.waitForTimeout(500);

    console.log('4. Testing difficulty selection...');
    await page.click('#difficulty-hard');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'dashboard-difficulty-selected.png', fullPage: true });

    console.log('5. Testing question count slider...');
    const slider = await page.$('#question-count');
    await slider.fill('25');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'dashboard-question-count.png', fullPage: true });

    console.log('6. Testing name list selection...');
    await page.click('[placeholder="Select a name list"]');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'dashboard-namelist-dropdown.png', fullPage: true });
    
    await page.click('text=Year 3 Class A (25 students)');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'dashboard-ready-to-generate.png', fullPage: true });

    console.log('7. Testing generation process...');
    await page.click('button:has-text("Generate Worksheet")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'dashboard-generating.png', fullPage: true });

    console.log('8. Waiting for generation completion...');
    await page.waitForTimeout(7000);
    await page.screenshot({ path: 'dashboard-generation-complete.png', fullPage: true });

    console.log('9. Testing mobile responsive design...');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'dashboard-mobile.png', fullPage: true });

    console.log('10. Testing tablet responsive design...');
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'dashboard-tablet.png', fullPage: true });

    console.log('Visual testing completed successfully!');
    
  } catch (error) {
    console.error('Visual testing failed:', error);
  } finally {
    await browser.close();
  }
})();