import { defineConfig, devices } from '@playwright/test'

/**
 * Custom Playwright config for Year 2 E2E tests with screenshots
 * Screenshots enabled for both pass and fail
 */
export default defineConfig({
  testDir: './tests/e2e',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* No retries - capture first result */
  retries: 0,

  /* 4 workers for speed */
  workers: 4,

  /* Reporter to use */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],

  /* Shared settings for all the projects */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: 'http://localhost:3000',

    /* Always take screenshot - both pass and fail */
    screenshot: 'on',

    /* No trace to speed up */
    trace: 'off',

    /* No video to speed up */
    video: 'off'
  },

  /* Configure projects for major browsers and classroom devices */
  projects: [
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1200, height: 800 }
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 180000,
    stdout: 'pipe',
    stderr: 'pipe',
  },

  /* Test timeout */
  timeout: 30000,
  expect: {
    timeout: 10000,
  }
})
