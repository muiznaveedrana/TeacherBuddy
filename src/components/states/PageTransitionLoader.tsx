'use client'

import { Loader2 } from 'lucide-react'

interface PageTransitionLoaderProps {
  message?: string
  className?: string
}

export function PageTransitionLoader({
  message = "Loading...",
  className = ""
}: PageTransitionLoaderProps) {
  return (
    <div className={`fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center ${className}`}>
      <div className="text-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
        <p className="text-sm font-medium text-gray-700">{message}</p>
      </div>
    </div>
  )
}

// Inline page loader for smaller transitions
export function InlinePageLoader({
  message = "Loading...",
  className = ""
}: PageTransitionLoaderProps) {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="text-center space-y-3">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  )
}