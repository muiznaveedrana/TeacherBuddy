'use client'

import { Loader2, Download, Database } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface DataFetchingLoaderProps {
  type?: 'general' | 'download' | 'database'
  message?: string
  className?: string
  inline?: boolean
}

export function DataFetchingLoader({
  type = 'general',
  message,
  className = "",
  inline = false
}: DataFetchingLoaderProps) {
  const getConfig = () => {
    switch (type) {
      case 'download':
        return {
          icon: Download,
          defaultMessage: "Downloading data...",
          color: "text-green-600"
        }
      case 'database':
        return {
          icon: Database,
          defaultMessage: "Fetching from database...",
          color: "text-purple-600"
        }
      default:
        return {
          icon: Loader2,
          defaultMessage: "Loading data...",
          color: "text-blue-600"
        }
    }
  }

  const { icon: Icon, defaultMessage, color } = getConfig()
  const displayMessage = message || defaultMessage

  if (inline) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Icon className={`w-4 h-4 animate-spin ${color}`} />
        <span className="text-sm text-gray-600">{displayMessage}</span>
      </div>
    )
  }

  return (
    <Card className={`w-full max-w-sm mx-auto ${className}`}>
      <CardContent className="flex items-center justify-center py-8">
        <div className="text-center space-y-3">
          <Icon className={`w-8 h-8 animate-spin mx-auto ${color}`} />
          <p className="text-sm font-medium text-gray-700">{displayMessage}</p>
        </div>
      </CardContent>
    </Card>
  )
}