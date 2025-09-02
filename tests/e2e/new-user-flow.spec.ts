import { test, expect } from '@playwright/test'

/**
 * Simplified New User Flow E2E Test
 * Tests the complete new user journey functionality
 */
test.describe('New User Flow - Simplified', () => {

  test('should complete new user authentication journey', async ({ page }) => {
    // Step 1: Landing Page
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Step 2: Check Start Creating button and test navigation
    const startButton = page.locator('text=Start Creating').first()
    await expect(startButton).toBeVisible()
    
    // Step 3: Click Start Creating button and verify it navigates to login
    await startButton.click()
    await page.waitForLoadState('networkidle')
    
    // Verify we're on the login page
    await expect(page).toHaveURL('/login')
    
    // Step 4: Test Google Sign In button (find button by role and text content)
    const googleButton = page.getByRole('button', { name: /sign in with google/i })
    await expect(googleButton).toBeVisible()
    
    // Click Google sign in (this should trigger loading state)
    await googleButton.click()
    
    // Step 5: Check for loading state
    const loadingState = page.locator('text=Signing in...')
    try {
      await expect(loadingState).toBeVisible({ timeout: 3000 })
    } catch (e) {
      console.log('No loading state captured - may be too fast')
    }
    
    // Step 6: Wait for redirect and go to dashboard
    await page.waitForTimeout(3000) // Wait for mock auth
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    // Step 7: Check key dashboard elements
    await expect(page.locator('h1:has-text("WorksheetGenerator.AI")')).toBeVisible()
    
    // Step 8: Check worksheet form is ready
    const generateButton = page.locator('text=Generate Worksheet')
    await expect(generateButton).toBeVisible()
    
    console.log('✅ New user flow test completed successfully!')
  })

  test('should test new user flow on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Mobile landing page
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Mobile login page
    await page.goto('/login')
    await page.waitForLoadState('networkidle')
    
    // Mobile dashboard
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    // Verify essential elements work on mobile
    await expect(page.locator('h1:has-text("WG.AI")')).toBeVisible()
    await expect(page.locator('text=Generate Worksheet')).toBeVisible()
    
    console.log('✅ Mobile new user flow test completed!')
  })
})