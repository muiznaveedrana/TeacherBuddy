'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '@/lib/services/auth'
import { SignOutButton } from '@/components/auth/SignOutButton'
import { AuthErrorBoundary } from '@/components/auth/AuthErrorBoundary'
import { User as UserIcon } from 'lucide-react'
import type { User } from '@supabase/supabase-js'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser()
        if (!currentUser) {
          router.push('/')
          return
        }
        setUser(currentUser)
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    // Listen for auth state changes
    const { data: { subscription } } = AuthService.onAuthStateChange((user) => {
      if (!user) {
        router.push('/')
      } else {
        setUser(user)
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect via useEffect
  }

  return (
    <AuthErrorBoundary>
      <div className="min-h-screen bg-background">
        <nav className="border-b bg-card">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <h1 className="text-xl font-semibold">WorksheetGenerator.AI Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <UserIcon className="h-4 w-4" />
                {user.user_metadata?.name || user.email}
              </div>
              <SignOutButton size="sm" />
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </AuthErrorBoundary>
  )
}