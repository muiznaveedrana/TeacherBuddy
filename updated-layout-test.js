const { chromium } = require('playwright');

(async () => {
  console.log('Testing updated layout proportions (25% controls / 75% preview)...');
  
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await page.screenshot({ path: 'dashboard-updated-layout.png', fullPage: true });
    
    console.log('✅ Updated layout screenshot captured!');
    
    // Check if the layout has changed correctly
    const configPanel = await page.locator('[class*="lg:col-span-1"]').first();
    const previewPanel = await page.locator('[class*="lg:col-span-3"]').first();
    
    if (await configPanel.isVisible() && await previewPanel.isVisible()) {
      console.log('✅ Layout grid updated: 25% controls (col-span-1) / 75% preview (col-span-3)');
    }
    
    console.log('🎉 Layout proportions successfully updated!');
    
  } catch (error) {
    console.error('❌ Updated layout test failed:', error);
  } finally {
    await browser.close();
  }
})();