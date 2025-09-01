'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { RefreshCw } from 'lucide-react'

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
  threshold?: number
  disabled?: boolean
}

export function PullToRefresh({ 
  onRefresh, 
  children, 
  threshold = 80,
  disabled = false 
}: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [canRefresh, setCanRefresh] = useState(false)
  const startY = useRef(0)
  const currentY = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (disabled || isRefreshing) return
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if (scrollTop > 0) return
    
    startY.current = e.touches[0].clientY
  }, [disabled, isRefreshing])
  
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (disabled || isRefreshing) return
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if (scrollTop > 0) {
      setPullDistance(0)
      return
    }
    
    currentY.current = e.touches[0].clientY
    const distance = Math.max(0, currentY.current - startY.current)
    
    if (distance > 0) {
      e.preventDefault()
      const adjustedDistance = Math.min(distance * 0.5, threshold * 1.5)
      setPullDistance(adjustedDistance)
      setCanRefresh(adjustedDistance >= threshold)
    }
  }, [disabled, isRefreshing, threshold])
  
  const handleTouchEnd = useCallback(async () => {
    if (disabled || isRefreshing) return
    
    if (canRefresh && pullDistance >= threshold) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } catch (error) {
        console.error('Refresh failed:', error)
      } finally {
        setIsRefreshing(false)
        setPullDistance(0)
        setCanRefresh(false)
      }
    } else {
      setPullDistance(0)
      setCanRefresh(false)
    }
  }, [disabled, isRefreshing, canRefresh, pullDistance, threshold, onRefresh])
  
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    container.addEventListener('touchstart', handleTouchStart, { passive: false })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd)
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])
  
  return (
    <div ref={containerRef} className="relative">
      {/* Pull indicator */}
      <div 
        className="absolute top-0 left-0 right-0 flex justify-center items-center bg-blue-50 transition-all duration-200 ease-out overflow-hidden"
        style={{
          height: pullDistance,
          transform: `translateY(-${Math.max(0, threshold - pullDistance)}px)`
        }}
      >
        <div className={`transition-all duration-200 ${
          pullDistance > 0 ? 'opacity-100' : 'opacity-0'
        }`}>
          <RefreshCw 
            className={`h-6 w-6 text-blue-600 transition-transform duration-200 ${
              isRefreshing ? 'animate-spin' : canRefresh ? 'rotate-180' : ''
            }`} 
          />
        </div>
      </div>
      
      {/* Content */}
      <div 
        style={{ 
          transform: `translateY(${pullDistance}px)`,
          transition: isRefreshing || pullDistance === 0 ? 'transform 0.2s ease-out' : 'none'
        }}
      >
        {children}
      </div>
    </div>
  )
}