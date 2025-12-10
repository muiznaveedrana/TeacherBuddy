/**
 * Take screenshots of Year 2 word-problems worksheets
 */

const { chromium } = require('@playwright/test');
const path = require('path');

const WORKSHEETS = [
  'preview-worksheet-word-problems-y2-1.html',
  'preview-worksheet-word-problems-y2-2.html',
  'preview-worksheet-word-problems-y2-3.html'
];

async function takeScreenshot(page, worksheetFile) {
  const baseName = worksheetFile.replace('.html', '');
  const screenshotPath = path.join(__dirname, '../public', `${baseName}-screenshot.png`);

  console.log(`\n📸 Taking screenshot: ${worksheetFile}`);

  const url = `http://localhost:3000/${worksheetFile}`;
  await page.goto(url, { waitUntil: 'networkidle' });

  // Wait for images to load
  await page.waitForTimeout(2000);

  // Take full page screenshot
  await page.screenshot({
    path: screenshotPath,
    fullPage: true
  });

  console.log(`   ✅ Saved: ${screenshotPath}`);
  return screenshotPath;
}

async function main() {
  console.log('════════════════════════════════════════════════════════════');
  console.log('📸 SCREENSHOT WORD PROBLEMS WORKSHEETS');
  console.log('════════════════════════════════════════════════════════════');

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 1600 }
  });

  const screenshots = [];

  for (const worksheet of WORKSHEETS) {
    try {
      const screenshotPath = await takeScreenshot(page, worksheet);
      screenshots.push({ worksheet, success: true, screenshotPath });
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}`);
      screenshots.push({ worksheet, success: false, error: error.message });
    }
  }

  await browser.close();

  console.log('\n════════════════════════════════════════════════════════════');
  console.log('📊 SUMMARY');
  console.log('════════════════════════════════════════════════════════════');
  const successful = screenshots.filter(s => s.success).length;
  console.log(`✅ Successful: ${successful}/${WORKSHEETS.length}`);

  if (successful > 0) {
    console.log('\n📋 Screenshots taken:');
    screenshots.filter(s => s.success).forEach(s => {
      console.log(`   - ${s.worksheet}`);
    });
  }

  console.log('\n════════════════════════════════════════════════════════════\n');
  console.log('Next steps:');
  console.log('1. Review screenshots visually');
  console.log('2. Verify all questions are visible');
  console.log('3. Check images load correctly');
  console.log('4. Proceed to save worksheets to library\n');
}

main().catch(console.error);
