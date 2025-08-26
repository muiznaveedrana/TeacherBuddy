'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AuthService } from '@/lib/services/auth'
import { Loader2, User, School, MapPin, BookOpen, GraduationCap } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export default function ProfilePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    country: 'England',
    curriculum: 'UK National Curriculum',
    year_group: '',
    school: '',
    teaching_subjects: [] as string[]
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser()
        if (!currentUser) {
          router.push('/')
          return
        }

        setUser(currentUser)
        
        // Get existing profile if any
        const { profile: existingProfile } = await AuthService.getUserProfile(currentUser.id)
        if (existingProfile) {
          setFormData({
            name: existingProfile.name || currentUser.user_metadata?.name || currentUser.email || '',
            country: existingProfile.country || 'England',
            curriculum: existingProfile.curriculum || 'UK National Curriculum',
            year_group: existingProfile.year_group || '',
            school: existingProfile.school || '',
            teaching_subjects: existingProfile.teaching_subjects || []
          })
        } else {
          // Pre-fill with user metadata
          setFormData(prev => ({
            ...prev,
            name: currentUser.user_metadata?.name || currentUser.email || ''
          }))
        }
      } catch (error) {
        console.error('Error loading user data:', error)
        router.push('/')
      }
    }

    loadUserData()
  }, [router])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.year_group) {
      newErrors.year_group = 'Year group is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    if (!user) {
      return
    }

    setIsLoading(true)

    try {
      const result = await AuthService.completeProfileSetup(user.id, formData)
      
      if (result.error) {
        setErrors({ general: result.error })
      } else {
        // Redirect to dashboard after successful setup
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Profile setup error:', error)
      setErrors({ general: 'Failed to save profile. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <User className="h-6 w-6 text-blue-600" />
              Complete Your Profile
            </CardTitle>
            <CardDescription>
              Help us customize your worksheet generation experience
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                  {errors.general}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Country
                </Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="England">England</SelectItem>
                    <SelectItem value="Scotland">Scotland</SelectItem>
                    <SelectItem value="Wales">Wales</SelectItem>
                    <SelectItem value="Northern Ireland">Northern Ireland</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="curriculum" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Curriculum
                </Label>
                <Select value={formData.curriculum} onValueChange={(value) => handleInputChange('curriculum', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UK National Curriculum">UK National Curriculum</SelectItem>
                    <SelectItem value="Scottish Curriculum">Scottish Curriculum</SelectItem>
                    <SelectItem value="Welsh Curriculum">Welsh Curriculum</SelectItem>
                    <SelectItem value="Northern Ireland Curriculum">Northern Ireland Curriculum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="year_group" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Year Group / Key Stage
                </Label>
                <Select value={formData.year_group} onValueChange={(value) => handleInputChange('year_group', value)}>
                  <SelectTrigger className={errors.year_group ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select year group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Reception">Reception</SelectItem>
                    <SelectItem value="Year 1">Year 1</SelectItem>
                    <SelectItem value="Year 2">Year 2</SelectItem>
                    <SelectItem value="Year 3">Year 3</SelectItem>
                    <SelectItem value="Year 4">Year 4</SelectItem>
                    <SelectItem value="Year 5">Year 5</SelectItem>
                    <SelectItem value="Year 6">Year 6</SelectItem>
                    <SelectItem value="Key Stage 3">Key Stage 3 (Years 7-9)</SelectItem>
                    <SelectItem value="Key Stage 4">Key Stage 4 (Years 10-11)</SelectItem>
                    <SelectItem value="Mixed">Mixed Age Groups</SelectItem>
                  </SelectContent>
                </Select>
                {errors.year_group && (
                  <p className="text-sm text-red-600">{errors.year_group}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="school" className="flex items-center gap-2">
                  <School className="h-4 w-4" />
                  School Name (Optional)
                </Label>
                <Input
                  id="school"
                  value={formData.school}
                  onChange={(e) => handleInputChange('school', e.target.value)}
                  placeholder="Enter your school name"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Profile...
                  </>
                ) : (
                  'Complete Setup & Start Creating'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}