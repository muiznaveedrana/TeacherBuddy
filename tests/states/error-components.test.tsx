import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { 
  NetworkError, 
  GenerationError, 
  FormError, 
  AuthError, 
  PaymentError,
  InlineFormError 
} from '@/components/states'

describe('Error Components', () => {
  describe('NetworkError', () => {
    it('renders with default props', () => {
      render(<NetworkError />)
      expect(screen.getByText('Connection Problem')).toBeInTheDocument()
      expect(screen.getByText(/We're having trouble connecting/)).toBeInTheDocument()
    })

    it('calls onRetry when Try Again button is clicked', () => {
      const onRetry = vi.fn()
      render(<NetworkError onRetry={onRetry} />)
      
      const retryButton = screen.getByText('Try Again')
      fireEvent.click(retryButton)
      
      expect(onRetry).toHaveBeenCalledTimes(1)
    })

    it('shows contact support button when enabled', () => {
      render(<NetworkError showSupportContact={true} />)
      expect(screen.getByText('Contact Support')).toBeInTheDocument()
    })

    it('accepts custom title and message', () => {
      render(
        <NetworkError 
          title="Custom Error" 
          message="Custom error message" 
        />
      )
      expect(screen.getByText('Custom Error')).toBeInTheDocument()
      expect(screen.getByText('Custom error message')).toBeInTheDocument()
    })
  })

  describe('GenerationError', () => {
    it('renders timeout error correctly', () => {
      render(<GenerationError errorType="timeout" />)
      expect(screen.getByText('Generation Timed Out')).toBeInTheDocument()
      expect(screen.getByText(/taking longer than expected/)).toBeInTheDocument()
    })

    it('renders content error with worksheet config', () => {
      const config = { topic: 'Mathematics', difficulty: 'Hard', questionCount: 10 }
      render(
        <GenerationError 
          errorType="content" 
          worksheetConfig={config}
        />
      )
      
      expect(screen.getByText('Content Generation Failed')).toBeInTheDocument()
      expect(screen.getByText('Topic: Mathematics')).toBeInTheDocument()
      expect(screen.getByText('Difficulty: Hard')).toBeInTheDocument()
    })

    it('renders quota error correctly', () => {
      render(<GenerationError errorType="quota" />)
      expect(screen.getByText('Generation Limit Reached')).toBeInTheDocument()
      expect(screen.getByText(/reached your worksheet generation limit/)).toBeInTheDocument()
    })

    it('calls onModifySettings when button is clicked', () => {
      const onModifySettings = vi.fn()
      render(<GenerationError onModifySettings={onModifySettings} />)
      
      const modifyButton = screen.getByText('Modify Settings')
      fireEvent.click(modifyButton)
      
      expect(onModifySettings).toHaveBeenCalledTimes(1)
    })
  })

  describe('FormError', () => {
    it('renders with message and fields', () => {
      render(
        <FormError 
          message="Form validation failed"
          fields={['Email', 'Password']}
        />
      )
      
      expect(screen.getByText('Please check your input')).toBeInTheDocument()
      expect(screen.getByText('Form validation failed')).toBeInTheDocument()
      expect(screen.getByText('• Email')).toBeInTheDocument()
      expect(screen.getByText('• Password')).toBeInTheDocument()
    })

    it('calls onDismiss when dismiss button is clicked', () => {
      const onDismiss = vi.fn()
      render(
        <FormError 
          message="Test error" 
          onDismiss={onDismiss}
        />
      )
      
      const dismissButton = screen.getByRole('button')
      fireEvent.click(dismissButton)
      
      expect(onDismiss).toHaveBeenCalledTimes(1)
    })

    it('accepts custom title', () => {
      render(
        <FormError 
          title="Custom Form Error"
          message="Test message"
        />
      )
      expect(screen.getByText('Custom Form Error')).toBeInTheDocument()
    })
  })

  describe('InlineFormError', () => {
    it('renders inline error message', () => {
      render(<InlineFormError message="Field is required" />)
      expect(screen.getByText('Field is required')).toBeInTheDocument()
    })
  })

  describe('AuthError', () => {
    it('renders session expired error', () => {
      render(<AuthError errorType="session_expired" />)
      expect(screen.getByText('Session Expired')).toBeInTheDocument()
      expect(screen.getByText(/session has expired/)).toBeInTheDocument()
    })

    it('renders login failed error with retry option', () => {
      const onRetry = vi.fn()
      render(<AuthError errorType="login_failed" onRetry={onRetry} />)
      
      expect(screen.getByText('Sign In Failed')).toBeInTheDocument()
      
      const retryButton = screen.getByText('Try Again')
      fireEvent.click(retryButton)
      
      expect(onRetry).toHaveBeenCalledTimes(1)
    })

    it('renders permission denied without login button', () => {
      render(<AuthError errorType="permission_denied" />)
      expect(screen.getByText('Access Denied')).toBeInTheDocument()
      expect(screen.queryByText('Sign In Again')).not.toBeInTheDocument()
    })

    it('calls onLogin when Sign In Again button is clicked', () => {
      const onLogin = vi.fn()
      render(<AuthError errorType="session_expired" onLogin={onLogin} />)
      
      const loginButton = screen.getByText('Sign In Again')
      fireEvent.click(loginButton)
      
      expect(onLogin).toHaveBeenCalledTimes(1)
    })
  })

  describe('PaymentError', () => {
    it('renders card declined error', () => {
      render(<PaymentError errorType="card_declined" />)
      expect(screen.getByText('Payment Declined')).toBeInTheDocument()
      expect(screen.getByText(/declined by your bank/)).toBeInTheDocument()
    })

    it('renders insufficient funds error with amount', () => {
      render(
        <PaymentError 
          errorType="insufficient_funds" 
          amount="£4.99"
        />
      )
      expect(screen.getByText('Insufficient Funds')).toBeInTheDocument()
      expect(screen.getByText('Transaction Amount: £4.99')).toBeInTheDocument()
    })

    it('renders expired card error', () => {
      render(<PaymentError errorType="expired_card" />)
      expect(screen.getByText('Card Expired')).toBeInTheDocument()
      expect(screen.queryByText('Try Payment Again')).not.toBeInTheDocument()
    })

    it('calls onUpdatePayment when button is clicked', () => {
      const onUpdatePayment = vi.fn()
      render(<PaymentError onUpdatePayment={onUpdatePayment} />)
      
      const updateButton = screen.getByText('Update Payment Method')
      fireEvent.click(updateButton)
      
      expect(onUpdatePayment).toHaveBeenCalledTimes(1)
    })

    it('calls onRetry when retry button is clicked', () => {
      const onRetry = vi.fn()
      render(<PaymentError onRetry={onRetry} />)
      
      const retryButton = screen.getByText('Try Payment Again')
      fireEvent.click(retryButton)
      
      expect(onRetry).toHaveBeenCalledTimes(1)
    })
  })
})