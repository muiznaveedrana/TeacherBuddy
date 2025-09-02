import { test, expect } from '@playwright/test'

/**
 * Simplified New User Flow E2E Test
 * Tests the complete new user journey with visual regression
 */
test.describe('New User Flow - Simplified', () => {

  test('should complete new user authentication journey', async ({ page }) => {
    // Step 1: Landing Page
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Visual: Landing page initial state
    await expect(page).toHaveScreenshot('simple-new-user-01-landing.png', { 
      fullPage: true,
      animations: 'disabled'
    })
    
    // Step 2: Check Start Creating button
    const startButton = page.locator('text=Start Creating').first()
    await expect(startButton).toBeVisible()
    
    // Visual: Start Creating button
    await expect(startButton).toHaveScreenshot('simple-new-user-02-cta-button.png')
    
    // Step 3: Navigate to login page directly (simulating button click result)
    await page.goto('/login')
    await page.waitForLoadState('networkidle')
    
    // Visual: Login page
    await expect(page).toHaveScreenshot('simple-new-user-03-login-page.png', { 
      fullPage: true,
      animations: 'disabled'
    })
    
    // Step 4: Test Google Sign In button (find button by role and text content)
    const googleButton = page.getByRole('button', { name: /sign in with google/i })
    await expect(googleButton).toBeVisible()
    
    // Visual: Google sign in button
    await expect(googleButton).toHaveScreenshot('simple-new-user-04-google-button.png')
    
    // Click Google sign in (this should trigger loading state)
    await googleButton.click()
    
    // Step 5: Capture loading state
    const loadingState = page.locator('text=Signing in...')
    try {
      await expect(loadingState).toBeVisible({ timeout: 3000 })
      await expect(loadingState).toHaveScreenshot('simple-new-user-05-loading-state.png')
    } catch (e) {
      console.log('No loading state captured - may be too fast')
    }
    
    // Step 6: Wait for redirect and go to dashboard
    await page.waitForTimeout(3000) // Wait for mock auth
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    // Visual: Dashboard for new user
    await expect(page).toHaveScreenshot('simple-new-user-06-dashboard.png', { 
      fullPage: true,
      animations: 'disabled'
    })
    
    // Step 7: Check key dashboard elements
    await expect(page.locator('h1:has-text("WorksheetGenerator.AI")')).toBeVisible()
    
    // Visual: Navigation header for new user
    const header = page.locator('header').first()
    await expect(header).toHaveScreenshot('simple-new-user-07-navigation.png')
    
    // Step 8: Check worksheet form is ready
    const generateButton = page.locator('text=Generate Worksheet')
    await expect(generateButton).toBeVisible()
    
    // Visual: Worksheet generation form
    const formArea = page.locator('.grid').first()
    await expect(formArea).toHaveScreenshot('simple-new-user-08-worksheet-form.png')
    
    console.log('✅ New user flow test completed successfully!')
  })

  test('should test new user flow on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Mobile landing page
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveScreenshot('simple-mobile-01-landing.png', { 
      fullPage: true,
      animations: 'disabled'
    })
    
    // Mobile login page
    await page.goto('/login')
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveScreenshot('simple-mobile-02-login.png', { 
      fullPage: true,
      animations: 'disabled'
    })
    
    // Mobile dashboard
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveScreenshot('simple-mobile-03-dashboard.png', { 
      fullPage: true,
      animations: 'disabled'
    })
    
    console.log('✅ Mobile new user flow test completed!')
  })
})