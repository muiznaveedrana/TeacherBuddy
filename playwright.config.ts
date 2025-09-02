import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright configuration for WorksheetGenerator.AI visual testing
 * Optimized for UK classroom environment testing across multiple viewports
 */
export default defineConfig({
  testDir: './tests/e2e',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter to use */
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  
  /* Shared settings for all the projects */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: 'http://localhost:3000',
    
    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Video recording */
    video: 'retain-on-failure'
  },

  /* Configure projects for major browsers and classroom devices */
  projects: [
    {
      name: 'chromium-desktop',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1200, height: 800 } // Staff room computers
      },
    },
    
    {
      name: 'chromium-tablet-portrait',
      use: { 
        ...devices['iPad'],
        viewport: { width: 768, height: 1024 } // Primary classroom device
      },
    },
    
    {
      name: 'chromium-tablet-landscape', 
      use: { 
        ...devices['iPad landscape'],
        viewport: { width: 1024, height: 768 } // Classroom tablet landscape
      },
    },
    
    {
      name: 'chromium-mobile',
      use: { 
        ...devices['iPhone 12'],
        viewport: { width: 375, height: 667 } // Teacher's mobile device
      },
    },
    
    {
      name: 'chromium-ultrawide',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 } // Interactive whiteboards
      },
    },

    {
      name: 'firefox-desktop',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1200, height: 800 }
      },
    },

    {
      name: 'webkit-desktop',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1200, height: 800 }
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
  
  /* Global setup for visual testing */
  globalSetup: require.resolve('./tests/e2e/global-setup.ts'),
  
  /* Test timeout */
  timeout: 30000,
  expect: {
    timeout: 10000,
    // Animation handling for visual tests
    toHaveScreenshot: { 
      threshold: 0.2,
      animations: 'disabled'
    }
  }
})