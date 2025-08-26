'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AuthService } from '@/lib/services/auth'
import { Chrome } from 'lucide-react'

interface GoogleSignInButtonProps {
  redirectTo?: string
  size?: 'default' | 'sm' | 'lg' | 'icon'
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  className?: string
  children?: React.ReactNode
}

export function GoogleSignInButton({ 
  redirectTo, 
  size = 'lg', 
  variant = 'default',
  className = '',
  children = 'Sign in with Google'
}: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await AuthService.signInWithGoogle(redirectTo)
      
      if (result.error) {
        setError(result.error)
        setIsLoading(false)
      }
      // If successful, the redirect will happen automatically
    } catch (err) {
      console.error('Sign in error:', err)
      setError('Failed to sign in. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={handleSignIn}
        disabled={isLoading}
        size={size}
        variant={variant}
        className={`${className} ${variant === 'default' ? 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50' : ''}`}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2" />
        ) : (
          <Chrome className="mr-2 h-4 w-4" />
        )}
        {isLoading ? 'Signing in...' : children}
      </Button>
      
      {error && (
        <p className="text-sm text-red-600 text-center">
          {error}
        </p>
      )}
    </div>
  )
}