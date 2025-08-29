import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import ProfileSetupPage from '@/app/(auth)/profile-setup/page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

const mockPush = jest.fn()

describe('ProfileSetupPage', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
    jest.clearAllMocks()
  })

  it('renders the profile setup form correctly', () => {
    render(<ProfileSetupPage />)
    
    expect(screen.getByText('Set Up Your Profile')).toBeInTheDocument()
    expect(screen.getByLabelText('First Name *')).toBeInTheDocument()
    expect(screen.getByLabelText('Last Name *')).toBeInTheDocument()
    expect(screen.getByLabelText('School Name *')).toBeInTheDocument()
    expect(screen.getByText('Country')).toBeInTheDocument()
    expect(screen.getByText('Curriculum')).toBeInTheDocument()
    expect(screen.getByText('Year Group *')).toBeInTheDocument()
  })

  it('has pre-populated default values', () => {
    render(<ProfileSetupPage />)
    
    // Country should default to England
    expect(screen.getByDisplayValue('England')).toBeInTheDocument()
    
    // Curriculum should default to UK National Curriculum
    expect(screen.getByDisplayValue('UK National Curriculum')).toBeInTheDocument()
  })

  it('shows validation errors for required fields', async () => {
    render(<ProfileSetupPage />)
    
    const submitButton = screen.getByRole('button', { name: /complete setup/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument()
      expect(screen.getByText('Last name is required')).toBeInTheDocument()
      expect(screen.getByText('School name is required')).toBeInTheDocument()
      expect(screen.getByText('Please select your year group')).toBeInTheDocument()
    })
  })

  it('submits form successfully with valid data', async () => {
    render(<ProfileSetupPage />)
    
    // Fill out required fields
    fireEvent.change(screen.getByLabelText('First Name *'), {
      target: { value: 'John' }
    })
    fireEvent.change(screen.getByLabelText('Last Name *'), {
      target: { value: 'Smith' }
    })
    fireEvent.change(screen.getByLabelText('School Name *'), {
      target: { value: 'Oak Primary School' }
    })
    
    // Select year group
    const yearGroupSelect = screen.getByRole('combobox')
    fireEvent.click(yearGroupSelect)
    fireEvent.click(screen.getByText('Year 3'))
    
    const submitButton = screen.getByRole('button', { name: /complete setup/i })
    fireEvent.click(submitButton)
    
    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText('Setting up your profile...')).toBeInTheDocument()
    })
    
    // Should show welcome message and redirect
    await waitFor(() => {
      expect(screen.getByText('Welcome to WorksheetGenerator.AI, John!')).toBeInTheDocument()
    }, { timeout: 2000 })
    
    // Should redirect to dashboard
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    }, { timeout: 4000 })
  })

  it('allows skipping profile setup', () => {
    render(<ProfileSetupPage />)
    
    const skipButton = screen.getByRole('button', { name: /skip for now/i })
    fireEvent.click(skipButton)
    
    expect(mockPush).toHaveBeenCalledWith('/dashboard')
  })

  it('displays benefits information', () => {
    render(<ProfileSetupPage />)
    
    expect(screen.getByText('Why complete your profile?')).toBeInTheDocument()
    expect(screen.getByText('Get curriculum-aligned worksheet suggestions')).toBeInTheDocument()
    expect(screen.getByText('Access year group-appropriate difficulty levels')).toBeInTheDocument()
    expect(screen.getByText('Receive personalized teaching resources')).toBeInTheDocument()
  })

  it('includes all UK year groups in dropdown', async () => {
    render(<ProfileSetupPage />)
    
    const yearGroupSelect = screen.getByRole('combobox')
    fireEvent.click(yearGroupSelect)
    
    const expectedYearGroups = [
      'Reception', 'Year 1', 'Year 2', 'Year 3', 
      'Year 4', 'Year 5', 'Year 6'
    ]
    
    for (const yearGroup of expectedYearGroups) {
      expect(screen.getByText(yearGroup)).toBeInTheDocument()
    }
  })
})