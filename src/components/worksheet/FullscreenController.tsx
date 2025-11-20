'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Maximize2, Minimize2, Lock, Unlock } from 'lucide-react'

interface FullscreenControllerProps {
  isFullscreen: boolean
  isLocked: boolean
  onToggleFullscreen: () => void
  onToggleLock: () => void
}

export function FullscreenController({
  isFullscreen,
  isLocked,
  onToggleFullscreen,
  onToggleLock
}: FullscreenControllerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Fullscreen API with browser compatibility
  useEffect(() => {
    if (isFullscreen) {
      enterFullscreen()
    } else {
      exitFullscreen()
    }
  }, [isFullscreen])

  const enterFullscreen = () => {
    const elem = document.documentElement

    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => {
        console.error('Fullscreen request failed:', err)
      })
    } else if ((elem as any).webkitRequestFullscreen) {
      // Safari
      (elem as any).webkitRequestFullscreen()
    } else if ((elem as any).mozRequestFullScreen) {
      // Firefox
      (elem as any).mozRequestFullScreen()
    } else if ((elem as any).msRequestFullscreen) {
      // IE11
      (elem as any).msRequestFullscreen()
    }
  }

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => {
          console.error('Exit fullscreen failed:', err)
        })
      }
    }
  }

  // Kiosk mode - Block keyboard shortcuts
  useEffect(() => {
    if (!isLocked) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block navigation and window control keys
      const blockedKeys = [
        'Escape',     // Exit fullscreen
        'F11',        // Toggle fullscreen
        'F5',         // Refresh
        'F4',         // Address bar
      ]

      // Block key combinations
      const blockedCombos = [
        { key: 'w', ctrl: true },        // Close tab
        { key: 't', ctrl: true },        // New tab
        { key: 'n', ctrl: true },        // New window
        { key: 'r', ctrl: true },        // Refresh
        { key: 'Tab', alt: true },       // Switch window
        { key: 'F4', alt: true },        // Close window
        { key: 'l', ctrl: true },        // Address bar
        { key: 'd', ctrl: true },        // Bookmark
      ]

      // Check if key is blocked
      if (blockedKeys.includes(e.key)) {
        e.preventDefault()
        e.stopPropagation()
        console.log('Blocked key:', e.key)
        return false
      }

      // Check if combo is blocked
      for (const combo of blockedCombos) {
        const ctrlMatch = combo.ctrl ? e.ctrlKey || e.metaKey : true
        const altMatch = combo.alt ? e.altKey : true

        if (e.key === combo.key && ctrlMatch && altMatch) {
          e.preventDefault()
          e.stopPropagation()
          console.log('Blocked combo:', combo)
          return false
        }
      }
    }

    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Prevent beforeunload (accidental close)
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
      return ''
    }

    // Add event listeners with capture phase (higher priority)
    window.addEventListener('keydown', handleKeyDown, { capture: true })
    window.addEventListener('contextmenu', handleContextMenu)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true })
      window.removeEventListener('contextmenu', handleContextMenu)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isLocked])

  return (
    <div ref={containerRef} className="fullscreen-controls fixed top-4 right-4 z-40 flex gap-2">
      {/* Fullscreen Toggle */}
      <Button
        onClick={onToggleFullscreen}
        variant="secondary"
        size="sm"
        title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Enter Fullscreen (F11)'}
        className="shadow-lg"
      >
        {isFullscreen ? (
          <>
            <Minimize2 className="w-4 h-4 mr-2" />
            Exit Fullscreen
          </>
        ) : (
          <>
            <Maximize2 className="w-4 h-4 mr-2" />
            Fullscreen
          </>
        )}
      </Button>

      {/* Lock Toggle */}
      <Button
        onClick={onToggleLock}
        variant={isLocked ? 'destructive' : 'outline'}
        size="sm"
        title={isLocked ? 'Unlock (Allow navigation)' : 'Lock Screen (Kiosk mode)'}
        className="shadow-lg"
      >
        {isLocked ? (
          <>
            <Lock className="w-4 h-4 mr-2" />
            Locked
          </>
        ) : (
          <>
            <Unlock className="w-4 h-4 mr-2" />
            Unlock
          </>
        )}
      </Button>

      {/* Lock Status Indicator */}
      {isLocked && (
        <div className="bg-red-500 text-white px-4 py-2 rounded font-bold flex items-center gap-2 shadow-lg animate-pulse">
          🔒 Kiosk Mode Active
        </div>
      )}
    </div>
  )
}
