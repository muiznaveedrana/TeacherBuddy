import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import DashboardPage from '@/app/dashboard/page'
import { getSmartDefaults, getContextualSuggestions } from '@/lib/config/enhanced-options'

// Mock the WelcomeTour component
vi.mock('@/components/WelcomeTour', () => ({
  default: function MockWelcomeTour({ onComplete }: { onComplete: () => void }) {
    return null
  }
}))

// Mock API calls
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}))

global.fetch = vi.fn()

describe('Enhanced Configuration System (USP.2)', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    // Mock fetch for curriculum API calls
    ;(global.fetch as any).mockImplementation((url: string) => {
      if (url.includes('/api/curriculum/topics')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            topics: [
              { value: 'addition', label: 'Addition' },
              { value: 'subtraction', label: 'Subtraction' }
            ]
          })
        })
      }
      if (url.includes('/api/curriculum/subtopics')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            subtopics: [
              { value: 'addition-within-10', label: 'Addition within 10' },
              { value: 'addition-within-20', label: 'Addition within 20' }
            ]
          })
        })
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      })
    })
  })

  describe('Enhanced Configuration Panel Rendering', () => {
    it('renders the enhanced configuration panel when basic configuration is complete', async () => {
      render(<DashboardPage />)
      
      // Wait for year group to be set (already set by default)
      await waitFor(() => {
        expect(screen.getByDisplayValue('Year 3')).toBeInTheDocument()
      })

      // Select a topic to enable enhanced options
      const topicSelect = await screen.findByRole('combobox', { name: /topic/i })
      fireEvent.click(topicSelect)
      
      await waitFor(() => {
        const additionOption = screen.getByText('Addition')
        fireEvent.click(additionOption)
      })

      // Enhanced options should now be visible
      await waitFor(() => {
        expect(screen.getByText('Enhanced Options')).toBeInTheDocument()
        expect(screen.getByText('Research-backed options for engaging, professional worksheets')).toBeInTheDocument()
      })
    })

    it('shows disabled state when basic configuration is incomplete', () => {
      render(<DashboardPage />)
      
      // Enhanced options panel should be in disabled state initially
      expect(screen.getByText('Enhanced Options')).toBeInTheDocument()
      expect(screen.getByText('Complete basic configuration to access enhanced options')).toBeInTheDocument()
    })
  })

  describe('Visual Theme Selection', () => {
    it('displays age-appropriate visual theme options', async () => {
      render(<DashboardPage />)
      
      // Set up basic configuration
      await waitFor(() => {
        expect(screen.getByDisplayValue('Year 3')).toBeInTheDocument()
      })

      const topicSelect = await screen.findByRole('combobox', { name: /topic/i })
      fireEvent.click(topicSelect)
      await waitFor(() => {
        fireEvent.click(screen.getByText('Addition'))
      })

      // Find and open visual theme selector
      await waitFor(() => {
        const themeSelect = screen.getByRole('combobox', { name: /visual theme/i })
        fireEvent.click(themeSelect)
      })

      // Check that theme options are available
      await waitFor(() => {
        expect(screen.getByText('Animals')).toBeInTheDocument()
        expect(screen.getByText('Food & Cooking')).toBeInTheDocument()
        expect(screen.getByText('Sports & Games')).toBeInTheDocument()
      })
    })

    it('shows theme preview when selected', async () => {
      render(<DashboardPage />)
      
      // Set up configuration and select a theme
      await waitFor(() => {
        expect(screen.getByDisplayValue('Year 3')).toBeInTheDocument()
      })

      const topicSelect = await screen.findByRole('combobox', { name: /topic/i })
      fireEvent.click(topicSelect)
      await waitFor(() => {
        fireEvent.click(screen.getByText('Addition'))
      })

      const themeSelect = await screen.findByRole('combobox', { name: /visual theme/i })
      fireEvent.click(themeSelect)
      await waitFor(() => {
        fireEvent.click(screen.getByText('Animals'))
      })

      // Theme preview should be visible
      await waitFor(() => {
        expect(screen.getByText('Animal-themed problems and contexts')).toBeInTheDocument()
      })
    })
  })

  describe('Smart Defaults System', () => {
    it('offers smart defaults when configuration changes', async () => {
      render(<DashboardPage />)
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('Year 3')).toBeInTheDocument()
      })

      const topicSelect = await screen.findByRole('combobox', { name: /topic/i })
      fireEvent.click(topicSelect)
      await waitFor(() => {
        fireEvent.click(screen.getByText('Addition'))
      })

      // Smart defaults notification should appear
      await waitFor(() => {
        expect(screen.getByText('Smart defaults available')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument()
      })
    })

    it('applies smart defaults when Apply button is clicked', async () => {
      render(<DashboardPage />)
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('Year 3')).toBeInTheDocument()
      })

      const topicSelect = await screen.findByRole('combobox', { name: /topic/i })
      fireEvent.click(topicSelect)
      await waitFor(() => {
        fireEvent.click(screen.getByText('Addition'))
      })

      // Click Apply for smart defaults
      await waitFor(() => {
        const applyButton = screen.getByRole('button', { name: /apply/i })
        fireEvent.click(applyButton)
      })

      // Verify smart defaults are applied (theme should be set based on Year 3)
      await waitFor(() => {
        // For Year 3, default theme should be "food"
        expect(screen.getByDisplayValue('Food & Cooking')).toBeInTheDocument()
      })
    })
  })

  describe('Progressive Disclosure', () => {
    it('shows/hides advanced options correctly', async () => {
      render(<DashboardPage />)
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('Year 3')).toBeInTheDocument()
      })

      const topicSelect = await screen.findByRole('combobox', { name: /topic/i })
      fireEvent.click(topicSelect)
      await waitFor(() => {
        fireEvent.click(screen.getByText('Addition'))
      })

      // Advanced options should be hidden initially
      await waitFor(() => {
        expect(screen.queryByText('Problem Types')).not.toBeInTheDocument()
        expect(screen.queryByText('Engagement Style')).not.toBeInTheDocument()
      })

      // Show advanced options
      const showAdvancedButton = await screen.findByRole('button', { name: /show advanced/i })
      fireEvent.click(showAdvancedButton)

      // Advanced options should now be visible
      await waitFor(() => {
        expect(screen.getByText('Problem Types')).toBeInTheDocument()
        expect(screen.getByText('Engagement Style')).toBeInTheDocument()
      })

      // Hide advanced options
      const hideAdvancedButton = screen.getByRole('button', { name: /hide advanced/i })
      fireEvent.click(hideAdvancedButton)

      // Advanced options should be hidden again
      await waitFor(() => {
        expect(screen.queryByText('Problem Types')).not.toBeInTheDocument()
        expect(screen.queryByText('Engagement Style')).not.toBeInTheDocument()
      })
    })
  })

  describe('Problem Types Selection', () => {
    it('allows multiple problem type selection', async () => {
      render(<DashboardPage />)
      
      // Set up configuration and show advanced options
      await waitFor(() => {
        expect(screen.getByDisplayValue('Year 3')).toBeInTheDocument()
      })

      const topicSelect = await screen.findByRole('combobox', { name: /topic/i })
      fireEvent.click(topicSelect)
      await waitFor(() => {
        fireEvent.click(screen.getByText('Addition'))
      })

      const showAdvancedButton = await screen.findByRole('button', { name: /show advanced/i })
      fireEvent.click(showAdvancedButton)

      // Select multiple problem types
      await waitFor(() => {
        const wordProblemsCheckbox = screen.getByRole('checkbox', { name: /word problems/i })
        const visualArraysCheckbox = screen.getByRole('checkbox', { name: /visual arrays/i })
        
        fireEvent.click(wordProblemsCheckbox)
        fireEvent.click(visualArraysCheckbox)

        expect(wordProblemsCheckbox).toBeChecked()
        expect(visualArraysCheckbox).toBeChecked()
      })
    })

    it('shows validation error when no problem types selected', async () => {
      render(<DashboardPage />)
      
      // Set up configuration and show advanced options
      await waitFor(() => {
        expect(screen.getByDisplayValue('Year 3')).toBeInTheDocument()
      })

      const topicSelect = await screen.findByRole('combobox', { name: /topic/i })
      fireEvent.click(topicSelect)
      await waitFor(() => {
        fireEvent.click(screen.getByText('Addition'))
      })

      const showAdvancedButton = await screen.findByRole('button', { name: /show advanced/i })
      fireEvent.click(showAdvancedButton)

      // Validation message should appear
      await waitFor(() => {
        expect(screen.getByText('Select at least one problem type')).toBeInTheDocument()
      })
    })
  })

  describe('Engagement Style Selection', () => {
    it('allows single engagement style selection', async () => {
      render(<DashboardPage />)
      
      // Set up configuration and show advanced options
      await waitFor(() => {
        expect(screen.getByDisplayValue('Year 3')).toBeInTheDocument()
      })

      const topicSelect = await screen.findByRole('combobox', { name: /topic/i })
      fireEvent.click(topicSelect)
      await waitFor(() => {
        fireEvent.click(screen.getByText('Addition'))
      })

      const showAdvancedButton = await screen.findByRole('button', { name: /show advanced/i })
      fireEvent.click(showAdvancedButton)

      // Select engagement style
      await waitFor(() => {
        const storyBasedRadio = screen.getByRole('radio', { name: /story-based/i })
        fireEvent.click(storyBasedRadio)
        expect(storyBasedRadio).toBeChecked()
      })
    })

    it('displays age-appropriate engagement styles', async () => {
      render(<DashboardPage />)
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('Year 3')).toBeInTheDocument()
      })

      const topicSelect = await screen.findByRole('combobox', { name: /topic/i })
      fireEvent.click(topicSelect)
      await waitFor(() => {
        fireEvent.click(screen.getByText('Addition'))
      })

      const showAdvancedButton = await screen.findByRole('button', { name: /show advanced/i })
      fireEvent.click(showAdvancedButton)

      // Check age-appropriate engagement styles are shown
      await waitFor(() => {
        expect(screen.getByText('Structured Learning')).toBeInTheDocument()
        expect(screen.getByText('Story-Based')).toBeInTheDocument()
        expect(screen.getByText('Game Elements')).toBeInTheDocument()
      })
    })
  })

  describe('API Integration', () => {
    it('includes enhanced options in worksheet generation request', async () => {
      render(<DashboardPage />)
      
      // Mock successful worksheet generation
      ;(global.fetch as any).mockImplementation((url: string) => {
        if (url.includes('/api/generate-worksheet')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              success: true,
              worksheet: {
                title: 'Test Worksheet',
                html: '<div>Test content</div>',
                metadata: {
                  topic: 'addition',
                  subtopic: 'addition-within-10',
                  difficulty: 'average',
                  questionCount: 15,
                  curriculum: 'Year 3',
                  generatedAt: new Date().toISOString()
                }
              },
              generationTime: 1000
            })
          })
        }
        // Other API calls (topics, subtopics) as before
        if (url.includes('/api/curriculum/topics')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              topics: [{ value: 'addition', label: 'Addition' }]
            })
          })
        }
        if (url.includes('/api/curriculum/subtopics')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              subtopics: [{ value: 'addition-within-10', label: 'Addition within 10' }]
            })
          })
        }
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
      })

      // Complete configuration with enhanced options
      await waitFor(() => {
        expect(screen.getByDisplayValue('Year 3')).toBeInTheDocument()
      })

      const topicSelect = await screen.findByRole('combobox', { name: /topic/i })
      fireEvent.click(topicSelect)
      await waitFor(() => {
        fireEvent.click(screen.getByText('Addition'))
      })

      const subtopicSelect = await screen.findByRole('combobox', { name: /subtopic/i })
      await waitFor(() => {
        fireEvent.click(subtopicSelect)
        fireEvent.click(screen.getByText('Addition within 10'))
      })

      const nameListSelect = await screen.findByRole('combobox', { name: /name list/i })
      fireEvent.click(nameListSelect)
      fireEvent.click(screen.getByText('Year 3 Class A (25 students)'))

      // Set enhanced options
      const themeSelect = await screen.findByRole('combobox', { name: /visual theme/i })
      fireEvent.click(themeSelect)
      await waitFor(() => {
        fireEvent.click(screen.getByText('Animals'))
      })

      // Generate worksheet
      const generateButton = await screen.findByRole('button', { name: /generate worksheet/i })
      fireEvent.click(generateButton)

      // Verify API call includes enhanced options
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          '/api/generate-worksheet',
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: expect.stringContaining('"visualTheme":"animals"')
          })
        )
      })
    })
  })

  describe('Age Appropriateness Indicator', () => {
    it('shows age appropriateness indicator when enhanced options are available', async () => {
      render(<DashboardPage />)
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('Year 3')).toBeInTheDocument()
      })

      const topicSelect = await screen.findByRole('combobox', { name: /topic/i })
      fireEvent.click(topicSelect)
      await waitFor(() => {
        fireEvent.click(screen.getByText('Addition'))
      })

      // Age appropriateness indicator should be visible
      await waitFor(() => {
        expect(screen.getByText('Optimized for Year 3')).toBeInTheDocument()
        expect(screen.getByText('Options filtered for age-appropriate content and curriculum alignment')).toBeInTheDocument()
      })
    })
  })
})

describe('Enhanced Configuration Utility Functions', () => {
  describe('getSmartDefaults', () => {
    it('returns appropriate defaults for Reception students', () => {
      const defaults = getSmartDefaults('Reception', 'addition', 'standard')
      
      expect(defaults.visualTheme).toBe('animals')
      expect(defaults.engagementStyle).toBe('storytelling')
      expect(defaults.problemTypes).toContain('word-problems')
      expect(defaults.promptTemplate).toBe('A')
    })

    it('returns appropriate defaults for Year 5 students', () => {
      const defaults = getSmartDefaults('Year 5', 'multiplication', 'grid')
      
      expect(defaults.visualTheme).toBe('space')
      expect(defaults.engagementStyle).toBe('structured')
      expect(defaults.problemTypes).toContain('visual-arrays')
      expect(defaults.promptTemplate).toBe('B')
    })
  })

  describe('getContextualSuggestions', () => {
    it('filters options based on age group', () => {
      const suggestions = getContextualSuggestions('Reception', 'addition', 'standard')
      
      expect(suggestions.visualTheme.some(t => t.value === 'animals')).toBe(true)
      expect(suggestions.engagementStyle.some(e => e.value === 'storytelling')).toBe(true)
    })

    it('filters options based on layout compatibility', () => {
      const suggestions = getContextualSuggestions('Year 4', 'multiplication', 'grid')
      
      expect(suggestions.problemTypes.some(p => p.value === 'visual-arrays')).toBe(true)
    })
  })
})