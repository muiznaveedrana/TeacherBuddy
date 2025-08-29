import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SubscriptionPage from '@/app/subscription/page'

// Mock the navigation component to avoid dependency issues
vi.mock('@/components/ui/navigation', () => ({
  Navigation: ({ user, usage }: any) => (
    <div data-testid="navigation">
      <div data-testid="user-name">{user?.name}</div>
      <div data-testid="usage-info">{usage?.current}/{usage?.limit}</div>
      <div data-testid="tier">{usage?.tier}</div>
    </div>
  )
}))

// Mock the footer component
vi.mock('@/components/ui/footer', () => ({
  Footer: ({ version }: any) => (
    <div data-testid="footer">Version: {version}</div>
  )
}))

describe('Subscription Management Dashboard', () => {
  it('renders subscription overview card with mock data', () => {
    render(<SubscriptionPage />)
    
    // Check page title
    expect(screen.getByText('Subscription Management')).toBeInTheDocument()
    
    // Check subscription overview card
    expect(screen.getByText('Subscription Overview')).toBeInTheDocument()
    expect(screen.getByText('Free Plan')).toBeInTheDocument()
    expect(screen.getByText('15/30 worksheets')).toBeInTheDocument()
    expect(screen.getByText('February 1, 2024')).toBeInTheDocument()
    expect(screen.getByText('16 days')).toBeInTheDocument()
  })

  it('displays usage analytics with mock data', () => {
    render(<SubscriptionPage />)
    
    // Check usage analytics section
    expect(screen.getByText('Usage Analytics')).toBeInTheDocument()
    expect(screen.getByText('Monthly Usage (Last 6 Months)')).toBeInTheDocument()
    expect(screen.getByText('Most Generated Topics')).toBeInTheDocument()
    
    // Check specific analytics data
    expect(screen.getByText('Addition')).toBeInTheDocument()
    expect(screen.getByText('8 worksheets')).toBeInTheDocument()
    expect(screen.getByText('Subtraction')).toBeInTheDocument()
    expect(screen.getByText('5 worksheets')).toBeInTheDocument()
    expect(screen.getByText('Fractions')).toBeInTheDocument()
    expect(screen.getByText('2 worksheets')).toBeInTheDocument()
    
    expect(screen.getByText('3.2 seconds')).toBeInTheDocument()
  })

  it('shows tier comparison table with all plans', () => {
    render(<SubscriptionPage />)
    
    // Check all pricing tiers are displayed
    expect(screen.getByText('Free')).toBeInTheDocument()
    expect(screen.getByText('Pro')).toBeInTheDocument()
    expect(screen.getByText('Pro Plus')).toBeInTheDocument()
    
    // Check pricing
    expect(screen.getByText('£0')).toBeInTheDocument()
    expect(screen.getByText('£2.99')).toBeInTheDocument()
    expect(screen.getByText('£4.99')).toBeInTheDocument()
    
    // Check features
    expect(screen.getByText('30 worksheets/month')).toBeInTheDocument()
    expect(screen.getByText('90 worksheets/month')).toBeInTheDocument()
    expect(screen.getByText('150 worksheets/month')).toBeInTheDocument()
    
    // Check current plan badge
    expect(screen.getByText('Current Plan')).toBeInTheDocument()
    expect(screen.getByText('Most Popular')).toBeInTheDocument()
  })

  it('displays billing history section', () => {
    render(<SubscriptionPage />)
    
    expect(screen.getByText('Billing History')).toBeInTheDocument()
    expect(screen.getByText('December 1, 2023')).toBeInTheDocument()
    expect(screen.getByText('£0.00')).toBeInTheDocument()
    expect(screen.getByText('Free Plan')).toBeInTheDocument()
  })

  it('has account settings with toggle controls', () => {
    render(<SubscriptionPage />)
    
    expect(screen.getByText('Account Settings')).toBeInTheDocument()
    expect(screen.getByText('Email Preferences')).toBeInTheDocument()
    
    // Check for toggle switches
    const emailToggle = screen.getByText('Email notifications').closest('div')?.querySelector('input[type="checkbox"]')
    const usageToggle = screen.getByText('Usage notifications').closest('div')?.querySelector('input[type="checkbox"]')
    const marketingToggle = screen.getByText('Marketing communications').closest('div')?.querySelector('input[type="checkbox"]')
    
    expect(emailToggle).toBeInTheDocument()
    expect(usageToggle).toBeInTheDocument()
    expect(marketingToggle).toBeInTheDocument()
    
    // Check initial states
    expect(emailToggle).toBeChecked()
    expect(usageToggle).toBeChecked()
    expect(marketingToggle).not.toBeChecked()
  })

  it('allows toggling email preferences', async () => {
    render(<SubscriptionPage />)
    
    const marketingToggle = screen.getByText('Marketing communications').closest('div')?.querySelector('input[type="checkbox"]') as HTMLInputElement
    
    expect(marketingToggle).not.toBeChecked()
    
    fireEvent.click(marketingToggle)
    
    await waitFor(() => {
      expect(marketingToggle).toBeChecked()
    })
  })

  it('has subscription cancellation flow', () => {
    render(<SubscriptionPage />)
    
    const cancelButton = screen.getByText('Cancel Subscription')
    expect(cancelButton).toBeInTheDocument()
    
    fireEvent.click(cancelButton)
    
    // Check dialog opens
    expect(screen.getByText('Are you sure you want to cancel your subscription?')).toBeInTheDocument()
    expect(screen.getByText('Keep Subscription')).toBeInTheDocument()
  })

  it('has upgrade buttons for non-current plans', () => {
    render(<SubscriptionPage />)
    
    const proUpgradeButton = screen.getByText('Upgrade to Pro')
    const proPlusUpgradeButton = screen.getByText('Upgrade to Pro Plus')
    
    expect(proUpgradeButton).toBeInTheDocument()
    expect(proPlusUpgradeButton).toBeInTheDocument()
  })

  it('has export usage data functionality', () => {
    render(<SubscriptionPage />)
    
    const exportButton = screen.getByText('Export Usage Data')
    expect(exportButton).toBeInTheDocument()
    
    fireEvent.click(exportButton)
    // In a real test, you'd verify the export functionality
  })

  it('displays UK-specific pricing information', () => {
    render(<SubscriptionPage />)
    
    expect(screen.getByText('UK Pricing Information')).toBeInTheDocument()
    expect(screen.getByText(/All prices shown in British Pounds/)).toBeInTheDocument()
    expect(screen.getByText(/VAT included where applicable/)).toBeInTheDocument()
  })

  it('has help and support section', () => {
    render(<SubscriptionPage />)
    
    expect(screen.getByText('Help & Support')).toBeInTheDocument()
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
    expect(screen.getByText('Contact Support')).toBeInTheDocument()
  })

  it('is mobile responsive with proper structure', () => {
    render(<SubscriptionPage />)
    
    // Check main container has proper responsive classes
    const mainContent = document.querySelector('main')
    expect(mainContent).toHaveClass('max-w-7xl', 'mx-auto')
    
    // Check grid layouts are responsive
    const usageGrid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-4')
    expect(usageGrid).toBeInTheDocument()
    
    const analyticsGrid = document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-2')
    expect(analyticsGrid).toBeInTheDocument()
  })

  it('shows professional design elements that reduce billing anxiety', () => {
    render(<SubscriptionPage />)
    
    // Check for reassuring messaging
    expect(screen.getByText(/You'll keep access until your next billing date/)).toBeInTheDocument()
    expect(screen.getByText(/You can resubscribe anytime without losing your data/)).toBeInTheDocument()
    
    // Check for clear pricing display
    expect(screen.getByText('per month')).toBeInTheDocument()
    
    // Check for security/trust elements
    expect(screen.getByText(/VAT included where applicable/)).toBeInTheDocument()
  })
})