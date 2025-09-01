'use client'

import { Loader2 } from 'lucide-react'
import { Button, ButtonProps } from '@/components/ui/button'
import { forwardRef } from 'react'

interface ButtonLoaderProps extends ButtonProps {
  loading?: boolean
  loadingText?: string
  children: React.ReactNode
}

export const ButtonLoader = forwardRef<HTMLButtonElement, ButtonLoaderProps>(
  ({ loading = false, loadingText, children, disabled, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={disabled || loading}
        className={className}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            {loadingText || 'Loading...'}
          </>
        ) : (
          children
        )}
      </Button>
    )
  }
)

ButtonLoader.displayName = 'ButtonLoader'

// Inline spinner for existing buttons
export function InlineButtonSpinner({ className = "" }: { className?: string }) {
  return <Loader2 className={`w-4 h-4 animate-spin ${className}`} />
}