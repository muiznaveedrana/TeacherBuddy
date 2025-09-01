'use client'

import { useState, useRef, useCallback } from 'react'

interface SwipeGestureProps {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  threshold?: number
  children: React.ReactNode
  className?: string
}

export function SwipeGesture({ 
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  children,
  className = ''
}: SwipeGestureProps) {
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null)
  const [isTracking, setIsTracking] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    setStartPos({ x: touch.clientX, y: touch.clientY })
    setIsTracking(true)
  }, [])
  
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isTracking || !startPos) return
    
    const touch = e.changedTouches[0]
    const endX = touch.clientX
    const endY = touch.clientY
    
    const deltaX = endX - startPos.x
    const deltaY = endY - startPos.y
    
    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)
    
    // Determine if swipe was significant enough and primarily horizontal or vertical
    if (Math.max(absDeltaX, absDeltaY) < threshold) {
      setIsTracking(false)
      setStartPos(null)
      return
    }
    
    if (absDeltaX > absDeltaY) {
      // Horizontal swipe
      if (deltaX > 0 && onSwipeRight) {
        onSwipeRight()
      } else if (deltaX < 0 && onSwipeLeft) {
        onSwipeLeft()
      }
    } else {
      // Vertical swipe  
      if (deltaY > 0 && onSwipeDown) {
        onSwipeDown()
      } else if (deltaY < 0 && onSwipeUp) {
        onSwipeUp()
      }
    }
    
    setIsTracking(false)
    setStartPos(null)
  }, [isTracking, startPos, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown])
  
  const handleTouchMove = useCallback(() => {
    if (!isTracking) return
    // Prevent default only if we're tracking to avoid interfering with scrolling
    // when there's no active gesture
  }, [isTracking])
  
  return (
    <div
      ref={containerRef}
      className={className}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      style={{ touchAction: 'pan-y' }} // Allow vertical scrolling but enable horizontal gesture detection
    >
      {children}
    </div>
  )
}

interface TapGestureProps {
  onTap?: () => void
  onDoubleTap?: () => void
  onLongPress?: () => void
  longPressThreshold?: number
  doubleTapThreshold?: number
  children: React.ReactNode
  className?: string
}

export function TapGesture({
  onTap,
  onDoubleTap,
  onLongPress,
  longPressThreshold = 500,
  doubleTapThreshold = 300,
  children,
  className = ''
}: TapGestureProps) {
  const [lastTap, setLastTap] = useState(0)
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null)
  const [isLongPressing, setIsLongPressing] = useState(false)
  
  const handleTouchStart = useCallback(() => {
    if (onLongPress) {
      setIsLongPressing(false)
      const timer = setTimeout(() => {
        setIsLongPressing(true)
        onLongPress()
      }, longPressThreshold)
      setLongPressTimer(timer)
    }
  }, [onLongPress, longPressThreshold])
  
  const handleTouchEnd = useCallback(() => {
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      setLongPressTimer(null)
    }
    
    if (isLongPressing) {
      setIsLongPressing(false)
      return
    }
    
    const now = Date.now()
    const timeDiff = now - lastTap
    
    if (timeDiff < doubleTapThreshold && onDoubleTap) {
      onDoubleTap()
      setLastTap(0) // Reset to prevent triple-tap issues
    } else if (onTap) {
      // Delay single tap slightly to distinguish from double tap
      setTimeout(() => {
        if (Date.now() - lastTap >= doubleTapThreshold) {
          onTap()
        }
      }, doubleTapThreshold / 2)
      setLastTap(now)
    }
  }, [longPressTimer, isLongPressing, lastTap, doubleTapThreshold, onTap, onDoubleTap])
  
  const handleTouchCancel = useCallback(() => {
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      setLongPressTimer(null)
    }
    setIsLongPressing(false)
  }, [longPressTimer])
  
  return (
    <div
      className={className}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      {children}
    </div>
  )
}