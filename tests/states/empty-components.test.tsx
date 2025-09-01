import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { 
  EmptyNameLists,
  EmptyWorksheets,
  EmptyUsageHistory,
  EmptySearchResults
} from '@/components/states'

describe('Empty State Components', () => {
  describe('EmptyNameLists', () => {
    it('renders empty name lists message', () => {
      render(<EmptyNameLists />)
      expect(screen.getByText('No Name Lists Yet')).toBeInTheDocument()
      expect(screen.getByText(/Create personalized name lists/)).toBeInTheDocument()
    })

    it('calls onCreateNew when create button is clicked', () => {
      const onCreateNew = vi.fn()
      render(<EmptyNameLists onCreateNew={onCreateNew} />)
      
      const createButton = screen.getByText('Create Your First Name List')
      fireEvent.click(createButton)
      
      expect(onCreateNew).toHaveBeenCalledTimes(1)
    })

    it('shows default names button when onUseDefault provided', () => {
      const onUseDefault = vi.fn()
      render(<EmptyNameLists onUseDefault={onUseDefault} />)
      
      expect(screen.getByText('Use Default UK Names')).toBeInTheDocument()
      
      const defaultButton = screen.getByText('Use Default UK Names')
      fireEvent.click(defaultButton)
      
      expect(onUseDefault).toHaveBeenCalledTimes(1)
    })

    it('does not show default button when onUseDefault not provided', () => {
      render(<EmptyNameLists />)
      expect(screen.queryByText('Use Default UK Names')).not.toBeInTheDocument()
    })

    it('shows benefits section', () => {
      render(<EmptyNameLists />)
      expect(screen.getByText('💡 Why use name lists?')).toBeInTheDocument()
      expect(screen.getByText(/Students love seeing their names/)).toBeInTheDocument()
    })
  })

  describe('EmptyWorksheets', () => {
    it('renders empty worksheets message', () => {
      render(<EmptyWorksheets />)
      expect(screen.getByText('Ready to Create Your First Worksheet?')).toBeInTheDocument()
      expect(screen.getByText(/Generate curriculum-aligned worksheets/)).toBeInTheDocument()
    })

    it('calls onCreateFirst when generate button is clicked', () => {
      const onCreateFirst = vi.fn()
      render(<EmptyWorksheets onCreateFirst={onCreateFirst} />)
      
      const generateButton = screen.getByText('Generate My First Worksheet')
      fireEvent.click(generateButton)
      
      expect(onCreateFirst).toHaveBeenCalledTimes(1)
    })

    it('shows examples button when onViewExamples provided', () => {
      const onViewExamples = vi.fn()
      render(<EmptyWorksheets onViewExamples={onViewExamples} />)
      
      expect(screen.getByText('View Example Worksheets')).toBeInTheDocument()
      
      const examplesButton = screen.getByText('View Example Worksheets')
      fireEvent.click(examplesButton)
      
      expect(onViewExamples).toHaveBeenCalledTimes(1)
    })

    it('shows benefits grid', () => {
      render(<EmptyWorksheets />)
      expect(screen.getByText('Save Hours')).toBeInTheDocument()
      expect(screen.getByText('AI-Generated')).toBeInTheDocument()
      expect(screen.getByText('From hours to seconds')).toBeInTheDocument()
      expect(screen.getByText('Curriculum aligned')).toBeInTheDocument()
    })

    it('shows free plan information', () => {
      render(<EmptyWorksheets />)
      expect(screen.getByText('Free plan includes 30 worksheets per month')).toBeInTheDocument()
    })
  })

  describe('EmptyUsageHistory', () => {
    it('renders empty usage history message', () => {
      render(<EmptyUsageHistory />)
      expect(screen.getByText('No Usage Data Yet')).toBeInTheDocument()
      expect(screen.getByText(/Start generating worksheets to see/)).toBeInTheDocument()
    })

    it('calls onStartUsing when generate button is clicked', () => {
      const onStartUsing = vi.fn()
      render(<EmptyUsageHistory onStartUsing={onStartUsing} />)
      
      const generateButton = screen.getByText('Generate Your First Worksheet')
      fireEvent.click(generateButton)
      
      expect(onStartUsing).toHaveBeenCalledTimes(1)
    })

    it('shows learn more button when onLearnMore provided', () => {
      const onLearnMore = vi.fn()
      render(<EmptyUsageHistory onLearnMore={onLearnMore} />)
      
      expect(screen.getByText('Learn About Analytics')).toBeInTheDocument()
      
      const learnButton = screen.getByText('Learn About Analytics')
      fireEvent.click(learnButton)
      
      expect(onLearnMore).toHaveBeenCalledTimes(1)
    })

    it('shows analytics features list', () => {
      render(<EmptyUsageHistory />)
      expect(screen.getByText('Once you start, you\'ll see:')).toBeInTheDocument()
      expect(screen.getByText('Monthly worksheet generation trends')).toBeInTheDocument()
      expect(screen.getByText('Most popular topics and difficulties')).toBeInTheDocument()
      expect(screen.getByText('Time saved compared to manual creation')).toBeInTheDocument()
      expect(screen.getByText('Usage patterns and peak times')).toBeInTheDocument()
    })
  })

  describe('EmptySearchResults', () => {
    it('renders empty search results message', () => {
      render(<EmptySearchResults />)
      expect(screen.getByText('No Results Found')).toBeInTheDocument()
      expect(screen.getByText(/No items match your current search criteria/)).toBeInTheDocument()
    })

    it('shows search term in message when provided', () => {
      render(<EmptySearchResults searchTerm="mathematics" />)
      expect(screen.getByText(/We couldn't find anything matching "mathematics"/)).toBeInTheDocument()
    })

    it('calls onTryDifferentSearch when button is clicked', () => {
      const onTryDifferentSearch = vi.fn()
      render(<EmptySearchResults onTryDifferentSearch={onTryDifferentSearch} />)
      
      const searchButton = screen.getByText('Try Different Search')
      fireEvent.click(searchButton)
      
      expect(onTryDifferentSearch).toHaveBeenCalledTimes(1)
    })

    it('calls onModifyFilters when button is clicked', () => {
      const onModifyFilters = vi.fn()
      render(<EmptySearchResults onModifyFilters={onModifyFilters} />)
      
      const filtersButton = screen.getByText('Modify Filters')
      fireEvent.click(filtersButton)
      
      expect(onModifyFilters).toHaveBeenCalledTimes(1)
    })

    it('calls onClearSearch when button is clicked', () => {
      const onClearSearch = vi.fn()
      render(<EmptySearchResults onClearSearch={onClearSearch} />)
      
      const clearButton = screen.getByText('Clear Search')
      fireEvent.click(clearButton)
      
      expect(onClearSearch).toHaveBeenCalledTimes(1)
    })

    it('shows search tips', () => {
      render(<EmptySearchResults />)
      expect(screen.getByText('Search Tips:')).toBeInTheDocument()
      expect(screen.getByText(/Try shorter, more general terms/)).toBeInTheDocument()
      expect(screen.getByText(/Check spelling and try alternate spellings/)).toBeInTheDocument()
      expect(screen.getByText(/Use different keywords or synonyms/)).toBeInTheDocument()
    })

    it('does not show buttons when handlers not provided', () => {
      render(<EmptySearchResults />)
      expect(screen.queryByText('Try Different Search')).not.toBeInTheDocument()
      expect(screen.queryByText('Modify Filters')).not.toBeInTheDocument()
      expect(screen.queryByText('Clear Search')).not.toBeInTheDocument()
    })
  })
})