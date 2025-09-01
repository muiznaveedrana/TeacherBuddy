import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { 
  WorksheetGenerationLoader,
  PageTransitionLoader,
  InlinePageLoader,
  DataFetchingLoader,
  ButtonLoader,
  Skeleton,
  SkeletonCard
} from '@/components/states'

// Mock the Progress component from shadcn/ui
vi.mock('@/components/ui/progress', () => ({
  Progress: ({ value, className }: { value: number; className: string }) => (
    <div className={className} data-testid="progress-bar" data-value={value} />
  )
}))

describe('Loading Components', () => {
  describe('WorksheetGenerationLoader', () => {
    it('renders with default props', () => {
      render(<WorksheetGenerationLoader />)
      expect(screen.getByText('Generating Your Worksheet')).toBeInTheDocument()
      expect(screen.getByText(/This usually takes about 6 seconds/)).toBeInTheDocument()
    })

    it('shows custom estimated time', () => {
      render(<WorksheetGenerationLoader estimatedTimeMs={10000} />)
      expect(screen.getByText(/This usually takes about 10 seconds/)).toBeInTheDocument()
    })

    it('displays generation steps', () => {
      render(<WorksheetGenerationLoader />)
      expect(screen.getByText('Analyzing curriculum requirements')).toBeInTheDocument()
      expect(screen.getByText('Creating worksheet content')).toBeInTheDocument()
      expect(screen.getByText('Formatting and finalizing')).toBeInTheDocument()
    })

    it('calls onComplete after generation finishes', async () => {
      const onComplete = vi.fn()
      render(<WorksheetGenerationLoader onComplete={onComplete} estimatedTimeMs={100} />)
      
      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledTimes(1)
      }, { timeout: 1000 })
    })

    it('shows progress updates', async () => {
      render(<WorksheetGenerationLoader estimatedTimeMs={100} />)
      
      const progressBar = screen.getByTestId('progress-bar')
      expect(progressBar).toBeInTheDocument()
      
      // Wait for some progress
      await waitFor(() => {
        const value = progressBar.getAttribute('data-value')
        expect(parseFloat(value || '0')).toBeGreaterThan(0)
      }, { timeout: 200 })
    })
  })

  describe('PageTransitionLoader', () => {
    it('renders with default message', () => {
      render(<PageTransitionLoader />)
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('renders with custom message', () => {
      render(<PageTransitionLoader message="Navigating to dashboard..." />)
      expect(screen.getByText('Navigating to dashboard...')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      const { container } = render(<PageTransitionLoader className="custom-class" />)
      expect(container.firstChild).toHaveClass('custom-class')
    })
  })

  describe('InlinePageLoader', () => {
    it('renders inline loader', () => {
      render(<InlinePageLoader />)
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('renders with custom message', () => {
      render(<InlinePageLoader message="Fetching data..." />)
      expect(screen.getByText('Fetching data...')).toBeInTheDocument()
    })
  })

  describe('DataFetchingLoader', () => {
    it('renders general loader by default', () => {
      render(<DataFetchingLoader />)
      expect(screen.getByText('Loading data...')).toBeInTheDocument()
    })

    it('renders download loader', () => {
      render(<DataFetchingLoader type="download" />)
      expect(screen.getByText('Downloading data...')).toBeInTheDocument()
    })

    it('renders database loader', () => {
      render(<DataFetchingLoader type="database" />)
      expect(screen.getByText('Fetching from database...')).toBeInTheDocument()
    })

    it('renders inline when specified', () => {
      render(<DataFetchingLoader inline={true} />)
      expect(screen.getByText('Loading data...')).toBeInTheDocument()
    })

    it('accepts custom message', () => {
      render(<DataFetchingLoader message="Custom loading message" />)
      expect(screen.getByText('Custom loading message')).toBeInTheDocument()
    })
  })

  describe('ButtonLoader', () => {
    it('renders children when not loading', () => {
      render(<ButtonLoader loading={false}>Click me</ButtonLoader>)
      expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('shows loading spinner when loading', () => {
      render(<ButtonLoader loading={true}>Click me</ButtonLoader>)
      expect(screen.getByText('Loading...')).toBeInTheDocument()
      expect(screen.queryByText('Click me')).not.toBeInTheDocument()
    })

    it('shows custom loading text', () => {
      render(
        <ButtonLoader loading={true} loadingText="Saving...">
          Save
        </ButtonLoader>
      )
      expect(screen.getByText('Saving...')).toBeInTheDocument()
    })

    it('is disabled when loading', () => {
      render(<ButtonLoader loading={true}>Click me</ButtonLoader>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('calls onClick when not loading', () => {
      const onClick = vi.fn()
      render(
        <ButtonLoader loading={false} onClick={onClick}>
          Click me
        </ButtonLoader>
      )
      
      const button = screen.getByText('Click me')
      fireEvent.click(button)
      
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when loading', () => {
      const onClick = vi.fn()
      render(
        <ButtonLoader loading={true} onClick={onClick}>
          Click me
        </ButtonLoader>
      )
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('Skeleton', () => {
    it('renders with default className', () => {
      const { container } = render(<Skeleton />)
      expect(container.firstChild).toHaveClass('animate-pulse')
      expect(container.firstChild).toHaveClass('rounded-md')
      expect(container.firstChild).toHaveClass('bg-gray-200')
    })

    it('accepts custom className', () => {
      const { container } = render(<Skeleton className="custom-skeleton" />)
      expect(container.firstChild).toHaveClass('custom-skeleton')
    })
  })

  describe('SkeletonCard', () => {
    it('renders skeleton card structure', () => {
      const { container } = render(<SkeletonCard />)
      expect(container.querySelector('.border')).toBeInTheDocument()
      expect(container.querySelector('.rounded-lg')).toBeInTheDocument()
      expect(container.querySelector('.p-4')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      const { container } = render(<SkeletonCard className="custom-card" />)
      expect(container.firstChild).toHaveClass('custom-card')
    })
  })
})