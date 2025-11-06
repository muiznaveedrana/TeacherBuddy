const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

async function testLibraryUI() {
  console.log('\n🎭 Starting Playwright test for Library UI...\n')

  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  })
  const page = await context.newPage()

  // Listen for console messages
  page.on('console', msg => {
    const type = msg.type()
    if (type === 'error') {
      console.log('❌ Browser Error:', msg.text())
    } else if (type === 'warning') {
      console.log('⚠️  Browser Warning:', msg.text())
    }
  })

  // Listen for page errors
  page.on('pageerror', error => {
    console.log('❌ Page Error:', error.message)
  })

  try {
    // Test 1: Navigate to library page
    console.log('1️⃣ Navigating to /library...')
    await page.goto('http://localhost:3000/library', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)

    const screenshotPath1 = path.join(__dirname, '../test-screenshots/library-page.png')
    await page.screenshot({ path: screenshotPath1, fullPage: true })
    console.log(`   ✅ Screenshot saved: ${screenshotPath1}`)

    // Check if worksheets loaded
    const worksheetCards = await page.locator('a[href^="/library/"]').count()
    console.log(`   📊 Found ${worksheetCards} worksheet cards`)

    if (worksheetCards === 0) {
      console.log('   ⚠️  No worksheets visible - checking for errors...')
      const errorDiv = await page.locator('text=Error').count()
      const emptyState = await page.locator('text=No worksheets found').count()

      if (errorDiv > 0) {
        const errorText = await page.locator('text=Error').textContent()
        console.log(`   ❌ Error found: ${errorText}`)
      } else if (emptyState > 0) {
        console.log('   ℹ️  Empty state displayed')
      } else {
        console.log('   ⏳ Still loading...')
      }
    } else {
      console.log('   ✅ Worksheets loaded successfully!')

      // Get first worksheet details
      const firstCard = page.locator('a[href^="/library/"]').first()
      const title = await firstCard.locator('h3').textContent()
      const href = await firstCard.getAttribute('href')
      console.log(`   First worksheet: "${title}"`)
      console.log(`   Link: ${href}`)
    }

    // Test 2: Test filters
    console.log('\n2️⃣ Testing filters...')
    const yearGroupFilter = await page.locator('#year_group').count()
    const topicFilter = await page.locator('#topic').count()
    console.log(`   Year Group filter: ${yearGroupFilter > 0 ? '✅' : '❌'}`)
    console.log(`   Topic filter: ${topicFilter > 0 ? '✅' : '❌'}`)

    // Test 3: Click first worksheet (if available)
    if (worksheetCards > 0) {
      console.log('\n3️⃣ Testing worksheet detail page...')
      const firstCard = page.locator('a[href^="/library/"]').first()
      const href = await firstCard.getAttribute('href')

      await firstCard.click()
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(2000)

      const screenshotPath2 = path.join(__dirname, '../test-screenshots/worksheet-detail.png')
      await page.screenshot({ path: screenshotPath2, fullPage: true })
      console.log(`   ✅ Screenshot saved: ${screenshotPath2}`)

      // Check for download button
      const downloadBtn = await page.locator('text=Download PDF').count()
      console.log(`   Download button: ${downloadBtn > 0 ? '✅' : '❌'}`)

      // Check for thumbnail
      const thumbnail = await page.locator('img[alt*=""]').count()
      console.log(`   Thumbnail image: ${thumbnail > 0 ? '✅' : '❌'}`)
    }

    console.log('\n✅ Test complete! Check test-screenshots/ folder for results.')

  } catch (error) {
    console.error('\n❌ Test failed:', error.message)
    const screenshotPath = path.join(__dirname, '../test-screenshots/error-screenshot.png')
    await page.screenshot({ path: screenshotPath, fullPage: true })
    console.log(`   Error screenshot saved: ${screenshotPath}`)
  } finally {
    await browser.close()
  }
}

// Create screenshots directory
const screenshotsDir = path.join(__dirname, '../test-screenshots')
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true })
}

testLibraryUI().catch(console.error)
