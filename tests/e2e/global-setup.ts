import { chromium, FullConfig } from '@playwright/test'

/**
 * Global setup for visual testing
 * Ensures consistent state before all tests
 */
async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use
  
  // Launch browser to warm up the dev server
  const browser = await chromium.launch()
  const page = await browser.newPage()
  
  try {
    // Navigate to the app to ensure it's ready
    await page.goto(baseURL!)
    await page.waitForSelector('body', { timeout: 30000 })

    // Note: DO NOT clear localStorage/sessionStorage here
    // Auth state persistence tests rely on storageState which includes localStorage
    // Each test that needs clean state should handle it in beforeEach

    console.log('✅ Global setup completed - App is ready for testing')
  } catch (error) {
    console.error('❌ Global setup failed:', error)
    throw error
  } finally {
    await browser.close()
  }
}

export default globalSetup