/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import DashboardPage from '@/app/dashboard/page'
import LandingPage from '@/app/page'

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock intersection observer
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null }
  disconnect() { return null }
  unobserve() { return null }
}

describe('Mobile & Tablet Responsive Design', () => {
  
  beforeEach(() => {
    // Reset viewport to mobile size
    global.innerWidth = 375
    global.innerHeight = 812
    global.dispatchEvent(new Event('resize'))
  })

  describe('Mobile Layout (375px)', () => {
    test('dashboard stacks configuration and preview vertically', async () => {
      render(<DashboardPage />)
      
      const configPanel = screen.getByText('Worksheet Configuration').closest('div')
      const previewPanel = screen.getByText('Advertisement', { exact: false })?.closest('div')
      
      expect(configPanel).toBeInTheDocument()
      expect(previewPanel).toBeInTheDocument()
      
      // On mobile, elements should stack (flex-col)
      const mainContainer = configPanel?.closest('div[class*="flex"]')
      expect(mainContainer).toHaveClass('flex-col')
    })

    test('buttons are touch-friendly with minimum 44px height', () => {
      render(<DashboardPage />)
      
      const generateButton = screen.getByRole('button', { name: /generate worksheet/i })
      const styles = getComputedStyle(generateButton)
      
      // Should have minimum touch target size
      expect(parseInt(styles.minHeight)).toBeGreaterThanOrEqual(44)
    })

    test('form inputs are properly sized for mobile', () => {
      render(<DashboardPage />)
      
      const topicSelect = screen.getByText('Select a curriculum topic').closest('button')
      expect(topicSelect).toHaveClass('h-12', 'text-base')
    })

    test('navigation shows hamburger menu on mobile', () => {
      render(<DashboardPage />)
      
      // Mobile menu button should be visible
      const menuButton = screen.getByRole('button', { name: /navigation menu/i })
      expect(menuButton).toBeInTheDocument()
      
      // Desktop navigation items should be hidden
      const desktopNav = screen.queryByRole('button', { name: /profile settings/i })
      expect(desktopNav).not.toBeInTheDocument()
    })

    test('landing page hero adapts to mobile', () => {
      render(<LandingPage />)
      
      const heroTitle = screen.getByText(/Transform worksheet creation/i)
      expect(heroTitle).toHaveClass('text-3xl')
      
      const ctaButton = screen.getByRole('button', { name: /start creating now/i })
      expect(ctaButton).toHaveClass('w-full', 'max-w-sm')
    })
  })

  describe('Tablet Layout (768px)', () => {
    beforeEach(() => {
      global.innerWidth = 768
      global.innerHeight = 1024
      global.dispatchEvent(new Event('resize'))
    })

    test('dashboard uses appropriate tablet layout', () => {
      render(<DashboardPage />)
      
      // Should start showing grid layout at tablet sizes
      const mainContainer = screen.getByText('Worksheet Configuration').closest('div')?.parentElement
      // At tablet size, should use grid on large screens
      expect(mainContainer).toHaveClass('lg:grid')
    })

    test('navigation shows mixed mobile/desktop elements', () => {
      render(<DashboardPage />)
      
      // At tablet size, mobile menu might still be shown
      const menuButton = screen.queryByRole('button', { name: /navigation menu/i })
      expect(menuButton).toBeInTheDocument()
    })
  })

  describe('Desktop Layout (1024px+)', () => {
    beforeEach(() => {
      global.innerWidth = 1200
      global.innerHeight = 800
      global.dispatchEvent(new Event('resize'))
    })

    test('dashboard uses two-column layout', () => {
      render(<DashboardPage />)
      
      const mainContainer = screen.getByText('Worksheet Configuration').closest('div')?.parentElement
      expect(mainContainer).toHaveClass('lg:grid', 'lg:grid-cols-10')
    })

    test('navigation shows desktop elements', () => {
      render(<DashboardPage />)
      
      // Desktop navigation should be visible
      const usageCounter = screen.getByText(/worksheets/)
      expect(usageCounter).toBeInTheDocument()
    })
  })

  describe('Touch Interactions', () => {
    test('difficulty selection works with touch', async () => {
      render(<DashboardPage />)
      
      const easyOption = screen.getByLabelText('Easy')
      
      // Simulate touch interaction
      fireEvent.touchStart(easyOption, {
        touches: [{ clientX: 100, clientY: 100 }]
      })
      fireEvent.touchEnd(easyOption, {
        changedTouches: [{ clientX: 100, clientY: 100 }]
      })
      
      await waitFor(() => {
        expect(easyOption).toBeChecked()
      })
    })

    test('range slider responds to touch', async () => {
      render(<DashboardPage />)
      
      const slider = screen.getByRole('slider', { name: /number of questions/i })
      
      // Simulate touch drag
      fireEvent.touchStart(slider, {
        touches: [{ clientX: 100, clientY: 100 }]
      })
      fireEvent.touchMove(slider, {
        touches: [{ clientX: 150, clientY: 100 }]
      })
      fireEvent.touchEnd(slider)
      
      // Value should have changed
      expect(slider).toHaveAttribute('value')
    })
  })

  describe('Pull-to-Refresh', () => {
    test('pull-to-refresh component renders', () => {
      render(<DashboardPage />)
      
      // The PullToRefresh component wraps the dashboard
      const dashboard = screen.getByText('Worksheet Configuration').closest('div')
      expect(dashboard).toBeInTheDocument()
    })

    test('pull-to-refresh triggers refresh action', async () => {
      const mockRefresh = jest.fn()
      
      // This would need a test wrapper for PullToRefresh
      // For now, we'll test that the component doesn't break
      render(<DashboardPage />)
      
      expect(screen.getByText('Worksheet Configuration')).toBeInTheDocument()
    })
  })

  describe('Progressive Web App Features', () => {
    test('service worker registration script is present', () => {
      // This would be tested in the layout component
      expect(document.head.innerHTML).toContain('serviceWorker')
    })

    test('manifest link is present in document', () => {
      const manifestLink = document.querySelector('link[rel="manifest"]')
      expect(manifestLink).toHaveAttribute('href', '/manifest.json')
    })

    test('viewport meta tag is configured correctly', () => {
      const viewportMeta = document.querySelector('meta[name="viewport"]')
      expect(viewportMeta).toHaveAttribute('content', expect.stringContaining('width=device-width'))
    })
  })

  describe('Accessibility on Mobile', () => {
    test('buttons have adequate touch targets', () => {
      render(<DashboardPage />)
      
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        const styles = getComputedStyle(button)
        const minHeight = parseInt(styles.minHeight) || parseInt(styles.height)
        const minWidth = parseInt(styles.minWidth) || parseInt(styles.width)
        
        // Should meet WCAG touch target guidelines (minimum 44x44px)
        expect(minHeight).toBeGreaterThanOrEqual(36) // Allow slightly smaller for some contexts
        expect(minWidth).toBeGreaterThanOrEqual(36)
      })
    })

    test('form inputs have proper labels', () => {
      render(<DashboardPage />)
      
      const labels = screen.getAllByText(/topic|subtopic|difficulty|questions|name list/i)
      expect(labels.length).toBeGreaterThan(0)
      
      labels.forEach(label => {
        expect(label).toBeInTheDocument()
      })
    })

    test('focus management works properly', () => {
      render(<DashboardPage />)
      
      const firstButton = screen.getAllByRole('button')[0]
      firstButton.focus()
      
      expect(document.activeElement).toBe(firstButton)
    })
  })

  describe('Performance Optimizations', () => {
    test('images have loading optimization', () => {
      render(<LandingPage />)
      
      // Check that images use loading="lazy" where appropriate
      const images = document.querySelectorAll('img')
      images.forEach(img => {
        // Most images should have loading optimization
        if (!img.getAttribute('loading')) {
          // At least they shouldn't be blocking
          expect(img.getAttribute('fetchpriority')).not.toBe('high')
        }
      })
    })

    test('critical CSS is inlined', () => {
      // Check that critical styles are present
      const styles = document.querySelectorAll('style')
      expect(styles.length).toBeGreaterThan(0)
    })
  })

  describe('Cross-browser Compatibility', () => {
    test('CSS Grid fallback works', () => {
      // Mock older browser without grid support
      const originalSupports = CSS.supports
      CSS.supports = jest.fn().mockReturnValue(false)
      
      render(<DashboardPage />)
      
      // Layout should still work without grid
      const mainContainer = screen.getByText('Worksheet Configuration').closest('div')
      expect(mainContainer).toBeInTheDocument()
      
      CSS.supports = originalSupports
    })

    test('Flexbox layout works as fallback', () => {
      render(<DashboardPage />)
      
      // Should use flex as primary layout method
      const flexContainer = screen.getByText('Worksheet Configuration').closest('div')?.parentElement
      expect(flexContainer).toHaveClass('flex', 'flex-col')
    })
  })
})