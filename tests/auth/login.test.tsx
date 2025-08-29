import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import LoginPage from '@/app/(auth)/login/page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

const mockPush = jest.fn()

describe('LoginPage', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
    jest.clearAllMocks()
  })

  it('renders the login page correctly', () => {
    render(<LoginPage />)
    
    expect(screen.getByText('Welcome to WorksheetGenerator.AI')).toBeInTheDocument()
    expect(screen.getByText('Sign in to start creating personalized worksheets for your students')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in with google/i })).toBeInTheDocument()
  })

  it('shows loading state when sign in button is clicked', async () => {
    render(<LoginPage />)
    
    const signInButton = screen.getByRole('button', { name: /sign in with google/i })
    
    fireEvent.click(signInButton)
    
    expect(screen.getByText('Signing in...')).toBeInTheDocument()
    expect(signInButton).toBeDisabled()
  })

  it('redirects to profile setup after successful mock authentication', async () => {
    render(<LoginPage />)
    
    const signInButton = screen.getByRole('button', { name: /sign in with google/i })
    
    fireEvent.click(signInButton)
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/auth/profile-setup')
    }, { timeout: 3000 })
  })

  it('displays terms and privacy policy links', () => {
    render(<LoginPage />)
    
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
  })

  it('has correct button styling and Google icon', () => {
    render(<LoginPage />)
    
    const signInButton = screen.getByRole('button', { name: /sign in with google/i })
    
    // Check if button contains Google icon SVG
    const googleIcon = signInButton.querySelector('svg')
    expect(googleIcon).toBeInTheDocument()
    
    // Check button classes for styling
    expect(signInButton).toHaveClass('w-full')
  })
})