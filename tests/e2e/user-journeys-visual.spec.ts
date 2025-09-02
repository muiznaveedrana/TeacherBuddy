import { test, expect } from '@playwright/test'

/**
 * Complete User Journey Visual Testing
 * Tests the primary teacher workflows with visual validation
 */
test.describe('User Journey Visual Testing', () => {
  
  test.beforeEach(async ({ page }) => {
    // Ensure clean state for visual comparisons
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
  })

  test.describe('Onboarding Journey', () => {
    test('should visually validate complete onboarding flow', async ({ page }) => {
      // Step 1: Landing page
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      await expect(page).toHaveScreenshot('onboarding-01-landing.png', { fullPage: true })
      
      // Step 2: Click sign in (mock flow)
      await page.click('text=Start Creating')
      // Note: In production this would redirect to auth, for now test the landing CTA
      await expect(page).toHaveScreenshot('onboarding-02-cta-clicked.png')
      
      // Navigate directly to login for mock testing
      await page.goto('/(auth)/login')
      await page.waitForSelector('text=Sign in with Google', { timeout: 10000 })
      await expect(page).toHaveScreenshot('onboarding-03-login-page.png', { fullPage: true })
      
      // Step 3: Mock login process
      await page.click('text=Sign in with Google')
      await page.waitForSelector('.animate-spin', { timeout: 5000 })
      await expect(page).toHaveScreenshot('onboarding-04-login-loading.png')
      
      // Step 4: Profile setup (if it appears)
      await page.waitForLoadState('networkidle', { timeout: 10000 })
      if (await page.locator('text=Profile Setup').count() > 0) {
        await expect(page).toHaveScreenshot('onboarding-05-profile-setup.png', { fullPage: true })
      }
      
      // Step 5: Final dashboard arrival
      await page.goto('/dashboard')
      await page.waitForSelector('text=WorksheetGenerator.AI', { timeout: 10000 })
      await expect(page).toHaveScreenshot('onboarding-06-dashboard-arrival.png', { fullPage: true })
    })
  })

  test.describe('Worksheet Generation Journey', () => {
    test('should visually validate complete worksheet generation', async ({ page }) => {
      await page.goto('/dashboard')
      await page.waitForLoadState('networkidle')
      
      // Step 1: Initial dashboard state
      await expect(page).toHaveScreenshot('worksheet-01-dashboard-initial.png', { fullPage: true })
      
      // Step 2: Configure topic
      await page.click('[role="combobox"]:near(text="Topic")')
      await page.waitForSelector('[role="option"]', { timeout: 5000 })
      await expect(page).toHaveScreenshot('worksheet-02-topic-dropdown.png')
      
      await page.click('[role="option"]:has-text("Number and Operations")')
      await expect(page).toHaveScreenshot('worksheet-03-topic-selected.png', { fullPage: true })
      
      // Step 3: Configure subtopic
      await page.click('[role="combobox"]:near(text="Subtopic")')
      await page.waitForSelector('[role="option"]', { timeout: 5000 })
      await expect(page).toHaveScreenshot('worksheet-04-subtopic-dropdown.png')
      
      await page.click('[role="option"]:has-text("Addition and Subtraction")')
      await expect(page).toHaveScreenshot('worksheet-05-subtopic-selected.png', { fullPage: true })
      
      // Step 4: Configure difficulty
      await page.click('text=Average')
      await expect(page).toHaveScreenshot('worksheet-06-difficulty-selected.png')
      
      // Step 5: Select name list
      await page.click('[role="combobox"]:near(text="Name List")')
      await page.waitForSelector('[role="option"]', { timeout: 5000 })
      await expect(page).toHaveScreenshot('worksheet-07-namelist-dropdown.png')
      
      await page.click('[role="option"]:has-text("Year 3 Class A")')
      await expect(page).toHaveScreenshot('worksheet-08-namelist-selected.png', { fullPage: true })
      
      // Step 6: Generate button enabled
      const generateButton = page.locator('text=Generate Worksheet')
      await expect(generateButton).toBeVisible()
      await expect(page).toHaveScreenshot('worksheet-09-ready-to-generate.png', { fullPage: true })
      
      // Step 7: Click generate and show loading
      await generateButton.click()
      await page.waitForSelector('.animate-pulse, [class*="progress"]', { timeout: 5000 })
      await expect(page).toHaveScreenshot('worksheet-10-generating-loading.png', { fullPage: true })
      
      // Step 8: Generation complete with preview
      await page.waitForSelector('text=Download', { timeout: 15000 })
      await expect(page).toHaveScreenshot('worksheet-11-generation-complete.png', { fullPage: true })
      
      // Step 9: Download button state
      const downloadButton = page.locator('text=Download')
      await expect(downloadButton).toBeVisible()
      await expect(downloadButton).toHaveScreenshot('worksheet-12-download-button.png')
    })

    test('should show ad states during generation', async ({ page }) => {
      await page.goto('/dashboard')
      await page.waitForLoadState('networkidle')
      
      // Configure and generate to see ad placeholder
      await page.selectOption('select:near(text="Topic")', 'number-operations')
      await page.selectOption('select:near(text="Subtopic")', 'addition-subtraction')
      await page.click('[role="combobox"]:near(text="Name List")')
      await page.click('[role="option"]:has-text("Year 3 Class A")')
      
      // Before generation - should show ad
      await expect(page.locator('[class*="ad"], text=Advertisement')).toHaveScreenshot('worksheet-ad-placeholder.png')
      
      // During generation
      await page.click('text=Generate Worksheet')
      await page.waitForSelector('.animate-pulse', { timeout: 5000 })
      
      // Check if ad area changes during generation
      const adArea = page.locator('.grid > div:last-child, [class*="preview"]').first()
      await expect(adArea).toHaveScreenshot('worksheet-ad-during-generation.png')
    })
  })

  test.describe('Name List Management Journey', () => {
    test('should visually validate name list creation flow', async ({ page }) => {
      await page.goto('/name-lists')
      await page.waitForLoadState('networkidle')
      
      // Step 1: Name lists page initial state
      await expect(page).toHaveScreenshot('namelists-01-initial-page.png', { fullPage: true })
      
      // Step 2: Click create new list
      await page.click('text=Create New List')
      await page.waitForSelector('[role="dialog"]', { timeout: 5000 })
      await expect(page).toHaveScreenshot('namelists-02-create-modal.png')
      
      // Step 3: Fill in name list title
      await page.fill('[placeholder*="name list title"]', 'Test Class')
      await expect(page).toHaveScreenshot('namelists-03-title-filled.png')
      
      // Step 4: Add names individually
      await page.fill('[placeholder*="student name"]', 'Alice Smith')
      await page.click('text=Add Name')
      await expect(page).toHaveScreenshot('namelists-04-name-added.png')
      
      // Step 5: Bulk import area
      const bulkTextarea = page.locator('textarea[placeholder*="Paste multiple names"]')
      if (await bulkTextarea.count() > 0) {
        await bulkTextarea.fill('Bob Jones\nCharlie Brown\nDiana Wilson')
        await expect(page).toHaveScreenshot('namelists-05-bulk-import.png')
      }
      
      // Step 6: Save button state
      await expect(page).toHaveScreenshot('namelists-06-ready-to-save.png')
      
      // Step 7: Save and return to list
      await page.click('text=Save List')
      await page.waitForSelector('text=Test Class', { timeout: 5000 })
      await expect(page).toHaveScreenshot('namelists-07-list-saved.png', { fullPage: true })
    })

    test('should show edit and delete interactions', async ({ page }) => {
      await page.goto('/name-lists')
      await page.waitForLoadState('networkidle')
      
      // Test edit button
      const editButton = page.locator('[aria-label*="Edit"], text=Edit').first()
      if (await editButton.count() > 0) {
        await editButton.hover()
        await expect(editButton).toHaveScreenshot('namelists-edit-button-hover.png')
      }
      
      // Test delete button
      const deleteButton = page.locator('[aria-label*="Delete"], text=Delete').first()
      if (await deleteButton.count() > 0) {
        await deleteButton.hover()
        await expect(deleteButton).toHaveScreenshot('namelists-delete-button-hover.png')
        
        // Click to show confirmation dialog
        await deleteButton.click()
        await page.waitForSelector('[role="alertdialog"]', { timeout: 5000 })
        await expect(page).toHaveScreenshot('namelists-delete-confirmation.png')
      }
    })
  })

  test.describe('Subscription Management Journey', () => {
    test('should visually validate subscription page', async ({ page }) => {
      await page.goto('/subscription')
      await page.waitForLoadState('networkidle')
      
      // Step 1: Initial subscription page
      await expect(page).toHaveScreenshot('subscription-01-overview.png', { fullPage: true })
      
      // Step 2: Usage analytics section
      const usageSection = page.locator('text=Usage Analytics').locator('..').locator('..')
      if (await usageSection.count() > 0) {
        await expect(usageSection).toHaveScreenshot('subscription-02-usage-analytics.png')
      }
      
      // Step 3: Billing history
      const billingSection = page.locator('text=Billing History').locator('..').locator('..')
      if (await billingSection.count() > 0) {
        await expect(billingSection).toHaveScreenshot('subscription-03-billing-history.png')
      }
      
      // Step 4: Upgrade options
      const upgradeButtons = page.locator('text=Upgrade, text=Choose Plan')
      if (await upgradeButtons.count() > 0) {
        await expect(upgradeButtons.first()).toHaveScreenshot('subscription-04-upgrade-button.png')
      }
    })
  })

  test.describe('Error and Edge Cases Journey', () => {
    test('should handle navigation errors gracefully', async ({ page }) => {
      // Test 404 page if it exists
      await page.goto('/non-existent-page')
      
      // Wait for either 404 page or redirect
      await page.waitForLoadState('networkidle')
      
      // If there's a custom error page, screenshot it
      if (await page.locator('text=404, text=Not Found, text=Page Not Found').count() > 0) {
        await expect(page).toHaveScreenshot('error-404-page.png', { fullPage: true })
      }
    })

    test('should show loading states consistently', async ({ page }) => {
      await page.goto('/dashboard')
      
      // Test worksheet generation loading
      await page.selectOption('select:near(text="Topic")', 'number-operations')
      await page.click('[role="combobox"]:near(text="Name List")')
      await page.click('[role="option"]:has-text("Year 3 Class A")')
      
      await page.click('text=Generate Worksheet')
      
      // Capture various loading states
      const loadingIndicator = page.locator('.animate-pulse, .animate-spin, [role="progressbar"]')
      if (await loadingIndicator.count() > 0) {
        await expect(loadingIndicator).toHaveScreenshot('loading-state-progress.png')
      }
    })
  })

  test.describe('Mobile User Journey', () => {
    test('should validate mobile-specific interactions', async ({ page }) => {
      // This test will run on mobile viewports based on playwright.config.ts
      const viewport = page.viewportSize()
      
      if (viewport && viewport.width < 768) {
        await page.goto('/dashboard')
        await page.waitForLoadState('networkidle')
        
        // Mobile dashboard
        await expect(page).toHaveScreenshot('mobile-dashboard.png', { fullPage: true })
        
        // Open mobile menu
        await page.click('[aria-label*="navigation menu"]')
        await expect(page).toHaveScreenshot('mobile-menu-open.png')
        
        // Navigate to name lists via mobile menu
        await page.click('text=Name Lists')
        await page.waitForLoadState('networkidle')
        await expect(page).toHaveScreenshot('mobile-namelists.png', { fullPage: true })
        
        // Test mobile worksheet generation
        await page.goto('/dashboard')
        await page.waitForLoadState('networkidle')
        
        // Mobile form interactions
        await page.click('[role="combobox"]:near(text="Topic")')
        await expect(page).toHaveScreenshot('mobile-topic-dropdown.png')
      }
    })
  })
})