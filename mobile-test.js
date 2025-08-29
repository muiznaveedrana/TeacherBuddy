const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 } // iPhone X dimensions
  });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'dashboard-mobile-responsive.png', fullPage: true });
    
    console.log('✅ Mobile responsive screenshot captured!');
    
  } catch (error) {
    console.error('Mobile test failed:', error);
  } finally {
    await browser.close();
  }
})();