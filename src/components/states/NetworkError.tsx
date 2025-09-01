'use client'

import { AlertCircle, Wifi, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface NetworkErrorProps {
  title?: string
  message?: string
  onRetry?: () => void
  showSupportContact?: boolean
}

export function NetworkError({
  title = "Connection Problem",
  message = "We're having trouble connecting to our servers. Please check your internet connection and try again.",
  onRetry,
  showSupportContact = false
}: NetworkErrorProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <Wifi className="w-8 h-8 text-red-600" />
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
          <p className="font-medium">What you can try:</p>
          <ul className="space-y-1 ml-4 text-xs">
            <li>• Check your internet connection</li>
            <li>• Refresh the page</li>
            <li>• Try again in a few minutes</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          {onRetry && (
            <Button 
              onClick={onRetry} 
              className="w-full"
              variant="default"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
          
          {showSupportContact && (
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}