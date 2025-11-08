const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('📍 Navigating to library page...');
  await page.goto('http://localhost:3000/library');
  await page.waitForLoadState('networkidle');

  console.log('📸 Taking full page screenshot...');
  await page.screenshot({ path: 'library-full-page.png', fullPage: true });

  console.log('✅ Testing grid layout...');
  const cards = await page.locator('.group.bg-white.rounded-lg.border').count();
  console.log(`   Found ${cards} worksheet cards`);

  console.log('✅ Testing year badges...');
  const yearBadges = await page.locator('[class*="bg-blue-600"], [class*="bg-purple-600"], [class*="bg-green-600"]').count();
  console.log(`   Found ${yearBadges} year badges`);

  console.log('✅ Testing search bar...');
  const searchBar = await page.locator('input[placeholder*="Search worksheets"]');
  const searchVisible = await searchBar.isVisible();
  console.log(`   Search bar visible: ${searchVisible}`);

  console.log('✅ Testing breadcrumbs...');
  const breadcrumbs = await page.locator('nav:has-text("Home")').isVisible();
  console.log(`   Breadcrumbs visible: ${breadcrumbs}`);

  console.log('✅ Testing hover effects...');
  if (cards > 0) {
    await page.locator('.group.bg-white.rounded-lg.border').first().hover();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'library-hover-state.png' });
    console.log('   Hover screenshot taken');
  }

  console.log('✅ Testing filters sidebar...');
  const filters = await page.locator('text="Filters"').isVisible();
  console.log(`   Filters visible: ${filters}`);

  console.log('\n📊 Summary:');
  console.log(`   - Worksheet cards: ${cards}`);
  console.log(`   - Year badges: ${yearBadges}`);
  console.log(`   - Search bar: ${searchVisible ? 'Yes' : 'No'}`);
  console.log(`   - Breadcrumbs: ${breadcrumbs ? 'Yes' : 'No'}`);
  console.log(`   - Filters: ${filters ? 'Yes' : 'No'}`);

  console.log('\n✅ All screenshots saved!');
  console.log('   - library-full-page.png');
  console.log('   - library-hover-state.png');

  await page.waitForTimeout(3000);
  await browser.close();
})();
