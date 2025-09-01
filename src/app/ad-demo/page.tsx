'use client';

import { 
  AdBanner, 
  AdMediumRectangle,
  AdProvider,
  TierAwareAdBanner,
  TierAwareAdMediumRectangle,
  TierAwareAdMobile,
  TierSelector,
  UpgradePrompt,
  CookieConsent
} from '@/components/ads';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdDemoPage() {
  return (
    <AdProvider initialTier="free">
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Ad Integration Mockups & Privacy Demo
            </h1>
            <p className="text-gray-600">
              Story 0.7: Ad Integration Components for Educational Platform
            </p>
          </div>

          {/* Interactive Tier Selector */}
          <TierSelector />

          {/* Tier-Aware Desktop Layout Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Interactive Desktop Layout</CardTitle>
              <CardDescription>
                Shows how ads appear/disappear based on subscription tier
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Navigation Banner Ad */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Navigation Banner Ad (728x90) - Tier Aware
                </h3>
                <TierAwareAdBanner fallback={<UpgradePrompt size="banner" />} />
              </div>

              {/* Main content with sidebar ad */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 bg-white p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4">
                    Main Worksheet Generation Interface
                  </h3>
                  <div className="space-y-4">
                    <div className="h-12 bg-gray-100 rounded animate-pulse"></div>
                    <div className="h-32 bg-gray-100 rounded animate-pulse"></div>
                    <div className="h-8 bg-gray-100 rounded animate-pulse"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Right Panel Ad (300x250) - Tier Aware
                  </h3>
                  <TierAwareAdMediumRectangle fallback={<UpgradePrompt size="medium" />} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Original Static Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Static Desktop Layout (Always Shows Ads)</CardTitle>
              <CardDescription>
                Original ad components for comparison
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Static Navigation Banner Ad
                </h3>
                <AdBanner />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 bg-white p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4">Content Area</h3>
                  <div className="space-y-4">
                    <div className="h-12 bg-gray-100 rounded animate-pulse"></div>
                    <div className="h-32 bg-gray-100 rounded animate-pulse"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Static Right Panel Ad
                  </h3>
                  <AdMediumRectangle />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Layout Demo - Tier Aware */}
          <Card>
            <CardHeader>
              <CardTitle>Interactive Mobile Layout</CardTitle>
              <CardDescription>
                Tier-aware responsive ad layouts for mobile devices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="max-w-sm mx-auto space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Mobile Banner Ad (320x50) - Tier Aware
                  </h3>
                  <TierAwareAdMobile variant="banner" fallback={<UpgradePrompt size="small" />} />
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="text-md font-semibold mb-4">Mobile Interface</h3>
                  <div className="space-y-3">
                    <div className="h-8 bg-gray-100 rounded animate-pulse"></div>
                    <div className="h-20 bg-gray-100 rounded animate-pulse"></div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Mobile Square Ad (250x250) - Tier Aware
                  </h3>
                  <TierAwareAdMobile variant="square" fallback={
                    <div className="w-full max-w-[250px] mx-auto">
                      <UpgradePrompt size="medium" />
                    </div>
                  } />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Large Mobile Banner (320x100) - Tier Aware
                  </h3>
                  <TierAwareAdMobile variant="large-banner" fallback={
                    <UpgradePrompt size="banner" />
                  } />
                </div>
              </div>
            </CardContent>
          </Card>

        {/* Premium (Ad-Free) Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Premium Experience (Pro/Pro Plus)</CardTitle>
            <CardDescription>
              Clean, professional interface without advertisements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold text-blue-900">
                  Ad-Free Professional Experience
                </h3>
                <p className="text-blue-700 max-w-md mx-auto">
                  Enjoy a clean, distraction-free interface perfect for classroom use. 
                  No ads, just pure focus on creating amazing worksheets.
                </p>
                <div className="flex justify-center space-x-4 pt-4">
                  <div className="bg-white/80 px-4 py-2 rounded-lg text-sm">
                    <span className="font-medium">Pro:</span> £2.99/month
                  </div>
                  <div className="bg-white/80 px-4 py-2 rounded-lg text-sm">
                    <span className="font-medium">Pro Plus:</span> £4.99/month
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & GDPR Section */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy & GDPR Compliance</CardTitle>
            <CardDescription>
              Mock privacy controls and consent management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Cookie Consent Banner Mock */}
            <div className="bg-gray-800 text-white p-4 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <h4 className="font-medium mb-2">🍪 Cookie Consent</h4>
                  <p className="text-sm text-gray-300 mb-3">
                    We use cookies to improve your experience and show relevant ads. 
                    You can manage your preferences or learn more about our privacy practices.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded">
                      Accept All
                    </button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white text-sm px-4 py-2 rounded">
                      Manage Preferences
                    </button>
                    <button className="text-gray-300 hover:text-white text-sm underline">
                      Privacy Policy
                    </button>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-white">✕</button>
              </div>
            </div>

            {/* Privacy Settings Preview */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium mb-3">Privacy Settings Preview</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>Essential Cookies</span>
                  <div className="bg-gray-200 rounded-full w-10 h-5 flex items-center px-1">
                    <div className="bg-white w-3 h-3 rounded-full shadow translate-x-4"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Analytics & Performance</span>
                  <div className="bg-green-500 rounded-full w-10 h-5 flex items-center px-1">
                    <div className="bg-white w-3 h-3 rounded-full shadow translate-x-4"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Ad Personalization</span>
                  <div className="bg-green-500 rounded-full w-10 h-5 flex items-center px-1">
                    <div className="bg-white w-3 h-3 rounded-full shadow translate-x-4"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>School-Safe Mode</span>
                  <div className="bg-green-500 rounded-full w-10 h-5 flex items-center px-1">
                    <div className="bg-white w-3 h-3 rounded-full shadow translate-x-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Implementation Notes</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2 text-gray-600">
            <p>• Ad components include loading states, error handling, and ad blocker detection</p>
            <p>• Responsive design maintains clean interface across all device sizes</p>
            <p>• Educational-appropriate mock content suitable for classroom environments</p>
            <p>• GDPR-compliant privacy controls for UK audience</p>
            <p>• Clear visual separation between ads and application content</p>
            <p>• Smooth transitions when upgrading to premium tiers</p>
          </CardContent>
        </Card>
        </div>
      </div>
      
      {/* Cookie Consent Banner */}
      <CookieConsent onPreferencesChange={(prefs) => console.log('Privacy preferences updated:', prefs)} />
    </AdProvider>
  );
}