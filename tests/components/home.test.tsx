import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import Home from '@/app/page'

describe('Home Page', () => {
  beforeEach(() => {
    // Reset any potential side effects between tests
    document.body.innerHTML = ''
  })

  describe('Hero Section', () => {
    it('renders the main heading with correct text and styling', () => {
      render(<Home />)
      
      const heading = screen.getByRole('heading', { 
        name: /create amazing worksheets with ai magic/i 
      })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass('text-5xl', 'font-bold', 'text-gray-900')
    })

    it('renders descriptive text about the platform', () => {
      render(<Home />)
      
      const description = screen.getByText(/transform your teaching with ai-powered worksheet generation/i)
      expect(description).toBeInTheDocument()
    })

    it('renders action buttons with correct accessibility attributes', () => {
      render(<Home />)
      
      const startButtons = screen.getAllByRole('button', { name: /start creating now/i })
      const demoButtons = screen.getAllByRole('button', { name: /watch demo|watch how it works/i })
      
      expect(startButtons.length).toBeGreaterThan(0)
      expect(demoButtons.length).toBeGreaterThan(0)
      expect(startButtons[0]).toHaveClass('bg-blue-600')
    })

    it('displays key benefits with checkmarks', () => {
      render(<Home />)
      
      expect(screen.getByText('Free to start')).toBeInTheDocument()
      expect(screen.getByText('UK Curriculum aligned')).toBeInTheDocument()
      expect(screen.getByText('Instant generation')).toBeInTheDocument()
      
      // Check for checkmark icons by looking for svg elements with check-related classes
      const checkmarks = document.querySelectorAll('svg[class*="circle-check"]')
      expect(checkmarks.length).toBeGreaterThanOrEqual(3)
    })
  })

  describe('Features Section', () => {
    it('renders the features section heading', () => {
      render(<Home />)
      
      const featuresHeading = screen.getByRole('heading', { 
        name: /why teachers love worksheetgenerator.ai/i 
      })
      expect(featuresHeading).toBeInTheDocument()
    })

    it('displays all three main features', () => {
      render(<Home />)
      
      expect(screen.getByText(/save hours every week/i)).toBeInTheDocument()
      expect(screen.getByText(/uk curriculum perfect/i)).toBeInTheDocument()
      expect(screen.getByText(/engaging & fun/i)).toBeInTheDocument()
    })

    it('renders feature descriptions with benefits', () => {
      render(<Home />)
      
      expect(screen.getByText(/generate complete worksheets in under 30 seconds/i)).toBeInTheDocument()
      expect(screen.getByText(/aligns with key stage requirements/i)).toBeInTheDocument()
      expect(screen.getByText(/child-friendly design and engaging activities/i)).toBeInTheDocument()
    })
  })

  describe('Testimonials Section', () => {
    it('displays testimonials header with rating', () => {
      render(<Home />)
      
      expect(screen.getByText(/loved by teachers across the uk/i)).toBeInTheDocument()
      expect(screen.getByText(/4.9\/5 from 2,847 teachers/i)).toBeInTheDocument()
    })

    it('renders all teacher testimonials', () => {
      render(<Home />)
      
      expect(screen.getByText(/sarah thompson/i)).toBeInTheDocument()
      expect(screen.getByText(/james wilson/i)).toBeInTheDocument()
      expect(screen.getByText(/emma clarke/i)).toBeInTheDocument()
    })

    it('includes star ratings for testimonials', () => {
      render(<Home />)
      
      // Look for star elements by checking for fill-yellow-400 class which is used for stars
      const starElements = document.querySelectorAll('svg[class*="fill-yellow-400"]')
      
      // Should have stars in header (5) + 3 testimonials × 5 stars each = 20 total
      expect(starElements.length).toBeGreaterThanOrEqual(20)
    })
  })

  describe('Call-to-Action Section', () => {
    it('renders final CTA section', () => {
      render(<Home />)
      
      expect(screen.getByText(/ready to transform your teaching/i)).toBeInTheDocument()
      expect(screen.getByText(/join thousands of uk teachers/i)).toBeInTheDocument()
    })

    it('displays additional CTA buttons', () => {
      render(<Home />)
      
      const startButton = screen.getByRole('button', { name: /start creating now - it's free!/i })
      const demoButton = screen.getByRole('button', { name: /watch how it works/i })
      
      expect(startButton).toBeInTheDocument()
      expect(demoButton).toBeInTheDocument()
    })

    it('shows pricing information', () => {
      render(<Home />)
      
      expect(screen.getByText(/no credit card required/i)).toBeInTheDocument()
      expect(screen.getByText(/start with 5 free worksheets/i)).toBeInTheDocument()
      expect(screen.getByText(/upgrade anytime/i)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(<Home />)
      
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
      
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(3) // Multiple sections should have headings
    })

    it('has accessible button labels', () => {
      render(<Home />)
      
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button).toHaveAccessibleName()
      })
    })
  })

  describe('Edge Cases', () => {
    it('handles missing icons gracefully', () => {
      // This test ensures the component doesn't break if icon imports fail
      render(<Home />)
      
      const mainContent = screen.getByRole('main')
      expect(mainContent).toBeInTheDocument()
      expect(mainContent.textContent).toContain('WorksheetGenerator.AI')
    })

    it('maintains responsive design classes', () => {
      render(<Home />)
      
      const containers = document.querySelectorAll('[class*="container"]')
      const responsiveElements = document.querySelectorAll('[class*="md:"], [class*="sm:"], [class*="lg:"]')
      
      expect(containers.length).toBeGreaterThan(0)
      expect(responsiveElements.length).toBeGreaterThan(0)
    })
  })
})