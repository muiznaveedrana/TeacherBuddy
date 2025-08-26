import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display the main hero section', async ({ page }) => {
    // Check main heading with exact text match
    await expect(page.locator('text=Create Amazing Worksheets with')).toBeVisible();
    await expect(page.locator('text=AI Magic')).toBeVisible();
    
    // Check subtitle
    await expect(page.getByText(/Transform your teaching with AI-powered worksheet generation/)).toBeVisible();
    
    // Check main CTA button by text content
    await expect(page.getByText('Start Creating Now')).toBeVisible();
    
    // Check demo button
    await expect(page.getByText('Watch Demo')).toBeVisible();
  });

  test('should display feature checkmarks', async ({ page }) => {
    // Check all three feature checkmarks
    await expect(page.getByText('Free to start')).toBeVisible();
    await expect(page.getByText('UK Curriculum aligned')).toBeVisible();
    await expect(page.getByText('Instant generation')).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    // Check features section heading
    await expect(page.getByText('Why Teachers Love WorksheetGenerator.AI')).toBeVisible();
    
    // Check all three feature cards
    await expect(page.getByText('Save Hours Every Week')).toBeVisible();
    await expect(page.getByText('UK Curriculum Perfect')).toBeVisible();
    await expect(page.getByText('Engaging & Fun')).toBeVisible();
    
    // Check feature descriptions
    await expect(page.getByText(/Generate complete worksheets in under 30 seconds/)).toBeVisible();
    await expect(page.getByText(/Every worksheet aligns with Key Stage requirements/)).toBeVisible();
    await expect(page.getByText(/Child-friendly design and engaging activities/)).toBeVisible();
  });

  test('should display testimonials section', async ({ page }) => {
    // Check testimonials heading
    await expect(page.getByText('Loved by Teachers Across the UK')).toBeVisible();
    
    // Check rating display
    await expect(page.getByText('4.9/5 from 2,847 teachers')).toBeVisible();
    
    // Check testimonial authors
    await expect(page.getByText('Sarah Thompson')).toBeVisible();
    await expect(page.getByText('James Wilson')).toBeVisible();
    await expect(page.getByText('Emma Clarke')).toBeVisible();
    
    // Check testimonial locations
    await expect(page.getByText('Primary Teacher, Manchester')).toBeVisible();
    await expect(page.getByText('Secondary Maths, Birmingham')).toBeVisible();
    await expect(page.getByText('NQT, Leeds')).toBeVisible();
  });

  test('should display final CTA section', async ({ page }) => {
    // Check final CTA heading
    await expect(page.getByText('Ready to Transform Your Teaching?')).toBeVisible();
    
    // Check final CTA text
    await expect(page.getByText(/Join thousands of UK teachers/)).toBeVisible();
    
    // Check final CTA buttons by text
    await expect(page.getByText("Start Creating Now - It's Free!")).toBeVisible();
    await expect(page.getByText('Watch How It Works')).toBeVisible();
    
    // Check final disclaimer
    await expect(page.getByText(/No credit card required • Start with 5 free worksheets/)).toBeVisible();
  });

  test('should have proper page structure', async ({ page }) => {
    // Check page has proper sections
    const sections = page.locator('section');
    await expect(sections).toHaveCount(4); // Hero, Features, Testimonials, CTA
    
    // Check main element exists
    await expect(page.locator('main')).toBeVisible();
    
    // Check gradient backgrounds are applied
    await expect(page.locator('main')).toHaveClass(/bg-gradient-to-b/);
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Main heading should still be visible
    await expect(page.getByText('Create Amazing Worksheets with')).toBeVisible();
    
    // Check that buttons exist (there are two sets of CTA buttons)
    const ctaButtons = page.getByText('Start Creating Now');
    await expect(ctaButtons.first()).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByText('Create Amazing Worksheets with')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.getByText('Create Amazing Worksheets with')).toBeVisible();
  });

  test('should have accessible content', async ({ page }) => {
    // Check for proper heading hierarchy
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    const h2 = page.locator('h2');
    await expect(h2).toHaveCount(3); // Features, Testimonials, CTA sections
    
    // Check buttons are properly accessible
    await expect(page.getByText('Start Creating Now').first()).toBeVisible();
    await expect(page.getByText('Watch Demo').first()).toBeVisible();
  });

  test('should load page successfully', async ({ page }) => {
    // Basic smoke test - page loads and main content is visible
    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByText('Create Amazing Worksheets with')).toBeVisible();
    
    // Check page title
    await expect(page).toHaveTitle(/WorksheetGenerator|Create Amazing Worksheets/);
  });

  test('should display all star ratings', async ({ page }) => {
    // Check that star icons are present in testimonials
    const starIcons = page.locator('[data-lucide="star"]');
    const starCount = await starIcons.count();
    
    // Should have stars in the main rating display plus testimonial cards
    expect(starCount).toBeGreaterThan(0);
  });

  test('should display all sections in correct order', async ({ page }) => {
    const sections = page.locator('section');
    
    // Verify sections exist and are in correct order
    await expect(sections.nth(0)).toContainText('Create Amazing Worksheets');
    await expect(sections.nth(1)).toContainText('Why Teachers Love');
    await expect(sections.nth(2)).toContainText('Loved by Teachers');
    await expect(sections.nth(3)).toContainText('Ready to Transform');
  });
});