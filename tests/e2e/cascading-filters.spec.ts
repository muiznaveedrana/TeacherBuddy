import { test, expect } from '@playwright/test'

/**
 * E2E Tests for Cascading/Hierarchical Filters
 *
 * Tests that filters behave in a user-friendly cascading manner:
 * - Grade level selection filters available topics
 * - Topic selection filters available subtopics
 * - "All" selections show all options at that level
 * - Changing parent filters resets invalid child selections
 */

// Helper function to select a filter option and wait for URL update
async function selectFilterOption(page: any, dropdownLocator: any, optionPattern: RegExp, expectedUrlPart?: string) {
  await dropdownLocator.click()
  await page.waitForTimeout(300)
  await page.getByRole('option', { name: optionPattern }).click()

  // Wait for URL to update if expected
  if (expectedUrlPart) {
    await page.waitForURL(`**/*${expectedUrlPart}*`, { timeout: 5000 }).catch(() => {})
  }

  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(500)
}

test.describe('Cascading Filter Behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/library')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)
    // Remove cookie consent if present
    await page.evaluate(() => {
      const consent = document.querySelector('.cookie-consent-container')
      if (consent) consent.remove()
    })
  })

  test.describe('Grade Level to Topic Cascading', () => {
    test('selecting a grade level should show only topics relevant to that grade', async ({ page }) => {
      // Open grade level dropdown
      const gradeDropdown = page.locator('button[role="combobox"]').first()
      await gradeDropdown.click()
      await page.waitForTimeout(300)

      // Select Year 1
      await page.getByRole('option', { name: /Year 1/i }).click()
      await page.waitForTimeout(500)

      // Open topic dropdown
      const topicDropdown = page.locator('#topic').locator('..').locator('button[role="combobox"]')
      await topicDropdown.click()
      await page.waitForTimeout(300)

      // Check that Year 1 topics are available (from CURRICULUM_MAPPING)
      // Year 1 has: number-place-value, addition-subtraction, measurement, geometry-shapes, fractions
      await expect(page.getByRole('option', { name: /Addition and Subtraction/i })).toBeVisible()
      await expect(page.getByRole('option', { name: /Number and Place Value/i })).toBeVisible()
      await expect(page.getByRole('option', { name: /Measurement/i })).toBeVisible()
      await expect(page.getByRole('option', { name: /Fractions/i })).toBeVisible()

      // Topics NOT in Year 1 curriculum should NOT be visible
      // Year 1 doesn't have: multiplication-division, statistics, percentages
      await expect(page.getByRole('option', { name: /Multiplication and Division/i })).not.toBeVisible()
    })

    test('selecting "All Grade Levels" should show all topics across curriculum', async ({ page }) => {
      // First select a specific grade
      const gradeDropdown = page.locator('button[role="combobox"]').first()
      await gradeDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Year 1/i }).click()
      await page.waitForTimeout(500)

      // Now select "All Grade Levels"
      await gradeDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /All Grade Levels/i }).click()
      await page.waitForTimeout(500)

      // Open topic dropdown - should have more topics now
      const topicDropdown = page.locator('#topic').locator('..').locator('button[role="combobox"]')
      await topicDropdown.click()
      await page.waitForTimeout(300)

      // Should see topics from multiple year groups
      await expect(page.getByRole('option', { name: /Addition and Subtraction/i })).toBeVisible()
      await expect(page.getByRole('option', { name: /Multiplication and Division/i })).toBeVisible()
      await expect(page.getByRole('option', { name: /Fractions/i })).toBeVisible()
      await expect(page.getByRole('option', { name: /Number and Place Value/i })).toBeVisible()
    })

    test('changing grade level should reset topic if topic not valid for new grade', async ({ page }) => {
      // Select Year 2 which has multiplication-division
      const gradeDropdown = page.locator('button[role="combobox"]').first()
      await gradeDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Year 2/i }).click()
      // Wait for URL to include year_group
      await page.waitForURL(/year_group=Year.*2/, { timeout: 10000 })
      await page.waitForLoadState('networkidle')

      // Select multiplication-division topic
      const topicDropdown = page.locator('#topic').locator('..').locator('button[role="combobox"]')
      await topicDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Multiplication and Division/i }).click()
      // Wait for URL to include topic
      await page.waitForURL(/topic=multiplication-division/, { timeout: 10000 })
      await page.waitForLoadState('networkidle')

      // Verify topic is set in URL
      expect(page.url()).toContain('topic=multiplication-division')

      // Now change to Year 1 which doesn't have multiplication-division
      await gradeDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Year 1/i }).click()
      // Wait for URL to change (topic should be removed)
      await page.waitForURL(/year_group=Year.*1/, { timeout: 10000 })
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(500)

      // Topic should be cleared from URL since it's not valid for Year 1
      expect(page.url()).not.toContain('topic=multiplication-division')
    })
  })

  test.describe('Topic to Subtopic Cascading', () => {
    test('selecting a topic should show only subtopics for that topic', async ({ page }) => {
      // Select Year 2
      const gradeDropdown = page.locator('button[role="combobox"]').first()
      await gradeDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Year 2/i }).click()
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(500)

      // Select multiplication-division topic
      const topicDropdown = page.locator('#topic').locator('..').locator('button[role="combobox"]')
      await topicDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Multiplication and Division/i }).click()
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(500)

      // Open subtopic dropdown
      const subtopicDropdown = page.locator('#subtopic').locator('..').locator('button[role="combobox"]')
      await subtopicDropdown.click()
      await page.waitForTimeout(300)

      // Year 2 multiplication-division subtopics - use exact match to avoid ambiguity
      await expect(page.getByRole('option', { name: 'Times Tables 2, 5, 10', exact: true })).toBeVisible()
      await expect(page.getByRole('option', { name: 'Equal Groups', exact: true })).toBeVisible()
      await expect(page.getByRole('option', { name: 'Sharing and Grouping', exact: true })).toBeVisible()

      // Subtopics from other topics should NOT be visible
      await expect(page.getByRole('option', { name: /Adding within 20/i })).not.toBeVisible()
    })

    test('selecting "All Topics" should show subtopics for all topics in selected grade', async ({ page }) => {
      // Select Year 1
      const gradeDropdown = page.locator('button[role="combobox"]').first()
      await gradeDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Year 1/i }).click()
      await page.waitForURL(/year_group=Year.*1/, { timeout: 10000 })
      await page.waitForLoadState('networkidle')

      // Keep topic as "All Topics" (default)
      // Open subtopic dropdown
      const subtopicDropdown = page.locator('#subtopic').locator('..').locator('button[role="combobox"]')
      await subtopicDropdown.click()
      await page.waitForTimeout(300)

      // Should see subtopics from multiple Year 1 topics - use exact match
      await expect(page.getByRole('option', { name: 'Numbers to 20', exact: true })).toBeVisible()
      await expect(page.getByRole('option', { name: 'Adding within 20', exact: true })).toBeVisible()
      await expect(page.getByRole('option', { name: 'Length and Height', exact: true })).toBeVisible()
    })

    test('changing topic should reset subtopic if not valid for new topic', async ({ page }) => {
      // Select Year 2
      const gradeDropdown = page.locator('button[role="combobox"]').first()
      await gradeDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Year 2/i }).click()
      await page.waitForURL(/year_group=Year.*2/, { timeout: 10000 })
      await page.waitForLoadState('networkidle')

      // Select multiplication-division topic
      const topicDropdown = page.locator('#topic').locator('..').locator('button[role="combobox"]')
      await topicDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Multiplication and Division/i }).click()
      await page.waitForURL(/topic=multiplication-division/, { timeout: 10000 })
      await page.waitForLoadState('networkidle')

      // Select times-tables subtopic - use exact match
      const subtopicDropdown = page.locator('#subtopic').locator('..').locator('button[role="combobox"]')
      await subtopicDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: 'Times Tables 2, 5, 10', exact: true }).click()
      await page.waitForURL(/subtopic=times-tables-2-5-10/, { timeout: 10000 })
      await page.waitForLoadState('networkidle')

      // Verify subtopic is set
      expect(page.url()).toContain('subtopic=times-tables-2-5-10')

      // Now change to addition-subtraction topic
      await topicDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Addition and Subtraction/i }).click()
      await page.waitForURL(/topic=addition-subtraction/, { timeout: 10000 })
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(500)

      // Subtopic should be cleared since times-tables is not in addition-subtraction
      expect(page.url()).not.toContain('subtopic=times-tables-2-5-10')
    })
  })

  test.describe('All Levels Combined', () => {
    test('when grade is "All" and topic is "All", all subtopics should be available', async ({ page }) => {
      // Open subtopic dropdown with default "All" selections
      const subtopicDropdown = page.locator('#subtopic').locator('..').locator('button[role="combobox"]')
      await subtopicDropdown.click()
      await page.waitForTimeout(300)

      // Should see many subtopics from across the curriculum
      const options = page.getByRole('option')
      const count = await options.count()

      // Should have many options (all subtopics + "All Subtopics" option)
      expect(count).toBeGreaterThan(20)
    })

    test('when grade is specific and topic is "All", subtopics should be from that grade only', async ({ page }) => {
      // Select Reception
      const gradeDropdown = page.locator('button[role="combobox"]').first()
      await gradeDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Reception/i }).click()
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(1000)

      // Open subtopic dropdown
      const subtopicDropdown = page.locator('#subtopic').locator('..').locator('button[role="combobox"]')
      await subtopicDropdown.click()
      await page.waitForTimeout(300)

      // Should see Reception subtopics - use exact matching
      await expect(page.getByRole('option', { name: 'Counting to 10', exact: true })).toBeVisible()
      await expect(page.getByRole('option', { name: 'Number Recognition', exact: true })).toBeVisible()
      await expect(page.getByRole('option', { name: 'Basic Shapes', exact: true })).toBeVisible()

      // Should NOT see Year 3+ specific subtopics - use exact match for "3 Times Table"
      await expect(page.getByRole('option', { name: '3 Times Table', exact: true })).not.toBeVisible()
      await expect(page.getByRole('option', { name: 'Column Addition (No Exchange)', exact: true })).not.toBeVisible()
    })

    test('when grade is "All" and topic is specific, subtopics should be from that topic across all grades', async ({ page }) => {
      // Select a specific topic without selecting grade
      const topicDropdown = page.locator('#topic').locator('..').locator('button[role="combobox"]')
      await topicDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Fractions/i }).click()
      await page.waitForTimeout(500)

      // Open subtopic dropdown
      const subtopicDropdown = page.locator('#subtopic').locator('..').locator('button[role="combobox"]')
      await subtopicDropdown.click()
      await page.waitForTimeout(300)

      // Should see fractions subtopics from multiple year groups
      // Year 1: halves-and-quarters
      // Year 2: recognising-fractions, finding-fractions, equivalent-fractions-simple
      // Year 3: unit-fractions, non-unit-fractions, etc.
      await expect(page.getByRole('option', { name: /Halves and Quarters/i })).toBeVisible()
      await expect(page.getByRole('option', { name: /Recognising Fractions/i })).toBeVisible()
    })
  })

  test.describe('URL Persistence with Cascading', () => {
    test('cascading selections should persist in URL', async ({ page }) => {
      // Select Year 3
      const gradeDropdown = page.locator('button[role="combobox"]').first()
      await gradeDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Year 3/i }).click()
      await page.waitForURL(/year_group=Year.*3/, { timeout: 10000 })
      await page.waitForLoadState('networkidle')

      // URL uses + for spaces (same as Year+3 or Year%203)
      expect(page.url()).toMatch(/year_group=Year[+%]?3/)

      // Select addition-subtraction
      const topicDropdown = page.locator('#topic').locator('..').locator('button[role="combobox"]')
      await topicDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Addition and Subtraction/i }).click()
      await page.waitForURL(/topic=addition-subtraction/, { timeout: 10000 })
      await page.waitForLoadState('networkidle')

      expect(page.url()).toContain('topic=addition-subtraction')

      // Select a subtopic - use exact match
      const subtopicDropdown = page.locator('#subtopic').locator('..').locator('button[role="combobox"]')
      await subtopicDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: 'Column Addition (No Exchange)', exact: true }).click()
      await page.waitForURL(/subtopic=column-addition-no-exchange/, { timeout: 10000 })
      await page.waitForLoadState('networkidle')

      expect(page.url()).toContain('subtopic=column-addition-no-exchange')

      // All three should be in URL (URL uses + or %20 for spaces)
      const url = page.url()
      expect(url).toMatch(/year_group=Year[+%]?3/)
      expect(url).toContain('topic=addition-subtraction')
      expect(url).toContain('subtopic=column-addition-no-exchange')
    })

    test('navigating directly to URL with filters should show correct options', async ({ page }) => {
      // Navigate directly with filters
      await page.goto('/library?year_group=Year%202&topic=multiplication-division')
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(500)

      // Grade dropdown should show Year 2
      const gradeDropdown = page.locator('button[role="combobox"]').first()
      await expect(gradeDropdown).toContainText(/Year 2/i)

      // Topic dropdown should show Multiplication and Division
      const topicDropdown = page.locator('#topic').locator('..').locator('button[role="combobox"]')
      await expect(topicDropdown).toContainText(/Multiplication and Division/i)

      // Subtopic dropdown should only show Year 2 multiplication subtopics
      const subtopicDropdown = page.locator('#subtopic').locator('..').locator('button[role="combobox"]')
      await subtopicDropdown.click()
      await page.waitForTimeout(300)

      await expect(page.getByRole('option', { name: /Times Tables 2, 5, 10/i })).toBeVisible()
      await expect(page.getByRole('option', { name: /Equal Groups/i })).toBeVisible()
    })
  })

  test.describe('Clear Filters', () => {
    test('clearing filters should reset all cascading selections', async ({ page }) => {
      // Set up filters
      const gradeDropdown = page.locator('button[role="combobox"]').first()
      await gradeDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Year 2/i }).click()
      await page.waitForTimeout(500)

      const topicDropdown = page.locator('#topic').locator('..').locator('button[role="combobox"]')
      await topicDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Multiplication and Division/i }).click()
      await page.waitForTimeout(500)

      // Click Clear button
      await page.getByRole('button', { name: /Clear/i }).click()
      await page.waitForTimeout(500)

      // URL should be clean
      expect(page.url()).not.toContain('year_group')
      expect(page.url()).not.toContain('topic')
      expect(page.url()).not.toContain('subtopic')

      // Dropdowns should show placeholders
      await expect(gradeDropdown).toContainText(/All Grade Levels/i)
      await expect(topicDropdown).toContainText(/All Topics/i)
    })
  })

  test.describe('User Experience Validation', () => {
    test('topic dropdown should update immediately when grade changes', async ({ page }) => {
      // Select Year 6 (has unique topics like algebra, ratio-proportion)
      const gradeDropdown = page.locator('button[role="combobox"]').first()
      await gradeDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Year 6/i }).click()
      await page.waitForTimeout(500)

      // Open topic dropdown
      const topicDropdown = page.locator('#topic').locator('..').locator('button[role="combobox"]')
      await topicDropdown.click()
      await page.waitForTimeout(300)

      // Year 6 has algebra and ratio-proportion
      await expect(page.getByRole('option', { name: /Algebra/i })).toBeVisible()
      await expect(page.getByRole('option', { name: /Ratio and Proportion/i })).toBeVisible()

      // Close dropdown
      await page.keyboard.press('Escape')
      await page.waitForTimeout(300)

      // Change to Year 1
      await gradeDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Year 1/i }).click()
      await page.waitForTimeout(500)

      // Open topic dropdown again
      await topicDropdown.click()
      await page.waitForTimeout(300)

      // Year 1 does NOT have algebra or ratio-proportion
      await expect(page.getByRole('option', { name: /Algebra/i })).not.toBeVisible()
      await expect(page.getByRole('option', { name: /Ratio and Proportion/i })).not.toBeVisible()
    })

    test('subtopic dropdown should update immediately when topic changes', async ({ page }) => {
      // Select Year 3
      const gradeDropdown = page.locator('button[role="combobox"]').first()
      await gradeDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Year 3/i }).click()
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(1000)

      // Select fractions topic
      const topicDropdown = page.locator('#topic').locator('..').locator('button[role="combobox"]')
      await topicDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Fractions/i }).click()
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(1000)

      // Open subtopic dropdown
      const subtopicDropdown = page.locator('#subtopic').locator('..').locator('button[role="combobox"]')
      await subtopicDropdown.click()
      await page.waitForTimeout(300)

      // Should have fraction subtopics - use exact match
      await expect(page.getByRole('option', { name: 'Understanding Tenths', exact: true })).toBeVisible()
      await expect(page.getByRole('option', { name: 'Unit Fractions', exact: true })).toBeVisible()

      // Close and change topic
      await page.keyboard.press('Escape')
      await page.waitForTimeout(300)

      await topicDropdown.click()
      await page.waitForTimeout(300)
      await page.getByRole('option', { name: /Addition and Subtraction/i }).click()
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(1000)

      // Open subtopic dropdown again
      await subtopicDropdown.click()
      await page.waitForTimeout(300)

      // Should now have addition/subtraction subtopics, not fractions - use exact match
      await expect(page.getByRole('option', { name: 'Column Addition (No Exchange)', exact: true })).toBeVisible()
      await expect(page.getByRole('option', { name: 'Understanding Tenths', exact: true })).not.toBeVisible()
    })
  })
})
