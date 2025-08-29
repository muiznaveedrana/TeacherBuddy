import { test, expect } from '@playwright/test'

test.describe('Name Lists Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/name-lists')
  })

  test('displays name lists page with mock data', async ({ page }) => {
    await expect(page).toHaveTitle(/WorksheetGenerator.AI/)
    await expect(page.getByText('Name Lists')).toBeVisible()
    await expect(page.getByText('Create and manage student name lists for personalized worksheets')).toBeVisible()
    
    // Check mock data is displayed
    await expect(page.getByText('Year 3 Class A')).toBeVisible()
    await expect(page.getByText('Year 4 Maths Group')).toBeVisible()
    await expect(page.getByText('Reception Class')).toBeVisible()
  })

  test('shows correct name counts and previews', async ({ page }) => {
    // Check name counts
    await expect(page.getByText('25 names')).toBeVisible()
    await expect(page.getByText('18 names')).toBeVisible()
    await expect(page.getByText('20 names')).toBeVisible()
    
    // Check name previews with badges
    await expect(page.locator('text=/Emma|Oliver|Ava/').first()).toBeVisible()
    await expect(page.locator('text=/\\+\\d+ more/')).toBeVisible()
  })

  test('search functionality filters lists correctly', async ({ page }) => {
    // Search for "Year 3"
    await page.fill('[placeholder="Search name lists..."]', 'Year 3')
    
    await expect(page.getByText('Year 3 Class A')).toBeVisible()
    await expect(page.getByText('Year 4 Maths Group')).not.toBeVisible()
    await expect(page.getByText('Reception Class')).not.toBeVisible()
    
    // Clear search
    await page.fill('[placeholder="Search name lists..."]', '')
    
    // All lists should be visible again
    await expect(page.getByText('Year 3 Class A')).toBeVisible()
    await expect(page.getByText('Year 4 Maths Group')).toBeVisible()
    await expect(page.getByText('Reception Class')).toBeVisible()
  })

  test('create new name list modal opens and functions', async ({ page }) => {
    await page.click('text=Create New List')
    
    // Modal should open
    await expect(page.getByText('Create New Name List')).toBeVisible()
    await expect(page.getByText('Create a list of student names to personalize your worksheets.')).toBeVisible()
    
    // Fill in form
    await page.fill('[placeholder="e.g., Year 3 Class A"]', 'Test Class')
    await page.fill('textarea[placeholder="Enter names, one per line..."]', 'Alice\nBob\nCharlie\nDavid\nEve')
    
    // Check name count updates
    await expect(page.getByText('5 names')).toBeVisible()
    
    // Create the list
    await page.click('text=Create List')
    
    // Modal should close and new list should appear
    await expect(page.getByText('Create New Name List')).not.toBeVisible()
    await expect(page.getByText('Test Class')).toBeVisible()
  })

  test('load default UK names functionality', async ({ page }) => {
    await page.click('text=Create New List')
    
    // Click load default names button
    await page.click('text=Load UK Default Names')
    
    // Check that names are loaded
    const textarea = page.locator('textarea[placeholder="Enter names, one per line..."]')
    const textContent = await textarea.inputValue()
    
    expect(textContent).toContain('Emma')
    expect(textContent).toContain('Oliver')
    expect(textContent).toContain('Ava')
    
    // Check name count is updated
    await expect(page.getByText('20 names')).toBeVisible()
  })

  test('edit existing name list', async ({ page }) => {
    // Click edit on first list
    await page.locator('text=Year 3 Class A').locator('..').locator('text=Edit').click()
    
    // Modal should open with existing data
    await expect(page.getByText('Edit Name List')).toBeVisible()
    
    const titleInput = page.locator('[placeholder="e.g., Year 3 Class A"]')
    await expect(titleInput).toHaveValue('Year 3 Class A')
    
    // Modify the title
    await titleInput.fill('Year 3 Class A - Updated')
    
    // Update the list
    await page.click('text=Update List')
    
    // Check that the list was updated
    await expect(page.getByText('Year 3 Class A - Updated')).toBeVisible()
  })

  test('delete name list with confirmation', async ({ page }) => {
    // Find and click delete button for first list
    const firstCard = page.locator('text=Year 3 Class A').locator('..')
    await firstCard.locator('[data-testid="trash-2-icon"], button:has-text("")').last().click()
    
    // Confirmation dialog should appear
    await expect(page.getByText('Delete Name List')).toBeVisible()
    await expect(page.getByText('Are you sure you want to delete "Year 3 Class A"?')).toBeVisible()
    
    // Confirm deletion
    await page.click('text=Delete List')
    
    // List should be removed
    await expect(page.getByText('Year 3 Class A')).not.toBeVisible()
    
    // Other lists should still be visible
    await expect(page.getByText('Year 4 Maths Group')).toBeVisible()
    await expect(page.getByText('Reception Class')).toBeVisible()
  })

  test('export name list functionality', async ({ page }) => {
    // Set up download handling
    const downloadPromise = page.waitForEvent('download')
    
    // Click export button on first list
    const firstCard = page.locator('text=Year 3 Class A').locator('..')
    await firstCard.locator('text=Export').click()
    
    // Wait for download
    const download = await downloadPromise
    
    // Check download properties
    expect(download.suggestedFilename()).toMatch(/Year_3_Class_A.*\.csv/)
  })

  test('info tooltip shows usage information', async ({ page }) => {
    // Hover over info button
    await page.hover('text=How names are used')
    
    // Tooltip should appear
    await expect(page.getByText('Names from your selected list will be automatically inserted')).toBeVisible()
  })

  test('form validation prevents invalid submissions', async ({ page }) => {
    await page.click('text=Create New List')
    
    // Try to submit without filling required fields
    await page.click('text=Create List')
    
    // Should still be in modal (validation should prevent submission)
    await expect(page.getByText('Create New Name List')).toBeVisible()
    
    // Try with title but too few names
    await page.fill('[placeholder="e.g., Year 3 Class A"]', 'Test Class')
    await page.fill('textarea[placeholder="Enter names, one per line..."]', 'Alice\nBob')
    
    await page.click('text=Create List')
    
    // Should still be in modal due to minimum name requirement
    await expect(page.getByText('Create New Name List')).toBeVisible()
  })

  test('responsive design works on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Page should still function
    await expect(page.getByText('Name Lists')).toBeVisible()
    await expect(page.getByText('Year 3 Class A')).toBeVisible()
    
    // Create button should be accessible
    await page.click('text=Create New List')
    await expect(page.getByText('Create New Name List')).toBeVisible()
  })

  test('search shows empty state for no results', async ({ page }) => {
    await page.fill('[placeholder="Search name lists..."]', 'nonexistent class name')
    
    await expect(page.getByText('No matching name lists')).toBeVisible()
    await expect(page.getByText('Try adjusting your search terms')).toBeVisible()
  })

  test('navigation integration works', async ({ page }) => {
    // Check that navigation is present and functional
    await expect(page.locator('[data-testid="mock-navigation"], nav, header').first()).toBeVisible()
    
    // Usage counter should be visible
    await expect(page.locator('text=/\\d+\/\\d+ worksheets/')).toBeVisible()
  })

  test('handles large name lists gracefully', async ({ page }) => {
    await page.click('text=Create New List')
    
    // Create a large list of names
    const largeNameList = Array.from({ length: 50 }, (_, i) => `Student${i + 1}`).join('\n')
    await page.fill('[placeholder="e.g., Year 3 Class A"]', 'Large Class')
    await page.fill('textarea[placeholder="Enter names, one per line..."]', largeNameList)
    
    // Check name count updates correctly
    await expect(page.getByText('50 names')).toBeVisible()
    
    // Should be able to create the list
    await page.click('text=Create List')
    
    // List should appear with truncated preview
    await expect(page.getByText('Large Class')).toBeVisible()
    await expect(page.getByText('50 names')).toBeVisible()
    await expect(page.locator('text=/\\+\\d+ more/')).toBeVisible()
  })
})