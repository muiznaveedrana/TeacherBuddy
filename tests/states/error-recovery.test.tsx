import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ErrorBoundary, OfflineDetector, useOnlineStatus } from '@/components/states'
import { renderHook, act } from '@testing-library/react'

// Mock window.location methods
const mockReload = vi.fn()
Object.defineProperty(window, 'location', {
  value: {
    reload: mockReload,
    href: ''
  },
  writable: true
})

// Component that throws an error for testing ErrorBoundary
function ThrowError({ shouldThrow = false }: { shouldThrow?: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>Normal component</div>
}

describe('Error Recovery Components', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('ErrorBoundary', () => {
    it('renders children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <div>Test content</div>
        </ErrorBoundary>
      )
      expect(screen.getByText('Test content')).toBeInTheDocument()
    })

    it('renders error UI when error is thrown', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.getByText('Something Went Wrong')).toBeInTheDocument()
      expect(screen.getByText(/We encountered an unexpected error/)).toBeInTheDocument()
      expect(screen.getByText('Refresh Page')).toBeInTheDocument()
      expect(screen.getByText('Go Home')).toBeInTheDocument()

      consoleSpy.mockRestore()
    })

    it('calls onError when error occurs', () => {
      const onError = vi.fn()
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      render(
        <ErrorBoundary onError={onError}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String)
        })
      )

      consoleSpy.mockRestore()
    })

    it('renders custom fallback when provided', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const fallback = <div>Custom error fallback</div>

      render(
        <ErrorBoundary fallback={fallback}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.getByText('Custom error fallback')).toBeInTheDocument()
      expect(screen.queryByText('Something Went Wrong')).not.toBeInTheDocument()

      consoleSpy.mockRestore()
    })

    it('calls window.location.reload when refresh button clicked', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      const refreshButton = screen.getByText('Refresh Page')
      fireEvent.click(refreshButton)

      expect(mockReload).toHaveBeenCalledTimes(1)

      consoleSpy.mockRestore()
    })

    it('navigates home when Go Home button clicked', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      const homeButton = screen.getByText('Go Home')
      fireEvent.click(homeButton)

      expect(window.location.href).toBe('/')

      consoleSpy.mockRestore()
    })
  })

  describe('OfflineDetector', () => {
    let originalNavigator: Navigator

    beforeEach(() => {
      originalNavigator = global.navigator
      // Mock navigator.onLine
      Object.defineProperty(global.navigator, 'onLine', {
        value: true,
        writable: true,
        configurable: true
      })
    })

    afterEach(() => {
      global.navigator = originalNavigator
    })

    it('renders nothing when always online', () => {
      const { container } = render(<OfflineDetector />)
      expect(container.firstChild).toBeNull()
    })

    it('shows offline message when offline', () => {
      // Set navigator to offline
      Object.defineProperty(global.navigator, 'onLine', {
        value: false,
        writable: true
      })

      render(<OfflineDetector />)
      
      // Trigger offline event
      act(() => {
        window.dispatchEvent(new Event('offline'))
      })

      expect(screen.getByText(/You're currently offline/)).toBeInTheDocument()
      expect(screen.getByText(/Check your internet connection/)).toBeInTheDocument()
    })

    it('shows reconnected message when back online after being offline', () => {
      // Start offline
      Object.defineProperty(global.navigator, 'onLine', {
        value: false,
        writable: true
      })

      const { rerender } = render(<OfflineDetector />)
      
      // Trigger offline event
      act(() => {
        window.dispatchEvent(new Event('offline'))
      })

      // Go back online
      Object.defineProperty(global.navigator, 'onLine', {
        value: true,
        writable: true
      })

      act(() => {
        window.dispatchEvent(new Event('online'))
      })

      rerender(<OfflineDetector />)

      expect(screen.getByText(/Connection restored/)).toBeInTheDocument()
      expect(screen.getByText(/You're back online/)).toBeInTheDocument()
    })

    it('calls onRetry when Try Again button clicked', () => {
      const onRetry = vi.fn()
      
      // Set navigator to offline
      Object.defineProperty(global.navigator, 'onLine', {
        value: false,
        writable: true
      })

      render(<OfflineDetector onRetry={onRetry} />)
      
      // Trigger offline event
      act(() => {
        window.dispatchEvent(new Event('offline'))
      })

      const retryButton = screen.getByText('Try Again')
      fireEvent.click(retryButton)

      expect(onRetry).toHaveBeenCalledTimes(1)
    })

    it('dismisses reconnected message when dismiss clicked', () => {
      const onRetry = vi.fn()
      
      // Start offline then go online
      Object.defineProperty(global.navigator, 'onLine', {
        value: false,
        writable: true
      })

      const { rerender } = render(<OfflineDetector onRetry={onRetry} />)
      
      act(() => {
        window.dispatchEvent(new Event('offline'))
      })

      Object.defineProperty(global.navigator, 'onLine', {
        value: true,
        writable: true
      })

      act(() => {
        window.dispatchEvent(new Event('online'))
      })

      rerender(<OfflineDetector onRetry={onRetry} />)

      const dismissButton = screen.getByText('Dismiss')
      fireEvent.click(dismissButton)

      expect(onRetry).toHaveBeenCalledTimes(1)
    })
  })

  describe('useOnlineStatus hook', () => {
    let originalNavigator: Navigator

    beforeEach(() => {
      originalNavigator = global.navigator
      Object.defineProperty(global.navigator, 'onLine', {
        value: true,
        writable: true,
        configurable: true
      })
    })

    afterEach(() => {
      global.navigator = originalNavigator
    })

    it('returns true when online', () => {
      const { result } = renderHook(() => useOnlineStatus())
      expect(result.current).toBe(true)
    })

    it('returns false when offline', () => {
      Object.defineProperty(global.navigator, 'onLine', {
        value: false,
        writable: true
      })

      const { result } = renderHook(() => useOnlineStatus())
      
      act(() => {
        window.dispatchEvent(new Event('offline'))
      })

      expect(result.current).toBe(false)
    })

    it('updates when online status changes', () => {
      const { result } = renderHook(() => useOnlineStatus())
      
      expect(result.current).toBe(true)

      // Go offline
      Object.defineProperty(global.navigator, 'onLine', {
        value: false,
        writable: true
      })

      act(() => {
        window.dispatchEvent(new Event('offline'))
      })

      expect(result.current).toBe(false)

      // Go back online
      Object.defineProperty(global.navigator, 'onLine', {
        value: true,
        writable: true
      })

      act(() => {
        window.dispatchEvent(new Event('online'))
      })

      expect(result.current).toBe(true)
    })
  })
})