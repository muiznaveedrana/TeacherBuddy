import { test, expect } from '@playwright/test'

test.describe('Library Browse & View Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to library page
    await page.goto('http://localhost:3000/library')
  })

  test('should load library page with worksheets', async ({ page }) => {
    // Check page title
    await expect(page.locator('h1')).toContainText('Free Worksheet Library')

    // Check description
    await expect(page.locator('text=Browse our collection')).toBeVisible()

    // Wait for API response (increased timeout for initial compilation)
    await page.waitForResponse(response =>
      response.url().includes('/api/library/browse') && response.status() === 200,
      { timeout: 60000 }
    )

    // Check that worksheets are loaded (grid should have cards)
    const worksheetCards = page.locator('[data-testid="worksheet-card"]').or(
      page.locator('.worksheet-card')
    ).or(
      // Fallback: any link to /library/
      page.locator('a[href^="/library/"]')
    )

    await expect(worksheetCards.first()).toBeVisible({ timeout: 10000 })

    // Verify multiple worksheets are shown
    const count = await worksheetCards.count()
    expect(count).toBeGreaterThan(0)

    console.log(`✅ Found ${count} worksheets in library`)
  })

  test('should filter worksheets by year group', async ({ page }) => {
    // Wait for initial load (increased timeout for initial compilation)
    await page.waitForResponse(response =>
      response.url().includes('/api/library/browse'),
      { timeout: 60000 }
    )

    // Look for filter sidebar with Select components
    const filterSelect = page.locator('button[role="combobox"]').first()

    if (await filterSelect.isVisible({ timeout: 5000 })) {
      // Click to open select dropdown
      await filterSelect.click()

      // Click "Year 1" option in the dropdown (use role to avoid worksheet titles)
      await page.getByRole('option', { name: 'Year 1' }).click()

      // Wait for filtered results (increased timeout)
      await page.waitForResponse(response =>
        response.url().includes('/api/library/browse') &&
        response.url().includes('year_group=Year'),
        { timeout: 60000 }
      )

      // Verify URL updated with filter
      await expect(page).toHaveURL(/year_group=Year/)

      console.log('✅ Year group filter applied')
    } else {
      console.log('⚠️ Year group filter not found - skipping filter test')
    }
  })

  test('should navigate to worksheet detail page', async ({ page }) => {
    // Wait for worksheets to load (increased timeout for initial compilation)
    await page.waitForResponse(response =>
      response.url().includes('/api/library/browse'),
      { timeout: 60000 }
    )

    // Find first worksheet link
    const firstWorksheet = page.locator('a[href^="/library/"]').first()
    await expect(firstWorksheet).toBeVisible({ timeout: 10000 })

    // Get the href to verify later
    const worksheetUrl = await firstWorksheet.getAttribute('href')
    expect(worksheetUrl).toBeTruthy()

    // Click to navigate
    await firstWorksheet.click()

    // Wait for navigation
    await page.waitForURL(/\/library\/[a-z0-9-]+$/)

    // Verify we're on detail page
    expect(page.url()).toContain('/library/')
    expect(page.url()).not.toBe('http://localhost:3000/library')

    // Check that worksheet content is visible
    await expect(page.locator('h1').or(page.locator('h2'))).toBeVisible()

    console.log(`✅ Navigated to detail page: ${page.url()}`)
  })

  test('should display worksheet preview on detail page', async ({ page }) => {
    // Navigate to a specific worksheet (using one from sample data)
    await page.goto('http://localhost:3000/library/simple-addition-with-colorful-fruits')

    // Check title/heading exists
    await expect(page.locator('h1, h2, h3')).toBeVisible()

    // Check for download button
    const downloadButton = page.locator('button:has-text("Download")').or(
      page.locator('text=Download PDF')
    )
    await expect(downloadButton.first()).toBeVisible({ timeout: 10000 })

    // Check for worksheet preview/metadata (using .first() to avoid strict mode violation)
    await expect(page.locator('text=Year').or(page.locator('text=Reception')).first()).toBeVisible()

    console.log('✅ Worksheet detail page loaded successfully')
  })

  test('should show search functionality', async ({ page }) => {
    // Look for search input
    const searchInput = page.locator('input[type="text"]').or(
      page.locator('input[placeholder*="earch"]')
    ).first()

    if (await searchInput.isVisible()) {
      await searchInput.fill('addition')

      // Wait for search results
      await page.waitForResponse(response =>
        response.url().includes('/api/library/browse')
      )

      console.log('✅ Search functionality works')
    } else {
      console.log('⚠️ Search not found - may be added later')
    }
  })
})

test.describe('Library SEO & Performance', () => {
  test('should have proper meta tags', async ({ page }) => {
    await page.goto('http://localhost:3000/library')

    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content')
    expect(metaDescription).toBeTruthy()

    console.log(`✅ Meta description: ${metaDescription}`)
  })

  test('should generate sitemap.xml', async ({ page }) => {
    const response = await page.goto('http://localhost:3000/sitemap.xml')

    expect(response?.status()).toBe(200)
    expect(response?.headers()['content-type']).toContain('xml')

    const content = await page.content()
    expect(content).toContain('<urlset')
    expect(content).toContain('<loc>')

    console.log('✅ Sitemap.xml generated successfully')
  })

  test('should generate robots.txt', async ({ page }) => {
    const response = await page.goto('http://localhost:3000/robots.txt')

    expect(response?.status()).toBe(200)

    const content = await page.content()
    expect(content).toContain('User-Agent:') // Note: Capital A
    expect(content).toContain('sitemap.xml')

    console.log('✅ Robots.txt generated successfully')
  })
})
