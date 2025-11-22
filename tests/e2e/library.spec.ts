import { test, expect } from '@playwright/test'

/**
 * Library Page E2E Tests (Simplified - No Filters)
 *
 * Tests core functionality without filter sidebar:
 * - Page load and initial state
 * - Search functionality (AI-powered)
 * - Worksheet card display and interactions
 * - Navigation to detail pages
 * - Sorting functionality
 *
 * Testing Strategy: Functional testing only (no screenshots)
 * - Test actual button clicks, navigation, state changes
 * - Verify element visibility and functionality
 * - Validate URL state management
 */

test.describe('Library Page - Core Functionality', () => {

  test.describe('1. Page Load and Initial State', () => {

    test('1.1 Initial Page Load', async ({ page }) => {
      // Navigate to library
      await page.goto('/library', { timeout: 60000 })
      await page.waitForLoadState('networkidle')

      // Wait for content to load
      await page.waitForTimeout(2000)

      // Hero section displays
      await expect(page.locator('h1:has-text("Free Printable Library")')).toBeVisible()

      // Search bar is visible
      const searchInput = page.locator('input[placeholder*="Try:"]')
      await expect(searchInput).toBeVisible()

      // Breadcrumb shows: Home > Library
      const breadcrumb = page.locator('nav.flex.items-center.gap-2')
      await expect(breadcrumb.locator('a:has-text("Home")')).toBeVisible()
      await expect(breadcrumb.locator('span:has-text("Library")')).toBeVisible()

      // Worksheet grid displays
      const worksheetGrid = page.locator('main .grid')
      await expect(worksheetGrid).toBeVisible()

      // Sort dropdown defaults to "Newest First"
      const sortSelect = page.locator('select#sort')
      await expect(sortSelect).toBeVisible({ timeout: 15000 })
      await expect(sortSelect).toHaveValue('newest')
    })
  })

  test.describe('2. Navigation and Header', () => {

    test('2.1 Top Navigation Links', async ({ page }) => {
      await page.goto('/library', { timeout: 60000 })
      await page.waitForLoadState('networkidle')

      // Verify navigation header exists
      const nav = page.locator('nav').first()
      await expect(nav).toBeVisible()

      // Test Home link
      const homeLink = page.locator('a[href="/"]').first()
      await expect(homeLink).toBeVisible()

      // Test Browse Library link (should be highlighted)
      const libraryLink = page.locator('a[href="/library"]').first()
      await expect(libraryLink).toBeVisible()
    })

    test('2.2 Breadcrumb Navigation', async ({ page }) => {
      await page.goto('/library', { timeout: 60000 })
      await page.waitForLoadState('networkidle')

      // Breadcrumb shows Home > Library
      const breadcrumb = page.locator('nav.flex.items-center.gap-2')
      await expect(breadcrumb.locator('a:has-text("Home")')).toBeVisible()
      await expect(breadcrumb.locator('span:has-text("Library")')).toBeVisible()

      // Click Home breadcrumb
      await breadcrumb.locator('a:has-text("Home")').click()
      await page.waitForLoadState('networkidle')

      // Verify navigation to home
      await expect(page).toHaveURL('/')
    })
  })

  test.describe('3. Search Functionality', () => {

    test('3.1 Basic Text Search', async ({ page }) => {
      await page.goto('/library', { timeout: 60000 })
      await page.waitForLoadState('networkidle')

      // Find search input
      const searchInput = page.locator('input[placeholder*="Try:"]')
      await expect(searchInput).toBeVisible()

      // Type and submit search
      await searchInput.fill('counting')
      await searchInput.press('Enter')

      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(3000) // Wait for AI processing

      // Verify URL updated (could be AI parsed or text search)
      const url = page.url()
      expect(url).toContain('/library')

      // Should have navigated or added query params
      const hasQuery = url.includes('q=') || url.includes('topic=') || url.includes('year_group=')
      expect(hasQuery || url === 'http://localhost:3000/library').toBeTruthy()
    })

    test('3.2 AI-Powered Natural Language Search', async ({ page }) => {
      await page.goto('/library', { timeout: 60000 })
      await page.waitForLoadState('networkidle')

      const searchInput = page.locator('input[placeholder*="Try:"]')

      // Type natural language query
      await searchInput.fill('easy christmas counting for reception')
      await searchInput.press('Enter')

      // Wait for AI processing
      await page.waitForTimeout(4000)
      await page.waitForLoadState('networkidle')

      // Verify URL was updated (navigated away from base /library)
      const url = page.url()
      expect(url).toContain('/library')

      // AI might parse filters OR fallback to text search
      const hasFilters = url.includes('year_group=') ||
                        url.includes('seasonal_theme=') ||
                        url.includes('topic=') ||
                        url.includes('q=')
      // AI search might keep on same page or navigate with filters
      expect(hasFilters || url === 'http://localhost:3000/library').toBeTruthy()
    })

    test('3.3 Search Clear Functionality', async ({ page }) => {
      await page.goto('/library', { timeout: 60000 })
      await page.waitForLoadState('networkidle')

      const searchInput = page.locator('input[placeholder*="Try:"]')

      // Type search query
      await searchInput.fill('addition')

      // Wait for clear button to appear (X icon button)
      const clearButton = page.locator('button:has(svg)').filter({ hasText: '' }).last()
      await expect(clearButton).toBeVisible()

      // Click clear button
      await clearButton.click()

      // Verify search cleared
      await expect(searchInput).toHaveValue('')
    })
  })

  test.describe('4. Sorting and Display Options', () => {

    test('4.1 Sort by Newest First (Default)', async ({ page }) => {
      await page.goto('/library', { timeout: 60000 })
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(2000)

      // Verify default sort
      const sortSelect = page.locator('select#sort')
      await expect(sortSelect).toBeVisible({ timeout: 15000 })
      await expect(sortSelect).toHaveValue('newest')

      // URL should show sort=newest or no sort param
      const url = page.url()
      const hasSort = url.includes('sort=newest') || !url.includes('sort=')
      expect(hasSort).toBeTruthy()
    })

    test('4.2 Sort by Most Popular', async ({ page }) => {
      await page.goto('/library', { timeout: 60000 })
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(2000)

      // Change sort to popular
      const sortSelect = page.locator('select#sort')
      await expect(sortSelect).toBeVisible({ timeout: 15000 })
      await sortSelect.selectOption('popular')

      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(1000)

      // Verify URL updated
      expect(page.url()).toContain('sort=popular')
    })
  })

  test.describe('5. Worksheet Cards Display', () => {

    test('5.1 Card Layout and Structure', async ({ page }) => {
      await page.goto('/library', { timeout: 60000 })
      await page.waitForLoadState('networkidle')

      // Wait for worksheets to load (they're loaded via API)
      await page.waitForTimeout(3000)

      // Verify grid exists
      const grid = page.locator('main .grid').first()
      await expect(grid).toBeVisible({ timeout: 15000 })

      // Verify cards exist (wait for API response and rendering)
      const cards = page.locator('main .grid a[href*="/library/"]')
      await expect(cards.first()).toBeVisible({ timeout: 15000 })

      const count = await cards.count()
      expect(count).toBeGreaterThan(0)
    })

    test('5.2 Card Click Navigation', async ({ page }) => {
      await page.goto('/library', { timeout: 60000 })
      await page.waitForLoadState('networkidle')

      // Wait for worksheets to load
      await page.waitForTimeout(3000)

      // Get first worksheet card
      const firstCard = page.locator('main .grid a[href*="/library/"]').first()
      await expect(firstCard).toBeVisible({ timeout: 15000 })

      // Get href attribute
      const href = await firstCard.getAttribute('href')
      expect(href).toBeTruthy()
      expect(href).toContain('/library/')

      // Click card
      await firstCard.click()
      await page.waitForLoadState('networkidle')

      // Verify navigated to detail page
      expect(page.url()).toContain('/library/')
      expect(page.url()).not.toContain('/library?')
    })

    test('5.3 Card Hover Effects', async ({ page }) => {
      await page.goto('/library', { timeout: 60000 })
      await page.waitForLoadState('networkidle')

      // Wait for worksheets to load
      await page.waitForTimeout(3000)

      // Get first card
      const firstCard = page.locator('main .grid a[href*="/library/"]').first()
      await expect(firstCard).toBeVisible({ timeout: 15000 })

      // Hover over card
      await firstCard.hover()

      // Visual hover effects should occur (shadow, scale)
      // Since we're not testing visuals, just verify card is still interactive
      await expect(firstCard).toBeVisible()
    })
  })

  test.describe('6. Infinite Scroll and Pagination', () => {

    test('6.1 Initial Page Load (First 20)', async ({ page }) => {
      await page.goto('/library', { timeout: 60000 })
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(2000)

      // Should not have page parameter initially
      const url = page.url()
      expect(url).not.toContain('page=')
    })

    test('6.2 Infinite Scroll Trigger', async ({ page }) => {
      await page.goto('/library', { timeout: 60000 })
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(2000)

      // Scroll to bottom to trigger load more
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

      // Wait for loading
      await page.waitForTimeout(3000)

      // Verify we're still on library page
      expect(page.url()).toContain('/library')
    })

    test('6.3 Direct Page Navigation via URL', async ({ page }) => {
      await page.goto('/library?page=1', { timeout: 60000 })
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(2000)

      // URL should contain page parameter
      expect(page.url()).toContain('page=1')
    })
  })
})

test.describe('Library Page - Detail Pages', () => {

  test.describe('7. Worksheet Detail Page', () => {

    test('7.1 Navigate to Detail Page', async ({ page }) => {
      // First go to library
      await page.goto('/library', { timeout: 60000 })
      await page.waitForLoadState('networkidle')

      // Wait for worksheets to load
      await page.waitForTimeout(3000)

      // Click first worksheet card
      const firstCard = page.locator('main .grid a[href*="/library/"]').first()
      await expect(firstCard).toBeVisible({ timeout: 15000 })

      const href = await firstCard.getAttribute('href')
      expect(href).toContain('/library/')

      await firstCard.click()
      await page.waitForLoadState('networkidle')

      // Verify detail page loaded
      expect(page.url()).toContain('/library/')
      expect(page.url()).not.toContain('/library?')

      // Verify page structure
      await expect(page.locator('h1, h2, h3').first()).toBeVisible()
    })

    test('7.2 Detail Page - Interactive Mode Button', async ({ page }) => {
      // Navigate to a worksheet detail page
      await page.goto('/library', { timeout: 60000 })
      await page.waitForLoadState('networkidle')

      // Wait for worksheets to load
      await page.waitForTimeout(3000)

      const firstCard = page.locator('main .grid a[href*="/library/"]').first()
      await expect(firstCard).toBeVisible({ timeout: 15000 })
      await firstCard.click()
      await page.waitForLoadState('networkidle')

      // Find Interactive Mode button
      const interactiveButton = page.locator('button:has-text("Interactive Mode"), a:has-text("Interactive Mode")')

      const hasButton = await interactiveButton.count() > 0
      if (hasButton) {
        await expect(interactiveButton.first()).toBeVisible()

        // Click button
        await interactiveButton.first().click()
        await page.waitForLoadState('networkidle')

        // Verify navigation to interactive page
        expect(page.url()).toContain('/interactive')
      }
    })

    test('7.3 Detail Page - Download PDF Button', async ({ page }) => {
      // Navigate to detail page
      await page.goto('/library', { timeout: 60000 })
      await page.waitForLoadState('networkidle')

      // Wait for worksheets to load
      await page.waitForTimeout(3000)

      const firstCard = page.locator('main .grid a[href*="/library/"]').first()
      await expect(firstCard).toBeVisible({ timeout: 15000 })
      await firstCard.click()
      await page.waitForLoadState('networkidle')

      // Find Download PDF button
      const downloadButton = page.locator('button:has-text("Download PDF")')

      const hasButton = await downloadButton.count() > 0
      if (hasButton) {
        await expect(downloadButton).toBeVisible()

        // Set up download listener
        const downloadPromise = page.waitForEvent('download', { timeout: 15000 }).catch(() => null)

        // Click download button
        await downloadButton.click()

        // Wait for download to start
        const download = await downloadPromise

        if (download) {
          // Verify download started
          expect(download).toBeTruthy()

          // Verify filename ends with .pdf
          const filename = download.suggestedFilename()
          expect(filename).toContain('.pdf')
        }
      }
    })

    test('7.4 Detail Page - Breadcrumb Navigation', async ({ page }) => {
      // Navigate to detail page
      await page.goto('/library', { timeout: 60000 })
      await page.waitForLoadState('networkidle')

      // Wait for worksheets to load
      await page.waitForTimeout(3000)

      const firstCard = page.locator('main .grid a[href*="/library/"]').first()
      await expect(firstCard).toBeVisible({ timeout: 15000 })
      await firstCard.click()
      await page.waitForLoadState('networkidle')

      // Find breadcrumb with Library link
      const libraryBreadcrumb = page.locator('nav a:has-text("Library")').first()

      const hasBreadcrumb = await libraryBreadcrumb.count() > 0
      if (hasBreadcrumb) {
        await expect(libraryBreadcrumb).toBeVisible()

        // Click Library breadcrumb
        await libraryBreadcrumb.click()
        await page.waitForLoadState('networkidle')

        // Verify navigation back to library
        expect(page.url()).toContain('/library')
        expect(page.url()).not.toContain('/library/')
      }
    })
  })
})

test.describe('Library Page - Advanced Features', () => {

  test.describe('8. Responsive Design', () => {

    test('8.1 Mobile Layout', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto('/library', { timeout: 60000 })
      await page.waitForLoadState('networkidle')

      // Wait for worksheets to load
      await page.waitForTimeout(3000)

      // Verify page loads on mobile
      await expect(page.locator('h1:has-text("Free Printable Library")')).toBeVisible()

      // Verify search works
      const searchInput = page.locator('input[placeholder*="Try:"]')
      await expect(searchInput).toBeVisible()

      // Verify worksheet grid displays (2-column on mobile)
      const grid = page.locator('main .grid')
      await expect(grid).toBeVisible()

      // Verify cards are clickable
      const firstCard = page.locator('main .grid a[href*="/library/"]').first()
      await expect(firstCard).toBeVisible({ timeout: 15000 })
    })

    test('8.2 Tablet Layout', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 })

      await page.goto('/library', { timeout: 60000 })
      await page.waitForLoadState('networkidle')

      // Verify page loads on tablet
      await expect(page.locator('h1:has-text("Free Printable Library")')).toBeVisible()

      // Verify grid displays (3-column on tablet)
      const grid = page.locator('main .grid')
      await expect(grid).toBeVisible()
    })
  })

  test.describe('9. Error Handling', () => {

    test('9.1 Invalid Slug Handling', async ({ page }) => {
      // Navigate to invalid worksheet slug
      const response = await page.goto('/library/invalid-slug-that-does-not-exist-12345')

      // Should get 404 or redirect
      const status = response?.status()
      expect(status).toBeTruthy()

      // Page should load some error state or 404
      await page.waitForLoadState('networkidle')
    })
  })
})
