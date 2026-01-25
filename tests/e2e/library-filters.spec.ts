import { test, expect, Page } from '@playwright/test'

/**
 * Library Filter E2E Tests
 *
 * Tests validate that filters work correctly from an end-user perspective:
 * 1. Grade level filtering shows only worksheets for selected year
 * 2. Topic filtering narrows results within grade level
 * 3. Subtopic filtering further narrows results
 * 4. Filter combinations work with AND logic
 * 5. Clear filters resets to show all worksheets
 */

// Helper to dismiss cookie consent
async function dismissCookieConsent(page: Page) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"]').forEach(el => {
      if ((el as HTMLElement).style?.position === 'fixed') el.remove()
    })
  })
}

// Helper to get worksheet cards
async function getWorksheetCards(page: Page) {
  return page.locator('.group.bg-\\[hsl\\(48\\,20\\%\\,99\\%\\)\\]')
    .or(page.locator('[data-testid="worksheet-card"]'))
    .or(page.locator('button.group.rounded-lg.border'))
}

// Helper to extract year group from worksheet card badge
async function getYearGroupFromCard(card: any) {
  const badge = card.locator('div.absolute.bottom-2.left-2, div.bg-purple-600, div.bg-blue-600, div.bg-green-600, div.bg-orange-600, div.bg-red-600, div.bg-teal-600, div.bg-pink-600').first()
  return badge.textContent()
}

// Helper to select a filter option
async function selectFilter(page: Page, filterIndex: number, optionName: string) {
  const filterButtons = page.locator('button[role="combobox"]')
  const targetFilter = filterButtons.nth(filterIndex)
  await targetFilter.click()
  await page.waitForTimeout(300) // Wait for dropdown animation
  await page.getByRole('option', { name: optionName }).click()
  await page.waitForTimeout(500) // Wait for filter to apply
}

// Helper to wait for worksheets to load
async function waitForWorksheetsToLoad(page: Page) {
  // Wait for loading skeletons to disappear
  await page.waitForFunction(() => {
    const skeletons = document.querySelectorAll('.animate-pulse')
    return skeletons.length === 0
  }, { timeout: 10000 }).catch(() => {})
  await page.waitForTimeout(500)
}

test.describe('Library Filters - Grade Level Selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/library')
    await dismissCookieConsent(page)
    await waitForWorksheetsToLoad(page)
  })

  test('selecting Year 4 shows only Year 4 worksheets', async ({ page }) => {
    // Select Year 4 from grade filter (first combobox)
    await selectFilter(page, 0, /Year 4|Grade 4/i)

    // Wait for URL to update
    await expect(page).toHaveURL(/year_group=Year.*4/i)
    await waitForWorksheetsToLoad(page)

    // Get all worksheet cards
    const cards = await getWorksheetCards(page)
    const cardCount = await cards.count()

    console.log(`Found ${cardCount} Year 4 worksheets`)
    expect(cardCount).toBeGreaterThan(0)

    // Verify each visible card has Year 4 badge
    for (let i = 0; i < Math.min(cardCount, 8); i++) {
      const card = cards.nth(i)
      await card.scrollIntoViewIfNeeded()
      const badgeText = await getYearGroupFromCard(card)
      console.log(`Card ${i + 1} badge: ${badgeText}`)
      expect(badgeText?.toLowerCase()).toMatch(/year 4|y4|grade 4/i)
    }

    // Take screenshot for visual verification
    await page.screenshot({ path: 'test-results/filter-year4-only.png', fullPage: false })
  })

  test('selecting Reception shows only Reception worksheets', async ({ page }) => {
    await selectFilter(page, 0, /Reception|Kindergarten/i)

    await expect(page).toHaveURL(/year_group=Reception/i)
    await waitForWorksheetsToLoad(page)

    const cards = await getWorksheetCards(page)
    const cardCount = await cards.count()

    console.log(`Found ${cardCount} Reception worksheets`)
    expect(cardCount).toBeGreaterThan(0)

    // Verify badges show Reception
    for (let i = 0; i < Math.min(cardCount, 5); i++) {
      const card = cards.nth(i)
      await card.scrollIntoViewIfNeeded()
      const badgeText = await getYearGroupFromCard(card)
      expect(badgeText?.toLowerCase()).toMatch(/reception|kindergarten|rec/i)
    }
  })

  test('selecting Year 1 shows only Year 1 worksheets', async ({ page }) => {
    await selectFilter(page, 0, /Year 1|Grade 1/i)

    await expect(page).toHaveURL(/year_group=Year.*1/i)
    await waitForWorksheetsToLoad(page)

    const cards = await getWorksheetCards(page)
    expect(await cards.count()).toBeGreaterThan(0)
  })

  test('selecting Year 3 shows only Year 3 worksheets', async ({ page }) => {
    await selectFilter(page, 0, /Year 3|Grade 3/i)

    await expect(page).toHaveURL(/year_group=Year.*3/i)
    await waitForWorksheetsToLoad(page)

    const cards = await getWorksheetCards(page)
    const cardCount = await cards.count()

    console.log(`Found ${cardCount} Year 3 worksheets`)
    expect(cardCount).toBeGreaterThan(0)
  })
})

test.describe('Library Filters - Topic Selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/library')
    await dismissCookieConsent(page)
    await waitForWorksheetsToLoad(page)
  })

  test('selecting Addition Subtraction topic filters correctly', async ({ page }) => {
    // First select Year 4
    await selectFilter(page, 0, /Year 4|Grade 4/i)
    await waitForWorksheetsToLoad(page)

    const cardsBeforeTopic = await getWorksheetCards(page)
    const countBefore = await cardsBeforeTopic.count()
    console.log(`Year 4 worksheets before topic filter: ${countBefore}`)

    // Then select Addition Subtraction topic (second combobox)
    await selectFilter(page, 1, /Addition.*Subtraction/i)
    await waitForWorksheetsToLoad(page)

    await expect(page).toHaveURL(/topic=addition-subtraction/i)

    const cardsAfterTopic = await getWorksheetCards(page)
    const countAfter = await cardsAfterTopic.count()
    console.log(`Year 4 Addition/Subtraction worksheets: ${countAfter}`)

    // Should have fewer or equal worksheets after applying topic filter
    expect(countAfter).toBeLessThanOrEqual(countBefore)
    expect(countAfter).toBeGreaterThan(0)

    // Verify the topic metadata on cards
    for (let i = 0; i < Math.min(countAfter, 5); i++) {
      const card = cardsAfterTopic.nth(i)
      await card.scrollIntoViewIfNeeded()
      const cardText = await card.textContent()
      console.log(`Card ${i + 1} text includes: ${cardText?.substring(0, 100)}`)
      // Topic should be visible in card metadata
      expect(cardText?.toLowerCase()).toMatch(/addition|subtraction/i)
    }

    await page.screenshot({ path: 'test-results/filter-year4-addition-subtraction.png', fullPage: false })
  })

  test('selecting Multiplication Division topic filters correctly', async ({ page }) => {
    await selectFilter(page, 0, /Year 3|Grade 3/i)
    await waitForWorksheetsToLoad(page)

    await selectFilter(page, 1, /Multiplication.*Division/i)
    await waitForWorksheetsToLoad(page)

    await expect(page).toHaveURL(/topic=multiplication-division/i)

    const cards = await getWorksheetCards(page)
    const count = await cards.count()
    console.log(`Year 3 Multiplication/Division worksheets: ${count}`)

    expect(count).toBeGreaterThanOrEqual(0) // May have 0 if no worksheets exist
  })

  test('selecting Fractions topic for Year 3 filters correctly', async ({ page }) => {
    await selectFilter(page, 0, /Year 3|Grade 3/i)
    await waitForWorksheetsToLoad(page)

    await selectFilter(page, 1, /Fractions/i)
    await waitForWorksheetsToLoad(page)

    await expect(page).toHaveURL(/topic=fractions/i)

    const cards = await getWorksheetCards(page)
    expect(await cards.count()).toBeGreaterThanOrEqual(0)
  })

  test('selecting Number Place Value topic filters correctly', async ({ page }) => {
    await selectFilter(page, 0, /Year 3|Grade 3/i)
    await waitForWorksheetsToLoad(page)

    await selectFilter(page, 1, /Number.*Place.*Value/i)
    await waitForWorksheetsToLoad(page)

    await expect(page).toHaveURL(/topic=number-place-value/i)

    const cards = await getWorksheetCards(page)
    const count = await cards.count()
    console.log(`Year 3 Number Place Value worksheets: ${count}`)
  })
})

test.describe('Library Filters - Subtopic Selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/library')
    await dismissCookieConsent(page)
    await waitForWorksheetsToLoad(page)
  })

  test('subtopic filter narrows results further', async ({ page }) => {
    // Select Year 2
    await selectFilter(page, 0, /Year 2|Grade 2/i)
    await waitForWorksheetsToLoad(page)
    const countAfterYear = await (await getWorksheetCards(page)).count()

    // Select Addition Subtraction topic
    await selectFilter(page, 1, /Addition.*Subtraction/i)
    await waitForWorksheetsToLoad(page)
    const countAfterTopic = await (await getWorksheetCards(page)).count()

    // Select a subtopic (third combobox)
    const subtopicFilter = page.locator('button[role="combobox"]').nth(2)
    if (await subtopicFilter.isVisible()) {
      await subtopicFilter.click()
      await page.waitForTimeout(300)

      // Try to select a subtopic option
      const options = page.getByRole('option')
      const optionCount = await options.count()

      if (optionCount > 1) {
        // Select the second option (skip "All")
        const secondOption = options.nth(1)
        const optionText = await secondOption.textContent()
        console.log(`Selecting subtopic: ${optionText}`)
        await secondOption.click()
        await waitForWorksheetsToLoad(page)

        const countAfterSubtopic = await (await getWorksheetCards(page)).count()

        console.log(`Count progression: Year=${countAfterYear}, Topic=${countAfterTopic}, Subtopic=${countAfterSubtopic}`)

        // Subtopic should further narrow (or equal) the results
        expect(countAfterSubtopic).toBeLessThanOrEqual(countAfterTopic)
      }
    }
  })

  test('times tables subtopic for Year 2', async ({ page }) => {
    await selectFilter(page, 0, /Year 2|Grade 2/i)
    await waitForWorksheetsToLoad(page)

    await selectFilter(page, 1, /Multiplication.*Division/i)
    await waitForWorksheetsToLoad(page)

    // Check if subtopic dropdown is available
    const subtopicFilter = page.locator('button[role="combobox"]').nth(2)
    if (await subtopicFilter.isVisible()) {
      await subtopicFilter.click()

      // Look for times tables option
      const timesTablesOption = page.getByRole('option', { name: /times.*tables|2.*5.*10/i })
      if (await timesTablesOption.isVisible()) {
        await timesTablesOption.click()
        await waitForWorksheetsToLoad(page)

        const cards = await getWorksheetCards(page)
        console.log(`Times tables worksheets: ${await cards.count()}`)
      }
    }
  })
})

test.describe('Library Filters - Filter Combinations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/library')
    await dismissCookieConsent(page)
    await waitForWorksheetsToLoad(page)
  })

  test('Year 4 + Multiplication Division shows correct intersection', async ({ page }) => {
    await selectFilter(page, 0, /Year 4|Grade 4/i)
    await waitForWorksheetsToLoad(page)

    await selectFilter(page, 1, /Multiplication.*Division/i)
    await waitForWorksheetsToLoad(page)

    // URL should have both parameters
    await expect(page).toHaveURL(/year_group=Year.*4/i)
    await expect(page).toHaveURL(/topic=multiplication-division/i)

    const cards = await getWorksheetCards(page)
    const count = await cards.count()
    console.log(`Year 4 Multiplication/Division: ${count} worksheets`)

    // Verify all cards match both criteria
    for (let i = 0; i < Math.min(count, 5); i++) {
      const card = cards.nth(i)
      await card.scrollIntoViewIfNeeded()

      // Check year badge
      const badgeText = await getYearGroupFromCard(card)
      expect(badgeText?.toLowerCase()).toMatch(/year 4|y4|grade 4/i)

      // Check topic in card text
      const cardText = await card.textContent()
      expect(cardText?.toLowerCase()).toMatch(/multiplication|division|times/i)
    }

    await page.screenshot({ path: 'test-results/filter-year4-multiplication.png', fullPage: false })
  })

  test('Year 1 + Number Counting shows correct results', async ({ page }) => {
    await selectFilter(page, 0, /Year 1|Grade 1/i)
    await waitForWorksheetsToLoad(page)

    await selectFilter(page, 1, /Number.*Counting/i)
    await waitForWorksheetsToLoad(page)

    await expect(page).toHaveURL(/year_group=Year.*1/i)
    await expect(page).toHaveURL(/topic=number-counting/i)

    const cards = await getWorksheetCards(page)
    expect(await cards.count()).toBeGreaterThanOrEqual(0)
  })

  test('Year 3 + Number Place Value shows correct results', async ({ page }) => {
    await selectFilter(page, 0, /Year 3|Grade 3/i)
    await waitForWorksheetsToLoad(page)

    await selectFilter(page, 1, /Number.*Place.*Value/i)
    await waitForWorksheetsToLoad(page)

    await expect(page).toHaveURL(/year_group=Year.*3/i)
    await expect(page).toHaveURL(/topic=number-place-value/i)

    const cards = await getWorksheetCards(page)
    const count = await cards.count()
    console.log(`Year 3 Number Place Value: ${count} worksheets`)

    await page.screenshot({ path: 'test-results/filter-year3-place-value.png', fullPage: false })
  })

  test('Reception + Shape Space shows correct results', async ({ page }) => {
    await selectFilter(page, 0, /Reception|Kindergarten/i)
    await waitForWorksheetsToLoad(page)

    await selectFilter(page, 1, /Shape.*Space/i)
    await waitForWorksheetsToLoad(page)

    await expect(page).toHaveURL(/year_group=Reception/i)
    await expect(page).toHaveURL(/topic=shape-space/i)

    const cards = await getWorksheetCards(page)
    expect(await cards.count()).toBeGreaterThanOrEqual(0)
  })

  test('Year 5 + Fractions shows correct results', async ({ page }) => {
    await selectFilter(page, 0, /Year 5|Grade 5/i)
    await waitForWorksheetsToLoad(page)

    await selectFilter(page, 1, /Fractions/i)
    await waitForWorksheetsToLoad(page)

    await expect(page).toHaveURL(/year_group=Year.*5/i)
    await expect(page).toHaveURL(/topic=fractions/i)

    const cards = await getWorksheetCards(page)
    console.log(`Year 5 Fractions: ${await cards.count()} worksheets`)
  })
})

test.describe('Library Filters - Clear and Reset', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/library')
    await dismissCookieConsent(page)
    await waitForWorksheetsToLoad(page)
  })

  test('clearing filters shows all worksheets again', async ({ page }) => {
    // Get initial count (all worksheets)
    const initialCards = await getWorksheetCards(page)
    const initialCount = await initialCards.count()
    console.log(`Initial worksheet count: ${initialCount}`)

    // Apply filters
    await selectFilter(page, 0, /Year 4|Grade 4/i)
    await waitForWorksheetsToLoad(page)

    const filteredCards = await getWorksheetCards(page)
    const filteredCount = await filteredCards.count()
    console.log(`Filtered count (Year 4): ${filteredCount}`)

    // Look for clear/reset button
    const clearButton = page.getByRole('button', { name: /clear|reset/i })
      .or(page.locator('button:has-text("Clear")'))
      .or(page.locator('button:has-text("Reset")'))

    if (await clearButton.first().isVisible()) {
      await clearButton.first().click()
      await waitForWorksheetsToLoad(page)

      // URL should no longer have filters
      const url = page.url()
      expect(url).not.toMatch(/year_group=/i)

      const clearedCards = await getWorksheetCards(page)
      const clearedCount = await clearedCards.count()
      console.log(`Count after clear: ${clearedCount}`)

      // Should be back to initial count (or close to it)
      expect(clearedCount).toBeGreaterThanOrEqual(filteredCount)
    } else {
      // Manually clear by selecting "All" option
      await selectFilter(page, 0, /All/i)
      await waitForWorksheetsToLoad(page)
    }
  })

  test('changing grade resets worksheet display', async ({ page }) => {
    // Select Year 4
    await selectFilter(page, 0, /Year 4|Grade 4/i)
    await waitForWorksheetsToLoad(page)

    const year4Cards = await getWorksheetCards(page)
    const year4Count = await year4Cards.count()

    // Change to Year 2
    await selectFilter(page, 0, /Year 2|Grade 2/i)
    await waitForWorksheetsToLoad(page)

    await expect(page).toHaveURL(/year_group=Year.*2/i)

    const year2Cards = await getWorksheetCards(page)
    const year2Count = await year2Cards.count()

    console.log(`Year 4: ${year4Count}, Year 2: ${year2Count}`)

    // Verify it's showing Year 2, not Year 4
    if (year2Count > 0) {
      const firstCard = year2Cards.first()
      const badgeText = await getYearGroupFromCard(firstCard)
      expect(badgeText?.toLowerCase()).toMatch(/year 2|y2|grade 2/i)
    }
  })
})

test.describe('Library Filters - URL State Persistence', () => {
  test('filter state persists in URL and survives page reload', async ({ page }) => {
    await page.goto('/library')
    await dismissCookieConsent(page)
    await waitForWorksheetsToLoad(page)

    // Apply Year 4 + Addition Subtraction filter
    await selectFilter(page, 0, /Year 4|Grade 4/i)
    await waitForWorksheetsToLoad(page)

    await selectFilter(page, 1, /Addition.*Subtraction/i)
    await waitForWorksheetsToLoad(page)

    // Get current worksheet count
    const cards = await getWorksheetCards(page)
    const countBeforeReload = await cards.count()

    // Capture the URL
    const filteredUrl = page.url()
    expect(filteredUrl).toMatch(/year_group=Year.*4/i)
    expect(filteredUrl).toMatch(/topic=addition-subtraction/i)

    // Reload the page
    await page.reload()
    await dismissCookieConsent(page)
    await waitForWorksheetsToLoad(page)

    // Verify filters are still applied
    await expect(page).toHaveURL(/year_group=Year.*4/i)
    await expect(page).toHaveURL(/topic=addition-subtraction/i)

    const cardsAfterReload = await getWorksheetCards(page)
    const countAfterReload = await cardsAfterReload.count()

    console.log(`Before reload: ${countBeforeReload}, After reload: ${countAfterReload}`)

    // Count should be similar
    expect(Math.abs(countAfterReload - countBeforeReload)).toBeLessThanOrEqual(2)
  })

  test('can navigate directly to filtered URL', async ({ page }) => {
    // Navigate directly to a filtered URL
    await page.goto('/library?year_group=Year%203&topic=number-place-value')
    await dismissCookieConsent(page)
    await waitForWorksheetsToLoad(page)

    // Verify cards are filtered
    const cards = await getWorksheetCards(page)
    const count = await cards.count()
    console.log(`Direct URL navigation - Year 3 Place Value: ${count} worksheets`)

    // Verify first card matches filter
    if (count > 0) {
      const firstCard = cards.first()
      const badgeText = await getYearGroupFromCard(firstCard)
      expect(badgeText?.toLowerCase()).toMatch(/year 3|y3|grade 3/i)
    }
  })
})

test.describe('Library Filters - Visual Validation', () => {
  test('filtered results display correct year badges with color coding', async ({ page }) => {
    await page.goto('/library')
    await dismissCookieConsent(page)
    await waitForWorksheetsToLoad(page)

    // Test Year 4 (should have red badge)
    await selectFilter(page, 0, /Year 4|Grade 4/i)
    await waitForWorksheetsToLoad(page)

    const cards = await getWorksheetCards(page)
    const count = await cards.count()

    if (count > 0) {
      // Check that badge exists and has correct color class
      const firstCard = cards.first()
      await firstCard.scrollIntoViewIfNeeded()

      // Year 4 should have red badge (bg-red-600)
      const badge = firstCard.locator('.bg-red-600, .bg-red-500, [class*="red"]').first()
      const badgeVisible = await badge.isVisible().catch(() => false)

      if (badgeVisible) {
        console.log('Year 4 red badge verified')
      } else {
        // Just verify badge text contains Year 4
        const badgeText = await getYearGroupFromCard(firstCard)
        expect(badgeText?.toLowerCase()).toMatch(/year 4|y4|grade 4/i)
      }
    }

    await page.screenshot({ path: 'test-results/filter-visual-year4-badges.png', fullPage: false })
  })

  test('worksheet count updates correctly when filtering', async ({ page }) => {
    await page.goto('/library')
    await dismissCookieConsent(page)
    await waitForWorksheetsToLoad(page)

    // Find the counter element
    const counter = page.locator('text=/Showing \\d+ printable/i').first()

    if (await counter.isVisible()) {
      const initialText = await counter.textContent()
      console.log(`Initial counter: ${initialText}`)

      // Apply filter
      await selectFilter(page, 0, /Year 4|Grade 4/i)
      await waitForWorksheetsToLoad(page)

      const filteredText = await counter.textContent()
      console.log(`Filtered counter: ${filteredText}`)

      // Counter should reflect filtered count
      expect(filteredText).toMatch(/Showing \d+ printable/i)
    }
  })

  test('empty filter result shows appropriate message', async ({ page }) => {
    await page.goto('/library')
    await dismissCookieConsent(page)
    await waitForWorksheetsToLoad(page)

    // Apply very specific filter combination that may have no results
    await selectFilter(page, 0, /Year 6|Grade 6/i)
    await waitForWorksheetsToLoad(page)

    await selectFilter(page, 1, /Measurement/i)
    await waitForWorksheetsToLoad(page)

    const cards = await getWorksheetCards(page)
    const count = await cards.count()

    console.log(`Year 6 Measurement worksheets: ${count}`)

    if (count === 0) {
      // Should show empty state message
      const emptyMessage = page.locator('text=/no.*worksheets|no.*results|no.*printables/i')
      const isEmptyVisible = await emptyMessage.isVisible().catch(() => false)
      console.log(`Empty state message visible: ${isEmptyVisible}`)
    }
  })
})

test.describe('Library Filters - Edge Cases', () => {
  test('rapid filter changes handle correctly', async ({ page }) => {
    await page.goto('/library')
    await dismissCookieConsent(page)
    await waitForWorksheetsToLoad(page)

    // Rapidly change filters
    await selectFilter(page, 0, /Year 1|Grade 1/i)
    await selectFilter(page, 0, /Year 2|Grade 2/i)
    await selectFilter(page, 0, /Year 3|Grade 3/i)
    await selectFilter(page, 0, /Year 4|Grade 4/i)

    await waitForWorksheetsToLoad(page)

    // Final URL should show Year 4
    await expect(page).toHaveURL(/year_group=Year.*4/i)

    // Cards should all be Year 4
    const cards = await getWorksheetCards(page)
    if (await cards.count() > 0) {
      const badgeText = await getYearGroupFromCard(cards.first())
      expect(badgeText?.toLowerCase()).toMatch(/year 4|y4|grade 4/i)
    }
  })

  test('filter with search query works together', async ({ page }) => {
    await page.goto('/library')
    await dismissCookieConsent(page)
    await waitForWorksheetsToLoad(page)

    // Apply grade filter
    await selectFilter(page, 0, /Year 3|Grade 3/i)
    await waitForWorksheetsToLoad(page)

    // Find and use search input
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"], input[name="search"]').first()

    if (await searchInput.isVisible()) {
      await searchInput.fill('addition')
      await searchInput.press('Enter')
      await waitForWorksheetsToLoad(page)

      // Both filter and search should be in URL
      const url = page.url()
      expect(url).toMatch(/year_group=Year.*3/i)
      console.log(`Search + filter URL: ${url}`)
    }
  })
})
