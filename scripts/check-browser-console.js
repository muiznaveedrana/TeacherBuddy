const { chromium } = require('playwright')

async function checkConsole() {
  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()

  const logs = []
  const errors = []

  page.on('console', msg => {
    const text = msg.text()
    logs.push({ type: msg.type(), text })
    if (msg.type() === 'error') {
      errors.push(text)
    }
  })

  page.on('pageerror', error => {
    errors.push(`Page Error: ${error.message}`)
  })

  try {
    console.log('🔍 Navigating to library page...')
    await page.goto('http://localhost:3000/library', { waitUntil: 'networkidle' })

    // Wait for API call
    await page.waitForTimeout(5000)

    console.log('\n📊 Console Logs:')
    logs.forEach(log => {
      if (log.type !== 'info' || log.text.includes('worksheet') || log.text.includes('API') || log.text.includes('error')) {
        console.log(`[${log.type.toUpperCase()}] ${log.text}`)
      }
    })

    if (errors.length > 0) {
      console.log('\n❌ Errors found:')
      errors.forEach(err => console.log(err))
    } else {
      console.log('\n✅ No errors in console')
    }

    // Check network requests
    console.log('\n🌐 Checking if API was called...')
    const apiCalled = logs.some(log => log.text.includes('/api/library/browse'))
    console.log(`API called: ${apiCalled ? '✅' : '❌'}`)

  } finally {
    await browser.close()
  }
}

checkConsole().catch(console.error)
