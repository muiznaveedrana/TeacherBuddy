const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

async function testDetailPage() {
  console.log('\n🎭 Testing Worksheet Detail Page...\n')

  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  })
  const page = await context.newPage()

  try {
    const url = 'http://localhost:3000/library/simple-addition-with-colorful-fruits'
    console.log(`📍 Navigating to: ${url}`)

    await page.goto(url, { waitUntil: 'networkidle' })
    await page.waitForTimeout(3000)

    // Check for key elements
    const title = await page.locator('h1').textContent()
    console.log(`✅ Title: "${title}"`)

    const downloadBtn = await page.locator('text=Download PDF').count()
    console.log(`Download button: ${downloadBtn > 0 ? '✅ Found' : '❌ Missing'}`)

    const generateBtn = await page.locator('text=Generate Similar').count()
    console.log(`Generate Similar button: ${generateBtn > 0 ? '✅ Found' : '❌ Missing'}`)

    const image = await page.locator('img[alt*="Addition"]').count()
    console.log(`Thumbnail image: ${image > 0 ? '✅ Found' : '❌ Missing'}`)

    // Check metadata
    const yearGroup = await page.locator('text=Year Group').count()
    const topic = await page.locator('text=Topic:').count()
    console.log(`Metadata: ${yearGroup > 0 && topic > 0 ? '✅ Displayed' : '❌ Missing'}`)

    // Take screenshot
    const screenshotPath = path.join(__dirname, '../test-screenshots/worksheet-detail-final.png')
    await page.screenshot({ path: screenshotPath, fullPage: true })
    console.log(`\n📸 Screenshot saved: ${screenshotPath}`)

  } catch (error) {
    console.error('\n❌ Test failed:', error.message)
  } finally {
    await browser.close()
  }
}

testDetailPage().catch(console.error)
