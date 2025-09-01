'use client'

import { useState, useEffect } from 'react'
import { WifiOff, Wifi, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

interface OfflineDetectorProps {
  onRetry?: () => void
  className?: string
}

export function OfflineDetector({ onRetry, className = "" }: OfflineDetectorProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [wasOffline, setWasOffline] = useState(false)

  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = navigator.onLine
      if (!online && isOnline) {
        setWasOffline(true)
      }
      setIsOnline(online)
    }

    // Initial check
    updateOnlineStatus()

    // Listen for online/offline events
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [isOnline])

  // Show nothing if always been online
  if (isOnline && !wasOffline) {
    return null
  }

  // Show reconnection message if back online after being offline
  if (isOnline && wasOffline) {
    return (
      <Alert className={`border-green-200 bg-green-50 ${className}`}>
        <Wifi className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <div className="flex items-center justify-between">
            <span>Connection restored! You&apos;re back online.</span>
            <Button
              onClick={() => {
                setWasOffline(false)
                onRetry?.()
              }}
              variant="ghost"
              size="sm"
              className="text-green-800 hover:text-green-900 hover:bg-green-100"
            >
              Dismiss
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  // Show offline message
  return (
    <Alert className={`border-red-200 bg-red-50 ${className}`}>
      <WifiOff className="h-4 w-4 text-red-600" />
      <AlertDescription className="text-red-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span className="font-medium">You&apos;re currently offline</span>
          </div>
          <p className="text-sm">
            Check your internet connection. Some features may not work until you&apos;re back online.
          </p>
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              size="sm"
              className="mt-2 text-red-800 border-red-300 hover:bg-red-100"
            >
              Try Again
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  )
}

// Hook for detecting online/offline status
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    // Initial check
    updateOnlineStatus()

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  return isOnline
}