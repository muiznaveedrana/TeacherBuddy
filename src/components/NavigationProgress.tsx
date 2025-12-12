'use client'

import { useEffect, useState, useCallback, createContext, useContext, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Context for manual loading control
interface LoadingContextType {
  startLoading: () => void
  stopLoading: () => void
  isLoading: boolean
}

const LoadingContext = createContext<LoadingContextType>({
  startLoading: () => {},
  stopLoading: () => {},
  isLoading: false
})

export const useLoading = () => useContext(LoadingContext)

interface NavigationProgressProps {
  children: React.ReactNode
}

function NavigationProgressInner({ children }: NavigationProgressProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [manualLoading, setManualLoading] = useState(false)

  const isLoading = isNavigating || manualLoading

  // Start loading manually (for button clicks that trigger async actions)
  const startLoading = useCallback(() => {
    setManualLoading(true)
    setProgress(0)
  }, [])

  // Stop loading manually
  const stopLoading = useCallback(() => {
    setManualLoading(false)
    setProgress(100)
    setTimeout(() => setProgress(0), 300)
  }, [])

  // Track route changes
  useEffect(() => {
    setIsNavigating(false)
    setProgress(100)
    const timeout = setTimeout(() => setProgress(0), 300)
    return () => clearTimeout(timeout)
  }, [pathname, searchParams])

  // Intercept link clicks for navigation loading
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')

      // Check if it's an internal navigation link
      if (link && link.href && !link.target && !link.download) {
        const url = new URL(link.href, window.location.origin)

        // Only trigger for same-origin internal navigation
        if (url.origin === window.location.origin && url.pathname !== pathname) {
          setIsNavigating(true)
          setProgress(0)
        }
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [pathname])

  // Animate progress while loading
  useEffect(() => {
    if (!isLoading) return

    const interval = setInterval(() => {
      setProgress(prev => {
        // Slow down as we approach 90%
        if (prev < 30) return prev + 10
        if (prev < 60) return prev + 5
        if (prev < 85) return prev + 2
        if (prev < 95) return prev + 0.5
        return prev
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isLoading])

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading, isLoading }}>
      {/* Progress bar - fixed at top */}
      <div
        className={`fixed top-0 left-0 right-0 h-1 z-[100] transition-opacity duration-300 ${
          isLoading ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            boxShadow: isLoading ? '0 0 10px rgba(139, 92, 246, 0.5), 0 0 5px rgba(139, 92, 246, 0.3)' : 'none'
          }}
        />
      </div>
      {children}
    </LoadingContext.Provider>
  )
}

// Wrapper component that provides Suspense boundary
export function NavigationProgressProvider({ children }: NavigationProgressProps) {
  return (
    <Suspense fallback={<>{children}</>}>
      <NavigationProgressInner>{children}</NavigationProgressInner>
    </Suspense>
  )
}
