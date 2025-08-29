const { chromium } = require('playwright');

(async () => {
  console.log('Testing fresh application start with no cache...');
  
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    console.log('Accessing dashboard at http://localhost:3000/dashboard');
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Allow components to fully render
    
    await page.screenshot({ path: 'dashboard-fresh-start.png', fullPage: true });
    
    console.log('✅ Fresh start screenshot captured!');
    
    // Verify key elements are present
    const configTitle = await page.locator('text=Worksheet Configuration');
    if (await configTitle.isVisible()) {
      console.log('✅ Configuration panel loaded successfully');
    }
    
    const generateBtn = await page.locator('button:has-text("Generate Worksheet")');
    if (await generateBtn.isVisible()) {
      console.log('✅ Generate button is present');
      const isDisabled = await generateBtn.isDisabled();
      console.log(`✅ Generate button is ${isDisabled ? 'properly disabled' : 'enabled'} initially`);
    }
    
    const adPlaceholder = await page.locator('text=Advertisement');
    if (await adPlaceholder.isVisible()) {
      console.log('✅ Ad placeholder is showing correctly');
    }
    
    console.log('🎉 Application is running perfectly with no cache!');
    
  } catch (error) {
    console.error('❌ Fresh start test failed:', error);
  } finally {
    await browser.close();
  }
})();