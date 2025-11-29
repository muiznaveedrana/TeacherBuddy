const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const num = process.argv[2] || '';
  const suffix = num ? `-${num}` : '';
  
  const browser = await puppeteer.launch({
    headless: true, 
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({width: 800, height: 1200});
  await page.goto(`http://localhost:3000/preview-worksheet${suffix}.html`, {waitUntil: 'networkidle0'});
  const screenshotPath = path.join('M:\\ClaudeCodeProjects\\worksheetgenerator-ai\\public', `preview-screenshot${suffix}.png`);
  await page.screenshot({path: screenshotPath, fullPage: true});
  await browser.close();
  console.log('Screenshot saved to:', screenshotPath);
})();
