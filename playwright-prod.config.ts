import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright config for testing against PRODUCTION URL directly
 * No local server needed - tests against live worksheetgenerator.ai
 */
export default defineConfig({
  testDir: './tests/e2e',

  fullyParallel: true,
  retries: 0,
  workers: 1,  // Single worker for initial test

  reporter: [
    ['html', { outputFolder: 'playwright-report-prod' }],
    ['list']
  ],

  use: {
    // Test against production directly
    baseURL: 'https://worksheetgenerator.ai',

    screenshot: 'on',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1200, height: 800 }
      },
    },
  ],

  // No webServer - we're testing against production

  timeout: 60000,  // Longer timeout for network
  expect: {
    timeout: 15000,
  }
})
