import type { SubscriptionData, UsageAnalytics, BillingHistory, PricingTier } from '@/lib/types/subscription'

// Mock data for subscription overview
export const mockSubscriptionData: SubscriptionData = {
  tier: 'Free Plan',
  usage: {
    current: 15,
    limit: 30,
    resetDate: 'February 1, 2024',
    daysRemaining: 16
  }
}

// Mock data for usage analytics
export const mockUsageAnalytics: UsageAnalytics = {
  monthlyUsage: [
    { month: 'Aug', usage: 8 },
    { month: 'Sep', usage: 12 },
    { month: 'Oct', usage: 18 },
    { month: 'Nov', usage: 22 },
    { month: 'Dec', usage: 25 },
    { month: 'Jan', usage: 15 }
  ],
  topTopics: [
    { topic: 'Addition', count: 8 },
    { topic: 'Subtraction', count: 5 },
    { topic: 'Fractions', count: 2 }
  ],
  averageGenerationTime: '3.2 seconds'
}

// Mock billing history
export const mockBillingHistory: BillingHistory[] = [
  {
    id: '1',
    date: 'December 1, 2023',
    amount: '£0.00',
    status: 'Free Plan',
    invoice: null
  }
]

// Pricing tiers
export const mockPricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: '£0',
    period: 'month',
    worksheets: 30,
    features: ['30 worksheets/month', 'Basic question types', 'PDF download', 'Ads included'],
    current: true
  },
  {
    name: 'Pro',
    price: '£2.99',
    period: 'month',
    worksheets: 90,
    features: ['90 worksheets/month', 'Advanced question types', 'PDF download', 'Ad-free experience', 'Priority support'],
    popular: true
  },
  {
    name: 'Pro Plus',
    price: '£4.99',
    period: 'month',
    worksheets: 150,
    features: ['150 worksheets/month', 'All question types', 'PDF download', 'Ad-free experience', 'Priority support', 'Custom templates']
  }
]