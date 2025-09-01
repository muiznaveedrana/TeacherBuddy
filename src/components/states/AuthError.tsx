'use client'

import { Shield, AlertCircle, RefreshCw, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface AuthErrorProps {
  errorType?: 'session_expired' | 'login_failed' | 'permission_denied' | 'account_suspended' | 'generic'
  onRetry?: () => void
  onLogin?: () => void
  onContactSupport?: () => void
}

export function AuthError({
  errorType = 'generic',
  onRetry,
  onLogin,
  onContactSupport
}: AuthErrorProps) {
  const getErrorContent = () => {
    switch (errorType) {
      case 'session_expired':
        return {
          title: "Session Expired",
          message: "Your session has expired for security reasons. Please sign in again to continue.",
          suggestions: [
            "Click 'Sign In Again' below",
            "Make sure cookies are enabled in your browser",
            "Clear your browser cache if problems persist"
          ],
          showLogin: true,
          showRetry: false
        }
      case 'login_failed':
        return {
          title: "Sign In Failed", 
          message: "We couldn't sign you in with Google. This might be a temporary issue.",
          suggestions: [
            "Make sure you're connected to the internet",
            "Check that pop-ups aren't blocked",
            "Try refreshing the page and signing in again"
          ],
          showLogin: true,
          showRetry: true
        }
      case 'permission_denied':
        return {
          title: "Access Denied",
          message: "You don't have permission to access this feature. This might be due to your subscription level.",
          suggestions: [
            "Check your subscription status",
            "Upgrade your plan if needed",
            "Contact support if you believe this is an error"
          ],
          showLogin: false,
          showRetry: false
        }
      case 'account_suspended':
        return {
          title: "Account Temporarily Suspended",
          message: "Your account has been temporarily suspended. Please contact our support team.",
          suggestions: [
            "Contact our support team for assistance",
            "Check your email for any notifications",
            "Review our terms of service"
          ],
          showLogin: false,
          showRetry: false
        }
      default:
        return {
          title: "Authentication Error",
          message: "There was a problem with your authentication. Please try signing in again.",
          suggestions: [
            "Try signing in again",
            "Clear your browser cookies",
            "Contact support if the problem continues"
          ],
          showLogin: true,
          showRetry: true
        }
    }
  }

  const { title, message, suggestions, showLogin, showRetry } = getErrorContent()

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <Shield className="w-8 h-8 text-red-600" />
        </div>
        <CardTitle className="text-xl font-semibold text-gray-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            {message}
          </AlertDescription>
        </Alert>
        
        <div className="space-y-2 text-sm text-gray-600">
          <p className="font-medium">What you can do:</p>
          <ul className="space-y-1 ml-4 text-xs">
            {suggestions.map((suggestion, index) => (
              <li key={index}>• {suggestion}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          {showLogin && onLogin && (
            <Button 
              onClick={onLogin} 
              className="w-full"
              variant="default"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In Again
            </Button>
          )}
          
          {showRetry && onRetry && (
            <Button 
              onClick={onRetry}
              variant="outline" 
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
          
          <Button 
            onClick={onContactSupport}
            variant="ghost" 
            className="w-full text-sm"
          >
            Contact Support
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}