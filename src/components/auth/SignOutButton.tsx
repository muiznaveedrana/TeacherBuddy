'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { AuthService } from '@/lib/services/auth'
import { LogOut } from 'lucide-react'

interface SignOutButtonProps {
  size?: 'default' | 'sm' | 'lg' | 'icon'
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  className?: string
  children?: React.ReactNode
}

export function SignOutButton({ 
  size = 'default', 
  variant = 'ghost',
  className = '',
  children = 'Sign Out'
}: SignOutButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)

    try {
      const result = await AuthService.signOut()
      
      if (result.error) {
        console.error('Sign out error:', result.error)
        // Still redirect even if there's an error, as user session might be cleared
      }
      
      // Redirect to landing page
      router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
      // Still redirect as a fallback
      router.push('/')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleSignOut}
      disabled={isLoading}
      size={size}
      variant={variant}
      className={className}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      {isLoading ? 'Signing out...' : children}
    </Button>
  )
}