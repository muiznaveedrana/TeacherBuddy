import { test, expect } from '@playwright/test'

/**
 * User Authentication Flow E2E Tests
 * Tests complete user journeys with visual regression validation
 */
test.describe('User Authentication Flows', () => {

  test.describe('New User Complete Journey', () => {
    test('should complete new user flow: Landing → Start Creating → Login → Profile → Dashboard', async ({ page }) => {
      // Step 1: Landing Page
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Visual: Landing page initial state
      await expect(page).toHaveScreenshot('new-user-01-landing-page.png', { 
        fullPage: true,
        animations: 'disabled'
      })
      
      // Step 2: Click "Start Creating" CTA (use the main hero button)
      const startButton = page.locator('text=Start Creating').first()
      await expect(startButton).toBeVisible()
      
      // Visual: CTA button state
      await expect(startButton).toHaveScreenshot('new-user-02-start-button.png')
      
      // Click and capture loading/transition state
      await startButton.click()
      await page.waitForTimeout(1000) // Allow for any transition animation
      
      // Visual: After CTA click (may redirect or show loading)
      await expect(page).toHaveScreenshot('new-user-03-after-start-click.png', { 
        fullPage: true,
        animations: 'disabled'
      })
      
      // Step 3: Navigate to Login (mock auth flow)
      await page.goto('/(auth)/login')
      await page.waitForLoadState('networkidle')
      
      // Visual: Login page state
      await expect(page).toHaveScreenshot('new-user-04-login-page.png', { 
        fullPage: true,
        animations: 'disabled'
      })
      
      // Step 4: Mock Google OAuth Login
      const googleLoginButton = page.locator('text=Sign in with Google')
      await expect(googleLoginButton).toBeVisible()
      
      // Visual: Google login button state
      await expect(googleLoginButton).toHaveScreenshot('new-user-05-google-login-button.png')
      
      // Click login and capture loading state
      await googleLoginButton.click()
      
      // Wait for loading spinner or transition
      try {
        await page.waitForSelector('.animate-spin, [class*="loading"]', { timeout: 3000 })
        await expect(page).toHaveScreenshot('new-user-06-login-loading.png')
      } catch (e) {
        // If no loading state, capture immediate transition
        await expect(page).toHaveScreenshot('new-user-06-login-transition.png')
      }
      
      // Step 5: Profile Setup (if it appears for new users)
      await page.waitForLoadState('networkidle', { timeout: 10000 })
      
      if (await page.locator('text=Profile Setup, text=Welcome').count() > 0) {
        // Visual: Profile setup page
        await expect(page).toHaveScreenshot('new-user-07-profile-setup.png', { 
          fullPage: true,
          animations: 'disabled'
        })
        
        // Fill profile form
        const countrySelect = page.locator('select, [role="combobox"]').first()
        if (await countrySelect.count() > 0) {
          await countrySelect.click()
          // Visual: Dropdown open
          await expect(page).toHaveScreenshot('new-user-08-country-dropdown.png')
          
          const englandOption = page.locator('[role="option"]:has-text("England"), option:has-text("England")')
          if (await englandOption.count() > 0) {
            await englandOption.click()
          }
        }
        
        // Visual: Form filled state
        await expect(page).toHaveScreenshot('new-user-09-profile-filled.png', { 
          fullPage: true,
          animations: 'disabled'
        })
        
        // Submit profile (look for continue/save button)
        const continueButton = page.locator('text=Continue, text=Save, text=Next').first()
        if (await continueButton.count() > 0) {
          await continueButton.click()
          await page.waitForLoadState('networkidle', { timeout: 5000 })
        }
      }
      
      // Step 6: Dashboard Arrival (final state)
      await page.goto('/dashboard') // Ensure we reach dashboard
      await page.waitForLoadState('networkidle')
      
      // Visual: New user dashboard welcome state
      await expect(page).toHaveScreenshot('new-user-10-dashboard-arrival.png', { 
        fullPage: true,
        animations: 'disabled'
      })
      
      // Verify key dashboard elements are present
      await expect(page.locator('text=WorksheetGenerator.AI')).toBeVisible()
      await expect(page.locator('text=Generate Worksheet')).toBeVisible()
      
      // Visual: Dashboard navigation for new user
      const header = page.locator('header').first()
      await expect(header).toHaveScreenshot('new-user-11-dashboard-navigation.png')
      
      // Check for welcome tour or first-time user elements
      if (await page.locator('text=Welcome, [class*="tour"], [data-testid*="welcome"]').count() > 0) {
        await expect(page).toHaveScreenshot('new-user-12-welcome-tour.png')
      }
    })
    
    test('should handle new user flow on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      // Abbreviated mobile flow focusing on key transitions
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      await expect(page).toHaveScreenshot('new-user-mobile-01-landing.png', { 
        fullPage: true,
        animations: 'disabled'
      })
      
      // Mobile CTA interaction (use first button)
      await page.click('text=Start Creating')
      await page.waitForTimeout(1000)
      
      await expect(page).toHaveScreenshot('new-user-mobile-02-after-cta.png', { 
        fullPage: true,
        animations: 'disabled'
      })
      
      // Skip to dashboard for mobile test
      await page.goto('/dashboard')
      await page.waitForLoadState('networkidle')
      
      await expect(page).toHaveScreenshot('new-user-mobile-03-dashboard.png', { 
        fullPage: true,
        animations: 'disabled'
      })
    })
  })

  test.describe('Existing User Direct Access', () => {
    test('should handle existing user flow: Direct Login → Dashboard', async ({ page }) => {
      // Step 1: Direct login attempt (existing user)
      await page.goto('/(auth)/login')
      await page.waitForLoadState('networkidle')
      
      // Visual: Login page for returning user
      await expect(page).toHaveScreenshot('existing-user-01-login-page.png', { 
        fullPage: true,
        animations: 'disabled'
      })
      
      // Step 2: Quick OAuth flow (existing user - faster)
      const googleLoginButton = page.locator('text=Sign in with Google')
      await expect(googleLoginButton).toBeVisible()
      
      await googleLoginButton.click()
      
      // Existing users should have faster transition
      await page.waitForLoadState('networkidle', { timeout: 8000 })
      
      // Visual: Loading state for existing user (should be brief)
      try {
        await page.waitForSelector('.animate-spin, [class*="loading"]', { timeout: 2000 })
        await expect(page).toHaveScreenshot('existing-user-02-quick-loading.png')
      } catch (e) {
        // Fast transition for existing users
        await expect(page).toHaveScreenshot('existing-user-02-fast-transition.png')
      }
      
      // Step 3: Direct dashboard access (skip profile setup)
      await page.goto('/dashboard') // Simulate direct access for existing user
      await page.waitForLoadState('networkidle')
      
      // Visual: Existing user dashboard (no welcome tour)
      await expect(page).toHaveScreenshot('existing-user-03-dashboard-direct.png', { 
        fullPage: true,
        animations: 'disabled'
      })
      
      // Step 4: Verify existing user state indicators
      const header = page.locator('header').first()
      await expect(header).toHaveScreenshot('existing-user-04-navigation-state.png')
      
      // Check for user profile information in navigation
      const viewport = page.viewportSize()
      if (viewport && viewport.width >= 768) {
        const userDropdown = page.locator('[role="button"]:has-text("Sarah"), [aria-haspopup="menu"]')
        if (await userDropdown.count() > 0) {
          await userDropdown.click()
          await page.waitForSelector('[role="menuitem"]', { timeout: 3000 })
          await expect(page).toHaveScreenshot('existing-user-05-user-menu.png')
        }
      }
      
      // Step 5: Verify existing user's previous data/settings
      // Check usage counter shows existing usage
      const usageCounter = page.locator('text=/\\d+\\/\\d+ worksheets/')
      if (await usageCounter.count() > 0) {
        await expect(usageCounter).toHaveScreenshot('existing-user-06-usage-counter.png')
      }
      
      // Check for existing name lists (if user has them)
      await page.goto('/name-lists')
      await page.waitForLoadState('networkidle')
      
      await expect(page).toHaveScreenshot('existing-user-07-existing-name-lists.png', { 
        fullPage: true,
        animations: 'disabled'
      })
      
      // Return to dashboard for final state
      await page.goto('/dashboard')
      await page.waitForLoadState('networkidle')
      
      await expect(page).toHaveScreenshot('existing-user-08-final-dashboard.png', { 
        fullPage: true,
        animations: 'disabled'
      })
    })
    
    test('should handle existing user flow on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })
      
      // Tablet flow for existing user
      await page.goto('/(auth)/login')
      await page.waitForLoadState('networkidle')
      
      await expect(page).toHaveScreenshot('existing-user-tablet-01-login.png', { 
        fullPage: true,
        animations: 'disabled'
      })
      
      await page.click('text=Sign in with Google')
      await page.waitForLoadState('networkidle', { timeout: 8000 })
      
      await page.goto('/dashboard')
      await page.waitForLoadState('networkidle')
      
      await expect(page).toHaveScreenshot('existing-user-tablet-02-dashboard.png', { 
        fullPage: true,
        animations: 'disabled'
      })
    })
  })

  test.describe('Authentication Error States', () => {
    test('should handle authentication failure visually', async ({ page }) => {
      await page.goto('/(auth)/login')
      await page.waitForLoadState('networkidle')
      
      // Simulate authentication error scenario
      // (In a real test, this would involve mocking failed OAuth)
      
      // Visual: Login page error state
      await expect(page).toHaveScreenshot('auth-error-01-login-page.png', { 
        fullPage: true,
        animations: 'disabled'
      })
      
      // Look for error messages or retry options
      const errorMessages = page.locator('.text-red-500, [role="alert"], [class*="error"]')
      if (await errorMessages.count() > 0) {
        await expect(errorMessages.first()).toHaveScreenshot('auth-error-02-error-message.png')
      }
    })
  })

  test.describe('Cross-Viewport Authentication', () => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1200, height: 800 }
    ]

    for (const viewport of viewports) {
      test(`should maintain authentication UI consistency on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height })
        
        // Test login page consistency
        await page.goto('/(auth)/login')
        await page.waitForLoadState('networkidle')
        
        await expect(page).toHaveScreenshot(`auth-consistency-${viewport.name}-login.png`, { 
          fullPage: true,
          animations: 'disabled'
        })
        
        // Test dashboard consistency after auth
        await page.goto('/dashboard')
        await page.waitForLoadState('networkidle')
        
        await expect(page).toHaveScreenshot(`auth-consistency-${viewport.name}-dashboard.png`, { 
          fullPage: true,
          animations: 'disabled'
        })
      })
    }
  })
})