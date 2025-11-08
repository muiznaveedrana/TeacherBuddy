'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Settings, X } from 'lucide-react'

/**
 * Global Admin Quick Access Component
 *
 * Features:
 * - Floating button (bottom-right corner)
 * - Keyboard shortcut: Ctrl+Shift+A (or Cmd+Shift+A on Mac)
 * - Toggle dev metrics visibility
 * - Quick navigation to admin pages
 */
export function QuickAdminAccess() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [showDevMetrics, setShowDevMetrics] = useState(false)

  // Load dev metrics preference
  useEffect(() => {
    const saved = localStorage.getItem('admin_show_dev_metrics')
    setShowDevMetrics(saved === 'true')
  }, [])

  // Keyboard shortcut: Ctrl+Shift+A (Cmd+Shift+A on Mac)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl+Shift+A or Cmd+Shift+A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const toggleDevMetrics = () => {
    const newValue = !showDevMetrics
    setShowDevMetrics(newValue)
    localStorage.setItem('admin_show_dev_metrics', String(newValue))

    // Apply global CSS
    const styleId = 'dev-metrics-visibility'
    let styleEl = document.getElementById(styleId) as HTMLStyleElement

    if (!styleEl) {
      styleEl = document.createElement('style')
      styleEl.id = styleId
      document.head.appendChild(styleEl)
    }

    if (newValue) {
      styleEl.textContent = '' // Show metrics
    } else {
      styleEl.textContent = `
        div[style*="DEVELOPMENT METRICS"],
        div[style*="background: #1a1a1a"] {
          display: none !important;
        }
      `
    }
  }

  return (
    <>
      {/* Floating Admin Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110"
        title="Admin Panel (Ctrl+Shift+A)"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Settings className="w-6 h-6" />}
      </button>

      {/* Admin Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 bg-white rounded-lg shadow-2xl border-2 border-purple-200 p-4 w-80">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-600" />
            Admin Panel
          </h3>

          {/* Quick Links */}
          <div className="space-y-2 mb-4">
            <button
              onClick={() => {
                router.push('/admin/library')
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 font-medium transition-colors"
            >
              📚 Library Admin
            </button>
            <button
              onClick={() => {
                router.push('/create')
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium transition-colors"
            >
              ✏️ Create Worksheet
            </button>
            <button
              onClick={() => {
                router.push('/library')
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-2 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 font-medium transition-colors"
            >
              📖 Browse Library
            </button>
          </div>

          {/* Dev Metrics Toggle */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Dev Metrics</span>
              <button
                onClick={toggleDevMetrics}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showDevMetrics ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showDevMetrics ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {showDevMetrics ? 'Metrics visible' : 'Metrics hidden'}
            </p>
          </div>

          {/* Keyboard Shortcut Hint */}
          <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500 text-center">
            Press <kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl+Shift+A</kbd> to toggle
          </div>
        </div>
      )}
    </>
  )
}
