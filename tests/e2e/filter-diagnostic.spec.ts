import { test, expect } from '@playwright/test'

/**
 * Diagnostic test to understand why Year 4 filter shows wrong results
 */

test('diagnose Year 4 filter behavior', async ({ page }) => {
  // Navigate to library
  await page.goto('/library')

  // Wait for page to fully load
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(2000)

  // Log initial URL
  console.log('Initial URL:', page.url())

  // Get initial worksheet count
  const initialCount = await page.locator('text=/Showing \\d+ printable/i').textContent()
  console.log('Initial count:', initialCount)

  // Find and click the Grade Level dropdown
  const gradeDropdown = page.locator('button[role="combobox"]').first()
  console.log('Grade dropdown visible:', await gradeDropdown.isVisible())
  console.log('Grade dropdown text:', await gradeDropdown.textContent())

  await gradeDropdown.click()
  await page.waitForTimeout(500)

  // Screenshot the dropdown options
  await page.screenshot({ path: 'test-results/filter-diagnostic-dropdown-open.png' })

  // List all available options
  const options = page.getByRole('option')
  const optionCount = await options.count()
  console.log('Number of options:', optionCount)

  for (let i = 0; i < optionCount; i++) {
    const optionText = await options.nth(i).textContent()
    console.log(`Option ${i}: "${optionText}"`)
  }

  // Try to find Year 4 option
  const year4Option = page.getByRole('option', { name: /Year 4/i })
  const year4Visible = await year4Option.isVisible().catch(() => false)
  console.log('Year 4 option visible:', year4Visible)

  if (year4Visible) {
    const year4Text = await year4Option.textContent()
    console.log('Year 4 option text:', year4Text)

    // Click Year 4
    await year4Option.click()
    console.log('Clicked Year 4 option')

    // Wait for navigation/data refresh
    await page.waitForTimeout(1000)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    // Check URL after selection
    console.log('URL after Year 4 selection:', page.url())

    // Check if URL has year_group parameter
    const url = new URL(page.url())
    const yearGroupParam = url.searchParams.get('year_group')
    console.log('year_group param:', yearGroupParam)

    // Wait for content to update
    await page.waitForTimeout(2000)

    // Get new count
    const newCount = await page.locator('text=/Showing \\d+ printable/i').textContent()
    console.log('Count after filter:', newCount)

    // Screenshot the filtered results
    await page.screenshot({ path: 'test-results/filter-diagnostic-year4-selected.png', fullPage: false })

    // Check first few worksheet badges
    const cards = page.locator('button.group')
    const cardCount = await cards.count()
    console.log('Number of worksheet cards:', cardCount)

    for (let i = 0; i < Math.min(cardCount, 5); i++) {
      const card = cards.nth(i)
      const cardText = await card.textContent()
      // Extract year from card
      const yearMatch = cardText?.match(/(Year \d|Grade \d|Reception)/i)
      console.log(`Card ${i + 1} year:`, yearMatch ? yearMatch[0] : 'NOT FOUND')
    }

    // Verify the filter dropdown still shows Year 4
    const dropdownText = await gradeDropdown.textContent()
    console.log('Dropdown shows after selection:', dropdownText)

    // Final assertion
    expect(yearGroupParam).toBe('Year 4')
  } else {
    console.log('Year 4 option NOT visible, available options listed above')
    await page.screenshot({ path: 'test-results/filter-diagnostic-no-year4.png' })
  }
})

test('test filter via direct URL navigation', async ({ page }) => {
  // Navigate directly with year_group parameter
  await page.goto('/library?year_group=Year%204')

  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(2000)

  console.log('URL:', page.url())

  // Check filter dropdown shows Year 4
  const gradeDropdown = page.locator('button[role="combobox"]').first()
  const dropdownText = await gradeDropdown.textContent()
  console.log('Dropdown shows:', dropdownText)

  // Get worksheet count
  const countText = await page.locator('text=/Showing \\d+ printable/i').textContent()
  console.log('Worksheet count:', countText)

  // Screenshot
  await page.screenshot({ path: 'test-results/filter-diagnostic-direct-url.png', fullPage: false })

  // Check worksheet badges
  const cards = page.locator('button.group')
  const cardCount = await cards.count()

  let year4Count = 0
  let otherYearCount = 0

  for (let i = 0; i < Math.min(cardCount, 10); i++) {
    const card = cards.nth(i)
    const cardText = await card.textContent()
    if (cardText?.includes('Year 4') || cardText?.includes('Grade 4')) {
      year4Count++
    } else {
      otherYearCount++
      const yearMatch = cardText?.match(/(Year \d|Grade \d|Reception)/i)
      console.log(`Non-Year4 card ${i}:`, yearMatch ? yearMatch[0] : 'unknown')
    }
  }

  console.log(`Year 4 cards: ${year4Count}, Other year cards: ${otherYearCount}`)

  // All cards should be Year 4
  expect(otherYearCount).toBe(0)
})
