// Subscription management types
export interface SubscriptionData {
  tier: string
  usage: {
    current: number
    limit: number
    resetDate: string
    daysRemaining: number
  }
}

export interface UsageAnalytics {
  monthlyUsage: Array<{
    month: string
    usage: number
  }>
  topTopics: Array<{
    topic: string
    count: number
  }>
  averageGenerationTime: string
}

export interface BillingHistory {
  id: string
  date: string
  amount: string
  status: string
  invoice: string | null
}

export interface PricingTier {
  name: string
  price: string
  period: string
  worksheets: number
  features: string[]
  current?: boolean
  popular?: boolean
}

export interface EmailPreferences {
  emailNotifications: boolean
  usageNotifications: boolean
  marketingEmails: boolean
}