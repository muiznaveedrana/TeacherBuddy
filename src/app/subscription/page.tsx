'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Navigation } from '@/components/ui/navigation'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Footer } from '@/components/ui/footer'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ToggleSwitch } from '@/components/ui/toggle-switch'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { 
  CreditCard, 
  Download, 
  Calendar, 
  TrendingUp, 
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  CheckCircle,
  Star,
  Shield
} from 'lucide-react'
import { 
  mockSubscriptionData, 
  mockUsageAnalytics, 
  mockBillingHistory, 
  mockPricingTiers 
} from '@/lib/data/mockSubscriptionData'
import { useSubscriptionActions } from '@/lib/hooks/useSubscriptionActions'
import type { EmailPreferences } from '@/lib/types/subscription'

export default function SubscriptionPage() {
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [emailPreferences, setEmailPreferences] = useState<EmailPreferences>({
    emailNotifications: true,
    usageNotifications: true,
    marketingEmails: false
  })

  const { handleUpgrade, handleExportData, handleDownloadInvoice } = useSubscriptionActions()

  const usagePercentage = (mockSubscriptionData.usage.current / mockSubscriptionData.usage.limit) * 100

  const updateEmailPreference = (key: keyof EmailPreferences, value: boolean) => {
    setEmailPreferences(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <Navigation 
        user={{
          name: 'Sarah Johnson',
          email: 'sarah.johnson@school.edu.uk'
        }}
        usage={{
          current: 15,
          limit: 30,
          tier: 'Free'
        }}
        notifications={2}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-100 px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb 
            items={[
              { label: 'Dashboard', href: '/create' },
              { label: 'Subscription Management', current: true }
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">Subscription Management</h1>
            <p className="text-slate-600">Manage your subscription, view usage analytics, and billing information.</p>
          </div>

          {/* Subscription Overview Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                Subscription Overview
              </CardTitle>
              <CardDescription>Current plan and usage information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-slate-600">Current Tier</p>
                  <Badge variant="outline" className="w-fit">
                    {mockSubscriptionData.tier}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-600">Usage</p>
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-slate-900">
                      {mockSubscriptionData.usage.current}/{mockSubscriptionData.usage.limit} worksheets
                    </p>
                    <Progress value={usagePercentage} className="h-2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-600">Next Reset</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {mockSubscriptionData.usage.resetDate}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-600">Days Remaining</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {mockSubscriptionData.usage.daysRemaining} days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Usage Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Usage Analytics
                </CardTitle>
                <CardDescription>Your worksheet generation patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Monthly Usage Chart (Simple Bar Chart) */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Monthly Usage (Last 6 Months)</h4>
                  <div className="space-y-2">
                    {mockUsageAnalytics.monthlyUsage.map((data) => (
                      <div key={data.month} className="flex items-center gap-3">
                        <span className="text-xs text-slate-600 w-8">{data.month}</span>
                        <div className="flex-1 bg-slate-100 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(data.usage / 30) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-600 w-6">{data.usage}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Most Generated Topics */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Most Generated Topics</h4>
                  <div className="space-y-1">
                    {mockUsageAnalytics.topTopics.map((topic) => (
                      <div key={topic.topic} className="flex justify-between text-sm">
                        <span className="text-slate-700">{topic.topic}</span>
                        <span className="text-slate-500">{topic.count} worksheets</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Average Generation Time */}
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Average generation time</span>
                    <span className="font-medium text-slate-900">{mockUsageAnalytics.averageGenerationTime}</span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleExportData}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Usage Data
                </Button>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-slate-600" />
                  Account Settings
                </CardTitle>
                <CardDescription>Manage your preferences and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Email Preferences */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Email Preferences</h4>
                  <div className="space-y-3">
                    <ToggleSwitch
                      id="email-notifications"
                      checked={emailPreferences.emailNotifications}
                      onChange={(value) => updateEmailPreference('emailNotifications', value)}
                      label="Email notifications"
                      description="Receive important updates about your account"
                    />
                    <ToggleSwitch
                      id="usage-notifications"
                      checked={emailPreferences.usageNotifications}
                      onChange={(value) => updateEmailPreference('usageNotifications', value)}
                      label="Usage notifications"
                      description="Alert when approaching usage limits"
                    />
                    <ToggleSwitch
                      id="marketing-emails"
                      checked={emailPreferences.marketingEmails}
                      onChange={(value) => updateEmailPreference('marketingEmails', value)}
                      label="Marketing communications"
                      description="Tips, feature updates, and promotions"
                    />
                  </div>
                </div>

                {/* Help & Support */}
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-sm mb-3">Help & Support</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Frequently Asked Questions
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Contact Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tier Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Subscription Plans
              </CardTitle>
              <CardDescription>Choose the plan that works best for your teaching needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockPricingTiers.map((tier) => (
                  <div 
                    key={tier.name} 
                    className={`relative border rounded-lg p-6 ${
                      tier.popular ? 'border-purple-200 bg-purple-50' : tier.current ? 'border-blue-200 bg-blue-50' : 'border-slate-200'
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-purple-600">
                          <Star className="h-3 w-3 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    {tier.current && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge variant="outline" className="bg-blue-600 text-white border-blue-600">
                          Current Plan
                        </Badge>
                      </div>
                    )}
                    
                    <div className="text-center space-y-4">
                      <h3 className="text-lg font-semibold">{tier.name}</h3>
                      <div className="space-y-1">
                        <div className="text-3xl font-bold">{tier.price}</div>
                        <div className="text-sm text-slate-500">per {tier.period}</div>
                        <div className="text-sm font-medium text-slate-700">{tier.worksheets} worksheets/month</div>
                      </div>
                      
                      <ul className="space-y-2 text-sm">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      {!tier.current && (
                        <Button 
                          className={`w-full ${tier.popular ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                          onClick={() => handleUpgrade(tier.name)}
                        >
                          {tier.name === 'Free' ? 'Downgrade' : 'Upgrade'} to {tier.name}
                        </Button>
                      )}
                      
                      {tier.current && (
                        <div className="space-y-2">
                          <div className="text-sm text-slate-600 font-medium">Current Plan</div>
                          <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                                Cancel Subscription
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to cancel your subscription? You&apos;ll lose access to premium features but can continue using the free tier.
                                  <br /><br />
                                  <strong>Before you go:</strong>
                                  <ul className="list-disc list-inside mt-2 text-sm">
                                    <li>You&apos;ll keep access until your next billing date</li>
                                    <li>You can resubscribe anytime without losing your data</li>
                                    <li>Consider downgrading to Pro instead for continued benefits</li>
                                  </ul>
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                                  Cancel Subscription
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-slate-500 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-900">UK Pricing Information</p>
                    <p className="text-xs text-slate-600">
                      All prices shown in British Pounds (£). VAT included where applicable. 
                      Prices may vary for schools with special educational discounts.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-slate-600" />
                Billing History
              </CardTitle>
              <CardDescription>View your past invoices and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBillingHistory.map((bill) => (
                  <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{bill.date}</p>
                      <p className="text-xs text-slate-500">{bill.status}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-semibold">{bill.amount}</span>
                      {bill.invoice ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadInvoice(bill.id)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      ) : (
                        <span className="text-xs text-slate-400">No invoice</span>
                      )}
                    </div>
                  </div>
                ))}
                
                {mockBillingHistory.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No billing history available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <Footer version="v1.0.0-beta" />
    </div>
  )
}