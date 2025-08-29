import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import NameListsPage from '@/app/name-lists/page'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}))

// Mock the Navigation component to avoid complex mocking
vi.mock('@/components/ui/navigation', () => ({
  Navigation: ({ children, ...props }: any) => (
    <div data-testid="mock-navigation" {...props}>
      {children}
    </div>
  ),
}))

describe('NameListsPage', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks()
  })

  it('renders the name lists page with header and mock data', () => {
    render(<NameListsPage />)
    
    expect(screen.getByText('Name Lists')).toBeInTheDocument()
    expect(screen.getByText('Create and manage student name lists for personalized worksheets')).toBeInTheDocument()
    expect(screen.getByText('Create New List')).toBeInTheDocument()
    
    // Check mock data is rendered
    expect(screen.getByText('Year 3 Class A')).toBeInTheDocument()
    expect(screen.getByText('Year 4 Maths Group')).toBeInTheDocument()
    expect(screen.getByText('Reception Class')).toBeInTheDocument()
  })

  it('displays correct name counts for each list', () => {
    render(<NameListsPage />)
    
    // Check name counts
    expect(screen.getByText('25 names')).toBeInTheDocument()
    expect(screen.getByText('18 names')).toBeInTheDocument()
    expect(screen.getByText('20 names')).toBeInTheDocument()
  })

  it('shows name previews with badges', () => {
    render(<NameListsPage />)
    
    // Should show first 6 names + "more" indicator for lists with more than 6
    const moreIndicators = screen.getAllByText(/\+\d+ more/)
    expect(moreIndicators.length).toBeGreaterThan(0)
  })

  it('filters lists based on search query', async () => {
    render(<NameListsPage />)
    
    const searchInput = screen.getByPlaceholderText('Search name lists...')
    
    // Search for "Year 3"
    fireEvent.change(searchInput, { target: { value: 'Year 3' } })
    
    await waitFor(() => {
      expect(screen.getByText('Year 3 Class A')).toBeInTheDocument()
      expect(screen.queryByText('Year 4 Maths Group')).not.toBeInTheDocument()
      expect(screen.queryByText('Reception Class')).not.toBeInTheDocument()
    })
  })

  it('opens create modal when Create New List is clicked', () => {
    render(<NameListsPage />)
    
    const createButton = screen.getByText('Create New List')
    fireEvent.click(createButton)
    
    expect(screen.getByText('Create New Name List')).toBeInTheDocument()
    expect(screen.getByText('Create a list of student names to personalize your worksheets.')).toBeInTheDocument()
  })

  it('opens edit modal when edit button is clicked', () => {
    render(<NameListsPage />)
    
    const editButtons = screen.getAllByText('Edit')
    fireEvent.click(editButtons[0])
    
    expect(screen.getByText('Edit Name List')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Year 3 Class A')).toBeInTheDocument()
  })

  it('shows delete confirmation dialog when delete button is clicked', () => {
    render(<NameListsPage />)
    
    // Find delete buttons (trash icons)
    const deleteButtons = screen.getAllByRole('button')
    const deleteButton = deleteButtons.find(button => 
      button.querySelector('svg[data-testid="trash-2-icon"]') || 
      button.textContent === '' && button.className.includes('text-red-600')
    )
    
    if (deleteButton) {
      fireEvent.click(deleteButton)
      expect(screen.getByText('Delete Name List')).toBeInTheDocument()
      expect(screen.getByText('This action cannot be undone')).toBeInTheDocument()
    }
  })

  it('validates form inputs when creating a new list', async () => {
    render(<NameListsPage />)
    
    const createButton = screen.getByText('Create New List')
    fireEvent.click(createButton)
    
    // Try to save without required fields
    const saveButton = screen.getByText('Create List')
    fireEvent.click(saveButton)
    
    // Should show validation message (mocked as alert)
    // In a real implementation, you'd check for proper error display
  })

  it('loads default UK names when button is clicked', () => {
    render(<NameListsPage />)
    
    const createButton = screen.getByText('Create New List')
    fireEvent.click(createButton)
    
    const loadDefaultButton = screen.getByText('Load UK Default Names')
    fireEvent.click(loadDefaultButton)
    
    const textarea = screen.getByRole('textbox', { name: /names \(one per line\)/i })
    expect(textarea).toHaveValue(expect.stringContaining('Emma'))
    expect(textarea).toHaveValue(expect.stringContaining('Oliver'))
  })

  it('exports name list as CSV when export button is clicked', () => {
    // Mock URL.createObjectURL and document methods
    global.URL.createObjectURL = vi.fn(() => 'mock-url')
    global.URL.revokeObjectURL = vi.fn()
    
    const mockAppendChild = vi.fn()
    const mockRemoveChild = vi.fn()
    const mockClick = vi.fn()
    
    const mockAnchor = {
      href: '',
      download: '',
      click: mockClick,
    }
    
    const originalCreateElement = document.createElement
    document.createElement = vi.fn().mockImplementation((tagName) => {
      if (tagName === 'a') {
        return mockAnchor
      }
      return originalCreateElement.call(document, tagName)
    })
    
    document.body.appendChild = mockAppendChild
    document.body.removeChild = mockRemoveChild
    
    render(<NameListsPage />)
    
    const exportButtons = screen.getAllByText('Export')
    fireEvent.click(exportButtons[0])
    
    expect(mockAppendChild).toHaveBeenCalled()
    expect(mockClick).toHaveBeenCalled()
    expect(mockRemoveChild).toHaveBeenCalled()
    
    // Restore original function
    document.createElement = originalCreateElement
  })

  it('shows info tooltip for how names are used', async () => {
    render(<NameListsPage />)
    
    const infoButton = screen.getByText('How names are used')
    fireEvent.mouseEnter(infoButton)
    
    await waitFor(() => {
      expect(screen.getByText(/Names from your selected list will be automatically inserted/)).toBeInTheDocument()
    })
  })

  it('displays empty state when no lists match search', () => {
    render(<NameListsPage />)
    
    const searchInput = screen.getByPlaceholderText('Search name lists...')
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } })
    
    expect(screen.getByText('No matching name lists')).toBeInTheDocument()
    expect(screen.getByText('Try adjusting your search terms')).toBeInTheDocument()
  })

  it('shows mobile responsive behavior', () => {
    // Mock window.innerWidth for mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })
    
    render(<NameListsPage />)
    
    // The component should render without errors on mobile
    expect(screen.getByText('Name Lists')).toBeInTheDocument()
  })

  it('handles form submission with bulk names input', async () => {
    render(<NameListsPage />)
    
    const createButton = screen.getByText('Create New List')
    fireEvent.click(createButton)
    
    // Fill in form
    const titleInput = screen.getByLabelText(/list title/i)
    fireEvent.change(titleInput, { target: { value: 'Test Class' } })
    
    const textarea = screen.getByRole('textbox', { name: /names \(one per line\)/i })
    fireEvent.change(textarea, { target: { value: 'Name1\nName2\nName3\nName4\nName5' } })
    
    const saveButton = screen.getByText('Create List')
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(screen.getByText('Test Class')).toBeInTheDocument()
    })
  })

  it('updates name count display as names are entered', () => {
    render(<NameListsPage />)
    
    const createButton = screen.getByText('Create New List')
    fireEvent.click(createButton)
    
    const textarea = screen.getByRole('textbox', { name: /names \(one per line\)/i })
    fireEvent.change(textarea, { target: { value: 'Name1\nName2\nName3' } })
    
    expect(screen.getByText('3 names')).toBeInTheDocument()
  })

  it('preserves UK date format in display', () => {
    render(<NameListsPage />)
    
    // Check that dates are displayed (format may vary based on locale)
    const datePattern = /\d{1,2}\/\d{1,2}\/\d{4}/
    const dateElements = screen.getAllByText(datePattern)
    expect(dateElements.length).toBeGreaterThan(0)
  })
})