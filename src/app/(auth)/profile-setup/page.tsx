'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProfileSetupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    school: '',
    country: 'England',
    curriculum: 'UK National Curriculum',
    yearGroup: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const yearGroups = [
    'Reception',
    'Year 1',
    'Year 2',
    'Year 3',
    'Year 4',
    'Year 5',
    'Year 6'
  ]

  const countries = [
    'England',
    'Scotland',
    'Wales',
    'Northern Ireland',
    'Other'
  ]

  const curriculums = [
    'UK National Curriculum',
    'Scottish Curriculum for Excellence',
    'Welsh Curriculum',
    'Northern Ireland Curriculum',
    'International Baccalaureate',
    'Other'
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.school.trim()) {
      newErrors.school = 'School name is required'
    }
    if (!formData.yearGroup) {
      newErrors.yearGroup = 'Please select your year group'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    // Mock profile setup process
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setShowWelcome(true)
    
    // After showing welcome, redirect to dashboard
    setTimeout(() => {
      router.push('/dashboard')
    }, 3000)
  }

  const handleSkip = () => {
    router.push('/dashboard')
  }

  if (showWelcome) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Welcome to WorksheetGenerator.AI, {formData.firstName}!
            </h2>
            <p className="text-slate-600 mb-4">
              Your profile has been set up successfully. You&apos;ll be redirected to your dashboard in a moment.
            </p>
            <div className="text-sm text-slate-500">
              Redirecting to dashboard...
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-slate-900">
            Set Up Your Profile
          </CardTitle>
          <CardDescription className="text-slate-600">
            Help us customize your experience by telling us about your teaching context
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="school">School Name *</Label>
              <Input
                id="school"
                placeholder="Enter your school name"
                value={formData.school}
                onChange={(e) => setFormData(prev => ({ ...prev, school: e.target.value }))}
                className={errors.school ? 'border-red-500' : ''}
              />
              {errors.school && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.school}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Country</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Curriculum</Label>
                <Select
                  value={formData.curriculum}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, curriculum: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {curriculums.map((curriculum) => (
                      <SelectItem key={curriculum} value={curriculum}>
                        {curriculum}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Year Group *</Label>
              <Select
                value={formData.yearGroup}
                onValueChange={(value) => setFormData(prev => ({ ...prev, yearGroup: value }))}
              >
                <SelectTrigger className={errors.yearGroup ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select your primary year group" />
                </SelectTrigger>
                <SelectContent>
                  {yearGroups.map((yearGroup) => (
                    <SelectItem key={yearGroup} value={yearGroup}>
                      {yearGroup}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.yearGroup && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.yearGroup}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting up your profile...
                  </>
                ) : (
                  'Complete Setup'
                )}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={handleSkip}
                disabled={isLoading}
                size="lg"
              >
                Skip for now
              </Button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Why complete your profile?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Get curriculum-aligned worksheet suggestions</li>
              <li>• Access year group-appropriate difficulty levels</li>
              <li>• Receive personalized teaching resources</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}