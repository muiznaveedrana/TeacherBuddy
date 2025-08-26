'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '@/lib/services/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle, XCircle, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Get the current user after OAuth callback
        const user = await AuthService.getCurrentUser()
        
        if (user) {
          // Check if user needs to complete profile setup
          const { requiresSetup } = await AuthService.getUserProfile(user.id)
          
          if (requiresSetup) {
            setStatus('success')
            setMessage('Authentication successful! Redirecting to profile setup...')
            setTimeout(() => {
              router.push('/profile')
            }, 1500)
          } else {
            setStatus('success')
            setMessage('Welcome back! Redirecting to generation interface...')
            setTimeout(() => {
              router.push('/dashboard')
            }, 1500)
          }
        } else {
          // No user found, might be an error or user cancelled
          setStatus('error')
          setMessage('Authentication failed or was cancelled.')
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        setStatus('error')
        setMessage('An error occurred during authentication.')
      }
    }

    // Small delay to ensure OAuth callback is processed
    const timer = setTimeout(handleAuth, 1000)
    
    return () => clearTimeout(timer)
  }, [router])

  const handleReturnHome = () => {
    router.push('/')
  }

  const handleRetry = () => {
    setStatus('loading')
    setMessage('')
    // Retry authentication
    setTimeout(() => {
      window.location.href = '/'
    }, 500)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            {status === 'loading' && (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                Processing Authentication
              </>
            )}
            {status === 'success' && (
              <>
                <CheckCircle className="h-5 w-5 text-green-600" />
                Authentication Successful
              </>
            )}
            {status === 'error' && (
              <>
                <XCircle className="h-5 w-5 text-red-600" />
                Authentication Failed
              </>
            )}
          </CardTitle>
          <CardDescription>
            {message || 'Please wait while we complete your sign-in...'}
          </CardDescription>
        </CardHeader>
        
        {status === 'error' && (
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                onClick={handleRetry}
                className="flex-1"
              >
                Try Again
              </Button>
              <Button 
                onClick={handleReturnHome}
                variant="outline"
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return Home
              </Button>
            </div>
          </CardContent>
        )}
        
        {status === 'loading' && (
          <CardContent>
            <div className="flex justify-center">
              <div className="animate-pulse flex space-x-1">
                <div className="rounded-full bg-blue-600 h-2 w-2"></div>
                <div className="rounded-full bg-blue-600 h-2 w-2 animation-delay-100"></div>
                <div className="rounded-full bg-blue-600 h-2 w-2 animation-delay-200"></div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </main>
  )
}