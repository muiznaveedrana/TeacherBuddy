'use client'

import { AlertCircle, X } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

interface FormErrorProps {
  title?: string
  message: string
  fields?: string[]
  onDismiss?: () => void
  className?: string
}

export function FormError({
  title = "Please check your input",
  message,
  fields = [],
  onDismiss,
  className = ""
}: FormErrorProps) {
  return (
    <Alert className={`border-red-200 bg-red-50 ${className}`}>
      <AlertCircle className="h-4 w-4 text-red-600" />
      <div className="flex items-start justify-between w-full">
        <div className="space-y-2">
          <div className="font-medium text-red-800">{title}</div>
          <AlertDescription className="text-red-700 text-sm">
            {message}
          </AlertDescription>
          
          {fields.length > 0 && (
            <div className="text-sm text-red-600">
              <p className="font-medium mb-1">Issues with:</p>
              <ul className="space-y-0.5 ml-4 text-xs">
                {fields.map((field, index) => (
                  <li key={index}>• {field}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0 text-red-600 hover:text-red-800 hover:bg-red-100"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Alert>
  )
}

// Inline form error for specific fields
interface InlineFormErrorProps {
  message: string
  className?: string
}

export function InlineFormError({
  message,
  className = ""
}: InlineFormErrorProps) {
  return (
    <div className={`flex items-center gap-1 text-red-600 text-sm mt-1 ${className}`}>
      <AlertCircle className="h-3 w-3 flex-shrink-0" />
      <span>{message}</span>
    </div>
  )
}