'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Navigation } from '@/components/ui/navigation'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Footer } from '@/components/ui/footer'
import { BookOpen, Users, Settings } from 'lucide-react'
import WelcomeTour from '@/components/WelcomeTour'

export default function DashboardPage() {
  const [showTour, setShowTour] = useState(true)
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Enhanced Navigation */}
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
              { label: 'Dashboard', current: true }
            ]}
            showHome={false}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Welcome back! Ready to create some worksheets?
          </h2>
          <p className="text-slate-600">
            You&apos;re all set up and ready to start generating personalized worksheets for your students.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" data-tour="generate-worksheet">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Generate Worksheet
              </CardTitle>
              <CardDescription>
                Create a new worksheet with AI-generated questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Start Generating
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" data-tour="name-lists">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-green-600" />
                Manage Name Lists
              </CardTitle>
              <CardDescription>
                Add or edit student name lists for personalized worksheets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Name Lists
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" data-tour="profile-settings">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5 text-slate-600" />
                Profile Settings
              </CardTitle>
              <CardDescription>
                Update your teaching preferences and account settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your worksheet generation history will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-slate-500">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No worksheets generated yet</p>
              <p className="text-sm">
                Once you start creating worksheets, they&apos;ll appear here for easy access.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Welcome Tour */}
      {showTour && (
        <WelcomeTour onComplete={() => setShowTour(false)} />
      )}

      {/* Footer */}
      <Footer version="v1.0.0-beta" />
    </div>
  )
}